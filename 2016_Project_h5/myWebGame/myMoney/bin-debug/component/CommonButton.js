/**
 * Created by lx on 2015/1/23.
 */
var CommonButton = (function (_super) {
    __extends(CommonButton, _super);
    function CommonButton() {
        _super.call(this);
    }
    var d = __define,c=CommonButton,p=c.prototype;
    p.onSetBgAndText = function (name, txt, width, height, s9Flag, b1, b2, b3, b4) {
        if (s9Flag === void 0) { s9Flag = false; }
        if (b1 === void 0) { b1 = 0; }
        if (b2 === void 0) { b2 = 2; }
        if (b3 === void 0) { b3 = 0; }
        if (b4 === void 0) { b4 = 0; }
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes(name);
        if (s9Flag) {
            var rect = new egret.Rectangle(b1, b2, b3, b4);
            bg.scale9Grid = rect;
        }
        bg.width = width;
        bg.height = height;
        this.addChild(bg);
        this.tf = new egret.TextField();
        this.tf.text = txt;
        this.tf.width = width;
        this.tf.textAlign = "center";
        this.tf.y = (height - this.tf.height) / 2;
        this.addChild(this.tf);
    };
    p.setText = function (txt) {
        this.tf.text = txt;
    };
    p.getText = function () {
        return this.tf.text;
    };
    return CommonButton;
}(egret.Sprite));
egret.registerClass(CommonButton,'CommonButton');
//# sourceMappingURL=CommonButton.js.map