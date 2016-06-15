/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.manager
{
	import com.xiaoding.org.constants.DrawCommand;
	import com.xiaoding.org.constants.GameEventConstants;
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;
	import com.xuele.xiaoding.org.event.GameDispatcher;

	import flash.display.Stage;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.ui.Keyboard;

	import org.flexlite.domUI.components.Button;

	public class StageManager
	{
		private var _stage:Stage;

		//把一些经常使用的变量提出来，防止反复开辟内存空间
		private var _globalP:Point = new Point();//鼠标移动时全局坐标点

		public function StageManager()
		{
		}

		public function initStage(stage:Stage):void
		{
			_stage = stage;
			_stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageMouseDown, false, 0, true);
			_stage.addEventListener(MouseEvent.MOUSE_MOVE, onStageCheckElement, false, 0, true);

			_stage.addEventListener(KeyboardEvent.KEY_DOWN, onStageKeyDown, false, 0, true);
			_stage.addEventListener(KeyboardEvent.KEY_UP, onStageKeyUp, false, 0, true);
		}

		private function onStageKeyDown(event:KeyboardEvent):void
		{
			var keyCode:int = event.keyCode;
			if (keyCode == Keyboard.SHIFT)
			{
				GlobalDatasDrawCircle.isKeyShift = true;
			} else
			{
				GlobalDatasDrawCircle.isKeyShift = false;
			}
		}

		private function onStageKeyUp(event:KeyboardEvent):void
		{
			var keyCode:int = event.keyCode;
			if (keyCode == Keyboard.ESCAPE)
			{
				GlobalDatasDrawCircle.action = DrawCommand.MOVE;
			}
			GlobalDatasDrawCircle.isKeyShift = false;
		}

		//实时检测鼠标下的东东
		private function onStageCheckElement(event:MouseEvent):void
		{
			if (GlobalDatasDrawCircle.action > 0 && GlobalDatasDrawCircle.action != DrawCommand.MOVE && ShapeDataManager.getInstance.isHasElement)
			{
				_globalP.setTo(event.stageX, event.stageY);
				GameDispatcher.dispatchEvent(GameEventConstants.CHECK_COLLISION, {point: _globalP});
			}
		}

		private function onStageMouseDown(event:MouseEvent):void
		{
			var obj:Object = event.target;
			if (obj is Button)
			{
				return;
			}
			_stage.addEventListener(MouseEvent.MOUSE_MOVE, onStageMove, false, 0, true);
			_stage.addEventListener(MouseEvent.MOUSE_UP, onStageUp, false, 0, true);

			GameDispatcher.dispatchEvent(GameEventConstants.DRAW_START, {point: new Point(event.stageX, event.stageY)});
		}

		private function onStageMove(event:MouseEvent):void
		{
			GameDispatcher.dispatchEvent(GameEventConstants.DRAW_UPDATE, {point: new Point(event.stageX, event.stageY)});
		}

		private function onStageUp(event:MouseEvent):void
		{
			GameDispatcher.dispatchEvent(GameEventConstants.DRAW_END, {point: new Point(event.stageX, event.stageY)});

			_stage.removeEventListener(MouseEvent.MOUSE_MOVE, onStageMove);
			_stage.removeEventListener(MouseEvent.MOUSE_UP, onStageUp);
		}

		private static var _instance:StageManager = null;

		public static function get getInstance():StageManager
		{
			if (_instance == null)
			{
				_instance = new StageManager();
			}
			return _instance;
		}
	}
}