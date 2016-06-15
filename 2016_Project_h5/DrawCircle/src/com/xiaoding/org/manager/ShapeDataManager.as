/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.manager
{
	import com.xiaoding.org.constants.GameEventConstants;
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xiaoding.org.ui.shape.interf.IShapeBase;
	import com.xuele.xiaoding.org.event.GameDispatcher;
	import com.xuele.xiaoding.org.event.GameEvent;

	import flash.geom.Point;
	import flash.utils.Dictionary;

	/*
	 * 图形数据管理器
	 * */
	public class ShapeDataManager
	{
		private var _shapes:Vector.<IShapeBase>;


		//存放由线条构成的复杂图形
		private var _complexLineShapeDic:Dictionary;

		public function ShapeDataManager()
		{
			_complexLineShapeDic = new Dictionary(true);
			_shapes = new <IShapeBase>[];
			addEvent();
		}

		public function addCompleShape(value:IShapeBase):void
		{
			if (!_complexLineShapeDic[value])
			{
				_complexLineShapeDic[value] = [];
			}
			_complexLineShapeDic[value].push(value);
		}

		/*
		 * @param  source 源
		 * @param target 目标
		 * */
		public function checkCombine(source:IShapeBase, target:IShapeBase):void
		{
			for each (var shapes:Array in _complexLineShapeDic)
			{
				for (var i:int = 0, len:int = shapes.length; i < len; i++)
				{
					var element:IShapeBase = shapes[i];
					if (element == target)
					{
						shapes.push(source);
					}
				}
			}
		}

		public function get shapes():Vector.<IShapeBase>
		{
			return _shapes;
		}

		private function addEvent():void
		{
			GameDispatcher.addEventListener(GameEventConstants.CHECK_COLLISION, checkCollision, false, 0, true);
		}

		private function checkCollision(event:GameEvent):void
		{

			var collisionPoint:Point = event.param.point;
			if (collisionPoint)
			{
				var element:IShapeBase;
				var isHas:Boolean;

				_shapes.forEach(function (item:IShapeBase, index:int, vec:Vector.<IShapeBase>):void
				{
					item.resetMagicDraw();
				});

				GlobalDatasDrawCircle.crossPoint = null;
				GlobalDatasDrawCircle.crossShape = null;

				for (var i:int = _shapes.length - 1; i >= 0; i--)
				{
					element = _shapes[i];
					if (element.startCheck)
					{
						isHas = element.checkCollision(collisionPoint);
						if (isHas)
						{
							GlobalDatasDrawCircle.crossPoint = element.crossPoint.clone();
							GlobalDatasDrawCircle.crossShape = element;
							break;
						}
					}
				}
			}
		}

		public function getCrossPoint(point:Point):Object
		{
			var collisionPoint:Point = point;
			if (collisionPoint)
			{
				var element:IShapeBase;
				for (var i:int = _shapes.length - 1; i >= 0; i--)
				{
					element = _shapes[i];
					if (element.checkCollision(collisionPoint))
					{
						break;
					}
				}
				if (!element || !element.crossPoint)
				{
					return null;
				}
				return {crossPoint: element.crossPoint, crossNode: element};
			}
			return null;
		}


		public function addShape(shape:IShapeBase):void
		{
			_shapes.push(shape);
		}

		public function removeShape(shape:IShapeBase):void
		{

			var numChildren:int = _shapes.length;
			while (numChildren > 0)
			{
				if (_shapes[numChildren] == shape)
				{
					_shapes.splice(numChildren, 1);
					shape.destroy();
					shape = null;
					break;
				}
				numChildren--;
			}
		}

		/*
		 * 返回是否存在图形元素
		 * */
		public function get isHasElement():Boolean
		{
			return _shapes && _shapes.length;
		}

		private static var _instance:ShapeDataManager = null;

		public static function get getInstance():ShapeDataManager
		{
			if (_instance == null)
			{
				_instance = new ShapeDataManager();
			}
			return _instance;
		}
	}
}
