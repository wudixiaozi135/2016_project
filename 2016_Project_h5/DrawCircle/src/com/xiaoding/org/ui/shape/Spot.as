/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape
{
	import flash.geom.Point;

	import org.flexlite.domUI.core.UIComponent;

	public class Spot extends UIComponent
	{
		public var point:Point = new Point();

		private var _radian:Number;

		public function Spot()
		{
			super();
		}

		public function draw(point:Point, radius:Number = 4):void
		{
			this.graphics.clear();
			this.graphics.beginFill(0xff0000);
			this.graphics.lineStyle(1, 0);
			this.graphics.drawCircle(point.x, point.y, radius);
			this.graphics.endFill();
			this.point.setTo(point.x, point.y);
		}

		public function get radian():Number
		{
			return _radian;
		}

		public function set radian(value:Number):void
		{
			_radian = value;
		}
	}
}
