/**
 * Created by xiaoding on 2016/2/19.
 * UI层管理
 */
class UILayerManager
{
	// 主UI层 如 底部功能栏
	public mainUILayer:eui.Group = new eui.Group();
	// 面板层
	public uiLayer:eui.Group = new eui.Group();

	//绘制层
	public drawLayer:DrawLayerUI=new DrawLayerUI();

	/*
	 * 输入文字层
	 * */
	public wordLayer:eui.Group = new eui.Group();
	/*
	 * 输入控制工具层
	 * */
	public wordControlRein:eui.Group = new eui.Group();

	//课件层
	public coursewareLayer:eui.Group = new eui.Group();

	// 截图遮罩层
	public snipLayerMask:eui.Group = new eui.Group();

	public constructor()
	{
		xd.GameDispatcher.addEventListener(GameEventName.ADD_CLICK_HANDLER, this.addClickEvt, this);
		xd.GameDispatcher.addEventListener(GameEventName.REMOVE_CLICK_HANDLER, this.removeClickEvt, this);
	}

	private addClickEvt(ev:xd.GameEvent):void
	{
		let type:number = ev.param.type;
		if (type == 1)
		{
			global.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWordLayerClick, this, true);
			GlobalData.isAddWorkLayerClick = true;
		}
	}

	private removeClickEvt(ev:xd.GameEvent):void
	{
		let type:number = ev.param.type;
		if (type == 1)
		{
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWordLayerClick, this, true);
			GlobalData.isAddWorkLayerClick = false;
		}
	}

	private onWordLayerClick(ev:egret.TouchEvent):void
	{
		GlobalHandlerManager.handlerWordLayerClick(ev);
	}

	public setMain(main:egret.DisplayObjectContainer):void
	{
		main.addChild(this.drawLayer);

		this.mainUILayer.touchEnabled = false;
		main.addChild(this.mainUILayer);
		this.mainUILayer.percentWidth = 100;
		this.mainUILayer.percentHeight = 100;

		this.uiLayer.touchEnabled = false;
		this.uiLayer.percentWidth = 100;
		this.uiLayer.percentHeight = 100;
		main.addChild(this.uiLayer);

		this.wordLayer.touchEnabled = false;
		this.wordLayer.percentWidth = 100;
		this.wordLayer.percentHeight = 100;
		main.addChild(this.wordLayer);

		this.wordControlRein.touchEnabled = false;
		this.wordControlRein.percentWidth = 100;
		this.wordControlRein.percentHeight = 100;
		main.addChild(this.wordControlRein);

		this.coursewareLayer.touchEnabled = false;
		this.coursewareLayer.percentWidth = 100;
		this.coursewareLayer.percentHeight = 100;
		main.addChild(this.coursewareLayer);

		this.snipLayerMask.touchEnabled = false;
		main.addChild(this.snipLayerMask);
		this.snipLayerMask.percentWidth = 100;
		this.snipLayerMask.percentHeight = 100;

		this.initBottomMenu();
		this.addEvent();
	}

	private addEvent():void
	{
		this.wordLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onWordLayerDown, this);
	}

	private onWordLayerDown(ev:egret.TouchEvent):void
	{
		let target = ev.target;
		let isWordInput:boolean = target instanceof eui.EditableText && target.parent instanceof CoursewareInput;
		if (target instanceof CoursewareInput || isWordInput)
		{
			global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onWordLayerMove, this);
			global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onWordLayerUp, this);
		}
	}

	private onWordLayerMove(ev:egret.TouchEvent):void
	{
		GlobalData.wordInputMove = true;
	}

	private onWordLayerUp(ev:egret.TouchEvent):void
	{
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onWordLayerMove, this);
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onWordLayerUp, this);
	}

	private initBottomMenu():void
	{
		var bottomMenuGroup:BottomMenuGroup = new BottomMenuGroup();
		this.mainUILayer.addChild(bottomMenuGroup);
		bottomMenuGroup.horizontalCenter = 0;
		bottomMenuGroup.bottom = bottomMenuGroup.height - 10;
		GlobalInterface.bottomMenuPosition = bottomMenuGroup;
	}

	private static _instance:UILayerManager;

	public static get instance():UILayerManager
	{
		if (UILayerManager._instance == null)
		{
			UILayerManager._instance = new UILayerManager();
		}
		return UILayerManager._instance;
	}

}