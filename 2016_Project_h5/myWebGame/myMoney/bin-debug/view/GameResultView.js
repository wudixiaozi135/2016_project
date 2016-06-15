/**
 * Created by lx on 2015/1/26.
 */
var GameResultView = (function (_super) {
    __extends(GameResultView, _super);
    function GameResultView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }
    var d = __define,c=GameResultView,p=c.prototype;
    p.onAddedToStage = function (evt) {
        this.graphics.beginFill(0x000000, 0.5);
        this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
        this.tv = new egret.TextField();
        this.addChild(this.tv);
        this.tv.text = "恭喜你数钱数到元，祝愿你2015数钱数到手抽筋!快来邀请好友或继续挑战吧!";
        this.tv.width = this.stage.stageWidth - 100;
        this.tv.x = (this.stage.stageWidth - this.tv.width) / 2;
        this.tv.y = this.stage.stageHeight / 2 - 160;
        this.tv.textAlign = "center";
        var rplay = new CommonButton();
        rplay.onSetBgAndText("clean_widget_btn_pressed", "重新开始", 228, 65);
        this.addChild(rplay);
        rplay.x = (this.stage.stageWidth - rplay.width) / 2;
        rplay.y = this.stage.stageHeight / 2 - 50;
        rplay.touchEnabled = true;
        rplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
        var shareBtn = new CommonButton();
        shareBtn.onSetBgAndText("clean_widget_btn_pressed", "通知好友", 228, 65);
        this.addChild(shareBtn);
        shareBtn.x = (this.stage.stageWidth - shareBtn.width) / 2;
        shareBtn.y = this.stage.stageHeight / 2 + 60;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareHandler, this);
    };
    p.onSetDes = function (txt) {
        this.tv.text = txt;
    };
    p.onTouchTapHandler = function (evt) {
        if (this.shareView == null) {
            this.dispatchEvent(new GameResultEvent(GameResultEvent.RPLAYGAMEEVENT));
        }
    };
    p.onShareHandler = function (evt) {
        var score = egret.localStorage.getItem("bestScore");
        // share(score,1);
        //        if(this.shareView == null){
        //            this.shareView = new ShareGameView();
        //            this.shareView.touchEnabled = true;
        //            this.shareView.addEventListener(GameResultEvent.ONSHARETOFRIENDS,this.onRemoveShareView,this);
        //            this.addChild(this.shareView);
        //        }
    };
    p.onRemoveShareView = function (evt) {
        if (this.shareView && this.contains(this.shareView)) {
            this.removeChild(this.shareView);
            this.shareView.removeEventListener(GameResultEvent.ONSHARETOFRIENDS, this.onRemoveShareView, this);
            this.shareView = null;
        }
    };
    return GameResultView;
}(egret.Sprite));
egret.registerClass(GameResultView,'GameResultView');
//# sourceMappingURL=GameResultView.js.map