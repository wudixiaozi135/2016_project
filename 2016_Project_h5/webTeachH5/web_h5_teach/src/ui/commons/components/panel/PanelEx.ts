/**
 * Created by xiaoding on 2016/2/19.
 */
class PanelEx extends eui.Panel implements IPanelEx
{
	public playStartAnimateFinish:boolean=false;
	private _isShow:boolean = false;
	private _isPlay:boolean = false;
	constructor()
	{
		super();
		this.skinName = "resource/skinsEx/PanelSkinEx.exml";
		xd.GameDispatcher.addEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
		this.addEventListener(egret.Event.ADDED, this.onAddHandler, this);
		this.addEventListener(egret.Event.REMOVED, this.onRemoveHandler, this);
	}

	private onAddHandler(ev:egret.Event):void
	{
		if (ev.target == this)
		{
			this._isShow = true;
		}
	}

	private onRemoveHandler(ev:egret.Event):void
	{
		if (ev.target == this)
		{
			this._isShow = false;
		}
	}

	protected onStageResize(ev:xd.GameEvent):void
	{
		this.updatePosition();
	}

	protected onTouchMove(event:egret.TouchEvent):void
	{
		super.onTouchMove(event);
		this.updatePosition();
	}

	protected updatePosition():void
	{
		var rect:egret.Rectangle = this.panelRect();
		var borderW = global.curWidth() - rect.width;
		var borderH = global.curHeight() - rect.height;
		this.x = this.x <= 0 ? 0 : this.x;
		this.x = this.x >= borderW ? borderW : this.x;

		this.y = this.y <= 0 ? 0 : this.y;
		this.y = this.y >= borderH ? borderH : this.y;
	}

	protected onTouchEnd(event:egret.TouchEvent):void
	{
		if (this.isPlay) return;

		super.onTouchEnd(event);
		this.updatePosition();
	}

	/*
	 * 关闭面板动画位置,默认在中间
	 * */
	public closeAnimatePos():egret.Point
	{
		return new egret.Point(global.curWidth() * .5, global.curHeight() * .5);
	}

	/*
	 * 界面是否被打开
	 * addChild 打开
	 * removeChild 关闭
	 * */
	public isShow():boolean
	{
		return this._isShow;
	}

	/*
	 * 位置属性，影响面板打开的位置
	 * */
	public get positionAttribute():any
	{
		return {horizontalCenter: 0, verticalCenter: 0};
	}

	/*
	 * 强制不能设置visible
	 * */
	$setVisible(value:boolean):boolean
	{
		throw new Error("The function is not called");
	}

	/*
	 * 面板的边界，定位使用
	 * */
	public panelRect():egret.Rectangle
	{
		return new egret.Rectangle(this.x, this.y, this.width, this.height);
	}

	public panelType():PanelTypes
	{
		return null;
	}

	/*
	 * 是否在动画状态
	 * */
	get isPlay():boolean
	{
		return this._isPlay;
	}

	set isPlay(value:boolean)
	{
		this._isPlay = value;
	}

	close():void
	{
		super.close();
		xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, {panelType: this.panelType()});
	}

	public isShowCompleted():boolean
	{
		return this.playStartAnimateFinish;
	}

	/*
	 * 析构函数
	 * 不建议调用
	 * 面板最好单态
	 * */
	public destroy():void
	{
		xd.GameDispatcher.removeEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
		this.removeChildren();
	}
}