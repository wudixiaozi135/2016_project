/**
 * Created by Administrator on 2015/10/28.
 */
package com.xiaoding.org.mathFormula.ui.component
{
	import com.xiaoding.org.mathFormula.constants.FunctionTypeConstants;
	import com.xiaoding.org.mathFormula.constants.GameEventConstants;
	import com.xiaoding.org.mathFormula.constants.StringConstants;
	import com.xuele.xiaoding.org.event.GameDispatcher;

	import flash.events.FocusEvent;
	import flash.events.KeyboardEvent;
	import flash.external.ExternalInterface;
	import flash.ui.Keyboard;

	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.components.Label;
	import org.flexlite.domUI.components.TextInput;
	import org.flexlite.domUI.core.DomGlobals;
	import org.flexlite.domUI.layouts.HorizontalLayout;
	import org.flexlite.domUI.layouts.VerticalAlign;

	public class FunctionInputContainer extends Group
	{
		private var _layout:HorizontalLayout;

		private var _container:Group;
		private var _label:Label;

		private var _containerLayout:HorizontalLayout;
		private var _functionInput:IFunctionInput;


		private var _textInput:TextInput;
		private var _type:int = -1;

		public function FunctionInputContainer()
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
			addElement(_label);
			_label.text = StringConstants.FX;

			_container = new Group();
			_container.mouseEnabled = false;
			addElement(_container);

			_containerLayout = new HorizontalLayout();
			_containerLayout.gap = 5;
			_containerLayout.verticalAlign = VerticalAlign.MIDDLE;
			_container.layout = _containerLayout;

			_textInput = new TextInput();
			_container.addElement(_textInput);
			_textInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
		}

		private function onFocusInHandler(event:FocusEvent):void
		{
			_textInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_textInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		}

		private function onFocusOutHandler(event:FocusEvent):void
		{
			var obj:Object = null;
			var param:Object = {};
			if (_type == FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION)
			{
				obj = parseInverseProportionalFunction(_textInput.text);
				if (!obj)
				{
					_textInput.text = "";
				}
				if (obj)
				{
					param.type = FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION;
					param.k = obj.k;
					_textInput.text = obj.express;
				}
			} else if (_type == FunctionTypeConstants.POSITIVE_PROPORTIONAL_FUNCTION)
			{
				obj = parsePositiveProportionalFunction(_textInput.text);
				if (!obj)
				{
					_textInput.text = "";
				}
				if (obj)
				{
					param.type = FunctionTypeConstants.POSITIVE_PROPORTIONAL_FUNCTION;
					param.k = obj.k;
					param.b = obj.b;
					_textInput.text = obj.express;
				}

			} else if (_type == FunctionTypeConstants.QUADRATIC_FUNCTION)
			{
				obj = parseQuadraticFunction(_textInput.text);
				if (!obj)
				{
					_textInput.text = "";
				}
				if (obj)
				{
					param.type = FunctionTypeConstants.QUADRATIC_FUNCTION;
					param.k = obj.k;
					param.b = obj.b;
					param.c = obj.c;
					_textInput.text = obj.express;
				}
			} else if (_type == FunctionTypeConstants.CONSTANT_FUNCTION)
			{
				obj = parseConstantFunction(_textInput.text);
				param.type = FunctionTypeConstants.CONSTANT_FUNCTION;
				param.k = 0;
				param.b = 0;
				param.c = obj.c;
				_textInput.text = obj.express;
			}
			GameDispatcher.dispatchEvent(GameEventConstants.COMMIT_FUNCTION_PARAM, param);
		}

		private function parseConstantFunction(expression:String):Object
		{
			var obj:Object = {};
			var c:Number = 0;
			var result:Number;
			var remain:String = expression;
			if (remain)
			{
				remain = remain.replace(/[a-z]|[A-Z]/g, "+0");
				remain = trimRepeatStr(remain);
				result = ExternalInterface.call("eval", remain);
				if (isNaN(result))
				{
					result = 0;
				}
				result = parseFloat(result.toFixed(2));
				obj.c = result;
				c = result;
			}
			obj.express = c.toString();
			return obj;
		}

		private function parsePositiveProportionalFunction(expression:String):Object
		{
			expression = expression.toLowerCase();
			var pos:int = 0;

			var k:Number;
			var kPos:int;
			var obj:Object = {};
			pos = expression.indexOf("+", 1);
			if (pos == -1)
			{
				pos = expression.indexOf("-", 1);
			}

			if (pos == -1)//单项时
			{
				kPos = expression.indexOf("x");
				k = parseFloat(expression.substring(0, kPos));
				if (isNaN(k) || k == 0)
				{
					return null;
				}
				obj.k = k;
				obj.b = 0;
				obj.express = k + "x";
			} else
			{
				kPos = expression.indexOf("x");
				k = parseFloat(expression.substring(0, kPos));
				if (isNaN(k) || k == 0)
				{
					return null;
				}
				obj.k = k;

				var remainStr:String = expression.substring(kPos + 1);
				remainStr = remainStr.replace(/[a-z]|[A-Z]/g, "+0");
				remainStr = trimRepeatStr(remainStr);
				var result:Number = ExternalInterface.call("eval", remainStr);
				if (isNaN(result))
				{
					result = 0;
				}
				result = parseFloat(result.toFixed(2));
				obj.b = result;
				if (result > 0)
				{
					obj.express = k + "x+" + result;
				} else if (result < 0)
				{
					obj.express = k + "x" + result;
				} else
				{
					obj.express = k + "x";
				}
			}
			return obj;
		}

		private function parseQuadraticFunction(expression:String):Object
		{
			expression = expression.toLowerCase();
			var size:int = expression.length;

			var pos:int = 0;
			pos = expression.indexOf("^");
			if (pos == -1)
			{
				return null;
			}
			var temp:String = expression.substring(0, pos);
			var k:Number = parseFloat(temp);
			if (temp == "x")
			{
				k = 1;
			} else if (temp == "-x")
			{
				k = -1;
			}
			if (isNaN(k) || k == 0)
			{
				return null;
			}
			var obj:Object = {};
			obj.k = k;

			if (pos + 1 > size)
			{
				return null;
			}

			if (expression.charAt(pos + 1) != "2")
			{
				return null;
			}

			var bPos:int = expression.indexOf("x", pos + 1);
			var b:Number = 0;
			if (pos + 2 < bPos)
			{
				b = parseFloat(expression.substring(pos + 2, bPos));
				if (isNaN(b))
				{
					b = 0;
				}
			}
			obj.b = b;

			var remain:String;
			if (bPos > -1)
			{
				if (bPos + 1 < size)
				{
					remain = expression.substring(bPos + 1);
				}
			} else
			{
				remain = expression.substring(pos + 2);
			}

			var c:Number = 0;
			var result:Number;
			if (remain)
			{
				remain = remain.replace(/[a-z]|[A-Z]/g, "+0");
				remain = trimRepeatStr(remain);
				result = ExternalInterface.call("eval", remain);
				if (isNaN(result))
				{
					result = 0;
				}
				result = parseFloat(result.toFixed(2));
				c = result;
			}
			obj.c = c;


			var expre:String = "";

			if (Math.abs(k) == 1)
			{
				k == 1 ? expre = "" : expre = "-";
			}

			if (b > 0)
			{
				expre += "x^2" + "+" + b + "x";
			} else if (b < 0)
			{
				expre += "x^2" + b + "x";
			} else
			{
				expre += "x^2";
			}

			if (c > 0)
			{
				expre += "+" + c;
			} else if (c < 0)
			{
				expre += c;
			}
			obj.express = expre;
			return obj;
		}

		private function trimRepeatStr(str:String):String
		{
			var arr:Array = str.split("");
			for (var i:int = 0; i < arr.length - 1; i++)
			{
				for (var j:int = i + 1; j < arr.length; j++)
				{
					if (arr[i] == arr[j])
					{
						arr[j] = "";
					}
					else
					{
						break;
					}
				}
			}
			str = "";
			for (var m:int = 0; m < arr.length; m++)
			{
				str += arr[m]
			}
			return str;
		}

		private function parseInverseProportionalFunction(expression:String):Object
		{
			var arr:Array = expression.split("\/");
			if (!arr || arr.length < 2)
			{
				return null;
			}
			var value1:String = arr[0];
			value1 = value1.replace(/[a-z]|[A-Z]/g, "");

			var k:Number = parseFloat(value1);
			if (isNaN(k) || k == 0)
			{
				return null;
			}
			value1 = k.toString();
			return {k: k, express: value1 + "/x"};
		}


		private function onKeyUpHandler(event:KeyboardEvent):void
		{
			if (event.keyCode == Keyboard.ENTER)
			{
				if (DomGlobals.stage && stage)
				{
					DomGlobals.stage.focus = stage;
				}
			}
		}

		public function setType(type:int):FunctionInputContainer
		{
			_type = type;
			if (_textInput)
			{
				_textInput.text = "";
			}
			return this;
		}


//		public function setType(type:int):FunctionInputContainer
//		{
//			if (_container)
//			{
//				_container.removeAllElements();
//			}
//			if (_functionInput)
//			{
//				_functionInput.destroy();
//				_functionInput = null;
//			}
//
//			if (type == FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION)
//			{
//				_functionInput = new InverseProportionalFunction().setCommitHandler(functionInputCommitHandler);
//				_container.addElement(_functionInput);
//			} else if (type == FunctionTypeConstants.POSITIVE_PROPORTIONAL_FUNCTION)
//			{
//				_functionInput = new PositiveProportional_Function().setCommitHandler(functionInputCommitHandler);
//				_container.addElement(_functionInput);
//			} else if (type == FunctionTypeConstants.QUADRATIC_FUNCTION)
//			{
//				_functionInput = new QuadraticFunction().setCommitHandler(functionInputCommitHandler);
//				_container.addElement(_functionInput);
//			} else if (type == FunctionTypeConstants.CONSTANT_FUNCTION)
//			{
//				_functionInput = new ConstantFunction().setCommitHandler(functionInputCommitHandler);
//				_container.addElement(_functionInput);
//			}
//			return this;
//		}

		private function functionInputCommitHandler():void
		{
			if (_functionInput)
			{
				GameDispatcher.dispatchEvent(GameEventConstants.COMMIT_FUNCTION_PARAM, {
					type: _functionInput.type,
					k: _functionInput.k,
					b: _functionInput.b,
					c: _functionInput.c
				});
			}
		}

		public function destroy():void
		{
		}
	}
}

