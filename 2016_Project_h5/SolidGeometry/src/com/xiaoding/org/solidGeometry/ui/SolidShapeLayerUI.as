/**
 * Created by Administrator on 2015/11/2.
 */
package com.xiaoding.org.solidGeometry.ui
{
	import com.xiaoding.org.solidGeometry.constants.GameEventConstants;
	import com.xiaoding.org.solidGeometry.constants.GlobalData;
	import com.xiaoding.org.solidGeometry.constants.SolidShapeType;
	import com.xiaoding.org.solidGeometry.ui.shapes.ConeShape;
	import com.xiaoding.org.solidGeometry.ui.shapes.CubeShape;
	import com.xiaoding.org.solidGeometry.ui.shapes.CylinderShape;
	import com.xiaoding.org.solidGeometry.ui.shapes.PrismShape;
	import com.xiaoding.org.solidGeometry.ui.shapes.PyramidShape;
	import com.xiaoding.org.solidGeometry.ui.shapes.SphereShape;
	import com.xuele.xiaoding.org.event.GameDispatcher;
	import com.xuele.xiaoding.org.event.GameEvent;

	import flash.events.MouseEvent;
	import flash.geom.Point;

	import org.flexlite.domUI.components.Group;

	public class SolidShapeLayerUI extends Group
	{
		private var _lastP:Point = new Point();


		private var _shape:*;


		public function SolidShapeLayerUI()
		{
			super();
			addEvent();
		}

		private function removeEvent():void
		{
			GameDispatcher.removeEventListener(GameEventConstants.DRAW_TYPE, onDrawShape);
		}

		public function addEvent():void
		{
			removeEvent();
			GameDispatcher.addEventListener(GameEventConstants.DRAW_TYPE, onDrawShape, false, 0, true);
		}

		private function onDrawShape(event:GameEvent):void
		{
			var param:Object = event.param;
			if (!param)
			{
				return;
			}
			GlobalData.drawType = param.type;

			if (GlobalData.drawType > 0)
			{
				if (stage)
				{
					stage.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
					stage.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
				}
			}
		}

		override protected function createChildren():void
		{
			super.createChildren();
		}

		private function onMouseDown(event:MouseEvent):void
		{
			if (GlobalData.drawType <= 0) return;
			if (stage)
			{
				_lastP.x = event.stageX;
				_lastP.y = event.stageY;

				stage.addEventListener(MouseEvent.MOUSE_MOVE, onStageMove, false, 0, true);
				stage.addEventListener(MouseEvent.MOUSE_UP, onStageUp, false, 0, true);

				if (GlobalData.drawType == SolidShapeType.CUBE_TYPE)
				{
					_shape = new CubeShape();
				} else if (GlobalData.drawType == SolidShapeType.CYLINDER_TYPE)
				{
					_shape = new CylinderShape();
				} else if (GlobalData.drawType == SolidShapeType.CONE_TYPE)
				{
					_shape = new ConeShape();
				} else if (GlobalData.drawType == SolidShapeType.PRISM_TYPE)
				{
					_shape = new PrismShape();
				} else if (GlobalData.drawType == SolidShapeType.PYRAMID_TYPE)
				{
					_shape = new PyramidShape();
				} else if (GlobalData.drawType == SolidShapeType.SPHERE_TYPE)
				{
					_shape = new SphereShape();
				}

				if (!containsElement(_shape))
				{
					addElement(_shape);
				}
				_shape.startP(_lastP);
			}
		}

		private function onStageMove(event:MouseEvent):void
		{
			if (_shape)
			{
				_shape.update(new Point(event.stageX, event.stageY));
			}

		}

		private function onStageUp(event:MouseEvent):void
		{
			if (stage)
			{
				stage.removeEventListener(MouseEvent.MOUSE_MOVE, onStageMove);
				stage.removeEventListener(MouseEvent.MOUSE_UP, onStageUp);
			}
		}

		private static var _instance:SolidShapeLayerUI = null;

		public static function get getInstance():SolidShapeLayerUI
		{
			if (_instance == null)
			{
				_instance = new SolidShapeLayerUI();
			}
			return _instance;
		}
	}
}
