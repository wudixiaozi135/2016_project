/**
 * Created by longxing on 2015/4/16.
 */
var GameTaskView = (function (_super) {
    __extends(GameTaskView, _super);
    function GameTaskView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GameTaskView,p=c.prototype;
    GameTaskView.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameTaskView();
        }
        return this._instance;
    };
    p.onShowTaskWindow = function (container, callFunc) {
        if (callFunc === void 0) { callFunc = null; }
        container.addChild(GameTaskView._instance);
        GameTaskView._instance.onSetPropertyByLocalStore();
        GameTaskView._instance.y = -GameTaskView._instance.height;
        egret.Tween.get(GameTaskView._instance).to({ y: 0 }, 500);
        this._callFunc = callFunc;
    };
    p.onAddToStage = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("background_layer0");
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
        var tf = new egret.TextField();
        tf.size = 22;
        tf.bold = true;
        tf.textAlign = "left";
        tf.text = "你当前等级为" + egret.localStorage.getItem("level") + "级。";
        tf.x = 40;
        tf.y = 40;
        this.addChild(tf);
        var backBtn = new KXButton();
        backBtn.onSetButtonRes("color_back", "color_back");
        this.addChild(backBtn);
        backBtn.x = this.stage.stageWidth - backBtn.width;
        backBtn.y = backBtn.height;
        backBtn.touchEnabled = true;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backGame, this);
        var buyBg1 = new egret.Bitmap();
        buyBg1.texture = RES.getRes("bg_shopitem");
        buyBg1.width = this.stage.stageWidth;
        buyBg1.height = buyBg1.width / 640 * 104;
        buyBg1.anchorOffsetX = buyBg1.width * .5;
        buyBg1.anchorOffsetY = buyBg1.height * .5;
        this.addChild(buyBg1);
        buyBg1.x = this.stage.stageWidth / 2;
        buyBg1.y = 150;
        var tf1 = new egret.TextField();
        tf1.text = "等级达到10级领取10个小星星";
        tf1.size = 22;
        tf1.bold = true;
        tf1.anchorOffsetY = tf1.height * .5;
        this.addChild(tf1);
        tf1.x = 40;
        tf1.y = buyBg1.y;
        this._buyBtn1 = new KXButton();
        this._buyBtn1.onSetButtonRes("disable_mission", "disable_mission");
        this.addChild(this._buyBtn1);
        this._buyBtn1.scaleX = this._buyBtn1.scaleY = 0.6;
        this._buyBtn1.y = buyBg1.y;
        this._buyBtn1.x = buyBg1.width - 80;
        this._buyBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainTool1, this);
        //第二个
        var buyBg2 = new egret.Bitmap();
        buyBg2.texture = RES.getRes("bg_shopitem");
        buyBg2.width = this.stage.stageWidth;
        buyBg2.height = buyBg2.width / 640 * 104;
        buyBg2.anchorOffsetX = buyBg2.width * .5;
        buyBg2.anchorOffsetY = buyBg2.height * .5;
        this.addChild(buyBg2);
        buyBg2.x = this.stage.stageWidth / 2;
        buyBg2.y = 250;
        var tf2 = new egret.TextField();
        tf2.text = "等级达到20级领取20个小星星";
        tf2.size = 22;
        tf2.bold = true;
        tf2.anchorOffsetY = tf2.height * .5;
        this.addChild(tf2);
        tf2.x = 40;
        tf2.y = buyBg2.y;
        this._buyBtn2 = new KXButton();
        this._buyBtn2.onSetButtonRes("disable_mission", "disable_mission");
        this.addChild(this._buyBtn2);
        this._buyBtn2.scaleX = this._buyBtn2.scaleY = 0.6;
        this._buyBtn2.y = buyBg2.y;
        this._buyBtn2.x = buyBg2.width - 80;
        this._buyBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainTool2, this);
        //第三个
        var buyBg3 = new egret.Bitmap();
        buyBg3.texture = RES.getRes("bg_shopitem");
        buyBg3.width = this.stage.stageWidth;
        buyBg3.height = buyBg3.width / 640 * 104;
        buyBg3.anchorOffsetY = buyBg3.height * .5;
        buyBg3.anchorOffsetX = buyBg3.width * .5;
        this.addChild(buyBg3);
        buyBg3.x = this.stage.stageWidth / 2;
        buyBg3.y = 350;
        var tf3 = new egret.TextField();
        tf3.text = "等级达到30级领取30个小星星";
        tf3.size = 22;
        tf3.bold = true;
        tf3.anchorOffsetY = tf3.height * .5;
        this.addChild(tf3);
        tf3.x = 40;
        tf3.y = buyBg3.y;
        this._buyBtn3 = new KXButton();
        this._buyBtn3.onSetButtonRes("disable_mission", "disable_mission");
        this.addChild(this._buyBtn3);
        this._buyBtn3.scaleX = this._buyBtn3.scaleY = 0.6;
        this._buyBtn3.y = buyBg3.y;
        this._buyBtn3.x = buyBg3.width - 80;
        this._buyBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainTool3, this);
        //第四个
        var buyBg4 = new egret.Bitmap();
        buyBg4.texture = RES.getRes("bg_shopitem");
        buyBg4.width = this.stage.stageWidth;
        buyBg4.height = buyBg4.width / 640 * 104;
        buyBg4.anchorOffsetY = buyBg4.height * .5;
        buyBg4.anchorOffsetX = buyBg4.width * .5;
        this.addChild(buyBg4);
        buyBg4.x = this.stage.stageWidth / 2;
        buyBg4.y = 450;
        var tf4 = new egret.TextField();
        tf4.text = "等级达到40级领取40个小星星";
        tf4.size = 22;
        tf4.bold = true;
        tf4.anchorOffsetY = tf4.height * .5;
        this.addChild(tf4);
        tf4.x = 40;
        tf4.y = buyBg4.y;
        this._buyBtn4 = new KXButton();
        this._buyBtn4.onSetButtonRes("disable_mission", "disable_mission");
        this.addChild(this._buyBtn4);
        this._buyBtn4.scaleX = this._buyBtn4.scaleY = 0.6;
        this._buyBtn4.y = buyBg4.y;
        this._buyBtn4.x = buyBg4.width - 80;
        this._buyBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainTool4, this);
        //第五个
        var buyBg5 = new egret.Bitmap();
        buyBg5.texture = RES.getRes("bg_shopitem");
        buyBg5.width = this.stage.stageWidth;
        buyBg5.height = buyBg5.width / 640 * 104;
        buyBg5.anchorOffsetY = buyBg5.height * .5;
        buyBg5.anchorOffsetX = buyBg5.width * .5;
        this.addChild(buyBg5);
        buyBg5.x = this.stage.stageWidth / 2;
        buyBg5.y = 550;
        var tf5 = new egret.TextField();
        tf5.text = "等级达到50级领取50个小星星";
        tf5.size = 22;
        tf5.bold = true;
        tf5.anchorOffsetY = tf5.height * .5;
        this.addChild(tf5);
        tf5.x = 40;
        tf5.y = buyBg5.y;
        this._buyBtn5 = new KXButton();
        this._buyBtn5.onSetButtonRes("disable_mission", "disable_mission");
        this.addChild(this._buyBtn5);
        this._buyBtn5.scaleX = this._buyBtn5.scaleY = 0.6;
        this._buyBtn5.y = buyBg5.y;
        this._buyBtn5.x = buyBg5.width - 80;
        this._buyBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainTool5, this);
        //第六个
        var buyBg6 = new egret.Bitmap();
        buyBg6.texture = RES.getRes("bg_shopitem");
        buyBg6.width = this.stage.stageWidth;
        buyBg6.height = buyBg6.width / 640 * 104;
        buyBg6.anchorOffsetY = buyBg6.height * .5;
        buyBg6.anchorOffsetX = buyBg6.width * .5;
        this.addChild(buyBg6);
        buyBg6.x = this.stage.stageWidth / 2;
        buyBg6.y = 650;
        var tf6 = new egret.TextField();
        tf6.text = "等级达到60级领取60个小星星";
        tf6.size = 22;
        tf6.bold = true;
        tf6.anchorOffsetY = tf6.height * .5;
        this.addChild(tf6);
        tf6.x = 40;
        tf6.y = buyBg6.y;
        this._buyBtn6 = new KXButton();
        this._buyBtn6.onSetButtonRes("disable_mission", "disable_mission");
        this.addChild(this._buyBtn6);
        this._buyBtn6.scaleX = this._buyBtn6.scaleY = 0.6;
        this._buyBtn6.y = buyBg6.y;
        this._buyBtn6.x = buyBg6.width - 80;
        this._buyBtn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainTool6, this);
    };
    p.backGame = function (evt) {
        this.parent.removeChild(this);
    };
    p.onSetPropertyByLocalStore = function () {
        var lev = Number(egret.localStorage.getItem("level"));
        if (lev >= 10) {
            if (egret.localStorage.getItem("task1") == '1') {
                this._buyBtn1.onSetButtonRes("enable_mission", "enable_mission");
            }
            else {
                this._buyBtn1.onSetButtonRes("already_mission", "already_mission");
            }
        }
        if (lev >= 20) {
            if (egret.localStorage.getItem("task2") == '1') {
                this._buyBtn2.onSetButtonRes("enable_mission", "enable_mission");
            }
            else {
                this._buyBtn2.onSetButtonRes("already_mission", "already_mission");
            }
        }
        if (lev >= 30) {
            if (egret.localStorage.getItem("task3") == '1') {
                this._buyBtn3.onSetButtonRes("enable_mission", "enable_mission");
            }
            else {
                this._buyBtn3.onSetButtonRes("already_mission", "already_mission");
            }
        }
        if (lev >= 40) {
            if (egret.localStorage.getItem("task4") == '1') {
                this._buyBtn4.onSetButtonRes("enable_mission", "enable_mission");
            }
            else {
                this._buyBtn4.onSetButtonRes("already_mission", "already_mission");
            }
        }
        if (lev >= 50) {
            if (egret.localStorage.getItem("task5") == '1') {
                this._buyBtn5.onSetButtonRes("enable_mission", "enable_mission");
            }
            else {
                this._buyBtn5.onSetButtonRes("already_mission", "already_mission");
            }
        }
        if (lev >= 60) {
            if (egret.localStorage.getItem("task6") == '1') {
                this._buyBtn6.onSetButtonRes("enable_mission", "enable_mission");
            }
            else {
                this._buyBtn6.onSetButtonRes("already_mission", "already_mission");
            }
        }
    };
    p.onObtainTool1 = function (evt) {
        egret.localStorage.setItem("task1", '2');
        this.onSetPropertyByLocalStore();
        this.onAddToolToLocalStore(10);
    };
    p.onObtainTool2 = function (evt) {
        egret.localStorage.setItem("task2", '2');
        this.onSetPropertyByLocalStore();
        this.onAddToolToLocalStore(20);
    };
    p.onObtainTool3 = function (evt) {
        egret.localStorage.setItem("task3", '2');
        this.onSetPropertyByLocalStore();
        this.onAddToolToLocalStore(30);
    };
    p.onObtainTool4 = function (evt) {
        egret.localStorage.setItem("task4", '2');
        this.onSetPropertyByLocalStore();
        this.onAddToolToLocalStore(40);
    };
    p.onObtainTool5 = function (evt) {
        egret.localStorage.setItem("task5", '2');
        this.onSetPropertyByLocalStore();
        this.onAddToolToLocalStore(50);
    };
    p.onObtainTool6 = function (evt) {
        egret.localStorage.setItem("task6", '2');
        this.onSetPropertyByLocalStore();
        this.onAddToolToLocalStore(60);
    };
    p.onAddToolToLocalStore = function (num) {
        var toolnum = Number(egret.localStorage.getItem("toolStar"));
        egret.localStorage.setItem("toolStar", (toolnum + num).toString());
        if (this._callFunc) {
            this._callFunc();
        }
    };
    return GameTaskView;
}(egret.Sprite));
egret.registerClass(GameTaskView,'GameTaskView');
