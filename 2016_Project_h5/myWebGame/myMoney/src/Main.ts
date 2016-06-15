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
		//设置加载进度界面
		this.loadingView = new LoadingUI();
		this.stage.addChild(this.loadingView);

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
		RES.loadGroup("preload");
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


	/**
	 * 创建游戏场景
	 */
	private _welcomeView:WelcomeView;

	private createGameScene():void
	{
		var bg:egret.Bitmap = this.createBitmapByName("applock_bg");
		this.addChild(bg);
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;

		this._welcomeView = new WelcomeView();
		this.addChild(this._welcomeView);

		this.onLoadGameRes();
	}

	private _menuView:MenuView;

	private onOpenMenuView()
	{
		if (this._welcomeView && this.contains(this._welcomeView))
		{
			this.removeChild(this._welcomeView);
			this._welcomeView = null;
		}


		this._menuView = new MenuView();
		this.addChild(this._menuView);
		this._menuView.addEventListener(OpenGameViewEvent.OPENGAMEVIEW, this.onOpenGameView, this);

	}

	private gameView:GameView;

	public onOpenGameView(evt:OpenGameViewEvent)
	{
		if (this._menuView && this.contains(this._menuView))
		{
			this._menuView.removeEventListener(OpenGameViewEvent.OPENGAMEVIEW, this.onOpenGameView, this);
			this.removeChild(this._menuView);
			this._menuView = null;
		}

		this.gameView = new GameView();
		this.addChild(this.gameView);
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

	private onLoadGameRes()
	{
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGameResLoadComplete, this);
		RES.loadConfig("resource/resource.json", "resource/");
		RES.loadGroup("gameRes");
	}

	private onGameResLoadComplete(evt:RES.ResourceEvent)
	{
		if (evt.groupName == "gameRes")
		{
			//加载声音文件，并播放背景音乐
			this.onOpenMenuView();
		}

	}
}


