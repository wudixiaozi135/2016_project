/**
 * Created by xiaoding on 2016/5/11.
 */
var xd;
(function (xd) {
    var LogView = (function (_super) {
        __extends(LogView, _super);
        function LogView(maxW, maxH) {
            _super.call(this);
            this.msgs = [];
            this.maxW = maxW;
            this.maxH = maxH;
            this.touchEnabled = true;
            this.drawBG(maxW, maxH);
            this.initTF();
        }
        var d = __define,c=LogView,p=c.prototype;
        p.drawBG = function (w, h) {
            this.graphics.beginFill(0x666666, 0.8);
            this.graphics.drawRect(0, 0, w, h + 5);
            this.graphics.endFill();
        };
        p.initTF = function () {
            this.tf = new egret.TextField();
            this.tf.textAlign = "left";
            this.tf.lineSpacing = 5;
            this.tf.touchEnabled = true;
            this.tf.height = this.maxH;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStartTF, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoveTF, this);
            this.addChild(this.tf);
        };
        p.onTouchStartTF = function (event) {
            this.org_Ypos = event.stageY;
        };
        p.onTouchMoveTF = function (event) {
            var offsetY = event.stageY - this.org_Ypos;
            if (offsetY < 0) {
                var gap = Math.abs(offsetY);
                var count = parseInt((gap / this.LineHeightGap).toString()) + this.tf.scrollV;
                if (count > this.MaxScrollV) {
                    this.tf.scrollV = this.MaxScrollV;
                }
                else {
                    this.tf.scrollV = count;
                }
            }
            else {
                var gap = Math.abs(offsetY);
                var count = this.tf.scrollV - parseInt((gap / this.LineHeightGap).toString());
                if (count < 1) {
                    this.tf.scrollV = 1;
                }
                else {
                    this.tf.scrollV = count;
                }
            }
        };
        p.addLog = function (word, prefix) {
            if (prefix === void 0) { prefix = "系统"; }
            if (this.msgs.length > 50) {
                this.msgs.shift();
            }
            this.msgs.push(word);
            this.tf.text = "";
            for (var i = 0, len = this.msgs.length; i < len; i++) {
                this.tf.appendText("[" + prefix + "]: " + this.msgs[i] + "\n");
            }
            this.LineHeightGap = this.tf.textHeight / this.tf.maxScrollV;
            this.tf.scrollV = parseInt(((this.tf.textHeight - this.maxH) / this.LineHeightGap).toString());
            this.MaxScrollV = this.tf.scrollV;
        };
        return LogView;
    }(egret.Sprite));
    xd.LogView = LogView;
    egret.registerClass(LogView,'xd.LogView');
})(xd || (xd = {}));
