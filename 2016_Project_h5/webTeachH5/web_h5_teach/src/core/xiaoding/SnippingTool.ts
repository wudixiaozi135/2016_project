/**
 * Created by xiaoding on 2016/3/7.
 */
/*
 * 自定义截图
 * */
class SnippingTool implements ISnippingTool
{
	private  _clipMask:ClipMask;

	//要截图的对象的位图数据
	private  _sourceBmd:egret.RenderTexture

	//用于遮罩的位图
	private  _rectBmp:egret.Bitmap;

	//模态背景
	private  _modalBg:eui.Rect;

	//一个容器层，用于添加源图的复制层
	private  _container:eui.Group;

	private  _group;

	private  _callBack:any;
	private  _clipStartP:egret.Point;
	private _minSnipW:number = 5;
	private _minSnipH:number = 5;
	/*
	 * @param minSnipW 最小截图宽
	 * @param minSnipH 最小截图高
	 * */
	constructor(minSnipW:number = 5, minSnipH:number = 5)
	{
		this._minSnipW = minSnipW;
		this._minSnipH = minSnipW;
	}

	//group 要截图的UI,callBack 截图成功时的回调，参数bitmapData
	public snipping(group, callBack):void
	{
		if (!group) return;

		this._group = group;
		this._callBack = callBack;

		this.initUI();
		this.addEvent();
	}

	private  removeEvent():void
	{
		xd.GameDispatcher.removeEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
		if (global.stage)
		{
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
		}
	}

	private addEvent():void
	{
		this.removeEvent();
		xd.GameDispatcher.addEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
		if (global.stage)
		{
			global.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
		}
	}

	private onMouseDown(event:egret.TouchEvent):void
	{
		if (global.stage)
		{
			global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
			global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
		}
		this._clipStartP = new egret.Point(event.stageX, event.stageY);
	}

	private onStageUp(event:egret.TouchEvent):void
	{
		this._clipStartP = null;
		if (global.stage)
		{
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
		}
		if (this._clipMask)
		{
			if (this._clipMask.bounds && this._clipMask.bounds.width > 0 && this._clipMask.height > 0)
			{
				global.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
			}
		}
	}

	private onMouseMove(event:egret.TouchEvent):void
	{
		if (this._clipMask)
		{
			if (this._clipStartP)
			{
				this._clipMask.show();
				this._clipMask.setStart(this._clipStartP);
				this._clipMask.moveToP(new egret.Point(event.stageX, event.stageY));
			}
		}
	}

	private  onStageResize(event:egret.Event):void
	{
		this._container.visible = false;
		//这里延时是因为在绘制时，UI可能未及时改变大小
		egret.callLater(this.repaint, this, 100);
	}

	private repaint():void
	{
		if (this._sourceBmd)
		{
			this._sourceBmd.drawToTexture(global.stage);
			this._container.visible = true;
		}
		if (this._clipMask)
		{
			this._clipMask.updateAdjustPosition();
		}
	}

