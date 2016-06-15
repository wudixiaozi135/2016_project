/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.constants
{
	import com.xiaoding.org.ui.shape.interf.IShapeBase;

	import flash.geom.Point;

	public class GlobalDatasDrawCircle
	{
		//鼠标动作 1画圆 2画线
		public static var action:int;

		/*
		 * 线段颜色
		 * */
		public static const LINE_COLOR:uint = 0x008000;

		/*
		 * 线条粗细
		 * */
		public static const LINE_SIZE:int = 3;


		public static const MAGIC_LINE_SIZE:int = 5;
		public static const MAGIC_LINE_COLOR:int = 0xff0000;

		public static const NORMAL_SIZE:int = 1;
		public static const NORMAL_COLOR:uint = 0x0;
		public static const NORMAL_RADIUS:Number = 4;
		/*
		 * 检测精度
		 * */
		public static const PRECISE:Number = 5;

		/*
		 * 是否按下shift
		 * */
		public static var isKeyShift:Boolean = false;

		/*
		 * 两图形的相交点
		 * */
		public static var crossPoint:Point;

		public static var crossShape:IShapeBase;

	}
}
