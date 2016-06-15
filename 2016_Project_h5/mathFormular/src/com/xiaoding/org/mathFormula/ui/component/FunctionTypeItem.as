/**
 * Created by Administrator on 2015/10/28.
 */
package com.xiaoding.org.mathFormula.ui.component
{
	import com.xiaoding.org.mathFormula.constants.FunctionTypeConstants;
	import com.xiaoding.org.mathFormula.constants.StringConstants;

	import org.flexlite.domUI.collections.ArrayCollection;
	import org.flexlite.domUI.components.ComboBox;
	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.components.Label;
	import org.flexlite.domUI.events.IndexChangeEvent;
	import org.flexlite.domUI.layouts.HorizontalLayout;
	import org.flexlite.domUI.layouts.VerticalAlign;

	public class FunctionTypeItem extends Group
	{
		private var _container:Group;
		private var _containerLayout:HorizontalLayout;

		private var _functionType:Label;
		private var _comboBox:ComboBox;

		private var _types:Array = [StringConstants.INVERSE_PROPORTIONAL_FUNCTION, StringConstants.POSITIVE_PROPORTIONAL_FUNCTION, StringConstants.QUADRATIC_FUNCTION, StringConstants.CONSTANT_FUNCTION];

		private var _selectHandler:Function;

		public function FunctionTypeItem()
		{
			super();
		}

		override protected function createChildren():void
		{
			super.createChildren();
			_container = new Group();
			_container.mouseEnabled = false;
			addElement(_container);

			_containerLayout = new HorizontalLayout();
			_containerLayout.gap = 5;
			_containerLayout.verticalAlign = VerticalAlign.MIDDLE;
			_container.layout = _containerLayout;

			_functionType = new Label();
			_functionType.mouseChildren = false;
			_functionType.mouseEnabled = false;
			_functionType.textColor = 0x0;
			_container.addElement(_functionType);
			_functionType.text = StringConstants.FUNCTION_TYPE;


			_comboBox = new ComboBox();
			_comboBox.width = 100;
			_comboBox.dataProvider = new ArrayCollection(_types);
			_container.addElement(_comboBox);
			_comboBox.selectedIndex = FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION;
			_comboBox.addEventListener(IndexChangeEvent.CHANGE, onSelectClick, false, 0, true);
		}

		private function onSelectClick(event:IndexChangeEvent):void
		{
			if (_selectHandler != null)
			{
				_selectHandler.call(this);
			}
		}

		public function selectHandler(value:Function):FunctionTypeItem
		{
			_selectHandler = value;
			return this;
		}

		/**
		 * 获取函数类型
		 * */
		public function get functionType():int
		{
			if (_comboBox)
			{
				return _comboBox.selectedIndex;
			}
			return FunctionTypeConstants.INVERSE_PROPORTIONAL_FUNCTION;
		}

		public function destroy():void
		{
			removeAllElements();
			if (_container)
			{
				_container.removeAllElements();
				_container = null;
			}
			if (_comboBox)
			{
				_comboBox.removeEventListener(IndexChangeEvent.CHANGE, onSelectClick);
				_comboBox = null;
			}
			_selectHandler = null;
			_containerLayout = null;
			_functionType = null;
			_types = null;
		}
	}
}
