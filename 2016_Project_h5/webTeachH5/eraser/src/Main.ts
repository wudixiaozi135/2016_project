import URLLoader = egret.URLLoader;
import URLRequest = egret.URLRequest;
import callLater = egret.callLater;
import load = EXML.load;
import toColorString = egret.toColorString;
import Bitmap = egret.Bitmap;
import superGetter = egret.superGetter;
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
		this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
		this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
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
		var button = new eui.Button();
		button.label = "加载背景图片";
		button.right = 0;
		button.y = 10;
		this.addChild(button);
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

		var rotationBtn:eui.Button = new eui.Button();
		rotationBtn.label = "截图";
		rotationBtn.right = 0;
		rotationBtn.top = 70;
		this.addChild(rotationBtn);
		rotationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.snippingTool, this);

		var eraser:eui.Button = new eui.Button();
		eraser.label = "橡皮擦";
		eraser.right = 0;
		eraser.top = 130;
		this.addChild(eraser);
		eraser.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eraserHandler, this);

		var penBtn:eui.Button = new eui.Button();
		penBtn.label = "画笔";
		penBtn.right = 0;
		penBtn.top = 190;
		this.addChild(penBtn);
		penBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.penHandler, this);

		this.addChild(this.colorPicker);

		this.canvasContainer.cacheAsBitmap = true;
		this.canvasContainer.addChildAt(this.bmp, 0);
		this.addChild(this.canvasContainer);


		this.canvasContainer.addChild(this.canvas);
		this.canvasContainer.addChild(this.eraserCanvas);
		this.eraserCanvas.blendMode = egret.BlendMode.ERASE;

		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
	}

	private colorPicker:ColorPicker = new ColorPicker();

	//画布容器
	private canvasContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

	private canvas:egret.Sprite = new egret.Sprite();

	private eraserCanvas:egret.Sprite = new egret.Sprite();

	private pen:egret.Sprite;

	//1画笔 2橡皮
	private style:number = 0;

	private txture:egret.RenderTexture = new egret.RenderTexture();
	private bmp:egret.Bitmap = new egret.Bitmap();

	private penHandler(e:egret.TouchEvent):void
	{
		this.style = 1;
	}

	private eraserHandler(e:egret.TouchEvent):void
	{
		this.style = 2;
	}

	private onBeginHandler(e:egret.TouchEvent):void
	{
		if (this.style == 2)
		{
			this.eraserCanvas.graphics.lineStyle(20, this.colorPicker.color);
			this.pen = this.eraserCanvas;
		} else
		{
			this.canvas.graphics.lineStyle(5, this.colorPicker.color);
			this.pen = this.canvas;
		}

		this.pen.graphics.moveTo(e.stageX, e.stageY);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
	}

	private onMoveHandler(e:egret.TouchEvent):void
	{
		this.pen.graphics.lineTo(e.stageX, e.stageY);
	}

	private onEndHandler(e:egret.TouchEvent):void
	{
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);

		this.pen.graphics.lineTo(e.stageX, e.stageY);

		if (e.target instanceof (eui.Button))
		{
			return;
		}

		if (this.style == 2)
		{
			this.txture = new egret.RenderTexture();
			this.txture.drawToTexture(this.canvasContainer);
			if (this.bmp.texture)
			{
				this.bmp.texture.dispose();
				this.bmp.texture = null;
			}
			this.bmp.texture = this.txture;
			this.canvas.graphics.clear();
			this.eraserCanvas.graphics.clear();
		}
	}

	private snippingTool(e:egret.TouchEvent):void
	{
		var renderTxt:egret.RenderTexture = new egret.RenderTexture();
		renderTxt.drawToTexture(this, new egret.Rectangle(400, 0, 100, 100));
		var bmp:egret.Bitmap = new egret.Bitmap();
		bmp.texture = renderTxt;
		this.addChild(bmp);
		bmp.x = 700;
		bmp.y = 10;
	}

	private onButtonClick(e:egret.TouchEvent):void
	{
		var request:URLRequest = new URLRequest();
		//request.url = "http://192.168.1.71:8080/server/wallpaper1.png";
		request.url = "http://pic.pptbz.com/pptpic/201202/20120206170232439.jpg";
		var loader:egret.ImageLoader = new egret.ImageLoader();
		loader.load(request.url);
		loader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
	}

	private container:eui.Group = new eui.Group();

	private loadCompleteHandler(event:egret.Event):void
	{
		var imageLoader = <egret.ImageLoader>event.target;
		var bitmap:egret.Bitmap = new egret.Bitmap(imageLoader.data);
		bitmap.width = this.stage.stageWidth;
		bitmap.height = this.stage.stageHeight;
		this.container = new eui.Group();
		this.addChildAt(this.container, 0);
		this.container.addChild(bitmap);
	}
}