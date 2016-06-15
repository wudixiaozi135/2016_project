/**
 * Created by xiaoding on 2016/5/12.
 */
var AlertPanel = (function () {
    function AlertPanel() {
    }
    var d = __define,c=AlertPanel,p=c.prototype;
    AlertPanel.init = function (stage) {
        AlertPanel.stage = stage;
    };
    AlertPanel.show = function (msg) {
        var container = new egret.Sprite();
        container.graphics.clear();
        container.graphics.beginFill(0x0, .5);
        container.graphics.drawRect(0, 0, AlertPanel.stage.stageWidth, 55);
        var alert = new egret.TextField();
        alert.bold = true;
        alert.width = AlertPanel.stage.stageWidth;
        alert.textAlign = "center";
        alert.textColor = 0xff0000;
        alert.text = msg;
        container.addChild(alert);
        alert.y = (container.height - alert.height) * .5;
        AlertPanel.stage.addChild(container);
        container.y = AlertPanel.stage.stageHeight * .5;
        TweenMax.to(container, .7, {
            y: (AlertPanel.stage.stageHeight - container.height) * .5 - 100, ease: Back.easeOut,
            onComplete: AlertPanel.onCompleteHandler, onCompleteParams: [container]
        });
    };
    AlertPanel.onCompleteHandler = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
        if (rest.length > 0) {
            AlertPanel.stage.removeChild(rest.pop());
        }
    };
    return AlertPanel;
}());
egret.registerClass(AlertPanel,'AlertPanel');
//# sourceMappingURL=AlertPanel.js.map