	private initUI():void
	{
		if (!this._container)
		{
			this._container = new eui.Group();
			this._container.touchEnabled = false;
			this._container.percentWidth = 100;
			this._container.percentHeight = 100;
			this._group.addChild(this._container);
		}

		if (!this._sourceBmd)
		{
			this._sourceBmd = new egret.RenderTexture();
			this._sourceBmd.drawToTexture(global.stage);
		}
		if (!this._modalBg)
		{
			this._modalBg = new eui.Rect();
			this._modalBg.touchChildren = false;
			this._modalBg.touchEnabled = true;
			this._modalBg.percentWidth = 100;
			this._modalBg.percentHeight = 100;
			this._modalBg.fillColor = 0x0;
			this._modalBg.fillAlpha = .3;
			this._container.addChild(this._modalBg);
		}

		if (!this._rectBmp)
		{
			this._rectBmp = new egret.Bitmap();
			this._rectBmp.texture = this._sourceBmd;
			this._container.addChild(this._rectBmp);
		}

		if (!this._clipMask)
		{
			this._clipMask = new ClipMask();
			this._clipMask.addEventListener(ClipMask.CANCEL_SNIPPING, this.onCancelSnipping, this);
			this._clipMask.addEventListener(ClipMask.CONFIRM_SNIPPING, this.onConfirmSnipping, this);
			this._clipMask.addEventListener(ClipMask.PHOTO_SHARE, this.onPhotoShare, this);
			this._clipMask.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onClipCreateFinish, this);
			this._container.addChild(this._clipMask);
			this._clipMask.hide();
		}
	}

	private onClipCreateFinish():void
	{
		this._rectBmp.mask = this._clipMask.rectMask;
	}

	private onPhotoShare(e:egret.Event):void
	{
		this.snipPhoto(2);
	}

	/*
	 * type 1 截图  2截图并分享
	 * */
	private snipPhoto(type:number = 1):void
	{
		if (this._clipMask)
		{
			this._clipMask.snippingBeforeSomeThing();

			if (this._container)
			{
				this._container.visible = false;
			}

			var bounds:egret.Rectangle = this._clipMask.bounds;
			if (bounds)
			{
				var distination:egret.RenderTexture = new egret.RenderTexture();
				var globalStage:egret.Stage = global.stage;
				var rect:egret.Rectangle;
				if (bounds.width > this._minSnipW && bounds.height > this._minSnipH)
				{
					rect = new egret.Rectangle(Math.floor(bounds.x), Math.floor(bounds.y), Math.floor(bounds.width + 2), Math.floor(bounds.height + 2));
					distination.drawToTexture(globalStage, rect);
					if (this._callBack != null)
					{
						this._callBack.call(null, distination);
					}
				}
			}
			bounds = null;
		}
		if (type == 2)
		{
			var base64:string = distination.toDataURL("image/png");
			var urlLoader:egret.URLLoader = new egret.URLLoader();
			var request:egret.URLRequest = new egret.URLRequest();
			var urlVariable:egret.URLVariables = new egret.URLVariables();
			urlVariable.variables = {data: base64, time: new Date().getTime()};

			request.url = "http://ul.xueleyun.com/upload";
			request.data = urlVariable;
			request.method = egret.URLRequestMethod.POST;
			urlLoader.load(request);
		}
		this.onCancelSnipping(null);
	}

	private  onConfirmSnipping(event:egret.Event):void
	{
		this.snipPhoto(1);
	}

	private  onCancelSnipping(event:Event = null):void
	{
		this.destroy();
	}

	private clearUI():void
	{
		if (this._container)
		{
			this._container.removeChildren();
		}
		if (this._sourceBmd)
		{
			this._sourceBmd.dispose();
			this._sourceBmd = null;
		}

		this._modalBg && (this._modalBg = null);
		if (this._rectBmp)
		{
			this._rectBmp.mask = null;
			this._rectBmp = null;
		}
		if (this._clipMask)
		{
			this._clipMask.removeEventListener(ClipMask.CANCEL_SNIPPING, this.onCancelSnipping, this);
			this._clipMask.removeEventListener(ClipMask.CONFIRM_SNIPPING, this.onConfirmSnipping, this);
			this._clipMask.removeEventListener(ClipMask.PHOTO_SHARE, this.onPhotoShare, this);
			this._clipMask.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.onClipCreateFinish, this);
			this._clipMask.destroy();
			this._clipMask = null;
		}
	}

	public destroy():void
	{
		this.removeEvent();
		this._callBack = null;
		this.clearUI();

		if (this._group)
		{
			if (this._group.contains(this._container))
			{
				this._group.removeChild(this._container);
			}
			this._group = null;
			this._container = null;
		}
	}
}

class ClipMask extends eui.Group
{
	//取消截图
	public static  CANCEL_SNIPPING:string = "cancel_snipping";
	//确认截图
	public static  CONFIRM_SNIPPING:string = "confirm_snipping";
	/*
	 * 截图分享
	 * */
	public static PHOTO_SHARE:string = "photo_share";

	private _topLeftBar:ControlBar;
	private _topBar:ControlBar;
	private _topRight:ControlBar;
	private _leftBar:ControlBar;
	private _rightBar:ControlBar;
	private _bottomLeftBar:ControlBar;
	private _bottomBar:ControlBar;
	private _bottomRightBar:ControlBar;
	private _bottomTool:BottomTool;

