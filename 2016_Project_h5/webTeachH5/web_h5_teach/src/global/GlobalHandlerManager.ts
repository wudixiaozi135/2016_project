/**
 * Created by xiaoding on 2016/3/11.
 */
class GlobalHandlerManager
{
	/*
	 * 舞台单击事件
	 * */
	public static handlerStageClick(event:egret.TouchEvent):void
	{
		var target:any = event.target;
		var getPanelEx:IGetIPanelExByPanelType = GlobalInterface.getIPanelExByPanelType;
		if (getPanelEx)
		{
			var panelEx:IPanelEx = getPanelEx.getIPanelExByPanelType(PanelTypes.PANEL_COLOR);
			if (panelEx)
			{
				if (panelEx.isShow() && panelEx.isShowCompleted())
				{
					var rect:egret.Rectangle = panelEx.panelRect();
					if (!rect.contains(event.stageX, event.stageY))
					{
						xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, {panelType: PanelTypes.PANEL_COLOR});
					}
				}
			}
		}
	}

	public static handlerStageDown(e:egret.TouchEvent):void
	{
		var target:any = e.target;
		if (egret.is(target, "ICourseware"))
		{
			var courseware:ICourseware = target;
			if (GlobalData.courseware != courseware)
			{
				GlobalData.courseware = target;

				var tool:CoursewareToolBar = <CoursewareToolBar> GlobalInterface.courseMenuBar;
				var off:number = tool.width - target.width;
				tool.x = target.x - off;
				tool.y = target.y + target.height;
				tool.master = target;
				target.updateToolBarPosition();
			}
		} else if (target instanceof DrawLayerUI)
		{
			global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPenMove, this);
			global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onPenEnd, this);

			let type:BottomMenuType = BottomMenuManager.menuType;
			let pen:egret.Shape = UILayerManager.instance.drawLayer.pen;
			pen.graphics.lineStyle(2, 0xffffff, 1);
			pen.graphics.moveTo(e.stageX, e.stageY);
			if (type == BottomMenuType.MENU_ERASER)
			{
				pen.blendMode = egret.BlendMode.ERASE;
			} else
			{
				pen.blendMode = egret.BlendMode.NORMAL;
			}
		}
	}

	private static onPenMove(ev:egret.TouchEvent):void
	{
		let pen:egret.Shape = UILayerManager.instance.drawLayer.pen;
		pen.graphics.lineTo(ev.stageX, ev.stageY);
	}


	private static onPenEnd(ev:egret.TouchEvent):void
	{
		let pen:egret.Shape = UILayerManager.instance.drawLayer.pen;
		pen.graphics.endFill();

		global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPenMove, this);
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPenEnd, this);
	}

	public static handlerWordLayerClick(event:egret.TouchEvent):void
	{
		var target:any = event.target;
		if (target instanceof CoursewareInput)
		{
			UILayerManager.instance.wordLayer.setChildIndex(target, UILayerManager.instance.wordLayer.numElements - 1);

			let courseInput:CoursewareInput = GlobalData.coursewareInput;
			courseInput.detach();
			courseInput.state = CoursewareInputState.idle;

			if (GlobalData.persistInputState)
			{
				GlobalData.persistInputState = false;
			} else
			{
				GlobalData.coursewareInput = target;
				GlobalData.coursewareInput.state = CoursewareInputState.selectable;
				if (GlobalData.controlInputRein)
				{
					GlobalData.controlInputRein.updatePosition(GlobalData.coursewareInput);
					GlobalData.coursewareInput.attach(GlobalData.controlInputRein);
				}
			}
		} else
		{
			if (target instanceof eui.EditableText && target.parent == GlobalData.coursewareInput)
			{
			} else
			{
				if (GlobalData.coursewareInput)
				{
					if (GlobalData.persistInputState)
					{
						GlobalData.persistInputState = false;
					} else
					{
						GlobalData.coursewareInput.detach();
						GlobalData.coursewareInput.state = CoursewareInputState.idle;
					}
				}
			}
		}
	}
}