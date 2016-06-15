/**
 * Created by Administrator on 2015/10/28.
 */
package com.xiaoding.org.mathFormula.ui
{
	import com.xiaoding.org.mathFormula.constants.GameEventConstants;
	import com.xiaoding.org.mathFormula.ui.component.FunctionInputContainer;
	import com.xiaoding.org.mathFormula.ui.component.FunctionTypeItem;
	import com.xiaoding.org.mathFormula.ui.component.ScaleUintItem;
	import com.xuele.xiaoding.org.event.GameDispatcher;

	import org.flexlite.domUI.components.Group;

	public class TopToolUI extends Group
	{
		private var _functionTypeItem:FunctionTypeItem;
		private var _functionInput:FunctionInputContainer;
		private var _scaleUintItem:ScaleUintItem;


		public function TopToolUI()
		{
			super();
			mouseEnabled = false;
		}

		override protected function createChildren():void
		{
			super.createChildren();

			percentWidth = 100;

			_functionTypeItem = new FunctionTypeItem().selectHandler(selectHandler);
			addElement(_functionTypeItem);
			_functionTypeItem.right = 0;

			_functionInput = new FunctionInputContainer();
			addElement(_functionInput);
			_functionInput.right = 0;
			_functionInput.top = 30;

			_scaleUintItem = new ScaleUintItem().setCommitHandler(onSetScaleUintHandler);
			addElement(_scaleUintItem);
			_scaleUintItem.right = 0;
			_scaleUintItem.top = 60;


			selectHandler();
		}

		//当设置的单位后执行
		private function onSetScaleUintHandler(value:int):void
		{
			GameDispatcher.dispatchEvent(GameEventConstants.CHANGE_SCALE_UINT, {uint: value});
		}

		private function selectHandler():void
		{
			if (_functionInput)
			{
				_functionInput.setType(_functionTypeItem.functionType);
			}
		}

		private static var _instance:TopToolUI = null;

		public static function get getInstance():TopToolUI
		{
			if (_instance == null)
			{
				_instance = new TopToolUI();
			}
			return _instance;
		}
	}
}
