/**
 * Created by longxing on 2015/4/15.
 */
var GameClearDialogView = (function (_super) {
    __extends(GameClearDialogView, _super);
    function GameClearDialogView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GameClearDialogView,p=c.prototype;
    p.onAddToStage = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.graphics.beginFill(0x000000, 0.5);
        this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
        this.touchEnabled = true;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("clearbg");
        bg.width = this.stage.stageWidth - 100;
        bg.height = bg.width / 550 * 254;
        this.addChild(bg);
        bg.anchorOffsetX = bg.width * .5;
        bg.anchorOffsetY = bg.height * .5;
        bg.x = this.stage.stageWidth / 2;
        bg.y = this.stage.stageHeight / 2;
        var submitBtn = new KXButton();
        submitBtn.onSetButtonRes("clearok", "clearok");
        this.addChild(submitBtn);
        submitBtn.x = bg.x - 70;
        submitBtn.y = bg.y + 55;
        submitBtn.scaleX = submitBtn.scaleY = 0.5;
        submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmit, this);
        var cancelBtn = new KXButton();
        cancelBtn.onSetButtonRes("clearcancel", "clearcancel");
        this.addChild(cancelBtn);
        cancelBtn.x = bg.x + 70;
        cancelBtn.y = bg.y + 55;
        cancelBtn.scaleX = cancelBtn.scaleY = 0.5;
        cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
    };
    p.onCancel = function (evt) {
        this.parent.removeChild(this);
    };
    p.onSubmit = function (evt) {
        this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_CLEAR));
        this.parent.removeChild(this);
    };
    return GameClearDialogView;
}(egret.Sprite));
egret.registerClass(GameClearDialogView,'GameClearDialogView');
