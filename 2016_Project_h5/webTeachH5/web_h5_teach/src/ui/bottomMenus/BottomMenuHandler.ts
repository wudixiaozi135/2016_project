/**
 * Created by xiaoding on 2016/3/15.
 */
class BottomMenuHandler
{
	public handlerMenuCallRoll():void
	{
		PanelMediator.instance.switchPanel(PanelTypes.PANEL_CALL_ROLL);
	}

	public handlerSnippingTool():void
	{
		var snipping:SnippingTool = GlobalData.snippintTool;
		if (!snipping)
		{
			snipping = new SnippingTool();
			GlobalData.snippintTool = snipping;
		}

		var onRenderHandler = function (render:egret.RenderTexture):void
		{
			var bmp:egret.Bitmap = new egret.Bitmap(render);
			var toolBar:CoursewareToolBar = <CoursewareToolBar> GlobalInterface.courseMenuBar;
			if (!toolBar)
			{
				toolBar = new CoursewareToolBar();
				GlobalInterface.courseMenuBar = toolBar;
			}
			var vo:CoursewareVo = new CoursewareVo();
			vo.res = bmp;
			vo.courseType = CourseTypes.COURSE_TYPE_PICTURE;
			var courseWare:Courseware = new Courseware();
			courseWare.setRes(vo);
			UILayerManager.instance.coursewareLayer.addChild(courseWare);


			if (!UILayerManager.instance.coursewareLayer.contains(toolBar))
			{
				UILayerManager.instance.coursewareLayer.addChild(toolBar);
			}

			courseWare.x = (global.curWidth() - courseWare.width) >> 1;
			courseWare.y = (global.curHeight() - courseWare.height) >> 1;
			courseWare.updateToolBarPosition();

			if (toolBar.master)
			{
				toolBar.master = null;
			}
			toolBar.master = courseWare;
		}
		snipping.snipping(UILayerManager.instance.snipLayerMask, onRenderHandler);
	}


	public handlerMenuColor():void
	{
		PanelMediator.instance.switchPanel(PanelTypes.PANEL_COLOR);
	}

	/*
	 * 处理文本输入
	 * */
	public handlerInput():void
	{
		let isHasClick:boolean = GlobalData.isAddWorkLayerClick;
		if (!isHasClick)
		{
			xd.GameDispatcher.dispatchEvent(GameEventName.ADD_CLICK_HANDLER, {type: 1});
		}
		BottomMenuManager.instance.handlerMenuInput(global.curWidth() >> 1, global.curHeight() >> 1);
	}


	/*
	 * 处理橡皮擦
	 * */
	public handlerEraser():void
	{

	}
}