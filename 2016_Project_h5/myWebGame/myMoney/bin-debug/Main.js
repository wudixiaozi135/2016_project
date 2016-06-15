var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * preload资源组加载进度
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.createGameScene = function () {
        var bg = this.createBitmapByName("applock_bg");
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this._welcomeView = new WelcomeView();
        this.addChild(this._welcomeView);
        this.onLoadGameRes();
    };
    p.onOpenMenuView = function () {
        if (this._welcomeView && this.contains(this._welcomeView)) {
            this.removeChild(this._welcomeView);
            this._welcomeView = null;
        }
        this._menuView = new MenuView();
        this.addChild(this._menuView);
        this._menuView.addEventListener(OpenGameViewEvent.OPENGAMEVIEW, this.onOpenGameView, this);
    };
    p.onOpenGameView = function (evt) {
        if (this._menuView && this.contains(this._menuView)) {
            this._menuView.removeEventListener(OpenGameViewEvent.OPENGAMEVIEW, this.onOpenGameView, this);
            this.removeChild(this._menuView);
            this._menuView = null;
        }
        this.gameView = new GameView();
        this.addChild(this.gameView);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.onLoadGameRes = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGameResLoadComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("gameRes");
    };
    p.onGameResLoadComplete = function (evt) {
        if (evt.groupName == "gameRes") {
            //加载声音文件，并播放背景音乐
            this.onOpenMenuView();
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map