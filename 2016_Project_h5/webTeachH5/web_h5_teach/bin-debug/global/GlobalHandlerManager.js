/**
 * Created by xiaoding on 2016/3/11.
 */
var GlobalHandlerManager = (function () {
    function GlobalHandlerManager() {
    }
    var d = __define,c=GlobalHandlerManager,p=c.prototype;
    /*
     * 舞台单击事件
     * */
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
        else if (target instanceof DrawLayerUI) {
            global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPenMove, this);
            global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onPenEnd, this);
            var type = BottomMenuManager.menuType;
            var pen = UILayerManager.instance.drawLayer.pen;
            pen.graphics.lineStyle(2, 0xffffff, 1);
            pen.graphics.moveTo(e.stageX, e.stageY);
            if (type == BottomMenuType.MENU_ERASER) {
                pen.blendMode = egret.BlendMode.ERASE;
            }
            else {
                pen.blendMode = egret.BlendMode.NORMAL;
            }
        }
    };
    GlobalHandlerManager.onPenMove = function (ev) {
        var pen = UILayerManager.instance.drawLayer.pen;
        pen.graphics.lineTo(ev.stageX, ev.stageY);
    };
    GlobalHandlerManager.onPenEnd = function (ev) {
        var pen = UILayerManager.instance.drawLayer.pen;
        pen.graphics.endFill();
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPenMove, this);
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onPenEnd, this);
    };
    GlobalHandlerManager.handlerWordLayerClick = function (event) {
        var target = event.target;
        if (target instanceof CoursewareInput) {
            UILayerManager.instance.wordLayer.setChildIndex(target, UILayerManager.instance.wordLayer.numElements - 1);
            var courseInput = GlobalData.coursewareInput;
            courseInput.detach();
            courseInput.state = CoursewareInputState.idle;
            if (GlobalData.persistInputState) {
                GlobalData.persistInputState = false;
            }
            else {
                GlobalData.coursewareInput = target;
                GlobalData.coursewareInput.state = CoursewareInputState.selectable;
                if (GlobalData.controlInputRein) {
                    GlobalData.controlInputRein.updatePosition(GlobalData.coursewareInput);
                    GlobalData.coursewareInput.attach(GlobalData.controlInputRein);
                }
            }
        }
        else {
            if (target instanceof eui.EditableText && target.parent == GlobalData.coursewareInput) {
            }
            else {
                if (GlobalData.coursewareInput) {
                    if (GlobalData.persistInputState) {
                        GlobalData.persistInputState = false;
                    }
                    else {
                        GlobalData.coursewareInput.detach();
                        GlobalData.coursewareInput.state = CoursewareInputState.idle;
                    }
                }
            }
        }
    };
    return GlobalHandlerManager;
}());
egret.registerClass(GlobalHandlerManager,'GlobalHandlerManager');
//# sourceMappingURL=GlobalHandlerManager.js.map