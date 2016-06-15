/**
 * Created by xiaoding on 2016/3/15.
 */
var BottomMenuHandler = (function () {
    function BottomMenuHandler() {
    }
    var d = __define,c=BottomMenuHandler,p=c.prototype;
    p.handlerMenuCallRoll = function () {
        PanelMediator.instance.switchPanel(PanelTypes.PANEL_CALL_ROLL);
    };
    p.handlerSnippingTool = function () {
        var snipping = GlobalData.snippintTool;
        if (!snipping) {
            snipping = new SnippingTool();
            GlobalData.snippintTool = snipping;
        }
        var onRenderHandler = function (render) {
            var bmp = new egret.Bitmap(render);
            var toolBar = GlobalInterface.courseMenuBar;
            if (!toolBar) {
                toolBar = new CoursewareToolBar();
                GlobalInterface.courseMenuBar = toolBar;
            }
            var vo = new CoursewareVo();
            vo.res = bmp;
            vo.courseType = CourseTypes.COURSE_TYPE_PICTURE;
            var courseWare = new Courseware();
            courseWare.setRes(vo);
            UILayerManager.instance.coursewareLayer.addChild(courseWare);
            if (!UILayerManager.instance.coursewareLayer.contains(toolBar)) {
                UILayerManager.instance.coursewareLayer.addChild(toolBar);
            }
            courseWare.x = (global.curWidth() - courseWare.width) >> 1;
            courseWare.y = (global.curHeight() - courseWare.height) >> 1;
            courseWare.updateToolBarPosition();
            if (toolBar.master) {
                toolBar.master = null;
            }
            toolBar.master = courseWare;
        };
        snipping.snipping(UILayerManager.instance.snipLayerMask, onRenderHandler);
    };
    p.handlerMenuColor = function () {
        PanelMediator.instance.switchPanel(PanelTypes.PANEL_COLOR);
    };
    /*
     * 处理文本输入
     * */
    p.handlerInput = function () {
        var isHasClick = GlobalData.isAddWorkLayerClick;
        if (!isHasClick) {
            xd.GameDispatcher.dispatchEvent(GameEventName.ADD_CLICK_HANDLER, { type: 1 });
        }
        BottomMenuManager.instance.handlerMenuInput(global.curWidth() >> 1, global.curHeight() >> 1);
    };
    /*
     * 处理橡皮擦
     * */
    p.handlerEraser = function () {
    };
    return BottomMenuHandler;
}());
egret.registerClass(BottomMenuHandler,'BottomMenuHandler');
//# sourceMappingURL=BottomMenuHandler.js.map