	private  _selectObj:any;

	private  _defaultW:number = 10;
	private  _defaultColor:number = 0xffffff;

	private  _bounds:egret.Rectangle;

	private  _canvas:egret.Sprite;

	private _rectMask:eui.Rect;

	//所有绘制图形及文本都放置在该层
	private  _drawContainer:eui.Group;

	//当前绘制区域的边界
	private  _rect:egret.Rectangle;

	private _lastP:egret.Point = new egret.Point();

	/*
	 * 模拟双击的时长
	 * */
	private _clickTime:number = 0;

	/*
	 * h5中遮罩不被点击，故加点击层
	 * */
	private _clickClip:eui.Rect;

	constructor(color:number = 0xffffff, w:number = 10)
	{
		super();
		this._defaultW = w;
		this._defaultColor = color;
		this._rect = new egret.Rectangle();
	}

	protected  createChildren():void
	{
		super.createChildren();
		this.touchEnabled = false;

		this._canvas = new egret.Sprite();
		this._canvas.touchEnabled = false;
		this.addChild(this._canvas);

		this._rectMask = new eui.Rect();
		this._rectMask.touchEnabled = false;
		this._rectMask.touchChildren = false;
		this._rectMask.strokeWeight = 1;
		this._rectMask.strokeColor = 1;
		this._rectMask.fillColor = 0x0;
		this.addChild(this._rectMask);

		this._clickClip = new eui.Rect();
		this._clickClip.strokeWeight = 1;
		this._clickClip.strokeColor = 1;
		this._clickClip.fillColor = 0xff;
		this._clickClip.fillAlpha = 0;
		this.addChild(this._clickClip);

		this._topLeftBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._topLeftBar);

