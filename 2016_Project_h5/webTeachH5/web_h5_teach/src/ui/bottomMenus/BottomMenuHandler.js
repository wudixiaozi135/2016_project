/**
 * Created by xiaoding on 2016/3/15.
 */
var BottomMenuHandler = (function () {
    function BottomMenuHandler() {
    }
    BottomMenuHandler.prototype.handlerMenuCallRoll = function () {
        PanelMediator.instance.switchPanel(PanelTypes.PANEL_CALL_ROLL);
    };
    BottomMenuHandler.prototype.handlerSnippingTool = function () {
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
    BottomMenuHandler.prototype.handlerMenuColor = function () {
        PanelMediator.instance.switchPanel(PanelTypes.PANEL_COLOR);
    };
    return BottomMenuHandler;
})();
//# sourceMappingURL=BottomMenuHandler.js.map