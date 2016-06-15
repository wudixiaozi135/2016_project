/**
 * Created by xiaoding on 2016/3/14.
 */
class CoursewareToolBar extends eui.Group implements ICoursewareToolbar
{
	/*
	 * 事件的主人
	 * */
	public master:ICourseware;

	private _container:eui.Group;

	private _btnRecover:CButton;
	private _btnPen:CButton;
	private _btnEraser:CButton;
	private _btnRotate:CButton;
	private _btnZoomIn:CButton;
	private _btnZoomOut:CButton;

	private _w:number;
	private _h:number;

	constructor(w:number = 225, h:number = 40)
	{
		super();
		this._w = w;
		this._h = h;
		this.width = this._w;
		this.height = this._h;
	}

	protected createChildren():void
	{
		super.createChildren();

		var rect:eui.Rect = new eui.Rect();
		rect.fillAlpha = 1;
		rect.fillColor = 0xF1F1F1;
		rect.ellipseHeight = 10;
		rect.ellipseWidth = 10;
		rect.width = this._w;
		rect.height = this._h;
		this.addChild(rect);
		rect.touchChildren = false;
		rect.touchEnabled = false;


		this._container = new eui.Group();
		this._container.touchEnabled = false;

		var horizontal:eui.HorizontalLayout = new eui.HorizontalLayout();
		horizontal.gap = 5;
		this._container.layout = horizontal;
		this.addChild(this._container);
		this._container.horizontalCenter = 0;
		this._container.verticalCenter = 0;

		this._btnRecover = new CButton(CButtonType.buttonMenuReCover);
		this._container.addChild(this._btnRecover);

		this._btnPen = new CButton(CButtonType.buttonMenuDrawPen);
		this._container.addChild(this._btnPen);

		this._btnEraser = new CButton(CButtonType.buttonMenuEraser);
		this._container.addChild(this._btnEraser);

		this._btnRotate = new CButton(CButtonType.buttonMenuRotate90);
		this._container.addChild(this._btnRotate);

		this._btnZoomIn = new CButton(CButtonType.buttonMenuZoomIn);
		this._container.addChild(this._btnZoomIn);

		this._btnZoomOut = new CButton(CButtonType.buttonMenuZoomOut);
		this._container.addChild(this._btnZoomOut);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		var target:any = e.target;
		if (target == this._btnRecover)
		{
			if (this.master)
			{
				this.master.reCover.call(this.master);
			}
		} else if (target == this._btnEraser)
		{
			if (this.master)
			{
				this.master.eraser.call(this.master);
			}
		} else if (target == this._btnPen)
		{
			if (this.master)
			{
				this.master.draw.call(this.master);
			}
		} else if (target == this._btnRotate)
		{
			if (this.master)
			{
				this.master.rotate.call(this.master);
			}
		} else if (target == this._btnZoomIn)
		{
			if (this.master)
			{
				this.master.zoomIn.call(this.master);
			}
		} else if (target == this._btnZoomOut)
		{
			if (this.master)
			{
				this.master.zoomOut.call(this.master);
			}
		}
	}

	removeSelf():void
	{
	}
}