		this._topBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._topBar);

		this._topRight = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._topRight);

		this._leftBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._leftBar);

		this._rightBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._rightBar);

		this._bottomLeftBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._bottomLeftBar);

		this._bottomBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._bottomBar);

		this._bottomRightBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._bottomRightBar);

		this._bottomTool = new BottomTool().sender(this);
		this.addChild(this._bottomTool);

		this._drawContainer = new eui.Group();
		this.addChild(this._drawContainer);
		this._drawContainer.touchEnabled = false;

		this.addEvent();
	}

	public bottomToolClick(commondType:number):void
	{
		if (commondType == BottomTool.COMMAND_PHOTO)
		{
			this.dispatchEvent(new egret.Event(ClipMask.CONFIRM_SNIPPING));
		} else if (commondType == BottomTool.COMMAND_PHOTO_SHARE)
		{
			this.dispatchEvent(new egret.Event(ClipMask.PHOTO_SHARE));
		} else if (commondType == BottomTool.COMMAND_PHOTO_CANCEL)
		{
			this.dispatchEvent(new egret.Event(ClipMask.CANCEL_SNIPPING));
		}
	}

	public show():void
	{
		this.visible = true;
	}

	public hide():void
	{
		this.visible = false;
	}

	public setStart(p:egret.Point):void
	{
		if (this._topLeftBar)
		{
			this._topLeftBar.x = p.x;
			this._topLeftBar.y = p.y;
		}
		this._selectObj = this._topLeftBar;
		this.onStageMove(null);
	}

	public moveToP(p:egret.Point):void
	{
		if (this._bottomRightBar)
		{
			this._bottomRightBar.x = p.x;
			this._bottomRightBar.y = p.y;
		}
		this._selectObj = this._bottomRightBar;
		this.onStageMove(null);
	}

	private addEvent():void
	{
		this.removeEvent();
		global.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClipMouseDown, this);
		this._clickClip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClipClick, this);
	}

	private onClipClick(ev:egret.TouchEvent):void
	{
		if (egret.getTimer() - this._clickTime < 500)
		{
			this.dispatchEvent(new egret.Event(ClipMask.CONFIRM_SNIPPING));
		}
		this._clickTime = egret.getTimer();
	}

	private removeEvent():void
	{
		this._clickClip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClipClick, this);
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClipMouseDown, this);
	}

	private onClipMouseDown(event:egret.TouchEvent):void
	{
		this._lastP.setTo(event.stageX, event.stageY);

		if (global.stage)
		{
			this._selectObj = event.target;
			global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
			global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
			global.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageUp, this);
		}
	}

	private onStageUp(event:egret.TouchEvent):void
	{
		if (global.stage)
		{
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
			global.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageUp, this);

			this.onStageMove(null);

			var temp:number = 0;
			if (this._leftBar.x > this._rightBar.x)
			{
				temp = this._leftBar.x;
				this._leftBar.x = this._rightBar.x;
				this._rightBar.x = temp;
				this.updateControlBarPosition(this._leftBar);
				this.updateControlBarPosition(this._rightBar);
			}
			if (this._topBar.y > this._bottomBar.y)
			{
				temp = this._topBar.y;
				this._topBar.y = this._bottomBar.y;
				this._bottomBar.y = temp;
				this.updateControlBarPosition(this._topBar);
				this.updateControlBarPosition(this._bottomBar);
			}
		}
	}

	private onStageMove(event:egret.TouchEvent):void
	{
		if (this._selectObj == null) return;
		if (event)
		{
			var temp = new egret.Point(event.stageX, event.stageY).subtract(this._lastP);
			this._selectObj.x += temp.x;
			this._selectObj.y += temp.y;
			this._lastP.setTo(event.stageX, event.stageY);
		}

		if (this._selectObj.x <= 0)
		{
			this._selectObj.x = 0;
		}
		if (this._selectObj.y <= 0)
		{
			this._selectObj.y = 0;
		}

		if (global.stage)
		{
			if (this._selectObj.x >= global.stage.stageWidth - this._selectObj.width)
			{
				this._selectObj.x = global.stage.stageWidth - this._selectObj.width;
			}

			if (this._selectObj.y >= global.stage.stageHeight - this._selectObj.height)
			{
				this._selectObj.y = global.stage.stageHeight - this._selectObj.height;
			}
		}

		if (this._selectObj instanceof ControlBar)
		{
			this.updateControlBarPosition(this._selectObj);
			this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));

			if (this._rectMask)
			{
				this._rectMask.width = this._bounds.width;
				this._rectMask.height = this._bounds.height;
				this._rectMask.x = this._bounds.x;
				this._rectMask.y = this._bounds.y;
			}

			if (this._clickClip)
			{
				this._clickClip.width = this._bounds.width;
				this._clickClip.height = this._bounds.height;
				this._clickClip.x = this._bounds.x;
				this._clickClip.y = this._bounds.y;
			}
		}
		else if (this._selectObj == this._clickClip)
		{
			if (this._rectMask)
			{
				this._rectMask.x = this._clickClip.x;
				this._rectMask.y = this._clickClip.y;
				this._rectMask.width = this._clickClip.width;
				this._rectMask.height = this._clickClip.height;
			}

			var haltW:number = this._defaultW * .5;
			this._topLeftBar.x = this._clickClip.x - haltW;
			this._topLeftBar.y = this._clickClip.y - haltW;
			this.updateControlBarPosition(this._topLeftBar);
			this._bottomRightBar.x = this._clickClip.x + this._clickClip.width - haltW;
			this._bottomRightBar.y = this._clickClip.y + this._clickClip.height - haltW;
			this.updateControlBarPosition(this._bottomRightBar);
		}
		this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
		this.updateBottomToolPosition();
	}

	public updateAdjustPosition():void
	{
		if (this._clickClip)
		{
			this._clickClip.x = (global.curWidth() - this._clickClip.width) * .5;
			this._clickClip.y = (global.curHeight() - this._clickClip.height) * .5;
		}
		if (this._rectMask)
		{
			this._rectMask.x = this._clickClip.x;
			this._rectMask.y = this._clickClip.y;
			this._rectMask.width = this._clickClip.width;
			this._rectMask.height = this._clickClip.height;
		}

		var haltW:number = this._defaultW * .5;
		this._topLeftBar.x = this._clickClip.x - haltW;
		this._topLeftBar.y = this._clickClip.y - haltW;
		this.updateControlBarPosition(this._topLeftBar);
		this._bottomRightBar.x = this._clickClip.x + this._clickClip.width - haltW;
		this._bottomRightBar.y = this._clickClip.y + this._clickClip.height - haltW;
		this.updateControlBarPosition(this._bottomRightBar);

		this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
		this.updateBottomToolPosition();
	}

	/*
	 * 工具条位置
	 * */
	private updateBottomToolPosition():void
	{
		this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
		if (this._bottomTool)
		{
			if (this._bounds.y > global.stage.stageHeight - this._bounds.height - this._bottomTool.height)
			{
				this._bottomTool.y = this._bounds.y - this._bottomTool.height - 5;
			} else
			{
				this._bottomTool.y = this._bounds.bottom + 5;
			}
			this._bottomTool.x = this._bounds.right - this._bottomTool.width;
			this._bottomTool.x = this._bottomTool.x <= 0 ? 0 : this._bottomTool.x;
		}
	}

	private updateControlBarPosition(selectObj:Object = null):void
	{
		var drawBounds:egret.Rectangle = this.getDrawBounds();
		if (selectObj == this._topLeftBar)
		{
			if (drawBounds)
			{
				this._topLeftBar.x = this._topLeftBar.x >= drawBounds.left ? drawBounds.left : this._topLeftBar.x;
				this._topLeftBar.y = this._topLeftBar.y >= drawBounds.top ? drawBounds.top : this._topLeftBar.y;
			}
			this._leftBar.x = this._bottomLeftBar.x = this._topLeftBar.x;
			this._topBar.y = this._topRight.y = this._topLeftBar.y;
		} else if (selectObj == this._topBar)
		{
			if (drawBounds)
			{
				this._topBar.y = this._topBar.y >= drawBounds.top ? drawBounds.top : this._topBar.y;
			}
			this._bottomBar.x = this._topBar.x;
			this._topLeftBar.y = this._topRight.y = this._topBar.y;
		} else if (selectObj == this._topRight)
		{
			if (drawBounds)
			{
				this._topRight.x = this._topRight.x <= drawBounds.right ? drawBounds.right : this._topRight.x;
				this._topRight.y = this._topRight.y >= drawBounds.top ? drawBounds.top : this._topRight.y;
			}
			this._rightBar.x = this._bottomRightBar.x = this._topRight.x;
			this._topLeftBar.y = this._topBar.y = this._topRight.y;
		} else if (selectObj == this._leftBar)
		{
			if (drawBounds)
			{
				this._leftBar.x = this._leftBar.x >= drawBounds.left ? drawBounds.left : this._leftBar.x;
			}
			this._topLeftBar.x = this._bottomLeftBar.x = this._leftBar.x;
			this._rightBar.y = this._leftBar.y;
		} else if (selectObj == this._rightBar)
		{
			if (drawBounds)
			{
				this._rightBar.x = this._rightBar.x <= drawBounds.right ? drawBounds.right : this._rightBar.x;
			}
			this._topRight.x = this._bottomRightBar.x = this._rightBar.x;
			this._leftBar.y = this._rightBar.y;
		} else if (selectObj == this._bottomLeftBar)
		{
			if (drawBounds)
			{
				this._bottomLeftBar.x = this._bottomLeftBar.x >= drawBounds.left ? drawBounds.left : this._bottomLeftBar.x;
				this._bottomLeftBar.y = this._bottomLeftBar.y <= drawBounds.bottom ? drawBounds.bottom : this._bottomLeftBar.y;
			}
			this._topLeftBar.x = this._leftBar.x = this._bottomLeftBar.x;
			this._bottomBar.y = this._bottomRightBar.y = this._bottomLeftBar.y;
		} else if (selectObj == this._bottomBar)
		{
			if (drawBounds)
			{
				this._bottomBar.y = this._bottomBar.y <= drawBounds.bottom ? drawBounds.bottom : this._bottomBar.y;
			}
			this._topBar.x = this._bottomBar.x;
			this._bottomLeftBar.y = this._bottomRightBar.y = this._bottomBar.y;
		} else if (selectObj == this._bottomRightBar)
		{
			if (drawBounds)
			{
				this._bottomRightBar.x = this._bottomRightBar.x <= drawBounds.right ? drawBounds.right : this._bottomRightBar.x;
				this._bottomRightBar.y = this._bottomRightBar.y <= drawBounds.bottom ? drawBounds.bottom : this._bottomRightBar.y;
			}
			this._topRight.x = this._rightBar.x = this._bottomRightBar.x;
			this._bottomLeftBar.y = this._bottomBar.y = this._bottomRightBar.y;
		}

		this._topBar.x = this._topLeftBar.x + (this._topRight.x - this._topLeftBar.x) * .5;
		this._bottomBar.x = this._bottomLeftBar.x + (this._bottomRightBar.x - this._bottomLeftBar.x) * .5;
		this._leftBar.y = this._topLeftBar.y + (this._bottomLeftBar.y - this._topLeftBar.y) * .5;
		this._rightBar.y = this._topRight.y + (this._bottomRightBar.y - this._topRight.y) * .5;

		if (this._canvas)
		{
			this._canvas.graphics.clear();
			this._canvas.graphics.lineStyle(1, 0x0);
			this._canvas.graphics.beginFill(0x0, 0);
			this._canvas.graphics.drawRect(this._topLeftBar.x + this._defaultW * .5, this._topLeftBar.y + this._defaultW * .5, this._topRight.x - this._topLeftBar.x, this._bottomLeftBar.y - this._topLeftBar.y);
			this._canvas.graphics.endFill();
		}
	}

	private getDrawBounds():egret.Rectangle
	{
		if (this._drawContainer)
		{
			var rect:egret.Rectangle = this._drawContainer.getBounds(new egret.Rectangle(0, 0, this.width, this.height));
			if (rect.width == 0 && rect.height == 0)
			{
				return null;
			} else
			{
				this._rect.x = rect.x - 5;
				this._rect.y = rect.y - 5;
				this._rect.width = rect.width + 5;
				this._rect.height = rect.height + 5;
			}
			return this._rect;
		}
		return null;
	}

	get bounds():egret.Rectangle
	{
		return this._bounds;
	}

	get rectMask():eui.Rect
	{
		return this._rectMask;
	}

	//截图前要做的一些事情
	public snippingBeforeSomeThing():void
	{
		if (this._canvas)
		{
			this._canvas.graphics.clear();
		}
		if (this._clickClip)
		{
			this._clickClip.graphics.clear();
		}
		if (this._rectMask)
		{
			this._rectMask.graphics.clear();
		}

		this._topLeftBar && (this._topLeftBar.visible = false);
		this._topBar && (this._topBar.visible = false);
		this._topRight && (this._topRight.visible = false);
		this._leftBar && (this._leftBar.visible = false);
		this._rightBar && (this._rightBar.visible = false);
		this._bottomLeftBar && (this._bottomLeftBar.visible = false);
		this._bottomBar && (this._bottomBar.visible = false);
		this._bottomRightBar && (this._bottomRightBar.visible = false);
	}

	public destroy():void
	{
		this.removeEvent();
		this.removeChildren();
		if (this._drawContainer)
		{
			this._drawContainer.removeChildren();
			this._drawContainer = null;
		}
		if (this._topLeftBar)
		{
			this._topLeftBar.destroy();
			this._topLeftBar = null;
		}
		if (this._topBar)
		{
			this._topBar.destroy();
			this._topBar = null;
		}
		if (this._topRight)
		{
			this._topRight.destroy();
			this._topRight = null;
		}
		if (this._leftBar)
		{
			this._leftBar.destroy();
			this._leftBar = null;
		}
		if (this._rightBar)
		{
			this._rightBar.destroy();
			this._rightBar = null;
		}
		if (this._bottomLeftBar)
		{
			this._bottomLeftBar.destroy();
			this._bottomLeftBar = null;
		}
		if (this._bottomBar)
		{
			this._bottomBar.destroy();
			this._bottomBar = null;
		}
		if (this._bottomRightBar)
		{
			this._bottomRightBar.destroy();
			this._bottomRightBar = null;
		}
		if (this._bottomTool)
		{
			this._bottomTool.destroy();
			this._bottomTool = null;
		}
		this._rect = null;
		this._bounds = null;
		this._canvas = null;
		this._rectMask = null;
		this._selectObj = null;
		this._clickClip = null;
	}
}

