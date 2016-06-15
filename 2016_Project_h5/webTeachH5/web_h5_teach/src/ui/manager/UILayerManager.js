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
        //课件层
        this.coursewareLayer = new eui.Group();
        // 截图遮罩层
        this.snipLayerMask = new eui.Group();
    }
    UILayerManager.prototype.setMain = function (main) {
        this.mainUILayer.touchEnabled = false;
        main.addChild(this.mainUILayer);
        this.mainUILayer.percentWidth = 100;
        this.mainUILayer.percentHeight = 100;
        this.uiLayer.touchEnabled = false;
        this.uiLayer.percentWidth = 100;
        this.uiLayer.percentHeight = 100;
        main.addChild(this.uiLayer);
        this.coursewareLayer.touchEnabled = false;
        this.coursewareLayer.percentWidth = 100;
        this.coursewareLayer.percentHeight = 100;
        main.addChild(this.coursewareLayer);
        this.snipLayerMask.touchEnabled = false;
        main.addChild(this.snipLayerMask);
        this.snipLayerMask.percentWidth = 100;
        this.snipLayerMask.percentHeight = 100;
        this.initBottomMenu();
    };
    UILayerManager.prototype.initBottomMenu = function () {
        var bottomMenuGroup = new BottomMenuGroup();
        this.mainUILayer.addChild(bottomMenuGroup);
        bottomMenuGroup.horizontalCenter = 0;
        bottomMenuGroup.bottom = bottomMenuGroup.height - 10;
        GlobalInterface.bottomMenuPosition = bottomMenuGroup;
    };
    Object.defineProperty(UILayerManager, "instance", {
        get: function () {
            if (UILayerManager._instance == null) {
                UILayerManager._instance = new UILayerManager();
            }
            return UILayerManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return UILayerManager;
})();
//# sourceMappingURL=UILayerManager.js.map