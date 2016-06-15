/**
 *
 * 主类
 * @author
 *
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        /**场景堆栈*/
        this.views = [];
        /**键：资源组名  值：场景名*/
        this.senceName = { "welcomeload": "Index", "maps": "World", "guanka01load": "Guanka01", "guanka02load": "Guanka02", "guanka03load": "Guanka03", "guanka04load": "Guanka04", "guanka05load": "Guanka05", "guanka06load": "Guanka06", "guanka07load": "Guanka07", "guanka08load": "Guanka08", "guanka09load": "Guanka09", "guanka10load": "Guanka10", "guanka11load": "Guanka11", "guanka12load": "Guanka12" };
        /**是否第一次加载Index*/
        this.loadIndexis1st = true;
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //获取浏览器宽度
        //console.log(document.body.clientWidth);
        ////设置加载进度界面
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        ////RES加载类
        Loader.getInstance();
        Loader.instance.addEventListener(LoadEvent.GROUP_COMPLETE, this.loadComp, this);
        Loader.instance.addEventListener(LoadEvent.GROUP_PROGRESS, this.loadprogress, this);
        Loader.instance.init();
        ////移除上一场景
        this.addEventListener(MainEvent.REMOVE, this.removeLast, this);
        ////侦听加载界面调用事件
        this.addEventListener(MainEvent.OPENLOADBAR, this.createLoadBar, this);
        ////侦听加载完成加载场景事件
        this.addEventListener(MainEvent.LOADCOMP, this.addSence, this);
    };
    /*
     * 分组资源加载进度
     */
    p.loadprogress = function (e) {
        var str = e.groupName;
        switch (str) {
            case "preload":
                this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal);
                break;
            case "welcomeload":
                if (this.loadIndexis1st) {
                    this.preload.setProgress(e.itemsLoaded, e.itemsTotal);
                    break;
                }
            default:
                this.loadBar.setProgress(e.itemsLoaded, e.itemsTotal);
        }
    };
    /*
     * 分组资源加载完成
     */
    p.loadComp = function (e) {
        var str = e.groupName;
        switch (str) {
            case "preload":
                this.removeChild(this.loadingView);
                this.loadingView = null;
                this.createScene();
                //读取本地游戏配置和储存的数据
                StorageSetting.loadConfig();
                break;
            case "welcomeload":
                if (this.loadIndexis1st) {
                    this.preload.loadComp();
                    this.loadIndexis1st = false;
                    break;
                }
            default:
                if (e.groupName == "uiLoad") {
                    console.log("加载怪物资源");
                    Loader.instance.load("monsterLoad");
                }
                else if (e.groupName == "monsterLoad") {
                    console.log("加载塔类资源");
                    Loader.instance.load("towerLoad");
                }
                else if (e.groupName == "towerLoad") {
                    console.log("加载音效资源");
                    Loader.instance.load("soundLoad");
                }
                else if (e.groupName == "soundLoad") {
                    console.log("加载关卡资源");
                    Loader.instance.load(GuanKaConfig.guankaData[Main.curIdx]);
                }
                else {
                    this.dispatchEvent(new MainEvent(MainEvent.LOADCOMP, e.groupName));
                    //展开LoadBar
                    this.loadBar.hideLoadBar();
                }
        }
    };
    /*
     * 加载进度条 传递加载资源组名
     */
    p.createLoadBar = function (e) {
        this.resName = e.resName;
        this.loadBar = new LoadBar();
        this.addChild(this.loadBar);
    };
    /*
    * 移除上一场景
    */
    p.removeLast = function (e) {
        //加载新资源组
        Loader.instance.load(this.resName);
        //移除上一场景
        this.gameLayer.removeChildAt(0);
        var view = this.views.shift();
        view.destroy();
    };
    /*
     * 根据分组资源创建相应关卡
     */
    p.addSence = function (e) {
        //反射
        var objClass = egret.getDefinitionByName(this.senceName[e.resName]);
        var obj = new objClass();
        this.gameLayer.addChild(obj);
        this.views.push(obj);
    };
    /**
     * 创建场景界面
     */
    p.createScene = function () {
        //旋转
        // 游戏场景层，游戏场景相关内容可以放在这里面。
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        //加载加载界面
        this.preload = new PreLoad();
        this.gameLayer.addChild(this.preload);
    };
    /*
     * 移除加载页面 加载主界面
     */
    p.init = function () {
        //console.log("点击开始按钮后移除preload 加载主界面");
        this.gameLayer.removeChildAt(0);
        this.preload = null;
        this.welcome = new Index();
        this.gameLayer.addChild(this.welcome);
        this.views.push(this.welcome);
    };
    /**当前挑战关卡模式*/
    Main.wujin = false;
    /**是否第一次加载通用资源*/
    Main.loadCommis1st = true;
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map