/**
 * Created by xiaoding on 2016/3/11.
 */
var GlobalHandlerManager = (function () {
    function GlobalHandlerManager() {
    }
    GlobalHandlerManager.handlerStageClick = function (event) {
        var target = event.target;
        var getPanelEx = GlobalInterface.getIPanelExByPanelType;
        if (getPanelEx) {
            var panelEx = getPanelEx.getIPanelExByPanelType(PanelTypes.PANEL_COLOR);
            if (panelEx) {
                if (panelEx.isShow() && panelEx.isShowCompleted()) {
                    var rect = panelEx.panelRect();
                    if (!rect.contains(event.stageX, event.stageY)) {
                        xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, { panelType: PanelTypes.PANEL_COLOR });
                    }
                }
            }
        }
    };
    GlobalHandlerManager.handlerStageDown = function (e) {
        var target = e.target;
        if (egret.is(target, "ICourseware")) {
            var courseware = target;
            if (GlobalData.courseware != courseware) {
                GlobalData.courseware = target;
                var tool = GlobalInterface.courseMenuBar;
                var off = tool.width - target.width;
                tool.x = target.x - off;
                tool.y = target.y + target.height;
                tool.master = target;
                target.updateToolBarPosition();
            }
        }
    };
    return GlobalHandlerManager;
})();
//# sourceMappingURL=GlobalHandlerManager.js.map