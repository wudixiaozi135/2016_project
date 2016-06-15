/**
 * Created by longxing on 2015/4/9.
 */
var KXButton = (function (_super) {
    __extends(KXButton, _super);
    function KXButton() {
        _super.call(this);
        this._enableFlag = true;
        this._btnBitmap = new egret.Bitmap();
        this.addChild(this._btnBitmap);
        this.touchEnabled = true;
    }
    var d = __define,c=KXButton,p=c.prototype;
    p.onSetButtonRes = function (normalRes, enabledRes, text) {
        if (enabledRes === void 0) { enabledRes = ""; }
        if (text === void 0) { text = ""; }
        this._normalRes = normalRes;
        this._enabledRes = enabledRes;
        this.updateProperty();
        if (text != "") {
            var tf = new egret.TextField();
            tf.text = text;
            tf.size = 30;
            tf.bold = true;
            tf.textAlign = "center";
            tf.width = this._btnBitmap.width;
            tf.anchorOffsetX = tf.width * .5;
            tf.anchorOffsetY = tf.height * .5;
            this.addChild(tf);
        }
    };
    p.onSetEnable = function (enable) {
        this._enableFlag = enable;
        this.updateProperty();
    };
    p.updateProperty = function () {
        if (this._enableFlag) {
            this._btnBitmap.texture = RES.getRes(this._normalRes);
        }
        else {
            this._btnBitmap.texture = RES.getRes(this._enabledRes);
        }
        this._btnBitmap.anchorOffsetX = this._btnBitmap.width * .5;
        this._btnBitmap.anchorOffsetY = this._btnBitmap.height * .5;
    };
    return KXButton;
}(egret.Sprite));
egret.registerClass(KXButton,'KXButton');
