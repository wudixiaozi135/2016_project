/**
 * Created by Administrator on 2015/11/2.
 */
package com.xiaoding.org.solidGeometry.ui
{
	import com.xiaoding.org.solidGeometry.constants.GameEventConstants;
	import com.xiaoding.org.solidGeometry.constants.SolidShapeType;
	import com.xuele.xiaoding.org.event.GameDispatcher;

	import flash.events.MouseEvent;

	import org.flexlite.domUI.components.Button;
	import org.flexlite.domUI.components.Group;
	import org.flexlite.domUI.layouts.HorizontalLayout;

	public class BottomToolUI extends Group
	{
		private var _cubeShapeBtn:Button;
		private var _sphereBtn:Button;

		private var _cylinderBtn:Button;
		private var _coneBtn:Button;

		private var _prismBtn:Button;
		private var _pyramidBtn:Button;


		private var _layout:HorizontalLayout;

		public function BottomToolUI()
		{
			super();
		}

		override protected function createChildren():void
		{
			super.createChildren();

			_layout = new HorizontalLayout();
			_layout.gap = 5;
			this.layout = _layout;
			bottom = 30;
			horizontalCenter = 0;

			_cubeShapeBtn = new Button();
			_cubeShapeBtn.label = "正方体";
			addElement(_cubeShapeBtn);

			_sphereBtn = new Button();
			_sphereBtn.label = "球体";
			addElement(_sphereBtn);

			_cylinderBtn = new Button();
			_cylinderBtn.label = "圆柱体";
			addElement(_cylinderBtn);

			_coneBtn = new Button();
			_coneBtn.label = "圆锥";
			addElement(_coneBtn);

			_prismBtn = new Button();
			_prismBtn.label = "棱柱";
			addElement(_prismBtn);

			_pyramidBtn = new Button();
			_pyramidBtn.label = "棱锥";
			addElement(_pyramidBtn);

			addEventListener(MouseEvent.CLICK, onMouseClick, false, 0, true);
		}

		private function onMouseClick(event:MouseEvent):void
		{
			var target:Object = event.target;
			var type:int = 0;
			if (target == _cubeShapeBtn)
			{
				type = SolidShapeType.CUBE_TYPE;
			} else if (target == _cylinderBtn)
			{
				type = SolidShapeType.CYLINDER_TYPE;
			} else if (target == _coneBtn)
			{
				type = SolidShapeType.CONE_TYPE;
			} else if (target == _prismBtn)
			{
				type = SolidShapeType.PRISM_TYPE;
			} else if (target == _pyramidBtn)
			{
				type = SolidShapeType.PYRAMID_TYPE;
			} else if (target == _sphereBtn)
			{
				type=SolidShapeType.SPHERE_TYPE;
			}
			GameDispatcher.dispatchEvent(GameEventConstants.DRAW_TYPE, {type: type});
		}

		private static var _instance:BottomToolUI = null;

		public static function get getInstance():BottomToolUI
		{
			if (_instance == null)
			{
				_instance = new BottomToolUI();
			}
			return _instance;
		}
	}
}
