/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape
{
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xiaoding.org.ui.shape.interf.IShapeBase;
	import com.xuele.xiaoding.org.utils.MathTool;

	import flash.events.MouseEvent;
	import flash.geom.Point;

	public class CircleShape extends ShapeBase
	{
		private var _radius:Number = 0;

		private var _selectObj:Object;

		public function CircleShape()
		{
			super();
		}

		override protected function createChildren():void
		{
			super.createChildren();

			startSpot = new Spot();
			addElement(startSpot);

			endSpot = new Spot();
			addElement(endSpot);

			endSpot.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
		}

		private function onMouseDown(event:MouseEvent):void
		{
			if (event.target is Spot)
			{
				_selectObj = event.target;

				stage.addEventListener(MouseEvent.MOUSE_MOVE, onMoveHandler, false, 0, true);
				stage.addEventListener(MouseEvent.MOUSE_UP, onStageUp, false, 0, true);
			}
		}

		private function onStageUp(event:MouseEvent):void
		{
			stage.removeEventListener(MouseEvent.MOUSE_UP, onStageUp);
			stage.removeEventListener(MouseEvent.MOUSE_MOVE, onMoveHandler);
		}

		private function onMoveHandler(event:MouseEvent):void
		{
			if (_selectObj && _selectObj == endSpot)
			{
				moveTo(new Point(event.stageX, event.stageY).subtract(new Point(x, y)));
			}
		}

		override public function startTo(point:Point):void
		{
			startP = point;
			if (startSpot)
			{
				startSpot.draw(startP);
			}
		}

		override public function moveTo(point:Point):void
		{
			endP = point;
			_radius = Point.distance(endP, startP);
			if (endSpot)
			{
				endSpot.draw(endP);
			}
			draw();

			//屏蔽这些子功能节点
			//simpleMoveTo(endP);
		}

		override public function simpleMoveTo(point:Point, type:int = 1):void
		{
			if (sonNodes && sonNodes.length)
			{
				var element:IShapeBase;
				var scaleP:Point;
				for (var i:int = 0, len:int = sonNodes.length; i < len; i++)
				{
					element = sonNodes[i];
					if (element.parentEndNode && element.parentEndNode == this)
					{
						scaleP = getEquationPoint(element.parentEndNode.startP, element.parentEndNode.endP, element.endP);
						element.simpleMoveTo(scaleP, 2);
					}

					if (element.parentStartNode && element.parentStartNode == this)
					{
						scaleP = getEquationPoint(element.parentStartNode.startP, element.parentStartNode.endP, element.startP);
						element.simpleMoveTo(scaleP, 1);
					}
				}
			}
		}

		public function draw():void
		{
			this.graphics.clear();
			this.graphics.lineStyle(3, 0x008000);
			this.graphics.drawCircle(startP.x, startP.y, _radius);
			this.graphics.endFill();
		}

		override public function checkCollision(point:Point):Boolean
		{
			if (!startCheck) return false;

			collisionPoint = point;
			if (collisionPoint)
			{
				if (containPoint(collisionPoint))
				{
					magicDraw();
					pointInShape = true;
				} else
				{
					pointInShape = false;
					magicPen.graphics.clear();
					crossPoint = null;
				}
			}
			return pointInShape;
		}

		//发生碰撞时绘制图形
		override public function magicDraw():void
		{
			magicPen.graphics.clear();
			magicPen.graphics.lineStyle(GlobalDatasDrawCircle.MAGIC_LINE_SIZE, GlobalDatasDrawCircle.MAGIC_LINE_COLOR);
			magicPen.graphics.drawCircle(startP.x, startP.y, _radius);

			if (collisionPoint)
			{
				var ox:Number = collisionPoint.x;
				var oy:Number = collisionPoint.y;
				crossPoint = getEquationPoint(startP, endP, collisionPoint);
				if (crossPoint)
				{
					ox = crossPoint.x;
					oy = crossPoint.y;
				}
				magicPen.graphics.lineStyle(GlobalDatasDrawCircle.NORMAL_SIZE, GlobalDatasDrawCircle.NORMAL_COLOR);
				magicPen.graphics.drawCircle(ox, oy, GlobalDatasDrawCircle.NORMAL_RADIUS);
				magicPen.graphics.endFill();
			}
		}

		override public function getEquationPoint(startP:Point, endP:Point, checkP:Point):Point
		{
			var radian:Number = MathTool.getRadian(startP, checkP);
			return new Point(startP.x + Math.cos(radian) * _radius, startP.y + Math.sin(radian) * _radius);
		}

		override public function pointInShapeInner(point:Point):Boolean
		{
			var p:Point = this.localToGlobal(this.startSpot.point);
			var distance:Number = Point.distance(p, point);
			return distance < _radius - GlobalDatasDrawCircle.PRECISE;
		}
	}
}
