/**
 * Created by xiaoding on 2016/3/10.
 */
class PanelMediator implements IGetIPanelExByPanelType
{
	private _panelArr:PanelEx[];
	private _obj:Object;

	constructor()
	{
		this._obj = new Object();
		this._panelArr = new Array();
		xd.GameDispatcher.addEventListener(GameEventName.CLOSE_PANEL, this.closePanelHandler, this);
		GlobalInterface.getIPanelExByPanelType = this;
	}

	private closePanelHandler(ev:xd.GameEvent):void
	{
		var panelType:PanelTypes = ev.param.panelType;
		if (panelType)
		{
			this.closePanel(panelType);
		}
	}

	/*
	 * 打开面板
	 * */
	public openPanel(panelType:PanelTypes):void
	{
		var panel:PanelEx = this._obj[panelType];
		if (!panel)
		{
			panel = this.getPanel(panelType);
			this._obj[panelType] = panel;
			this._panelArr.push(panel);
		}
		PopUpManager.addPopUp(panel, false, panel.positionAttribute, 1);
	}

	public closePanel(panelType:PanelTypes):void
	{
		var panel:PanelEx = this._obj[panelType];
		if (panel)
		{
			if (panel.isShow)
			{
				PopUpManager.removePopUp(panel, 0);
			}
		}
	}

	public switchPanel(panelType:PanelTypes):void
	{
		var panel:PanelEx = this._obj[panelType];
		if (!panel)
		{
			panel = this.getPanel(panelType);
			this._obj[panelType] = panel;
			this._panelArr.push(panel);
			PopUpManager.addPopUp(panel, false, panel.positionAttribute, 1);
		} else
		{
			if (panel.isShow())
			{
				PopUpManager.removePopUp(panel, 1);
			} else
			{
				PopUpManager.addPopUp(panel, false, panel.positionAttribute, 1);
			}
		}
	}

	private getPanel(panelType:PanelTypes):PanelEx
	{
		var panelEx:PanelEx;
		switch (panelType)
		{
			case PanelTypes.PANEL_CALL_ROLL:
				panelEx = new PanelCallRoll();
				break;
			case PanelTypes.PANEL_COLOR:
				panelEx = new PanelColor();
				break;
		}
		return panelEx;
	}

	public getIPanelExByPanelType(panelType:PanelTypes):IPanelEx
	{
		var panel:IPanelEx = this._obj[panelType];
		return panel;
	}

	private static _instance:PanelMediator = null;
	public static get instance():PanelMediator
	{
		if (PanelMediator._instance == null)
		{
			PanelMediator._instance = new PanelMediator();
		}
		return PanelMediator._instance;
	}
}