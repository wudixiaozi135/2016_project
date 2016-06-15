/**
 * Created by xiaoding on 2016/2/19.
 * UI层管理
 */
var UILayerManager = (function () {
    function UILayerManager() {
        // 主UI层 如 底部功能栏
        this.mainUILayer = new eui.Group();
        // 面板层
        this.uiLayer = new eui.Group();
        //绘制层
        this.drawLayer = new DrawLayerUI();
        /*
         * 输入文字层
         * */
        this.wordLayer = new eui.Group();
        /*
         * 输入控制工具层
         * */
        this.wordControlRein = new eui.Group();
        //课件层
        this.coursewareLayer = new eui.Group();
        // 截图遮罩层
        this.snipLayerMask = new eui.Group();
        xd.GameDispatcher.addEventListener(GameEventName.ADD_CLICK_HANDLER, this.addClickEvt, this);
        xd.GameDispatcher.addEventListener(GameEventName.REMOVE_CLICK_HANDLER, this.removeClickEvt, this);
    }
    var d = __define,c=UILayerManager,p=c.prototype;
    p.addClickEvt = function (ev) {
        var type = ev.param.type;
        if (type == 1) {
            global.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWordLayerClick, this, true);
            GlobalData.isAddWorkLayerClick = true;
        }
    };
    p.removeClickEvt = function (ev) {
        var type = ev.param.type;
        if (type == 1) {
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWordLayerClick, this, true);
            GlobalData.isAddWorkLayerClick = false;
        }
    };
    p.onWordLayerClick = function (ev) {
        GlobalHandlerManager.handlerWordLayerClick(ev);
    };
    p.setMain = function (main) {
        main.addChild(this.drawLayer);
        this.mainUILayer.touchEnabled = false;
        main.addChild(this.mainUILayer);
        this.mainUILayer.percentWidth = 100;
        this.mainUILayer.percentHeight = 100;
        this.uiLayer.touchEnabled = false;
        this.uiLayer.percentWidth = 100;
        this.uiLayer.percentHeight = 100;
        main.addChild(this.uiLayer);
        this.wordLayer.touchEnabled = false;
        this.wordLayer.percentWidth = 100;
        this.wordLayer.percentHeight = 100;
        main.addChild(this.wordLayer);
        this.wordControlRein.touchEnabled = false;
        this.wordControlRein.percentWidth = 100;
        this.wordControlRein.percentHeight = 100;
        main.addChild(this.wordControlRein);
        this.coursewareLayer.touchEnabled = false;
        this.coursewareLayer.percentWidth = 100;
        this.coursewareLayer.percentHeight = 100;
        main.addChild(this.coursewareLayer);
        this.snipLayerMask.touchEnabled = false;
        main.addChild(this.snipLayerMask);
        this.snipLayerMask.percentWidth = 100;
        this.snipLayerMask.percentHeight = 100;
        this.initBottomMenu();
        this.addEvent();
    };
    p.addEvent = function () {
        this.wordLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onWordLayerDown, this);
    };
    p.onWordLayerDown = function (ev) {
        var target = ev.target;
        var isWordInput = target instanceof eui.EditableText && target.parent instanceof CoursewareInput;
        if (target instanceof CoursewareInput || isWordInput) {
            global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onWordLayerMove, this);
            global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onWordLayerUp, this);
        }
    };
    p.onWordLayerMove = function (ev) {
        GlobalData.wordInputMove = true;
    };
    p.onWordLayerUp = function (ev) {
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onWordLayerMove, this);
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onWordLayerUp, this);
    };
    p.initBottomMenu = function () {
        var bottomMenuGroup = new BottomMenuGroup();
        this.mainUILayer.addChild(bottomMenuGroup);
        bottomMenuGroup.horizontalCenter = 0;
        bottomMenuGroup.bottom = bottomMenuGroup.height - 10;
        GlobalInterface.bottomMenuPosition = bottomMenuGroup;
    };
    d(UILayerManager, "instance"
        ,function () {
            if (UILayerManager._instance == null) {
                UILayerManager._instance = new UILayerManager();
            }
            return UILayerManager._instance;
        }
    );
    return UILayerManager;
}());
egret.registerClass(UILayerManager,'UILayerManager');
//# sourceMappingURL=UILayerManager.js.map