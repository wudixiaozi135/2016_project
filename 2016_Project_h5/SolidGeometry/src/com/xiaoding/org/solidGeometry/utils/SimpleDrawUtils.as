/**
 * Created by Administrator on 2015/11/3.
 */
package com.xiaoding.org.solidGeometry.utils
{
	import flash.display.Graphics;
	import flash.geom.Point;

	public class SimpleDrawUtils
	{
		public static function drawLine(graphics:Graphics, startP:Point, endP:Point):void
		{
			graphics.lineStyle(2, 0x0);
			graphics.moveTo(startP.x, startP.y);
			graphics.lineTo(endP.x, endP.y);
		}

		public static function drawDashed(graphics:Graphics, p1:Point, p2:Point, length:Number = 5, gap:Number = 5):void
		{
			var max:Number = Point.distance(p1, p2);
			var l:Number = 0;
			var p3:Point;
			var p4:Point;
			while (l < max)
			{
				p3 = Point.interpolate(p2, p1, l / max);
				l += length;
				if (l > max)l = max
				p4 = Point.interpolate(p2, p1, l / max);
				graphics.moveTo(p3.x, p3.y)
				graphics.lineTo(p4.x, p4.y)
				l += gap;
			}
		}

		/*
		 * @param type 1 上弦 2下弦 3满弦
		 * @param isDashed 是否虚线
		 * 绘制一条弧线
		 * */
		public static function drawArc(graphics:Graphics, x:Number, y:Number, width:Number = 100, height:Number = 50, type:int = 1, isDashed:Boolean = false):void
		{
			var i:Number = 0, x1:Number = 0, y1:Number = 0;
			var count:int = 0;
			var range:Number = 0;
			var PI:Number = 0;
			if (type == 3)
			{
				range = 2 * Math.PI;
				PI = Math.PI;
			} else
			{
				PI = 2 * Math.PI;
				range = Math.PI;
			}

			while (true)
			{
				i += (2 / 180 * Math.PI);
				x1 = x + width * Math.cos(i);
				if (type == 1)
				{
					y1 = y + height * Math.sin(PI - i);
				} else
				{
					y1 = y + height * Math.sin(i);
				}
				if (isDashed)
				{
					if (count++ & 2)
					{
						graphics.lineTo(x1, y1);
					} else
					{
						graphics.moveTo(x1, y1);
					}
				} else
				{
					if (count == 0)
					{
						graphics.moveTo(x1, y1);
						count++;
					} else
					{
						graphics.lineTo(x1, y1);
					}
				}
				if (i >= range)
				{
					break;
				}
			}
		}
	}
}
