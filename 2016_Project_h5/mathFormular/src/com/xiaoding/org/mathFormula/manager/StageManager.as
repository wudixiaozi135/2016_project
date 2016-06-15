/**
 * Created by Administrator on 2015/10/28.
 */
package com.xiaoding.org.mathFormula.manager
{
	import flash.display.Stage;

	public class StageManager
	{
		private var _stage:Stage;

		public function StageManager()
		{
		}

		public function initStage(stage:Stage):void
		{
			_stage = stage;
		}

		public function get stage():Stage
		{
			return _stage;
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
