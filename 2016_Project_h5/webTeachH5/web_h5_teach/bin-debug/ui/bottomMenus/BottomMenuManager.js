/**
 * Created by Administrator on 2016/4/1.
 */
var BottomMenuManager = (function () {
    function BottomMenuManager() {
    }
    var d = __define,c=BottomMenuManager,p=c.prototype;
    p.handlerMenuInput = function (stageX, stageY) {
        var courseInput = GlobalData.coursewareInput;
        if (courseInput) {
            if (courseInput.contentIsNull()) {
                if (courseInput.parent) {
                    courseInput.parent.removeChild(courseInput);
                }
                courseInput.destroy();
                CoursewareInputManager.instance.removeItem(courseInput);
            }
            else {
                courseInput.detach();
                courseInput.state = CoursewareInputState.idle;
            }
            courseInput = null;
            GlobalData.coursewareInput = null;
        }
        var input = new CoursewareInput();
        GlobalData.coursewareInput = input;
        UILayerManager.instance.wordLayer.addChild(input);
        CoursewareInputManager.instance.addItem(input);
        input.x = stageX;
        input.y = stageY;
        var controlBar = GlobalData.controlInputRein;
        if (!controlBar) {
            controlBar = new ControlInputRein(0xffffff);
            GlobalData.controlInputRein = controlBar;
        }
        if (!UILayerManager.instance.wordControlRein.contains(controlBar)) {
            UILayerManager.instance.wordControlRein.addChild(controlBar);
        }
        controlBar.updatePosition(input);
        input.attach(controlBar);
        input.state = CoursewareInputState.editable;
    };
    d(BottomMenuManager, "instance"
        ,function () {
            if (BottomMenuManager._instance == null) {
                BottomMenuManager._instance = new BottomMenuManager();
            }
            return BottomMenuManager._instance;
        }
    );
    return BottomMenuManager;
}());
egret.registerClass(BottomMenuManager,'BottomMenuManager');
//# sourceMappingURL=BottomMenuManager.js.map