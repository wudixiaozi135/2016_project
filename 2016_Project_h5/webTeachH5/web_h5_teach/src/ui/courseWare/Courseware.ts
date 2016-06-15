/**
 * Created by xiaoding on 2016/3/14.
 */
class Courseware extends eui.Group implements ICourseware
{
	private MAX_SCALE:number = 3.3;
	private MIN_SCALE:number = .1;
	private ORIGIN_SCALE:number = 1;

	private _courseType:CourseTypes;

	private _vo:CoursewareVo;

	private _bitmap:egret.Bitmap;

	private _container;

	private _offP:egret.Point;
	private _moveP:egret.Point;

	private _originW:number;
	private _originH:number;
	private _originScale:number;

	private _newScale:number = 1;

	constructor()
	{
		super();
		this._offP = new egret.Point();
		this._moveP = new egret.Point();

		this._container = new egret.Sprite();
		this.addChild(this._container);
		this._container.touchEnabled = false;

		var rect:eui.Rect = new eui.Rect();
		rect.percentWidth = 100;
		rect.percentHeight = 100;
		rect.fillAlpha = .5;
		rect.fillColor = 0xff0000;
		this.addChild(rect);
		rect.touchChildren = false;
		rect.touchEnabled = false;

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
	}

	private onTouchBeginHandler(ev:egret.TouchEvent):void
	{
		if (ev.target != this)
		{
			return;
		}

		if (this.parent)
		{
			this.parent.setChildIndex(this, this.parent.numChildren - 1);
		}

		this._offP.setTo(ev.stageX, ev.stageY);
		global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMoveHandler, this);
		global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageUpHandler, this);
	}

	private onStageMoveHandler(ev:egret.TouchEvent):void
	{
		this._moveP.setTo(ev.stageX, ev.stageY);
		this._offP = this._moveP.subtract(this._offP);
		this.x += this._offP.x;
		this.y += this._offP.y;
		this._offP.setTo(ev.stageX, ev.stageY);

		this.updateToolBarPosition();
	}

	/*
	 * 较正工具栏的位置
	 * */
	public updateToolBarPosition():void
	{
		var tool:CoursewareToolBar = <CoursewareToolBar> GlobalInterface.courseMenuBar;
		var parentP = this.parent;
		if (parentP && tool)
		{
			var rect = this._container.getTransformedBounds(parentP);
			var off:number = tool.width - rect.width;
			tool.x = rect.x - off;
			tool.y = rect.y + rect.height;
		}
	}

	private onStageUpHandler(ev:egret.TouchEvent):void
	{
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUpHandler, this);
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMoveHandler, this);
	}

	/*
	 * 设置资源
	 * */
	public setRes(vo:CoursewareVo):void
	{
		this._vo = vo;
		this.courseType = this._vo.courseType;
		this._bitmap = this._vo.res;

		this._container.addChild(this._bitmap);

		this._originW = this._container.width;
		this._originH = this._container.height;
		this._originScale = this._container.scaleX;
	}

	get canDragable():boolean
	{
		return true;
	}

	get courseType():CourseTypes
	{
		return this._courseType;
	}

	set courseType(value:CourseTypes)
	{
		this._courseType = value;
	}

	reCover():void
	{
		if (this._newScale == this.ORIGIN_SCALE && this._container.rotation == 0)
		{
			return;
		}
		this._newScale = this.ORIGIN_SCALE;
		xd.CommonUtils.centerRotate(this._container, 0);
		xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
		this.updateToolBarPosition();
	}

	draw():void
	{
	}

	eraser():void
	{
	}

	rotate():void
	{
		xd.CommonUtils.centerRotate(this._container, this._container.rotation + 90);

		this.updateToolBarPosition()
	}

	zoomIn():void
	{
		this._newScale += .3;
		if (this._newScale >= this.MAX_SCALE + this.ORIGIN_SCALE)
		{
			this._newScale = this.MAX_SCALE + this.ORIGIN_SCALE;
		}
		xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
	}

	zoomOut():void
	{
		this._newScale -= .3;
		if (this._newScale <= this.MIN_SCALE)
		{
			this._newScale = this.MIN_SCALE;
		}
		xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
	}
}