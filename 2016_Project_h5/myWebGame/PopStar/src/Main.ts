class Main extends egret.DisplayObjectContainer
{

	/**
	 * 加载进度界面
	 */
	private loadingView:LoadingUI;

	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event:egret.Event)
	{
		//初始化Resource资源加载库
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/resource.json", "resource/");
	}

	/**
	 * 配置文件加载完成,开始预加载preload资源组。
	 */
	private onConfigComplete(event:RES.ResourceEvent):void
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.loadGroup("preloadingRes");
	}

	/**
	 * preload资源组加载完成
	 */
	private onResourceLoadComplete(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.stage.removeChild(this.loadingView);
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			this.createGameScene();
		} else if (event.groupName == "preloadingRes")
		{
			RES.loadGroup("preload");
			//设置加载进度界面
			this.loadingView = new LoadingUI();
			this.stage.addChild(this.loadingView);
		}
	}

	/**
	 * preload资源组加载进度
	 */
	private onResourceProgress(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
		}
	}

	private textContainer:egret.Sprite;
	/**
	 * 创建游戏场景
	 */
	private preView:GamePreView;

	private createGameScene():void
	{

		var sky:egret.Bitmap = this.createBitmapByName("background_layer0");
		sky.width = this.stage.stageWidth;
		sky.height = this.stage.stageHeight;
		this.addChild(sky);

		this.preView = new GamePreView();
		this.addChild(this.preView);
		this.preView.addEventListener(GameFunEvent.GAME_FUN_EVENT_START, this.onStartGame, this);
		this.preView.addEventListener(GameFunEvent.GAME_EVENT_CLEAR, this.onClearGame, this);

	}

	private onClearGame(evt:GameFunEvent):void
	{
		if (this.gameView == null)
		{
			this.onStartGame();
		} else
		{
			this.removeChild(this.preView);
			this.gameView.onClearGame();
		}
	}

	private gameView:GameView;

	private onStartGame(evt:GameFunEvent = null):void
	{
		this.removeChild(this.preView);
		if (this.gameView == null)
		{
			this.gameView = new GameView();
			this.addChild(this.gameView);
			this.gameView.addEventListener(GameFunEvent.GAME_EVENT_MAINMENU, this.onMainMenu, this);
		}
	}

	private onMainMenu(evt:GameFunEvent):void
	{
		this.addChild(this.preView);
		this.preView.onRefreshView();

	}

	/**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 */
	private createBitmapByName(name:string):egret.Bitmap
	{
		var result:egret.Bitmap = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}


