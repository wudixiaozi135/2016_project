/**
 * Created by lx on 2015/1/24.
 */
var MyTextView = (function (_super) {
    __extends(MyTextView, _super);
    function MyTextView() {
        _super.call(this);
        this._externalImgAlign = "left";
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this._textField = new egret.TextField();
        this.addChild(this._textField);
    }
    var d = __define,c=MyTextView,p=c.prototype;
    p.onSetBg = function (bgImg, height, scale9Flag, r1, r2, r3, r4) {
        if (scale9Flag === void 0) { scale9Flag = false; }
        if (r1 === void 0) { r1 = 0; }
        if (r2 === void 0) { r2 = 0; }
        if (r3 === void 0) { r3 = 0; }
        if (r4 === void 0) { r4 = 0; }
        this._bg.texture = RES.getRes(bgImg);
        if (scale9Flag) {
            var rect = new egret.Rectangle(r1, r2, r3, r4);
            this._bg.scale9Grid = rect;
        }
        this._bg.height = height;
        this.updateLayout();
    };
    p.onSetExternalImage = function (externalImg, align, width, height, scale9Flag, r1, r2, r3, r4) {
        if (scale9Flag === void 0) { scale9Flag = false; }
        if (r1 === void 0) { r1 = 0; }
        if (r2 === void 0) { r2 = 0; }
        if (r3 === void 0) { r3 = 0; }
        if (r4 === void 0) { r4 = 0; }
        this._externalImg = new egret.Bitmap();
        this._externalImg.texture = RES.getRes(externalImg);
        this.addChild(this._externalImg);
        if (scale9Flag) {
            var rect = new egret.Rectangle(r1, r2, r3, r4);
            this._externalImg.scale9Grid = rect;
        }
        this._externalImg.width = width;
        this._externalImg.height = height;
        this._externalImgAlign = align;
        this.updateLayout();
    };
    p.text = function (txt) {
        this._textField.text = txt;
        this.updateLayout();
    };
    p.updateLayout = function () {
        var bgWidth = 0;
        if (this._externalImg) {
            bgWidth += this._externalImg.width;
            bgWidth += 5;
        }
        bgWidth += this._textField.width;
        bgWidth += 10;
        if (this._bg) {
            this._bg.width = bgWidth;
        }
        if (this._externalImg) {
            if (this._externalImgAlign == 'left') {
                this._externalImg.x = 5;
                this._externalImg.y = (this._bg.height - this._externalImg.height) / 2;
                this._textField.x = this._externalImg.width + 10;
                this._textField.y = (this._bg.height - this._textField.height) / 2;
                ;
            }
            else {
                this._externalImg.x = this._bg.width - this._externalImg.width - 5;
                this._externalImg.y = (this._bg.height - this._externalImg.height) / 2;
                this._textField.x = 5;
                this._textField.y = (this._bg.height - this._textField.height) / 2;
                ;
            }
        }
        else {
            this._textField.x = 5;
            this._textField.y = (this._bg.height - this._textField.height) / 2;
        }
    };
    p.getTextField = function () {
        return this._textField;
    };
    return MyTextView;
}(egret.Sprite));
egret.registerClass(MyTextView,'MyTextView');
//# sourceMappingURL=MyTextView.js.map