/**
 * Created by lx on 2015/1/23.
 */
var WelcomeView = (function (_super) {
    __extends(WelcomeView, _super);
    function WelcomeView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initWelcomeView, this);
    }
    var d = __define,c=WelcomeView,p=c.prototype;
    p.initWelcomeView = function () {
        var headimg = this.createBitmapByName("toufa");
        this.addChild(headimg);
        headimg.x = (this.stage.stageWidth - headimg.width) / 2;
        headimg.y = (this.stage.stageHeight - headimg.height) / 2;
        var labelTxt = new egret.TextField();
        labelTxt.text = "天天数钱";
        labelTxt.textColor = 0xbbffa0;
        labelTxt.size = 35;
        labelTxt.x = this.stage.stageWidth / 2;
        labelTxt.y = this.stage.stageHeight / 2 + 150;
        labelTxt.anchorOffsetX = labelTxt.anchorOffsetY = 0.5;
        labelTxt.textAlign = "center";
        this.addChild(labelTxt);
        var versionTxt = new egret.TextField();
        versionTxt.text = "天天数钱 For Egret Version 1.0";
        versionTxt.textColor = 0xffffff;
        versionTxt.alpha = 0.55;
        versionTxt.size = 12;
        versionTxt.x = this.stage.stageWidth / 2;
        versionTxt.y = this.stage.stageHeight - 20;
        versionTxt.anchorOffsetX = versionTxt.anchorOffsetY = 0.5;
        versionTxt.textAlign = "center";
        this.addChild(versionTxt);
        var textContainer = new egret.Sprite();
        textContainer.anchorOffsetX = textContainer.anchorOffsetY = 0.5;
        this.addChild(textContainer);
        textContainer.x = this.stage.stageWidth / 2;
        textContainer.y = this.stage.stageHeight / 2 + 200;
        textContainer.alpha = 1;
        this.textContainer = textContainer;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        RES.getResAsync("description", this.startAnimation, this);
    };
    /**
     * 描述文件加载成功，开始播放动画
     */
    p.startAnimation = function (result) {
        var textContainer = this.textContainer;
        var count = -1;
        var self = this;
        var change = function () {
            count++;
            if (count >= result.length) {
                count = 0;
            }
            var lineArr = result[count];
            self.changeDescription(textContainer, lineArr);
            var tw = egret.Tween.get(textContainer);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    };
    /**
     * 切换描述内容
     */
    p.changeDescription = function (textContainer, lineArr) {
        textContainer.removeChildren();
        var w = 0;
        for (var i = 0; i < lineArr.length; i++) {
            var info = lineArr[i];
            var colorLabel = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorOffsetX = colorLabel.anchorOffsetY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 18;
            textContainer.addChild(colorLabel);
            w += colorLabel.width;
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return WelcomeView;
}(egret.Sprite));
egret.registerClass(WelcomeView,'WelcomeView');
//# sourceMappingURL=WelcomeView.js.map