import com.xiaoding.org.mathFormula.constants.FunctionTypeConstants;
import com.xiaoding.org.mathFormula.constants.StringConstants;

import flash.events.FocusEvent;
import flash.events.KeyboardEvent;
import flash.ui.Keyboard;

import org.flexlite.domUI.components.Group;
import org.flexlite.domUI.components.Label;
import org.flexlite.domUI.components.TextInput;
import org.flexlite.domUI.core.DomGlobals;
import org.flexlite.domUI.core.IVisualElement;
import org.flexlite.domUI.layouts.HorizontalLayout;
import org.flexlite.domUI.layouts.VerticalAlign;

interface IFunctionInput extends IVisualElement
{
	function setCommitHandler(value:Function):IFunctionInput;

	//函数类型
	function get type():int;

	function get k():Number;

	function set k(value:Number):void;

	function get b():Number;

	function set b(value:Number):void;

	function get c():Number;

	function set c(value:Number):void;

	function destroy():void;
}

class FunctionInputBase extends Group implements IFunctionInput
{
	protected var _k:Number;
	protected var _b:Number;
	protected var _c:Number;

	public function setCommitHandler(value:Function):IFunctionInput
	{
		return null;
	}

	public function get type():int
	{
		return 0;
	}

	public function get k():Number
	{
		return _k;
	}

