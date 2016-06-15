/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui.shape
{
	import com.xiaoding.org.ui.shape.interf.IShapeBase;

	import flash.geom.Point;
	import flash.utils.Dictionary;

	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.core.UIComponent;

	public class ShapeBase extends Group implements IShapeBase
	{
		protected var magicPen:UIComponent;
		protected var pen:UIComponent;//画笔

		protected var collisionPoint:Point;
		protected var _childNodes:Vector.<Point>;

		//点在图形上
		public var pointInShape:Boolean;

		private var _startCheck:Boolean;

		private var _crossPoint:Point;

		private var _endSpot:Spot;
		private var _startSpot:Spot;

		private var _parentEndNode:IShapeBase;
		private var _parentStartNode:IShapeBase;

		private var _parentEndScale:Number;
		private var _parentStartScale:Number;


		private var _startP:Point;
		private var _endP:Point;

		private var _sonNodes:Vector.<IShapeBase>;


		private var _mapParent:Dictionary = new Dictionary(true);
		private var _mapSon:Dictionary = new Dictionary(true);

		public function ShapeBase()
		{
			super();
			_childNodes = new <Point>[];
			_sonNodes = new <IShapeBase>[];
		}

		override protected function createChildren():void
		{
			super.createChildren();

			pen = new UIComponent();
			pen.mouseChildren = false;
			pen.mouseEnabled = false;
			addElement(pen);

			magicPen = new UIComponent();
			magicPen.mouseChildren = false;
			magicPen.mouseEnabled = false;
			addElement(magicPen);
		}

		public function magicDraw():void
		{
		}

		public function getEquationPoint(startP:Point, endP:Point, checkP:Point):Point
		{
			return null;
		}

		public function containPoint(point:Point):Boolean
		{
			return false;
		}

		public function addEvent():void
		{
			removeEvent();
		}

		public function removeEvent():void
		{
		}

		public function destroy():void
		{
		}

		public function checkCollision(collisionPoint:Point):Boolean
		{
			return false;
		}

		public function set startCheck(value:Boolean):void
		{
			_startCheck = value;
		}

		public function get startCheck():Boolean
		{
			return _startCheck;
		}

		public function resetMagicDraw():void
		{
			magicPen && magicPen.graphics.clear();
		}

		public function set crossPoint(value:Point):void
		{
			_crossPoint = value;
		}

		public function get crossPoint():Point
		{
			return _crossPoint;
		}


		public function addMapParent(key:IShapeBase, value:IShapeBase):void
		{
			if (!_mapParent[key])
			{
				_mapParent[key] = new Vector.<IShapeBase>();
			}

			if (containValue(_mapParent[key], value))
			{
				return;
			}
			_mapParent[key].push(value);
		}

		public function addMapSon(key:IShapeBase, value:IShapeBase):void
		{
			if (!_mapSon[key])
			{
				_mapSon[key] = new Vector.<IShapeBase>();
			}

			if (containValue(_mapSon[key], value))
			{
				return;
			}
			_mapSon[key].push(value);
		}

		public function containValue(vector:Vector.<IShapeBase>, value:IShapeBase):Boolean
		{
			if (!vector || vector.length < 1) return false;

			return vector.lastIndexOf(value) != -1;
		}

		/*
		 * 添加子节点
		 * type 1开始点 节点 2结束点 节点
		 * */
		public function addChildNode(parent:IShapeBase, node:Point, type:int = 1):void
		{
			addMapParent(this, parent);
			parent.addMapParent(parent, this);

			var scale:Number;
			var diffP:Point = parent.endP.subtract(parent.startP);
			var sP:Point, eP:Point;
			if (Math.abs(diffP.x) >= Math.abs(diffP.y))//偏水平
			{
				if (diffP.x >= 0)
				{
					sP = parent.startP;
					eP = parent.endP;
				} else
				{
					sP = parent.endP;
					eP = parent.startP;
				}

				if (type == 1)
				{
					scale = (startP.x - sP.x) / (eP.x - sP.x);
				} else
				{
					scale = (endP.x - sP.x) / (eP.x - sP.x);
				}
			} else//偏垂直
			{
				diffP.y >= 0 ? eP = parent.startP : eP = parent.endP;
				if (diffP.y >= 0)
				{
					sP = parent.startP;
					eP = parent.endP;
				} else
				{
					sP = parent.endP;
					eP = parent.startP;
				}

				if (type == 1)
				{
					scale = (startP.y - sP.y) / (eP.y - sP.y);
				} else
				{
					scale = (endP.y - sP.y) / (eP.y - sP.y);
				}
			}

			if (type == 1)
			{
				parentStartNode = parent;
				parentStartScale = scale;
			} else if (type == 2)
			{
				parentEndNode = parent;
				parentEndScale = scale;
			}
			parent.addSonNode(this);
		}

		public function set endSpot(value:Spot):void
		{
			_endSpot = value;
		}

		public function get endSpot():Spot
		{
			return _endSpot;
		}

		public function set startSpot(value:Spot):void
		{
			_startSpot = value;
		}

		public function get startSpot():Spot
		{
			return _startSpot;
		}

		public function set startP(value:Point):void
		{
			_startP = value;
		}

		public function get startP():Point
		{
			return _startP;
		}

		public function set endP(value:Point):void
		{
			_endP = value;
		}

		public function get endP():Point
		{
			return _endP;
		}

		public function set parentStartNode(value:IShapeBase):void
		{
			_parentStartNode = value;
		}

		public function get parentStartNode():IShapeBase
		{
			return _parentStartNode;
		}

		public function set parentEndNode(value:IShapeBase):void
		{
			_parentEndNode = value;
		}

		public function get parentEndNode():IShapeBase
		{
			return _parentEndNode;
		}

		public function addSonNode(value:IShapeBase):void
		{
			_sonNodes && _sonNodes.push(value);
		}

		public function removeSonNode(value:IShapeBase):void
		{
			if (_sonNodes)
			{
				var position:int = _sonNodes.lastIndexOf(value);
				if (position > -1)
				{
					_sonNodes.splice(position, 1);
				}
			}
		}

		public function get sonNodes():Vector.<IShapeBase>
		{
			return _sonNodes;
		}

		public function moveTo(point:Point):void
		{
		}

		public function startTo(point:Point):void
		{
		}

		public function simpleMoveTo(point:Point, type:int = 1):void
		{
		}

		public function set parentEndScale(value:Number):void
		{
			_parentEndScale = value;
		}

		public function get parentEndScale():Number
		{
			return _parentEndScale;
		}

		public function set parentStartScale(value:Number):void
		{
			_parentStartScale = value;
		}

		public function get parentStartScale():Number
		{
			return _parentStartScale;
		}

		public function limitRange(parentStartP:Point, parentEndP:Point, point:Point):Point
		{
			return point;
		}

		public function pointInShapeInner(point:Point):Boolean
		{
			return false;
		}

		public function get mapParent():Dictionary
		{
			return _mapParent;
		}

		public function get mapSon():Dictionary
		{
			return _mapSon;
		}
	}
}
