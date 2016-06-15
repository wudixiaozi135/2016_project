/**
 * Created by Administrator on 2015/10/27.
 */
package com.xiaoding.org.mathFormula.manager
{
	import com.xiaoding.org.mathFormula.constants.GlobalData;
	import com.xiaoding.org.mathFormula.ui.CoordinateSystemUI;
	import com.xiaoding.org.mathFormula.ui.TopToolUI;

	import flash.events.MouseEvent;

	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.components.Label;

	public class LayerManager
	{
		private var _app:Group;


		//底部状态位置
		private var _stateLabel:Label;
		private var _offX:Number;
		private var _offY:Number;

		public function LayerManager()
		{
		}

		public function initApp(app:Group):void
		{
			_app = app;

			var coordinateSystem:CoordinateSystemUI = CoordinateSystemUI.getInstance;
			_app.addElement(coordinateSystem);

			var topUI:TopToolUI = TopToolUI.getInstance;
			_app.addElement(topUI);


			StageManager.getInstance.stage.addEventListener(MouseEvent.MOUSE_MOVE, onStageMove, false, 0, true);
			_stateLabel = new Label();
			_stateLabel.mouseEnabled = false;
			_stateLabel.mouseChildren = false;
			_stateLabel.selectable = false;
			_app.addElement(_stateLabel);
			_stateLabel.bottom = 0;
			_stateLabel.right = 30;
		}

		private function onStageMove(event:MouseEvent):void
		{
			if (event.stageX >= GlobalData.originX)
			{
				_offX = event.stageX - GlobalData.originX;
				_offX = _offX / GlobalData.SCALE * GlobalData.uintScale;
			} else
			{
				_offX = GlobalData.originX - event.stageX;
				_offX = -_offX / GlobalData.SCALE * GlobalData.uintScale;
			}
			if (event.stageY >= GlobalData.originY)
			{
				_offY = event.stageY - GlobalData.originY;
				_offY = -_offY / GlobalData.SCALE * GlobalData.uintScale;
			} else
			{
				_offY = GlobalData.originY - event.stageY;
				_offY = _offY / GlobalData.SCALE * GlobalData.uintScale;
			}
			_stateLabel.text = "(x=" + _offX.toFixed(1) + " y=" + _offY.toFixed(1) + ")";
		}

		private static var _instance:LayerManager = null;

		public static function get getInstance():LayerManager
		{
			if (_instance == null)
			{
				_instance = new LayerManager();
			}
			return _instance;
		}
	}
}
