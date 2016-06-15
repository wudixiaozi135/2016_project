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
        this.endLabel.top = 200;
        var labelContainer = new eui.Group();
        this.addChild(labelContainer);
        labelContainer.touchChildren = false;
        labelContainer.touchEnabled = false;
        labelContainer.horizontalCenter = 0;
        labelContainer.top = 300;
        var verticalLayout = new eui.VerticalLayout();
        verticalLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        labelContainer.layout = verticalLayout;
        verticalLayout.gap = 15;
        this.maxScoreLabel = new eui.Label();
        this.maxScoreLabel.textColor = 0xff0000;
        this.maxScoreLabel.size = 35;
        labelContainer.addChild(this.maxScoreLabel);
        this.scoreLabel = new eui.Label();
        this.scoreLabel.textColor = 0xffff00;
        this.scoreLabel.size = 35;
        labelContainer.addChild(this.scoreLabel);
        this.buttonContainer = new eui.Group();
        var layout = new eui.HorizontalLayout();
        layout.gap = 30;
        this.buttonContainer.layout = layout;
        this.addChild(this.buttonContainer);
        this.restart = new eui.Button();
        this.restart.addEventListener(eui.UIEvent.CREATION_COMPLETE, function () {
            this.restart.labelDisplay["size"] = 45;
            this.restart.removeEventListener(eui.UIEvent.CREATION_COMPLETE, arguments.callee, this);
        }, this);
        this.restart.width = 150;
        this.restart.height = 80;
        this.restart.label = "Retry";
        this.buttonContainer.addChild(this.restart);
        this.exit = new eui.Button();
        this.exit.addEventListener(eui.UIEvent.CREATION_COMPLETE, function () {
            this.exit.labelDisplay["size"] = 45;
            this.exit.removeEventListener(eui.UIEvent.CREATION_COMPLETE, arguments.callee, this);
        }, this);
        this.exit.width = 150;
        this.exit.height = 80;
        this.exit.label = "Exit";
        this.buttonContainer.addChild(this.exit);
        this.buttonContainer.bottom = 150;
        this.buttonContainer.horizontalCenter = 0;
        this.buttonContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        if (this.data) {
            this.setData(this.data);
        }
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
    p.setData = function (param) {
        this.data = param;
        if (this.maxScoreLabel) {
            this.maxScoreLabel.text = "MaxScore:  " + param.maxScore;
        }
        if (this.scoreLabel) {
            this.scoreLabel.text = "YourScore:  " + param.score;
        }
    };
    return GameOver;
}(eui.Group));
egret.registerClass(GameOver,'GameOver');
//# sourceMappingURL=GameOver.js.map