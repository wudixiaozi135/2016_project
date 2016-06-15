/**
 * Created by Administrator on 2015/11/2.
 */
package com.xiaoding.org.solidGeometry.ui.shapes
{
	import com.xiaoding.org.solidGeometry.ui.shapes.base.ShapeBase;
	import com.xiaoding.org.solidGeometry.utils.SimpleDrawUtils;

	import flash.display.Graphics;
	import flash.geom.Point;
	import flash.geom.Rectangle;

	import org.flexlite.domUI.components.Rect;
	import org.flexlite.domUI.core.UIComponent;

	public class PrismShape extends ShapeBase
	{
		private var LIMIT_VALUE:int = 20;
		private var _offW:int = 40;
		private var _offH:int = 20;

		private var _startP:Point;
		private var _endP:Point;

		private var _a1:Point;
		private var _b1:Point;
		private var _c1:Point;

		private var _a2:Point;
		private var _b2:Point;
		private var _c2:Point;

		private var _vA1:Vertex;
		private var _vB1:Vertex;
		private var _vC1:Vertex;

		private var _vA2:Vertex;
		private var _vB2:Vertex;
		private var _vC2:Vertex;

		private var _clickArea:Rect;

		private var _pen:UIComponent;

		public function PrismShape()
		{
			super();
			_a1 = new Point();
			_b1 = new Point();
			_c1 = new Point();
			_a2 = new Point();
			_b2 = new Point();
			_c2 = new Point();
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

			_vA1 = new Vertex(_a1);
			addElement(_vA1);

			_vA2 = new Vertex(_a2);
			addElement(_vA2);

			_vB1 = new Vertex(_b1);
			addElement(_vB1);

			_vB2 = new Vertex(_b2);
			addElement(_vB2);

			_vC1 = new Vertex(_c1);
			addElement(_vC1);

			_vC2 = new Vertex(_c2);
			addElement(_vC2);

			_pen = new UIComponent();
			_pen.mouseChildren = false;
			_pen.mouseChildren = false;
			addElement(_pen);
		}

		public function startP(p:Point):void
		{
			this._startP = p;
			_a1.x = p.x;
			_a1.y = p.y;
		}

		public function update(endP:Point):void
		{
			_endP = endP;
			var offP:Point = _endP.subtract(_startP);
			if (offP.x <= LIMIT_VALUE || offP.y <= LIMIT_VALUE)
			{
				return;
			}
			_offW = (offP.x / _offW) * _offW;
			_offH = (offP.y / _offH) * _offH;
			_offH = _offW * .5;
			_offW = 2 * _offH;

			_b1.x = _a1.x + offP.x + _offW;
			_b1.y = _a1.y;

			_c1.x = _b1.x - _offW;
			_c1.y = _b1.y + _offH;

			_a2.x = _a1.x;
			_a2.y = _a1.y + offP.y - _offH;

			_b2.x = _b1.x;
			_b2.y = _a2.y;

			_c2.x = _c1.x;
			_c2.y = endP.y;


			updateVertex();

			var bounds:Rectangle = _pen.getBounds(stage);
			_clickArea.width = bounds.width;
			_clickArea.height = bounds.height;
			_clickArea.x = bounds.x;
			_clickArea.y = bounds.y;
		}

		private function updateVertex():void
		{
			_vA1.updatePosition(_a1);
			_vA2.updatePosition(_a2);

			_vB1.updatePosition(_b1);
			_vB2.updatePosition(_b2);

			_vC1.updatePosition(_c1);
			_vC2.updatePosition(_c2);


			var graphics:Graphics = _pen.graphics;
			graphics.clear();

			if (_c2.y < _c1.y)
			{
				//顶视面
				SimpleDrawUtils.drawLine(graphics, _a2, _b2);
				SimpleDrawUtils.drawLine(graphics, _b1, _c1);
				SimpleDrawUtils.drawLine(graphics, _c1, _a1);

				//底视面
				SimpleDrawUtils.drawLine(graphics, _b2, _c2);
				SimpleDrawUtils.drawLine(graphics, _c2, _a2);

				//正视面
				SimpleDrawUtils.drawLine(graphics, _a1, _a2);
				SimpleDrawUtils.drawLine(graphics, _b1, _b2);
				SimpleDrawUtils.drawLine(graphics, _c1, _c2);

				//虚线
				SimpleDrawUtils.drawDashed(graphics, _a1, _b1);
			} else
			{
				//顶视面
				SimpleDrawUtils.drawLine(graphics, _a1, _b1);
				SimpleDrawUtils.drawLine(graphics, _b1, _c1);
				SimpleDrawUtils.drawLine(graphics, _c1, _a1);

				//底视面
				SimpleDrawUtils.drawLine(graphics, _b2, _c2);
				SimpleDrawUtils.drawLine(graphics, _c2, _a2);

				//正视面
				SimpleDrawUtils.drawLine(graphics, _a1, _a2);
				SimpleDrawUtils.drawLine(graphics, _b1, _b2);
				SimpleDrawUtils.drawLine(graphics, _c1, _c2);

				//虚线
				SimpleDrawUtils.drawDashed(graphics, _a2, _b2);
			}
		}
	}
}
