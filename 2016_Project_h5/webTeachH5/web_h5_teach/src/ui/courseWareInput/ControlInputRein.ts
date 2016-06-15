/**
 * Created by Administrator on 2016/4/27.
 * 输入工具控制条及工具栏
 */
class ControlInputRein extends eui.Group
{
	/*
	 * 间距
	 * */
	private minGap:number = 50;

	private _topLeftBar:ControlBar;
	private _topRight:ControlBar;

	private _bottomLeftBar:ControlBar;
	private _bottomRightBar:ControlBar;

	private _selectObj:any;

	private _defaultW:number = 10;
	private _defaultColor:number = 0xffffff;

	private _bounds:egret.Rectangle;

	private _canvas:egret.Sprite;

	//所有绘制图形及文本都放置在该层
	private _drawContainer:eui.Group;

	//当前绘制区域的边界
	private _rect:egret.Rectangle;

	private _lastP:egret.Point = new egret.Point();

	/*
	 * h5中遮罩不被点击，故加点击层
	 * */
	private _clickClip:eui.Rect;

	public static CHANGE_POSITION_SIZE:string = "change_position_size";

	/*
	 * 用来测试是单击还是移动
	 * */
	private _clickP:egret.Point = new egret.Point();

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

		this._clickClip = new eui.Rect();
		this._clickClip.strokeWeight = 1;
		this._clickClip.strokeColor = 1;
		this._clickClip.fillColor = 0xff;
		this._clickClip.fillAlpha = 0;
		this.addChildAt(this._clickClip, 0);

