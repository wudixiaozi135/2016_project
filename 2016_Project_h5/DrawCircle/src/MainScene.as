package
{
	import com.xiaoding.org.manager.StageManager;
	import com.xiaoding.org.ui.AppSystemUI;

	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;

	public class MainScene extends Sprite
	{
		public function MainScene()
		{
			super();
			if (stage)
			{
				init();
			} else
			{
				addEventListener(Event.ADDED_TO_STAGE, onStageHandler, false, 0, true);
			}
		}

		private function onStageHandler(event:Event):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, onStageHandler);
			init();
		}

		private function init():void
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			stage.color = 0x333333;
			addChild(new AppSystemUI());
			StageManager.getInstance.initStage(stage);
		}
	}
}
