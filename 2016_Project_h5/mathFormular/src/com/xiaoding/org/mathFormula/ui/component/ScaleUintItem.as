/**
 * Created by Administrator on 2015/10/28.
 */
package com.xiaoding.org.mathFormula.ui.component
{
	import com.xiaoding.org.mathFormula.constants.GlobalData;
	import com.xiaoding.org.mathFormula.constants.StringConstants;

	import flash.events.FocusEvent;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;

	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.components.Label;
	import org.flexlite.domUI.components.TextInput;
	import org.flexlite.domUI.core.DomGlobals;
	import org.flexlite.domUI.layouts.HorizontalLayout;
	import org.flexlite.domUI.layouts.VerticalAlign;

	public class ScaleUintItem extends Group
	{
		private var _layout:HorizontalLayout;
		private var _label:Label;
		private var _input:TextInput;
		private var _function:Function;

		public function ScaleUintItem()
		{
			super();
		}

		override protected function createChildren():void
		{
			super.createChildren();

			_layout = new HorizontalLayout();
			_layout.gap = 5;
			_layout.verticalAlign = VerticalAlign.MIDDLE;
			this.layout = _layout;

			_label = new Label();
			_label.mouseChildren = false;
			_label.mouseEnabled = false;
			_label.selectable = false;
			_label.text = StringConstants.SCALE_UINT;
			addElement(_label);

			_input = new TextInput();
			_input.restrict = "0-9";
			_input.width = 50;
			_input.text = GlobalData.uintScale.toString();
			addElement(_input);

			_input.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
		}

		private function onFocusInHandler(event:FocusEvent):void
		{
			_input.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_input.addEventListener(KeyboardEvent.KEY_UP, onKeyUp, false, 0, true);
		}

		private function onKeyUp(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.ENTER)
			{
				if (DomGlobals.stage.focus != DomGlobals.stage)
				{
					DomGlobals.stage.focus = DomGlobals.stage;
				}
			}
		}

		private function onFocusOutHandler(event:FocusEvent):void
		{
			if (_input)
			{
				_input.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
				_input.removeEventListener(KeyboardEvent.KEY_UP, onKeyUp);
			}

			var value:int = parseInt(_input.text);
			value = value <= 0 ? 1 : value;
			_input.text = value.toString();

			if (_function != null)
			{
				_function.call(this, value);
			}
		}

		public function setCommitHandler(value:Function):ScaleUintItem
		{
			_function = value;
			return this;
		}

		public function destroy():void
		{
			removeAllElements();
			if (_input)
			{
				_input.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
				_input.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
				_input.removeEventListener(KeyboardEvent.KEY_UP, onKeyUp);
				_input = null;
			}
			_function = null;
			_label = null;
			_layout = null;
		}
	}
}
