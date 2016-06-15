/**
 * Created by Administrator on 2015/10/27.
 */
package com.xiaoding.org.mathFormula.ui.component
{
	import flash.geom.Point;
	import flash.utils.Dictionary;

	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.components.Label;
	import org.flexlite.domUI.core.UIComponent;

	//自定义数学直角坐标轴
	public class CoordinateAxis extends Group
	{
		public static const X_axis:int = 1;
		public static const Y_axis:int = 2;

		private var _style:int;
		private var _scale:int;
		private var _originP:Point;
		private var _total:int;

		//单位标量基数
		private var _uintScale:int;

		//用于画线的笔
		private var _linePen:UIComponent;
		//箭头
		private var _arrow:UIComponent;

		private var _axisLetter:Label;

		//对象池,存正坐标
		private var _positiveScalarPool:Dictionary;

		//对象池,存负坐标
		private var _negativeScalarPool:Dictionary;

		//对象池大小
		public static const OBJ_POOL_SIZE:int = 50;


		//x正半轴
		private var _positiveHalfXAxis:Number;
		//x负半轴
		private var _negativeHalfXAxis:Number;

		public function CoordinateAxis(style:int, scale:int, originP:Point, total:int, uintScale:int = 1)
		{
			super();
			mouseEnabled = false;

			_style = style;
			_scale = scale;
			_originP = originP;
			_total = total;
			_uintScale = uintScale;
			_positiveScalarPool = new Dictionary(true);
			_negativeScalarPool = new Dictionary(true);
		}

		override protected function createChildren():void
		{
			super.createChildren();

			_linePen = new UIComponent();
			_linePen.mouseChildren = false;
			_linePen.mouseEnabled = false;
			addElement(_linePen);

			_arrow = new UIComponent();
			_arrow.mouseEnabled = false;
			_arrow.mouseChildren = false;
			addElement(_arrow);

			_axisLetter = new Label();
			_axisLetter.mouseEnabled = false;
			_axisLetter.mouseChildren = false;
			_axisLetter.selectable = false;
			addElement(_axisLetter);
			_axisLetter.size = 20;
			_axisLetter.textColor = 0x0;

			update();
		}

		public function update():void
		{
			var scalar:ScalarShape;
			if (_positiveScalarPool)
			{
				for each(scalar in _positiveScalarPool)
				{
					scalar.hide();
				}
			}

			if (_negativeScalarPool)
			{
				for each(scalar in _negativeScalarPool)
				{
					scalar.hide();
				}
			}

			var half:int = 0;
			var i:int = 0;
			_linePen.graphics.clear();
			_linePen.graphics.lineStyle(2, 0xff);
			if (_style == X_axis)
			{
				half = _total - _originP.x;
				_linePen.graphics.moveTo(0, _originP.y);
				_linePen.graphics.lineTo(_total, _originP.y);

				drawArrow(_arrow);
				_arrow.x = _total;
				_arrow.y = _originP.y;

				_axisLetter.x = _total - 10;
				_axisLetter.y = _originP.y - 30;
				_axisLetter.text = "x";

			} else if (_style == Y_axis)
			{
				half = _originP.y;
				_linePen.graphics.moveTo(_originP.x, 5);
				_linePen.graphics.lineTo(_originP.x, _total);

				drawArrow(_arrow, -90);
				_arrow.x = _originP.x;
				_arrow.y = 5;

				_axisLetter.x = _originP.x + 10;
				_axisLetter.y = 0;
				_axisLetter.text = "y";
			}
			half = half / scale;

			if (_style == X_axis)
			{
				_positiveHalfXAxis = half;
			}


			for (i = 1; i <= half; i++)
			{
				scalar = _positiveScalarPool[i % OBJ_POOL_SIZE];
				if (!scalar)
				{
					scalar = new ScalarShape(i, _style);
					_positiveScalarPool[i % OBJ_POOL_SIZE] = scalar;
					addElement(scalar);
				}
				scalar.value = i * uintScale;
				scalar.show();
				if (_style == X_axis)
				{
					scalar.x = _originP.x + i * _scale;
					scalar.y = _originP.y;
				} else if (_style == Y_axis)
				{
					scalar.x = _originP.x;
					scalar.y = _originP.y - i * _scale;
				}
			}

			if (_style == X_axis)
			{
				half = _originP.x;
			} else if (_style == Y_axis)
			{
				half = total - _originP.y;
			}
			half = half / scale;

			if (_style == X_axis)
			{
				_negativeHalfXAxis = half;
			}

			for (i = 1; i <= half; i++)
			{
				scalar = _negativeScalarPool[i % OBJ_POOL_SIZE];
				if (!scalar)
				{
					scalar = new ScalarShape(-i, _style);
					_negativeScalarPool[i % OBJ_POOL_SIZE] = scalar;
					addElement(scalar);
				}
				scalar.value = -i * uintScale;
				scalar.show();
				if (_style == X_axis)
				{
					scalar.x = _originP.x - i * _scale;
					scalar.y = _originP.y;
				} else if (_style == Y_axis)
				{
					scalar.x = _originP.x;
					scalar.y = _originP.y + i * _scale;
				}
			}
		}

		private function drawArrow(g:UIComponent, rotate:Number = 0):void
		{
			with (g)
			{
				graphics.clear();
				graphics.beginFill(0xff);
				graphics.moveTo(0, 0);
				graphics.lineTo(-5, -8);
				graphics.lineTo(5, 0);
				graphics.lineTo(-5, 8);
				graphics.lineTo(0, 0);
				graphics.endFill();
				rotation = rotate;
			}
		}

		public function get positiveHalfXAxis():Number
		{
			return _positiveHalfXAxis;
		}

		public function set positiveHalfXAxis(value:Number):void
		{
			if (_positiveHalfXAxis != value)
			{
				_positiveHalfXAxis = value;
			}
		}

		public function get negativeHalfXAxis():Number
		{
			return _negativeHalfXAxis;
		}

		public function set negativeHalfXAxis(value:Number):void
		{
			if (_negativeHalfXAxis != value)
			{
				_negativeHalfXAxis = value;
			}
		}

		public function get scale():int
		{
			return _scale;
		}

		public function set scale(value:int):void
		{
			if (value != _scale)
			{
				_scale = value;
				update();
			}
		}

		public function get originP():Point
		{
			return _originP;
		}

		public function set originP(value:Point):void
		{
			if (!_originP.equals(value))
			{
				_originP = value;
				update();
			}
		}

		public function get total():int
		{
			return _total;
		}

		public function set total(value:int):void
		{
			if (_total != value)
			{
				_total = value;
				update();
			}
		}


		public function get uintScale():int
		{
			return _uintScale;
		}

		public function set uintScale(value:int):void
		{
			if (_uintScale != value)
			{
				_uintScale = value;
				update();
			}
		}

		public function destroy():void
		{
			removeAllElements();
			_arrow = null;
			_linePen = null;
			_originP = null;
			var item:ScalarShape;
			if (_positiveScalarPool)
			{
				for each(item in _positiveScalarPool)
				{
					item.destroy();
					item = null;
				}
				_positiveScalarPool = null;
			}
			if (_negativeScalarPool)
			{
				for each(item in _negativeScalarPool)
				{
					item.destroy();
					item = null;
				}
				_negativeScalarPool = null;
			}
		}
	}
}

