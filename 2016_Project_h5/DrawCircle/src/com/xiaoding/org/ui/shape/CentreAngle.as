/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape
{
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xuele.xiaoding.org.utils.MathTool;

	import flash.events.MouseEvent;
	import flash.geom.Point;

	public class CentreAngle extends ShapeBase
	{
		private var _radius:Number = 0;

		private var _selectObj:Object;

		private var _circleP1:Spot;
		private var _circleP2:Spot;

		public function CentreAngle()
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

			_circleP1 = new Spot();
			addElement(_circleP1);
			_circleP1.radian = Math.PI / 4;

			_circleP2 = new Spot();
			_circleP2.radian = -Math.PI / 4;
			addElement(_circleP2);

			addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
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
			if (_selectObj)
			{
				var p:Point = new Point(event.stageX, event.stageY).subtract(new Point(x, y));
				if (_selectObj == endSpot)
				{
					moveTo(p);
				} else if (_selectObj == _circleP1)
				{
					fixedPointMove(p);
				} else if (_selectObj == _circleP2)
				{
					fixedPointMove(p);
				}
			}
		}

		private function fixedPointMove(p:Point):void
		{
			if (startCheck)
			{
				var radian:Number = MathTool.getRadian(startP, p);
				_selectObj.radian = radian;
				_selectObj.draw(new Point(startP.x + Math.cos(radian) * _radius, startP.y + Math.sin(radian) * _radius));
				draw();
			}
		}

		override public function startTo(point:Point):void
		{
			startP = point;
			if (startSpot)
			{
				startSpot.draw(point);
			}
		}

		override public function moveTo(point:Point):void
		{
			endP = point;
			if (endSpot)
			{
				endSpot.draw(endP);
			}
			_radius = Point.distance(startP, endP);

			_circleP1.draw(new Point(startP.x + Math.cos(_circleP1.radian) * _radius, startP.y + Math.sin(_circleP1.radian) * _radius));
			_circleP2.draw(new Point(startP.x + Math.cos(_circleP2.radian) * _radius, startP.y + Math.sin(_circleP2.radian) * _radius));

			draw();
		}

		public function draw():void
		{
			this.graphics.clear();
			this.graphics.lineStyle(3, 0x008000);
			this.graphics.drawCircle(startP.x, startP.y, _radius);

			this.graphics.moveTo(startP.x, startP.y);
			this.graphics.lineTo(_circleP1.point.x, _circleP1.point.y);

			this.graphics.moveTo(startP.x, startP.y);
			this.graphics.lineTo(_circleP2.point.x, _circleP2.point.y);
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