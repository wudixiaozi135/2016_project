/**
 * Created by xiaoding on 2016/3/10.
 */
var PanelMediator = (function () {
    function PanelMediator() {
        this._obj = new Object();
        this._panelArr = new Array();
        xd.GameDispatcher.addEventListener(GameEventName.CLOSE_PANEL, this.closePanelHandler, this);
        GlobalInterface.getIPanelExByPanelType = this;
    }
    PanelMediator.prototype.closePanelHandler = function (ev) {
        var panelType = ev.param.panelType;
        if (panelType) {
            this.closePanel(panelType);
        }
    };
    /*
     * 打开面板
     * */
    PanelMediator.prototype.openPanel = function (panelType) {
        var panel = this._obj[panelType];
        if (!panel) {
            panel = this.getPanel(panelType);
            this._obj[panelType] = panel;
            this._panelArr.push(panel);
        }
        PopUpManager.addPopUp(panel, false, panel.positionAttribute, 1);
    };
    PanelMediator.prototype.closePanel = function (panelType) {
        var panel = this._obj[panelType];
        if (panel) {
            if (panel.isShow) {
                PopUpManager.removePopUp(panel, 0);
            }
        }
    };
    PanelMediator.prototype.switchPanel = function (panelType) {
        var panel = this._obj[panelType];
        if (!panel) {
            panel = this.getPanel(panelType);
            this._obj[panelType] = panel;
            this._panelArr.push(panel);
            PopUpManager.addPopUp(panel, false, panel.positionAttribute, 1);
        }
        else {
            if (panel.isShow()) {
                PopUpManager.removePopUp(panel, 1);
            }
            else {
                PopUpManager.addPopUp(panel, false, panel.positionAttribute, 1);
            }
        }
    };
    PanelMediator.prototype.getPanel = function (panelType) {
        var panelEx;
        switch (panelType) {
            case PanelTypes.PANEL_CALL_ROLL:
                panelEx = new PanelCallRoll();
                break;
            case PanelTypes.PANEL_COLOR:
                panelEx = new PanelColor();
                break;
        }
        return panelEx;
    };
    PanelMediator.prototype.getIPanelExByPanelType = function (panelType) {
        var panel = this._obj[panelType];
        return panel;
    };
    Object.defineProperty(PanelMediator, "instance", {
        get: function () {
            if (PanelMediator._instance == null) {
                PanelMediator._instance = new PanelMediator();
            }
            return PanelMediator._instance;
        },
        enumerable: true,
        configurable: true
    });
    PanelMediator._instance = null;
    return PanelMediator;
})();
//# sourceMappingURL=PanelMediator.js.map