/**
 * Created by xiaoding on 2016/3/10.
 */
class PanelCallRoll extends PanelEx
{
	private _scroller:eui.Scroller;

	constructor()
	{
		super();
		this.width = 700;
		this.height = 300;
	}

	public panelType():PanelTypes
	{
		return PanelTypes.PANEL_CALL_ROLL;
	}

	protected createChildren():void
	{
		super.createChildren();
	}

	public get positionAttribute():any
	{
		return {bottom: 54, horizontalCenter: 0};
	}

	public closeAnimatePos():egret.Point
	{
		return GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_CALL_ROLL);
	}
}