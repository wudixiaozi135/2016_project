/**
 * Created by longxing on 2015/4/9.
 */
var GameTopView = (function (_super) {
    __extends(GameTopView, _super);
    function GameTopView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }
    var d = __define,c=GameTopView,p=c.prototype;
    p.initView = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
        var liBtn = new KXButton();
        liBtn.onSetButtonRes("shop", "shop");
        liBtn.scaleX = liBtn.scaleY = 0.6;
        this.addChild(liBtn);
        liBtn.x = this.stage.stageWidth - liBtn.width / 2;
        liBtn.y = 25;
        liBtn.touchEnabled = true;
        liBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenShopWindow, this);
        var chuiBtn = new KXButton();
        chuiBtn.onSetButtonRes("hammer", "hammer");
        chuiBtn.scaleX = chuiBtn.scaleY = 0.6;
        this.addChild(chuiBtn);
        chuiBtn.touchEnabled = true;
        chuiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseToolsChui, this);
        chuiBtn.x = this.stage.stageWidth - 60;
        chuiBtn.y = 80;
        var moBtn = new KXButton();
        moBtn.onSetButtonRes("item_shuffle", "item_shuffle");
        moBtn.scaleX = moBtn.scaleY = 0.6;
        this.addChild(moBtn);
        moBtn.touchEnabled = true;
        moBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetGame, this);
        moBtn.x = this.stage.stageWidth - 120;
        moBtn.y = 80;
        this.kaTF = new egret.TextField();
        this.kaTF.text = "关卡:1";
        this.kaTF.textAlign = "left";
        this.kaTF.size = 20;
        this.kaTF.anchorOffsetY = this.kaTF.height * .5;
        this.kaTF.bold = true;
        this.kaTF.y = 25;
        this.addChild(this.kaTF);
        this.targetScoreTF = new egret.TextField();
        this.targetScoreTF.text = "目标分:3000";
        this.targetScoreTF.textAlign = "left";
        this.targetScoreTF.size = 20;
        this.targetScoreTF.bold = true;
        this.targetScoreTF.anchorOffsetY = this.targetScoreTF.height * .5;
        this.targetScoreTF.x = 150;
        this.targetScoreTF.y = 25;
        this.addChild(this.targetScoreTF);
        this.scoreTF = new egret.TextField();
        this.scoreTF.text = "3000";
        this.scoreTF.textAlign = "left";
        this.scoreTF.size = 20;
        this.scoreTF.bold = true;
        this.scoreTF.anchorOffsetX = this.scoreTF.width * .5;
        this.scoreTF.anchorOffsetY = this.scoreTF.height * .5;
        this.scoreTF.x = this.stage.stageWidth / 2;
        this.scoreTF.y = 80;
        this.addChild(this.scoreTF);
        this.toolStarTF = new egret.TextField();
        this.toolStarTF.text = "0";
        this.toolStarTF.textAlign = "left";
        this.toolStarTF.size = 20;
        this.toolStarTF.bold = true;
        this.toolStarTF.x = liBtn.x - 18;
        this.toolStarTF.y = liBtn.y - 6;
        this.addChild(this.toolStarTF);
        var stopBtn = new KXButton();
        stopBtn.onSetButtonRes("option_button", "option_button");
        this.addChild(stopBtn);
        stopBtn.touchEnabled = true;
        stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPauseGame, this);
        stopBtn.scaleX = stopBtn.scaleY = 0.6;
        stopBtn.x = stopBtn.width / 2 + 5;
        stopBtn.y = 80;
        var taskBtn = new KXButton();
        taskBtn.onSetButtonRes("bottom_2", "bottom_2");
        this.addChild(taskBtn);
        taskBtn.x = stopBtn.x + 80;
        taskBtn.y = 80;
        taskBtn.scaleX = taskBtn.scaleY = 0.6;
        taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaskWindow, this);
    };
    p.onTaskWindow = function (evt) {
        var self = this;
        var callFun = function () {
            self.setToolStar(egret.localStorage.getItem("toolStar"));
        };
        GameTaskView.getInstance().onShowTaskWindow(this, callFun);
    };
    p.onOpenShopWindow = function (evt) {
        GameShopView.getInstance().onOpenShopWindow(this);
    };
    p.setCurLevel = function (value) {
        this.kaTF.text = "关卡:" + value;
    };
    p.setCurScore = function (value) {
        this.scoreTF.text = value;
    };
    p.setTargetScore = function (value) {
        this.targetScoreTF.text = "目标:" + value;
    };
    p.setToolStar = function (value) {
        this.toolStarTF.text = value;
    };
    p.onUseToolsChui = function (evt) {
        var toolnum = Number(egret.localStorage.getItem("toolStar"));
        if (toolnum >= 5) {
            var self = this;
            var useToolFun = function () {
                self.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_USETOOL_CHUI));
            };
            GameDialogView.getInstance().onShowDialog("确定使用5个小星星来使用小锤子吗？", this, useToolFun);
        }
        else {
            GameDialogView.getInstance().onShowDialog("小星星道具不足！请购买小星星！", this);
        }
    };
    p.onResetGame = function (evt) {
        var toolnum = Number(egret.localStorage.getItem("toolStar"));
        if (toolnum >= 10) {
            var self = this;
            var resetFun = function () {
                egret.localStorage.setItem("toolStar", (toolnum - 10).toString());
                self.setToolStar((toolnum - 10).toString());
                self.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_RESET));
            };
            GameDialogView.getInstance().onShowDialog("确定使用10个小星星来重新开始本局游戏吗？", this, resetFun);
        }
        else {
            GameDialogView.getInstance().onShowDialog("小星星道具不足！请购买小星星！", this);
        }
    };
    p.onPauseGame = function (evt) {
        this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_PAUSE));
    };
    return GameTopView;
}(egret.Sprite));
egret.registerClass(GameTopView,'GameTopView');
