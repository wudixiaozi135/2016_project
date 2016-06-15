package com.xiaoding.org.solidGeometry.ui
{

	import com.xiaoding.org.solidGeometry.app.AppContainer;
	import com.xiaoding.org.solidGeometry.constants.GlobalData;
	import com.xiaoding.org.solidGeometry.manager.LayerManager;
	import com.xiaoding.org.solidGeometry.ui.shapes.base.ShapeBase;

	import flash.events.Event;
	import flash.events.MouseEvent;

	public class SolidGeometryUI extends AppContainer
	{
		public function SolidGeometryUI()
		{
			if (stage)
			{
				init();
			} else
			{
				addEventListener(Event.ADDED_TO_STAGE, onAddToStageHandler, false, 0, true);
			}
		}

		private function onAddToStageHandler(event:Event):void
		{
			init();
		}

		private var _target:Object;

		private function onMouseDown(event:MouseEvent):void
		{
			_target = event.target as ShapeBase;
			if (_target)
			{
				GlobalData.drawType = -1;
				_target.startDrag();
			}
			stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUp, false, 0, true);
		}

		private function onMouseUp(event:MouseEvent):void
		{
			if (_target)
			{
				_target.stopDrag();
			}
			stage.removeEventListener(MouseEvent.MOUSE_UP, onMouseUp);
		}

		private function init():void
		{
			LayerManager.getInstance.initApp(this);
			stage.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false, 0, true);
		}
	}
}
