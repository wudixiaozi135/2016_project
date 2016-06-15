/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui
{
	import com.xiaoding.org.constants.DrawCommand;
	import com.xiaoding.org.constants.GlobalDatasDrawCircle;

	import flash.events.MouseEvent;

	import org.flexlite.domUI.components.Button;
	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.layouts.VerticalLayout;

	public class LeftToolUI extends Group
	{
		private var _btnMove:Button;
		private var _btnCircle:Button;
		private var _btnLine:Button;

		private var _btnCentreAngle:Button;
		private var _btnCircumAngle:Button;

		public function LeftToolUI()
		{
			super();
			mouseEnabled = false;
		}

		override protected function createChildren():void
		{
			super.createChildren();
			var layout:VerticalLayout = new VerticalLayout();
			layout.gap = 10;
			this.layout = layout;

			verticalCenter = -100;

			_btnMove = new Button();
			addElement(_btnMove);
			_btnMove.label = "移动";


			_btnLine = new Button();
			_btnLine.label = "画线";
			addElement(_btnLine);

			_btnCircle = new Button();
			_btnCircle.label = "画圆";
			addElement(_btnCircle);

			_btnCentreAngle = new Button();
			_btnCentreAngle.label = "圆心角";
			addElement(_btnCentreAngle);

			_btnCircumAngle = new Button();
			_btnCircumAngle.label = "圆周角";
			addElement(_btnCircumAngle);

			addEventListener(MouseEvent.CLICK, onClickHandler, false, 0, true);
		}

		private function onClickHandler(event:MouseEvent):void
		{
			var obj:Object = event.target;
			if (obj == _btnCircle)
			{
				GlobalDatasDrawCircle.action = DrawCommand.DRAW_CIRCLE;
			} else if (obj == _btnLine)
			{
				GlobalDatasDrawCircle.action = DrawCommand.DRAW_LINE;
			} else if (obj == _btnMove)
			{
				GlobalDatasDrawCircle.action = DrawCommand.MOVE;
			} else if (obj == _btnCentreAngle)
			{
				GlobalDatasDrawCircle.action = DrawCommand.CENTRE_ANGLE;
			} else if (obj == _btnCircumAngle)
			{
				GlobalDatasDrawCircle.action = DrawCommand.CIRCUM_ANGLE;
			}
		}

		private static var _instance:LeftToolUI = null;

		public static function get getInstance():LeftToolUI
		{
			if (_instance == null)
			{
				_instance = new LeftToolUI();
			}
			return _instance;
		}
	}
}
