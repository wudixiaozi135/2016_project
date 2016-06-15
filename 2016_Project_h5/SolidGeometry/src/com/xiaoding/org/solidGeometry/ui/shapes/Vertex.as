/**
 * Created by Administrator on 2015/11/2.
 */
package com.xiaoding.org.solidGeometry.ui.shapes
{
	import flash.geom.Point;

	import org.flexlite.domUI.core.UIComponent;

	//顶点类
	public class Vertex extends UIComponent
	{
		private var _point:Point;

		public function Vertex(p:Point)
		{
			super();
			_point = p;
		}

		override protected function createChildren():void
		{
			super.createChildren();
			graphics.clear();
			graphics.lineStyle(1, 0x0);
			graphics.beginFill(0x0);
			graphics.drawCircle(_point.x, _point.y, 4);
			graphics.endFill();
			//顶点类
			graphics.clear();//暂时去掉


		}

		public function get point():Point
		{
			return _point;
		}

		public function updatePosition(p:Point):void
		{
			_point.x = p.x;
			_point.y = p.y;
			x = p.x;
			y = p.y;
		}
	}
}