//控制点
class ControlBar extends eui.Group
{
	private _rect:eui.Rect;
	private _color:number;
	private _w:number;

	constructor(color:number = 0x0, w:number = 8)
	{
		super();
		this._color = color;
		this._w = w;

		this._rect = new eui.Rect();
		this._rect.strokeColor = 0;
		this._rect.strokeAlpha = 1;
		this._rect.strokeWeight = 1;
		this._rect.fillColor = this._color;

		this._rect.width = this._w;
		this._rect.height = this._w;
		this.addChild(this._rect);
		this._rect.touchChildren = false;
		this._rect.touchEnabled = false;
	}

	public destroy():void
	{
		this.removeChildren();
		this._rect = null;
	}
}

class BottomTool extends eui.Group
{
	public static TOTAL_WIDTH:number = 150;
	public static TOTAL_HEIGHT:number = 50;

	/*
	 * 截图
	 * */
	public static COMMAND_PHOTO:number = 1;
	/*
	 * 分享
	 * */
	public static COMMAND_PHOTO_SHARE:number = 2;
	/*
	 * 取消截图
	 * */
	public static COMMAND_PHOTO_CANCEL:number = 3;

	private _container:eui.Group;
	private _containerLayout:eui.HorizontalLayout;
	private _bg:eui.Rect;