import org.flexlite.domUI.components.Group;
import org.flexlite.domUI.components.Label;
import org.flexlite.domUI.core.UIComponent;

class ScalarShape extends Group
{
	public static const Horizon:int = 1;
	public static const Vertical:int = 2;

	private var _align:int;
	private var _value:int;

	private var _label:Label;
	private var _pen:UIComponent;

	public function ScalarShape(value:int = 0, align:int = Horizon)
	{
		_align = align;
		_value = value;
		mouseEnabled = false;
		mouseChildren = false;
	}


	public function get value():int
	{
		return _value;
	}

	public function set value(value:int):void
	{
		_value = value;
		_label.text = _value.toString();
		validateNow();

		if (_align == Horizon)
		{
			_label.x = -(_label.width - 1) * .5;
			_label.y = 10;
		} else if (_align == Vertical)
		{
			_label.x = -_label.width - 5;
			_label.y = -(_label.height - 1) * .5;
		}
	}

	override protected function createChildren():void
	{
		super.createChildren();

		_pen = new UIComponent();
		_pen.mouseChildren = false;
		_pen.mouseEnabled = false;
		addElement(_pen);

		_label = new Label();
		_label.mouseChildren = false;
		_label.mouseEnabled = false;
		_label.selectable = false;
		_label.textColor = 0;
		_label.size = 12;
		addElement(_label);
		_label.text = _value.toString();

		if (_align == Horizon)
		{
			_pen.graphics.lineStyle(1, 0xff);
			_pen.graphics.moveTo(0, -5);
			_pen.graphics.lineTo(0, 5);
			_pen.graphics.endFill();
		} else if (_align == Vertical)
		{
			_pen.graphics.lineStyle(1, 0xff);
			_pen.graphics.moveTo(-5, 0);
			_pen.graphics.lineTo(5, 0);
			_pen.graphics.endFill();
		}
		validateNow();

		if (_align == Horizon)
		{
			_label.x = -(_label.width - 1) * .5;
			_label.y = 10;
		} else if (_align == Vertical)
		{
			_label.x = -_label.width - 5;
			_label.y = -(_label.height - 1) * .5;
		}
	}

	public function hide():void
	{
		visible = false;
		x = y = 0;
	}

	public function show():void
	{
		visible = true;
	}

	public function destroy():void
	{
		removeAllElements();
		_label = null;
		_pen = null;
	}
}