	public function set k(value:Number):void
	{
		_k = value;
	}

	public function get b():Number
	{
		return _b;
	}

	public function set b(value:Number):void
	{
		_b = value;
	}

	public function get c():Number
	{
		return _c;
	}

	public function set c(value:Number):void
	{
		_c = value;
	}

	public function destroy():void
	{
	}
}

//反比例函数
class InverseProportionalFunction extends FunctionInputBase implements IFunctionInput
{
	private var _textInput:TextInput;
	private var _label:Label;
	private var _layout:HorizontalLayout;
	private var _commitHandler:Function;

	public function InverseProportionalFunction()
	{

	}

	override protected function createChildren():void
	{
		super.createChildren();

		_layout = new HorizontalLayout();
		_layout.gap = 5;
		_layout.verticalAlign = VerticalAlign.MIDDLE;
		this.layout = _layout;


		_textInput = new TextInput();
		_textInput.width = 50;
		addElement(_textInput);

		_label = new Label();
		_label.text = StringConstants.DIVIDE_X;
		addElement(_label);

		_textInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInputHandler, false, 0, true);
	}

	private function onFocusInputHandler(event:FocusEvent):void
	{
		_textInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		_textInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
	}

	private function onKeyUpHandler(event:KeyboardEvent):void
	{
		if (event.keyCode == Keyboard.ENTER)
		{
			if (DomGlobals.stage && stage)
			{
				DomGlobals.stage.focus = stage;
			}
		}
	}

	private function onFocusOutHandler(event:FocusEvent):void
	{
		if (_textInput)
		{
			_textInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_textInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);

			var inputValue:Number = parseFloat(_textInput.text);
			if (isNaN(inputValue) || inputValue == 0)
			{
				_textInput.text = "1";
				k = 1;
			} else
			{
				k = inputValue;
			}
		}

		if (_commitHandler != null)
		{
			_commitHandler.call(this);
		}
	}

	override public function get type():int
	{
		return FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION;
	}

	override public function setCommitHandler(value:Function):IFunctionInput
	{
		_commitHandler = value;
		return this;
	}

	override public function destroy():void
	{
		removeAllElements();
		if (_textInput)
		{
			_textInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_textInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInputHandler);
			_textInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_textInput = null;
		}
		_commitHandler = null;
		_label = null;
		_layout = null;
	}
}

