/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape
{
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xuele.xiaoding.org.utils.MathTool;

	import flash.events.MouseEvent;
	import flash.geom.Point;

	/*
	 * 圆周角
	 * */
	public class CircumAngle extends ShapeBase
	{
		private var _radius:Number = 0;

		private var _selectObj:Object;

		private var _circleP1:Spot;
		private var _circleP2:Spot;

		// 圆周角的顶点
		private var _circleP3:Spot;

		public function CircumAngle()
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
			_circleP1.radian = Math.PI / 2;

			_circleP2 = new Spot();
			_circleP2.radian = -Math.PI / 2;
			addElement(_circleP2);

			_circleP3 = new Spot();
			_circleP3.radian = 0;
			addElement(_circleP3);

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
				} else if (_selectObj == _circleP3)
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

			_circleP3.draw(new Point(startP.x + Math.cos(_circleP3.radian) * _radius, startP.y + Math.sin(_circleP3.radian) * _radius));
			_circleP1.draw(new Point(startP.x + Math.cos(_circleP1.radian) * _radius, startP.y + Math.sin(_circleP1.radian) * _radius));
			_circleP2.draw(new Point(startP.x + Math.cos(_circleP2.radian) * _radius, startP.y + Math.sin(_circleP2.radian) * _radius));

			draw();
		}

		public function draw():void
		{
			this.graphics.clear();
			this.graphics.lineStyle(3, 0x008000);
			this.graphics.drawCircle(startP.x, startP.y, _radius);

			this.graphics.moveTo(_circleP3.point.x, _circleP3.point.y);
			this.graphics.lineTo(_circleP1.point.x, _circleP1.point.y);

			this.graphics.moveTo(_circleP3.point.x, _circleP3.point.y);
			this.graphics.lineTo(_circleP2.point.x, _circleP2.point.y);

			this.graphics.endFill();
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