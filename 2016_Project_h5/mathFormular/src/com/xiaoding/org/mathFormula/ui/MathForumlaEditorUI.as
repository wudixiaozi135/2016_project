package com.xiaoding.org.mathFormula.ui
{

	import com.xiaoding.org.mathFormula.app.AppContainer;
	import com.xiaoding.org.mathFormula.constants.GameEventConstants;
	import com.xiaoding.org.mathFormula.constants.GlobalData;
	import com.xiaoding.org.mathFormula.manager.LayerManager;
	import com.xiaoding.org.mathFormula.manager.StageManager;
	import com.xuele.xiaoding.org.event.GameDispatcher;

	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;

	public class MathForumlaEditorUI extends AppContainer
	{
		public function MathForumlaEditorUI()
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
			removeEventListener(Event.ADDED_TO_STAGE, onAddToStageHandler);
			init();
		}

		private function init():void
		{
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			StageManager.getInstance.initStage(stage);
			LayerManager.getInstance.initApp(this);
			stage.addEventListener(Event.RESIZE, onResizeHandler, false, 0, true);
			onResizeHandler(null);
		}

		private function onResizeHandler(event:Event):void
		{
			GlobalData.stageWidth = stage.stageWidth;
			GlobalData.stageHeight = stage.stageHeight;
			GameDispatcher.dispatchEvent(GameEventConstants.STAGE_RESIZE);
		}

		public function destroy():void
		{

		}
	}
}
