var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
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
        RES.loadGroup("preloadingRes");
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
        else if (event.groupName == "preloadingRes") {
            RES.loadGroup("preload");
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
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
        var sky = this.createBitmapByName("background_layer0");
        sky.width = this.stage.stageWidth;
        sky.height = this.stage.stageHeight;
        this.addChild(sky);
        this.preView = new GamePreView();
        this.addChild(this.preView);
        this.preView.addEventListener(GameFunEvent.GAME_FUN_EVENT_START, this.onStartGame, this);
        this.preView.addEventListener(GameFunEvent.GAME_EVENT_CLEAR, this.onClearGame, this);
    };
    p.onClearGame = function (evt) {
        if (this.gameView == null) {
            this.onStartGame();
        }
        else {
            this.removeChild(this.preView);
            this.gameView.onClearGame();
        }
    };
    p.onStartGame = function (evt) {
        if (evt === void 0) { evt = null; }
        this.removeChild(this.preView);
        if (this.gameView == null) {
            this.gameView = new GameView();
            this.addChild(this.gameView);
            this.gameView.addEventListener(GameFunEvent.GAME_EVENT_MAINMENU, this.onMainMenu, this);
        }
    };
    p.onMainMenu = function (evt) {
        this.addChild(this.preView);
        this.preView.onRefreshView();
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
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
