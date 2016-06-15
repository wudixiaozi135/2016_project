class Main extends eui.UILayer
{
	/**
	 * 加载进度界面
	 * Process interface loading
	 */
	private loadingView:LoadingUI;

	protected createChildren():void
	{
		super.createChildren();

		var assetAdapter = new AssetAdapter();
		this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

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

		var theme = new eui.Theme("resource/default.thm.json", this.stage);
		theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		RES.loadGroup("preload");
	}

	private isThemeLoadEnd:boolean = false;

	/**
	 * 主题文件加载完成,开始预加载
	 * Loading of theme configuration file is complete, start to pre-load the
	 */
	private onThemeLoadComplete():void
	{
		this.isThemeLoadEnd = true;
		this.createScene();
	}

	private isResourceLoadEnd:boolean = false;


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
			this.isResourceLoadEnd = true;
			this.createScene();
		}
	}

	private createScene()
	{
		if (this.isThemeLoadEnd && this.isResourceLoadEnd)
		{
			this.startCreateScene();
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

	/**
	 * 创建游戏场景
	 * Create a game scene
	 */
	private startCreateScene():void
	{
		
	}
}


