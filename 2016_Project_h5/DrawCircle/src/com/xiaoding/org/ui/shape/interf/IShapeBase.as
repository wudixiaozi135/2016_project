/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape.interf
{
	import com.xiaoding.org.ui.shape.Spot;

	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.Dictionary;

	/*
	 * 图形接口
	 * */
	public interface IShapeBase
	{
		function get mapParent():Dictionary;

		function get mapSon():Dictionary;

		function moveTo(point:Point):void;

		function startTo(point:Point):void;

		function simpleMoveTo(point:Point, type:int = 1):void;

		function set startP(value:Point):void;

		function get startP():Point;

		function set endP(value:Point):void;

		function get endP():Point;

		function set endSpot(value:Spot):void;

		function get endSpot():Spot;

		function set startSpot(value:Spot):void;

		function get startSpot():Spot;

		function addChildNode(son:IShapeBase, node:Point, type:int = 1):void;

		function containPoint(point:Point):Boolean;

		function addEvent():void;

		function removeEvent():void;

		function magicDraw():void;

		/*
		 * 如果checkP点接近方程式，则获得方程式上的点
		 * */
		function getEquationPoint(startP:Point, endP:Point, checkP:Point):Point;


		function checkCollision(collisionPoint:Point):Boolean;

		function set startCheck(value:Boolean):void;

		function get startCheck():Boolean;

		function resetMagicDraw():void;

		function set crossPoint(value:Point):void;

		function get crossPoint():Point;

		function addSonNode(value:IShapeBase):void;

		function removeSonNode(value:IShapeBase):void;

		function get sonNodes():Vector.<IShapeBase>;

		function set parentEndNode(value:IShapeBase):void;

		function get parentEndNode():IShapeBase;

		function set parentStartNode(value:IShapeBase):void;

		function get parentStartNode():IShapeBase;

		function set parentEndScale(value:Number):void;

		function get parentEndScale():Number;

		function set parentStartScale(value:Number):void;

		function get parentStartScale():Number;

		function limitRange(parentStartP:Point, parentEndP:Point, point:Point):Point

		//点在图形内
		function pointInShapeInner(point:Point):Boolean;

		function stopDrag():void;

		function startDrag(lockCenter:Boolean = false, bounds:Rectangle = null):void;

		function set x(value:Number):void

		function set y(value:Number):void;

		function get x():Number;

		function get y():Number;

		function addMapParent(key:IShapeBase, value:IShapeBase):void;

		function addMapSon(key:IShapeBase, value:IShapeBase):void;

		function containValue(vector:Vector.<IShapeBase>, value:IShapeBase):Boolean;

		function destroy():void;
	}
}