	private _btnPhoto:CButton;
	private _btnShare:CButton;
	private _btnCancel:CButton;
	private _sender:ClipMask;

	constructor()
	{
		super();
	}

	protected createChildren():void
	{
		super.createChildren();

		this._bg = new eui.Rect();
		this._bg.touchEnabled = false;
		this._bg.touchChildren = false;
		this.addChild(this._bg);
		this._bg.fillColor = 0xffffff;
		this._bg.ellipseHeight = 10;
		this._bg.ellipseWidth = 10;
		this._bg.width = BottomTool.TOTAL_WIDTH;
		this._bg.height = BottomTool.TOTAL_HEIGHT;

		this._containerLayout = new eui.HorizontalLayout();
		this._containerLayout.gap = 5;
		this._containerLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._container = new eui.Group();
		this._container.touchEnabled = false;
		this._container.layout = this._containerLayout;
		this.addChild(this._container);
		this._container.verticalCenter = 0;
		this._container.horizontalCenter = 0;

		this._btnPhoto = new CButton(CButtonType.buttonPhoto);
		this._container.addChild(this._btnPhoto);

		this._btnShare = new CButton(CButtonType.buttonPhotoShare);
		this._container.addChild(this._btnShare);

		this._btnCancel = new CButton(CButtonType.buttonPhotoCancel);
		this._container.addChild(this._btnCancel);

		this.addEvent();
	}

	private addEvent():void
	{
		this.removeEvent();
		if (this._container)
		{
			this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		}
	}

	private removeEvent():void
	{
		if (this._container)
		{
			this._container.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		}
	}

	private onClickHandler(event:egret.TouchEvent):void
	{
		var target:Object = event.target;
		var commandType:number = 0;
		switch (target)
		{
			case this._btnPhoto:
				commandType = BottomTool.COMMAND_PHOTO;
				break;
			case this._btnShare:
				commandType = BottomTool.COMMAND_PHOTO_SHARE;
				break;
			case this._btnCancel:
				commandType = BottomTool.COMMAND_PHOTO_CANCEL;
				break;
		}
		if (this._sender != null)
		{
			this._sender.bottomToolClick(commandType);
		}
	}

	sender(value:ClipMask):BottomTool
	{
		this._sender = value;
		return this;
	}

	destroy():void
	{
		this.removeEvent();
		this.removeChildren();
		if (this._container)
		{
			this._container.removeChildren();
			this._container = null;
		}
		this._containerLayout = null;
		this._bg = null;
		this._sender = null;
	}
}