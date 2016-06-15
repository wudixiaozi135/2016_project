/**
 * Created by Administrator on 2016/3/30.
 */
var Diamond = (function (_super) {
    __extends(Diamond, _super);
    function Diamond(w, h) {
        _super.call(this);
        this.blockW = w;
        this.blockH = h;
        this._data = new SimpleData();
    }
    var d = __define,c=Diamond,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.block = new eui.Rect();
        this.block.width = this.blockW;
        this.block.height = this.blockH;
        this.block.fillAlpha = .9;
        this.block.strokeColor = 0xffffff;
        if (this.color) {
            this.block.fillColor = this.color;
        }
        else {
            this.block.fillColor = Color.BLACK;
        }
        this.addChild(this.block);
        this.block.touchEnabled = false;
        this.block.touchChildren = false;
    };
    p.changeColor = function (colorType) {
        switch (colorType) {
            case ColorType.black:
                this.color = Color.BLACK;
                break;
            case ColorType.white:
                this.color = Color.WHITE;
                break;
            case ColorType.red:
                this.color = Color.RED;
                break;
            case ColorType.color009900:
                this.color = Color.COLOR_009900;
                break;
            case ColorType.color009933:
                this.color = Color.COLOR_009933;
                break;
            case ColorType.color009966:
                this.color = Color.COLOR_009966;
                break;
            case ColorType.color009999:
                this.color = Color.COLOR_009999;
                break;
            case ColorType.color0099cc:
                this.color = Color.COLOR_0099cc;
                break;
            case ColorType.color0099ff:
                this.color = Color.COLOR_0099ff;
                break;
            case ColorType.color000000:
                this.color = Color.COLOR_000000;
                break;
            default:
                break;
        }
        if (this.block) {
            this.block.fillColor = this.color;
        }
    };
    p.reset = function () {
        if (this.block) {
            this.block.fillColor = Color.BLACK;
        }
    };
    p.hide = function () {
        this.touchEnabled = false;
        this.visible = false;
        return this.visible;
    };
    p.show = function () {
        this.touchEnabled = true;
        this.visible = true;
        return this.visible;
    };
    d(p, "data"
        ,function () {
            return this._data;
        }
    );
    return Diamond;
}(eui.Group));
egret.registerClass(Diamond,'Diamond',["IDiamond"]);
