/**
 * Created by xiaoding on 2016/3/10.
 */
class PanelColor extends PanelEx
{
	private _colorPicker:ColorPicker;

	constructor()
	{
		super();
		this._colorPicker = new ColorPicker().setChooseColor(this.onChooseColor);
		this.addChild(this._colorPicker);
		this.width = this._colorPicker.width;
		this.height = this._colorPicker.height;
	}

	public panelType():PanelTypes
	{
		return PanelTypes.PANEL_COLOR;
	}

	private onChooseColor(color:number):void
	{
		global.color = color;
		var timeId:number = egret.setTimeout(function ():void
		{
			xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, {panelType: PanelTypes.PANEL_COLOR});
			egret.clearTimeout(timeId);
		}, this, 120);
	}

	protected createChildren():void
	{
		super.createChildren();
		this.removeChildren();
		this.touchEnabled = false;
		this.addChild(this._colorPicker);
	}

	protected updatePosition():void
	{
		egret.callLater(this.resetPosition, this, 100);
	}

	private resetPosition():void
	{
		var position = this.positionAttribute;
		this.x = position.initX;
		this.bottom = position.bottom;
	}

	public closeAnimatePos():egret.Point
	{
		var point:egret.Point = GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_COLOR);
		return point;
	}

	public get positionAttribute():any
	{
		var point:egret.Point = GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_COLOR);
		return {bottom: 0, initX: point.x + 20};
	}
}