class PositiveProportional_Function extends FunctionInputBase implements IFunctionInput
{
	private var _kInput:TextInput;
	private var _xLabel:Label;
	private var _bInput:TextInput;

	private var _layout:HorizontalLayout;
	private var _commitHandler:Function;

	public function PositiveProportional_Function()
	{

	}


	override protected function createChildren():void
	{
		super.createChildren();

		_layout = new HorizontalLayout();
		_layout.gap = 5;
		_layout.verticalAlign = VerticalAlign.MIDDLE;
		this.layout = _layout;

		_kInput = new TextInput();
		_kInput.width = 50;
		addElement(_kInput);

		_xLabel = new Label();
		_xLabel.mouseChildren = false;
		_xLabel.mouseEnabled = false;
		_xLabel.selectable = false;
		_xLabel.text = "X+";
		addElement(_xLabel);

		_bInput = new TextInput();
		_bInput.width = 50;
		addElement(_bInput);
		_bInput.text = "0";


		_kInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
		_bInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
	}

	private function onFocusInHandler(event:FocusEvent):void
	{
		var target:Object = event.currentTarget;
		if (target == _kInput)
		{
			_kInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_kInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		} else if (target == _bInput)
		{
			_bInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_bInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		}
	}

	private function onKeyUpHandler(event:KeyboardEvent):void
	{
		if (event.keyCode == Keyboard.ENTER)
		{
			if (DomGlobals.stage && stage)
			{
				DomGlobals.stage.focus = stage;
			}
		}
	}

	private function onFocusOutHandler(event:FocusEvent):void
	{
		var target:Object = event.currentTarget;
		if (target)
		{
			target.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			target.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
		}

		var inputValue:Number = parseFloat(_kInput.text);
		if (isNaN(inputValue) || inputValue == 0)
		{
			_kInput.text = "1";
			k = 1;
		} else
		{

			k = inputValue;
		}

		inputValue = parseFloat(_bInput.text);
		if (isNaN(inputValue))
		{
			_bInput.text = "0";
			b = 0;
		} else
		{
			b = inputValue;
		}

		if (_commitHandler != null)
		{
			_commitHandler.call(this);
		}
	}

	override public function get type():int
	{
		return FunctionTypeConstants.POSITIVE_PROPORTIONAL_FUNCTION;
	}

	override public function setCommitHandler(value:Function):IFunctionInput
	{
		_commitHandler = value;
		return this;
	}

	override public function destroy():void
	{
		removeAllElements();
		if (_kInput)
		{
			_kInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
			_kInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_kInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_kInput = null;
		}
		if (_bInput)
		{
			_bInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
			_bInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_bInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_bInput = null;
		}
		_commitHandler = null;
		_xLabel = null;
		_layout = null;
	}
}


class QuadraticFunction extends FunctionInputBase implements IFunctionInput
{
	private var _kInput:TextInput;
	private var _bInput:TextInput;
	private var _cInput:TextInput;
	private var _labelXX:Label;
	private var _labelAdd:Label;

	private var _layout:HorizontalLayout;

	private var _commitHandler:Function;

	public function QuadraticFunction()
	{

	}


	override protected function createChildren():void
	{
		super.createChildren();

		_layout = new HorizontalLayout();
		_layout.gap = 5;
		_layout.verticalAlign = VerticalAlign.MIDDLE;
		this.layout = _layout;

		_kInput = new TextInput();
		_kInput.width = 50;
		addElement(_kInput);

		_labelXX = new Label();
		_labelXX.mouseChildren = false;
		_labelXX.mouseEnabled = false;
		_labelXX.selectable = false;
		addElement(_labelXX);
		_labelXX.text = "X^2+";

		_bInput = new TextInput();
		_bInput.width = 50;
		addElement(_bInput);

		_labelAdd = new Label();
		_labelAdd.mouseChildren = false;
		_labelAdd.mouseEnabled = false;
		_labelAdd.selectable = false;
		addElement(_labelAdd);
		_labelAdd.text = "X+";

		_cInput = new TextInput();
		_cInput.width = 50;
		addElement(_cInput);


		_kInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
		_bInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
		_cInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
	}

