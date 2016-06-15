/**
 * Created by lx on 2015/1/29.
 */
var ShareGameView = (function (_super) {
    __extends(ShareGameView, _super);
    function ShareGameView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=ShareGameView,p=c.prototype;
    p.onAddToStage = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.graphics.beginFill(0x000000, 1);
        this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
        var tv = new egret.TextField();
        this.addChild(tv);
        tv.textAlign = "center";
        tv.text = "请点击右上角\n点击【分享到朋友圈】\n测测好友能收多少钱吧！";
        tv.width = this.stage.stageWidth - 100;
        tv.x = (this.stage.stageWidth - tv.width) / 2;
        tv.y = this.stage.stageHeight / 2 - 120;
        this.backTF = new egret.TextField();
        this.addChild(this.backTF);
        this.backTF.text = "返回";
        this.backTF.size = 14;
        this.backTF.bold = true;
        this.backTF.touchEnabled = true;
        this.backTF.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackPreView, this);
    };
    p.onBackPreView = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackPreView, this);
        this.dispatchEvent(new GameResultEvent(GameResultEvent.ONSHARETOFRIENDS));
    };
    return ShareGameView;
}(egret.Sprite));
egret.registerClass(ShareGameView,'ShareGameView');
//# sourceMappingURL=ShareGameView.js.map