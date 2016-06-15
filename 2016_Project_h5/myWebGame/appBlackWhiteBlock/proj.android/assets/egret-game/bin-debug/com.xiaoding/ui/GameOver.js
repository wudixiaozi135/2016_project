/**
 * Created by Administrator on 2016/3/31.
 */
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.call(this);
        this.touchThrough = false;
    }
    var d = __define,c=GameOver,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.percentWidth = this.percentHeight = 100;
        var bg = new eui.Rect();
        bg.percentWidth = 100;
        bg.percentHeight = 100;
        bg.fillAlpha = .8;
        bg.fillColor = 0;
        this.addChild(bg);
        this.endLabel = new eui.Label("Game Over!");
        this.endLabel.size = 50;
        this.addChild(this.endLabel);
        this.endLabel.touchEnabled = false;
        this.endLabel.horizontalCenter = 0;
        this.endLabel.verticalCenter = 0;
        this.buttonContainer = new eui.Group();
        var layout = new eui.HorizontalLayout();
        layout.gap = 30;
        this.buttonContainer.layout = layout;
        this.addChild(this.buttonContainer);
        this.restart = new eui.Button();
        this.restart.addEventListener(eui.UIEvent.CREATION_COMPLETE, function () {
            this.restart.labelDisplay["size"] = 45;
            this.restart.removeEventListener(eui.UIEvent.CREATION_COMPLETE, arguments.callee);
        }, this);
        this.restart.width = 150;
        this.restart.height = 80;
        this.restart.label = "重玩";
        this.buttonContainer.addChild(this.restart);
        this.exit = new eui.Button();
        this.exit.addEventListener(eui.UIEvent.CREATION_COMPLETE, function () {
            this.exit.labelDisplay["size"] = 45;
            this.exit.removeEventListener(eui.UIEvent.CREATION_COMPLETE, arguments.callee);
        }, this);
        this.exit.width = 150;
        this.exit.height = 80;
        this.exit.label = "退出";
        this.buttonContainer.addChild(this.exit);
        this.buttonContainer.bottom = 100;
        this.buttonContainer.horizontalCenter = 0;
        this.buttonContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    p.onClickHandler = function (ev) {
        var target = ev.target;
        if (target == this.exit) {
            xd.GameDispatcher.dispatchEvent(GameEventConstant.EXIT);
        }
        else if (target == this.restart) {
            xd.GameDispatcher.dispatchEvent(GameEventConstant.RESTART_GAME);
        }
    };
    return GameOver;
}(eui.Group));
egret.registerClass(GameOver,'GameOver');