	private function onFocusInHandler(event:FocusEvent):void
	{
		var target:Object = event.currentTarget;
		if (target == _kInput)
		{
			_kInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_kInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		} else if (target == _bInput)
		{
			_bInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_bInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		} else if (target == _cInput)
		{
			_cInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
			_cInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
		}
	}

	private function onKeyUpHandler(event:KeyboardEvent):void
	{
		if (event.keyCode == Keyboard.ENTER)
		{
			if (DomGlobals.stage && stage)
			{
				DomGlobals.stage.focus = stage;
			}
		}
	}

	private function onFocusOutHandler(event:FocusEvent):void
	{
		var target:Object = event.currentTarget;
		if (target)
		{
			target.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			target.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
		}

		var inputValue:Number = parseFloat(_kInput.text);
		if (isNaN(inputValue) || inputValue == 0)
		{
			_kInput.text = "1";
			k = 1;
		} else
		{
			k = inputValue;
		}

		inputValue = parseFloat(_bInput.text);
		if (isNaN(inputValue))
		{
			_bInput.text = "0";
			b = 0;
		} else
		{
			b = inputValue;
		}

		inputValue = parseFloat(_cInput.text);
		if (isNaN(inputValue))
		{
			_cInput.text = "0";
			c = 0;
		} else
		{
			c = inputValue;
		}

		if (_commitHandler != null)
		{
			_commitHandler.call(this);
		}
	}


	override public function get type():int
	{
		return FunctionTypeConstants.QUADRATIC_FUNCTION;
	}

	override public function setCommitHandler(value:Function):IFunctionInput
	{
		_commitHandler = value;
		return this;
	}

	override public function destroy():void
	{
		removeAllElements();
		if (_kInput)
		{
			_kInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
			_kInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_kInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_kInput = null;
		}
		if (_bInput)
		{
			_bInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
			_bInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_bInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_bInput = null;
		}
		if (_cInput)
		{
			_cInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
			_cInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_cInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_cInput = null;
		}
		_labelAdd = null;
		_labelXX = null;
		_layout = null;
		_commitHandler = null;
	}
}

class ConstantFunction extends FunctionInputBase implements IFunctionInput
{
	private var _cInput:TextInput;
	private var _layout:HorizontalLayout;
	private var _commitHandler:Function;

	public function ConstantFunction()
	{
	}


	override protected function createChildren():void
	{
		super.createChildren();


		_layout = new HorizontalLayout();
		_layout.gap = 5;
		_layout.verticalAlign = VerticalAlign.MIDDLE;
		this.layout = _layout;

		_cInput = new TextInput();
		_cInput.width = 50;
		addElement(_cInput);
		_cInput.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandler, false, 0, true);
	}

	private function onFocusInHandler(event:FocusEvent):void
	{
		_cInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler, false, 0, true);
		_cInput.addEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler, false, 0, true);
	}

	private function onFocusOutHandler(event:FocusEvent):void
	{
		if (_cInput)
		{
			_cInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_cInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
		}

		c = parseFloat(_cInput.text);

		if (_commitHandler != null)
		{
			_commitHandler.call(this);
		}
	}

	private function onKeyUpHandler(event:KeyboardEvent):void
	{
		if (event.keyCode == Keyboard.ENTER)
		{
			if (DomGlobals.stage && stage)
			{
				DomGlobals.stage.focus = stage;
			}
		}
	}


	override public function setCommitHandler(value:Function):IFunctionInput
	{
		_commitHandler = value;
		return this;
	}

	override public function get type():int
	{
		return FunctionTypeConstants.CONSTANT_FUNCTION;
	}

	override public function destroy():void
	{
		removeAllElements();
		if (_cInput)
		{
			_cInput.removeEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandler);
			_cInput.removeEventListener(FocusEvent.FOCUS_IN, onFocusInHandler);
			_cInput.removeEventListener(KeyboardEvent.KEY_UP, onKeyUpHandler);
			_cInput = null;
		}
		_commitHandler = null;
		_layout = null;
	}
}