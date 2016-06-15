/**
 * Created by Administrator on 2016/4/6.
 */
var GameHead = (function (_super) {
    __extends(GameHead, _super);
    function GameHead() {
        _super.call(this);
    }
    var d = __define,c=GameHead,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.width = this.stage.stageWidth;
        this.height = GameData.gameHeadHeight;
        var bg = new eui.Rect();
        bg.percentWidth = bg.percentHeight = 100;
        bg.fillColor = 0x00ff00;
        bg.ellipseWidth = bg.ellipseHeight = 20;
        this.addChild(bg);
        var labelContainer = new eui.Group();
        labelContainer.left = 10;
        var horizonLayout = new eui.HorizontalLayout();
        horizonLayout.gap = 50;
        labelContainer.layout = horizonLayout;
        this.addChild(labelContainer);
        labelContainer.verticalCenter = 0;
        this.scoreLabel = new eui.Label();
        this.scoreLabel.textColor = 0xffff00;
        this.scoreLabel.size = 25;
        labelContainer.addChild(this.scoreLabel);
        this.maxScoreLabel = new eui.Label();
        this.maxScoreLabel.textColor = 0xff0000;
        this.maxScoreLabel.size = 25;
        labelContainer.addChild(this.maxScoreLabel);
        var maxScore = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
        if (isNaN(maxScore)) {
            maxScore = 0;
        }
        this.setData({ score: 0, maxScore: maxScore });
        if (this.data) {
            this.setData(this.data);
        }
    };
    p.setData = function (param) {
        this.data = param;
        if (this.maxScoreLabel) {
            this.maxScoreLabel.text = "MaxScore: " + param.maxScore;
        }
        if (this.scoreLabel) {
            this.scoreLabel.text = "Score: " + param.score;
        }
    };
    return GameHead;
}(eui.Group));
egret.registerClass(GameHead,'GameHead');
//# sourceMappingURL=GameHead.js.map