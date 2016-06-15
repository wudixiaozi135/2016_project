/**
 * Created by Administrator on 2015/11/3.
 */
package com.xiaoding.org.solidGeometry.ui.shapes
{
	import com.xiaoding.org.solidGeometry.ui.shapes.base.ShapeBase;
	import com.xiaoding.org.solidGeometry.utils.SimpleDrawUtils;

	import flash.geom.Point;
	import flash.geom.Rectangle;

	import org.flexlite.domUI.components.Rect;
	import org.flexlite.domUI.core.UIComponent;

	public class SphereShape extends ShapeBase
	{
		private var _pen:UIComponent;

		private var _arcHeight:int = 50;

		private var _startP:Point;
		private var _endP:Point;

		private var _radius:Number = 0;
		private var _clickArea:Rect;

		public function SphereShape()
		{
			super();
		}

		override protected function createChildren():void
		{
			super.createChildren();

			_clickArea = new Rect();
			_clickArea.mouseChildren = false;
			_clickArea.mouseEnabled = false;
			_clickArea.fillColor = 0;
			_clickArea.fillAlpha = 0;
			addElement(_clickArea);

			_pen = new UIComponent();
			_pen.mouseChildren = false;
			_pen.mouseEnabled = false;
			addElement(_pen);
		}

		public function startP(point:Point):void
		{
			_startP = point;
		}

		public function update(point:Point):void
		{
			if (!_pen) return;

			_endP = point;

			var offP:Point = _endP.subtract(_startP);
			_radius = offP.x;

			_pen.graphics.clear();
			_pen.graphics.lineStyle(2, 0);

			_pen.graphics.drawCircle(_startP.x, _startP.y, _radius);
			SimpleDrawUtils.drawArc(_pen.graphics, _startP.x, _startP.y, _radius, _radius >> 2, 3, true);

			var bounds:Rectangle = _pen.getBounds(stage);
			_clickArea.width = bounds.width;
			_clickArea.height = bounds.height;
			_clickArea.x = bounds.x;
			_clickArea.y = bounds.y;
		}
	}
}
