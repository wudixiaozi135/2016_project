class Main extends egret.DisplayObjectContainer
{

	/**
	 * 加载进度界面
	 * Process interface loading
	 */
	private loadingView:LoadingUI;

	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event:egret.Event)
	{
		//设置加载进度界面
		//Config to load process interface
		this.loadingView = new LoadingUI();
		this.stage.addChild(this.loadingView);

		//初始化Resource资源加载库
		//initiate Resource loading library
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/default.res.json", "resource/");
	}

	/**
	 * 配置文件加载完成,开始预加载preload资源组。
	 * configuration file loading is completed, start to pre-load the preload resource group
	 */
	private onConfigComplete(event:RES.ResourceEvent):void
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		RES.loadGroup("preload");
	}

	/**
	 * preload资源组加载完成
	 * Preload resource group is loaded
	 */
	private onResourceLoadComplete(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.stage.removeChild(this.loadingView);
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			this.createGameScene();
		}
	}

	/**
	 * 资源组加载出错
	 *  The resource group loading failed
	 */
	private onItemLoadError(event:RES.ResourceEvent):void
	{
		console.warn("Url:" + event.resItem.url + " has failed to load");
	}

	/**
	 * 资源组加载出错
	 *  The resource group loading failed
	 */
	private onResourceLoadError(event:RES.ResourceEvent):void
	{
		//TODO
		console.warn("Group:" + event.groupName + " has failed to load");
		//忽略加载失败的项目
		//Ignore the loading failed projects
		this.onResourceLoadComplete(event);
	}

	/**
	 * preload资源组加载进度
	 * Loading process of preload resource group
	 */
	private onResourceProgress(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
		}
	}

	private textfield:egret.TextField;

	/**
	 * 创建游戏场景
	 * Create a game scene
	 */
	private createGameScene():void
	{
		var sky:egret.Bitmap = this.createBitmapByName("bgImage");
		this.addChild(sky);
		var stageW:number = this.stage.stageWidth;
		var stageH:number = this.stage.stageHeight;
		sky.width = stageW;
		sky.height = stageH;


		this.addChild(this.pen);
		this.pen.graphics.clear();
		this.pen.graphics.lineStyle(5, 0xff);

		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
	}

	private onDown(ev:egret.TouchEvent):void
	{
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);

		this.pen.graphics.moveTo(ev.stageX, ev.stageY);
	}

	private onMove(ev:egret.TouchEvent):void
	{
		this.pen.graphics.lineTo(ev.stageX, ev.stageY);
	}

	private onEnd(ev:egret.TouchEvent):void
	{
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
	}


	private pen:egret.Shape = new egret.Shape();

	/**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
	 */
	private createBitmapByName(name:string):egret.Bitmap
	{
		var result = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}