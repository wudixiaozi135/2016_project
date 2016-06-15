/**
 * Created by Administrator on 2016/4/1.
 */
class BottomMenuManager
{
	/*
	 * 当前选中的菜单按钮
	 * */
	public static selectMenu:BottomMenuBtn;

	/*
	 * 菜单类型
	 * */
	public static menuType:BottomMenuType;


	public handlerMenuInput(stageX:number, stageY:number):void
	{
		let courseInput:CoursewareInput = GlobalData.coursewareInput;
		if (courseInput)
		{
			if (courseInput.contentIsNull())
			{
				if (courseInput.parent)
				{
					courseInput.parent.removeChild(courseInput);
				}
				courseInput.destroy();
				CoursewareInputManager.instance.removeItem(courseInput);
			} else
			{
				courseInput.detach();
				courseInput.state = CoursewareInputState.idle;
			}
			courseInput = null;
			GlobalData.coursewareInput = null;
		}

		let input = new CoursewareInput();
		GlobalData.coursewareInput = input;
		UILayerManager.instance.wordLayer.addChild(input);
		CoursewareInputManager.instance.addItem(input);
		input.x = stageX;
		input.y = stageY;


		let controlBar:ControlInputRein = GlobalData.controlInputRein;
		if (!controlBar)
		{
			controlBar = new ControlInputRein(0xffffff);
			GlobalData.controlInputRein = controlBar;
		}
		if (!UILayerManager.instance.wordControlRein.contains(controlBar))
		{
			UILayerManager.instance.wordControlRein.addChild(controlBar);
		}
		controlBar.updatePosition(input);
		input.attach(controlBar);
		input.state = CoursewareInputState.editable;
	}

	private static _instance:BottomMenuManager;
	public static get instance():BottomMenuManager
	{
		if (BottomMenuManager._instance == null)
		{
			BottomMenuManager._instance = new BottomMenuManager();
		}
		return BottomMenuManager._instance;
	}
}