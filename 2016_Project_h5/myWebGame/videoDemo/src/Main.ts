class Main extends eui.UILayer
{
	/**
	 * 加载进度界面
	 * loading process interface
	 */
	private loadingView:LoadingUI;

	protected createChildren():void
	{
		super.createChildren();
		//inject the custom material parser
		//注入自定义的素材解析器
		var assetAdapter = new AssetAdapter();
		this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
		this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
		//Config loading process interface
		//设置加载进度界面
		this.loadingView = new LoadingUI();
		this.stage.addChild(this.loadingView);
		// initialize the Resource loading library
		//初始化Resource资源加载库
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/default.res.json", "resource/");
	}

	/**
	 * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
	 * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
	 */
	private onConfigComplete(event:RES.ResourceEvent):void
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		// load skin theme configuration file, you can manually modify the file. And replace the default skin.
		//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
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
	 * preload resource group is loaded
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
	 * Resource group loading failed
	 */
	private onResourceLoadError(event:RES.ResourceEvent):void
	{
		//TODO
		console.warn("Group:" + event.groupName + " has failed to load");
		//忽略加载失败的项目
		//ignore loading failed projects
		this.onResourceLoadComplete(event);
	}

	/**
	 * preload资源组加载进度
	 * loading process of preload resource
	 */
	private onResourceProgress(event:RES.ResourceEvent):void
	{
		if (event.groupName == "preload")
		{
			this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
		}
	}

	/**
	 * 创建场景界面
	 * Create scene interface
	 */
	protected startCreateScene():void
	{
		var url:string = "http://media.w3.org/2010/05/sintel/trailer.mp4";
		url="http://dl.xueleyun.com/files/mp4_a16c745a920240bdad08d90e7d4364ca.mp4";
		var video:egret.Video = new egret.Video();
		this.addChild(video);
		video.fullscreen = false;
		video.touchEnabled = true;
		video.load(url);

		video.width = this.stage.stageWidth - 100;
		video.height = this.stage.stageHeight - 100;

		var group:eui.Group = new eui.Group();
		group.layout = new eui.HorizontalLayout();
		this.addChild(group);
		group.horizontalCenter = 0;
		group.bottom = 0;

		var play:eui.Button = new eui.Button();
		play.label = "Play";
		group.addChild(play);

		var fullBtn:eui.Button = new eui.Button();
		fullBtn.label = "changeSize";
		group.addChild(fullBtn);

		var that = this;
		var pos:number = 0;
		var bol:boolean = true;
		var fullscreen:boolean = false;

		group.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e):void
		{
			var target = e.target;
			if (target == play)
			{
				if (bol)
				{
					play.label = "Pause";
					video.play(pos);
				} else
				{
					play.label = "Play";
					video.pause();
					pos = video.position;
				}
				bol = !bol;
			} else if (target == fullBtn)
			{
				fullscreen = !fullscreen;
				video.fullscreen=fullscreen;
				return;
				if (fullscreen)
				{
					video.width = that.stage.stageWidth - 100;
					video.height = that.stage.stageHeight - 100;
					fullBtn.label = "rebackSize"
				} else
				{
					video.width = 480;
					video.height = 360;
					fullBtn.label = "changeSize";
				}
				resetVideoPosition();
			}
		}, this);


		this.stage.addEventListener(egret.Event.RESIZE, function ():void
		{
			resetVideoPosition();
		}, this);

		function resetVideoPosition():void
		{
			video.x = (that.stage.stageWidth - video.width) >> 1;
			video.y = (that.stage.stageHeight - video.height) >> 1;
		}

		resetVideoPosition();
	}
}
