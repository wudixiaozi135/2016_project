/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui
{
	import com.xiaoding.org.constants.DrawCommand;
	import com.xiaoding.org.constants.GameEventConstants;
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xiaoding.org.manager.ShapeDataManager;
	import com.xiaoding.org.ui.shape.CentreAngle;
	import com.xiaoding.org.ui.shape.CircleShape;
	import com.xiaoding.org.ui.shape.CircumAngle;
	import com.xiaoding.org.ui.shape.LineShape;
	import com.xiaoding.org.ui.shape.interf.IShapeBase;
	import com.xuele.xiaoding.org.event.GameDispatcher;
	import com.xuele.xiaoding.org.event.GameEvent;

	import flash.geom.Point;

	import org.flexlite.domUI.components.Group;

	public class ShapeContainerUI extends Group
	{
		private var _circleShape:CircleShape;
		private var _lineShape:LineShape;
		private var _centreAngle:CentreAngle;
		private var _circumAngle:CircumAngle;

		private var _recordP:Point;

		private var _selectObj:IShapeBase;

		//图形容器
		public function ShapeContainerUI()
		{
			super();
			addEvent();
		}

		public function addEvent():void
		{
			removeEvent();
			GameDispatcher.addEventListener(GameEventConstants.DRAW_START, onStartDraw, false, 0, true);
			GameDispatcher.addEventListener(GameEventConstants.DRAW_UPDATE, onUpdateDraw, false, 0, true);
			GameDispatcher.addEventListener(GameEventConstants.DRAW_END, onEndDraw, false, 0, true);
		}

		private function onStartDraw(event:GameEvent):void
		{
			var point:Point = event.param.point;
			if (!point) return;
			var obj:Object;

			if (GlobalDatasDrawCircle.action == DrawCommand.DRAW_CIRCLE)
			{
				_circleShape = new CircleShape();
				addElement(_circleShape);

				obj = ShapeDataManager.getInstance.getCrossPoint(point);
				if (obj)
				{
					_circleShape.startTo(obj.crossPoint);
					_circleShape.addChildNode(obj.crossNode, obj.crossPoint, 1);
				} else
				{
					_circleShape.startTo(point);
				}

			} else if (GlobalDatasDrawCircle.action == DrawCommand.DRAW_LINE)
			{
				_lineShape = new LineShape();
				addElement(_lineShape);


				//这里获得正确方程式上的点，吸附点，
				obj = ShapeDataManager.getInstance.getCrossPoint(point);
				if (obj)
				{
					_lineShape.startTo(obj.crossPoint);
					_lineShape.addChildNode(obj.crossNode, obj.crossPoint, 1);
					ShapeDataManager.getInstance.checkCombine(_lineShape, obj.crossNode);
				} else
				{
					_lineShape.startTo(point);
					ShapeDataManager.getInstance.addCompleShape(_lineShape);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.CENTRE_ANGLE)
			{
				_centreAngle = new CentreAngle();
				addElement(_centreAngle);

				_centreAngle.startTo(point);
			} else if (GlobalDatasDrawCircle.action == DrawCommand.CIRCUM_ANGLE)
			{
				_circumAngle = new CircumAngle();
				addElement(_circumAngle);
				_circumAngle.startTo(point);
			} else if (GlobalDatasDrawCircle.action == DrawCommand.MOVE)
			{
				if (!_recordP)
				{
					_recordP = point.clone();
					selectTargetStartDrag(_recordP);
				}
			}
		}

		private function onUpdateDraw(event:GameEvent):void
		{
			var point:Point = event.param.point;
			if (!point) return;

			if (GlobalDatasDrawCircle.action == DrawCommand.DRAW_CIRCLE)
			{
				if (_circleShape)
				{
					_circleShape.moveTo(point);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.DRAW_LINE)
			{
				if (_lineShape)
				{
					_lineShape.moveTo(point);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.CENTRE_ANGLE)
			{
				if (_centreAngle)
				{
					_centreAngle.moveTo(point);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.CIRCUM_ANGLE)
			{
				if (_circumAngle)
				{
					_circumAngle.moveTo(point);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.MOVE)
			{
				if (_selectObj && _recordP)
				{
					var diffP:Point = point.subtract(_recordP);
					_recordP.setTo(point.x, point.y);
				}
			}
		}

		/*
		 * 根据点选择点来拖动
		 * */
		private function selectTargetStartDrag(point:Point):void
		{
			var shapes:Vector.<IShapeBase> = ShapeDataManager.getInstance.shapes;
			if (shapes)
			{
				for (var i:int = shapes.length - 1; i >= 0; i--)
				{
					if (shapes[i].pointInShapeInner(point))
					{
						_selectObj = shapes[i];
						break;
					}
				}
			}
		}

		private function onEndDraw(event:GameEvent):void
		{
			var point:Point = event.param.point;
			if (!point) return;

			if (_selectObj)
			{
				_selectObj.stopDrag();
				_selectObj = null;
			}
			_recordP = null;

			var obj:Object;
			if (GlobalDatasDrawCircle.action == DrawCommand.DRAW_CIRCLE)
			{
				if (_circleShape)
				{
					_circleShape.moveTo(point);
					_circleShape.startCheck = true;
					ShapeDataManager.getInstance.addShape(_circleShape);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.DRAW_LINE)
			{
				if (_lineShape)
				{
					obj = ShapeDataManager.getInstance.getCrossPoint(point);
					if (obj)
					{
						_lineShape.moveTo(obj.crossPoint);
						_lineShape.addChildNode(obj.crossNode, obj.crossPoint, 2);

						ShapeDataManager.getInstance.checkCombine(_lineShape, obj.crossNode);
					} else
					{
						_lineShape.moveTo(point);
					}

					_lineShape.startCheck = true;
					ShapeDataManager.getInstance.addShape(_lineShape);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.CENTRE_ANGLE)
			{
				if (_centreAngle)
				{
					_centreAngle.moveTo(point);
					_centreAngle.startCheck = true;
					ShapeDataManager.getInstance.addShape(_centreAngle);
				}
			} else if (GlobalDatasDrawCircle.action == DrawCommand.CIRCUM_ANGLE)
			{
				if (_circumAngle)
				{
					_circumAngle.moveTo(point);
					_circumAngle.startCheck = true;
					ShapeDataManager.getInstance.addShape(_circumAngle);
				}
			}
		}

		public function removeEvent():void
		{
			GameDispatcher.removeEventListener(GameEventConstants.DRAW_START, onStartDraw);
			GameDispatcher.removeEventListener(GameEventConstants.DRAW_UPDATE, onUpdateDraw);
			GameDispatcher.removeEventListener(GameEventConstants.DRAW_END, onEndDraw);
		}

		private static var _instance:ShapeContainerUI = null;

		public static function get getInstance():ShapeContainerUI
		{
			if (_instance == null)
			{
				_instance = new ShapeContainerUI();
			}
			return _instance;
		}
	}
}