		this._topLeftBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._topLeftBar);

		this._topRight = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._topRight);

		this._bottomLeftBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._bottomLeftBar);

		this._bottomRightBar = new ControlBar(this._defaultColor, this._defaultW);
		this.addChild(this._bottomRightBar);

		this._drawContainer = new eui.Group();
		this.addChild(this._drawContainer);
		this._drawContainer.touchEnabled = false;

		this.addEvent();
	}

	public show():void
	{
		this.visible = true;
	}

	public hide():void
	{
		this.visible = false;
	}

	private _controlRegion:egret.Rectangle = new egret.Rectangle();
	/*
	 * 控制区域的大小
	 * */
	public controlRegion():egret.Rectangle
	{
		this._controlRegion.x = this._topLeftBar.x;
		this._controlRegion.y = this._topLeftBar.y;
		this._controlRegion.width = this._topRight.x - this._topLeftBar.x;
		this._controlRegion.height = this._bottomRightBar.y - this._topRight.y;
		return this._controlRegion;
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
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClipMouseDown, this, true);
	}

	private removeEvent():void
	{
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClipMouseDown, this, true);
	}

	private onClipMouseDown(event:egret.TouchEvent):void
	{
		this._lastP.setTo(event.stageX, event.stageY);
		this._clickP.setTo(event.stageX, event.stageY);

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
			if (this._topLeftBar.x > this._topRight.x)
			{
				temp = this._topLeftBar.x;
				this._topLeftBar.x = this._topRight.x;
				this._topRight.x = temp;
				this.updateControlBarPosition(this._topLeftBar);
				this.updateControlBarPosition(this._topRight);
			}
			if (this._topLeftBar.y > this._bottomLeftBar.y)
			{
				temp = this._topLeftBar.y;
				this._topLeftBar.y = this._bottomLeftBar.y;
				this._bottomLeftBar.y = temp;
				this.updateControlBarPosition(this._topLeftBar);
				this.updateControlBarPosition(this._bottomLeftBar);
			}
		}
		this.dispatchEvent(new egret.Event(ControlInputRein.CHANGE_POSITION_SIZE));

		let endP:egret.Point = new egret.Point(event.stageX, event.stageY);
		if (this._clickP.equals(endP))
		{
			this._clickClip.touchEnabled = false;
			GlobalData.persistInputState = false;
		} else
		{
			let state:CoursewareInputState = GlobalData.coursewareInput.state;
			if (state == CoursewareInputState.selectable || state == CoursewareInputState.editable)
			{
				this._clickClip.touchEnabled = false;
			} else
			{
				this._clickClip.touchEnabled = true;
			}
			GlobalData.persistInputState = true;
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
			var haltW:number = this._defaultW * .5;
			this._topLeftBar.x = this._clickClip.x - haltW;
			this._topLeftBar.y = this._clickClip.y - haltW;
			this.updateControlBarPosition(this._topLeftBar);
			this._bottomRightBar.x = this._clickClip.x + this._clickClip.width - haltW;
			this._bottomRightBar.y = this._clickClip.y + this._clickClip.height - haltW;
			this.updateControlBarPosition(this._bottomRightBar);
		}
		this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));

		this.dispatchEvent(new egret.Event(ControlInputRein.CHANGE_POSITION_SIZE));
	}

	private updateControlBarPosition(selectObj:Object = null):void
	{
		let offValue:number = 0;
		if (selectObj == this._topLeftBar)
		{
			if (this._topRight.x > this._topLeftBar.x)
			{
				offValue = this._topRight.x - this.minGap;
				if (offValue > 0 && this._topLeftBar.x >= offValue)
				{
					this._topLeftBar.x = offValue;
				}
			}

			if (this._bottomLeftBar.y > this._topLeftBar.y)
			{
				offValue = this._bottomLeftBar.y - this.minGap;
				if (offValue > 0 && this._topLeftBar.y >= offValue)
				{
					this._topLeftBar.y = offValue;
				}
			}
			this._bottomLeftBar.x = this._topLeftBar.x;
			this._topRight.y = this._topLeftBar.y;
		} else if (selectObj == this._topRight)
		{
			if (this._topLeftBar.x < this._topRight.x)
			{
				offValue = this._topLeftBar.x + this.minGap;
				if (offValue > 0 && this._topRight.x <= offValue)
				{
					this._topRight.x = offValue;
				}
			}

			if (this._bottomRightBar.y > this._topRight.y)
			{
				offValue = this._bottomRightBar.y - this.minGap;
				if (offValue > 0 && this._topRight.y >= offValue)
				{
					this._topRight.y = offValue;
				}
			}

			this._bottomRightBar.x = this._topRight.x;
			this._topLeftBar.y = this._topRight.y;
		} else if (selectObj == this._bottomLeftBar)
		{
			if (this._bottomRightBar.x > this._bottomLeftBar.x)
			{
				offValue = this._bottomRightBar.x - this.minGap;
				if (offValue > 0 && this._bottomLeftBar.x >= offValue)
				{
					this._bottomLeftBar.x = offValue;
				}
			}

			if (this._topLeftBar.y < this._bottomLeftBar.y)
			{
				offValue = this._topLeftBar.y + this.minGap;
				if (offValue > 0 && this._bottomLeftBar.y <= offValue)
				{
					this._bottomLeftBar.y = offValue;
				}
			}

			this._topLeftBar.x = this._bottomLeftBar.x;
			this._bottomRightBar.y = this._bottomLeftBar.y;
		} else if (selectObj == this._bottomRightBar)
		{
			if (this._bottomLeftBar.x < this._bottomRightBar.x)
			{
				offValue = this._bottomLeftBar.x + this.minGap;
				if (offValue > 0 && this._bottomRightBar.x <= offValue)
				{
					this._bottomRightBar.x = offValue;
				}
			}

			if (this._topRight.y < this._bottomRightBar.y)
			{
				offValue = this._topRight.y + this.minGap;
				if (offValue > 0 && this._bottomRightBar.y <= offValue)
				{
					this._bottomRightBar.y = offValue;
				}
			}

			this._topRight.x = this._bottomRightBar.x;
			this._bottomLeftBar.y = this._bottomRightBar.y;
		}

		if (this._canvas)
		{
			this._canvas.graphics.clear();
			this._canvas.graphics.lineStyle(1, 0x34B9E6);
			this._canvas.graphics.beginFill(0x0, 0);
			this._canvas.graphics.drawRect(this._topLeftBar.x + this._defaultW * .5, this._topLeftBar.y + this._defaultW * .5, this._topRight.x - this._topLeftBar.x, this._bottomLeftBar.y - this._topLeftBar.y);
			this._canvas.graphics.endFill();
		}
	}

	/*
	 * 更新位置
	 * */
	public updatePosition(input:CoursewareInput):void
	{
		this.setStart(new egret.Point(input.x - 10, input.y - 10));
		this.moveToP(new egret.Point(input.x + input.width, input.y + input.height));
	}

	get bounds():egret.Rectangle
	{
		return this._bounds;
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
		if (this._topRight)
		{
			this._topRight.destroy();
			this._topRight = null;
		}
		if (this._bottomLeftBar)
		{
			this._bottomLeftBar.destroy();
			this._bottomLeftBar = null;
		}
		if (this._bottomRightBar)
		{
			this._bottomRightBar.destroy();
			this._bottomRightBar = null;
		}
		this._rect = null;
		this._bounds = null;
		this._canvas = null;
		this._selectObj = null;
		this._clickClip = null;
	}
}