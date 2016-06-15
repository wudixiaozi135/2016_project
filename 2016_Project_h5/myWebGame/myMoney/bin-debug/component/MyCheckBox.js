/**
 * Created by lx on 2015/1/24.
 */
var MyCheckBox = (function (_super) {
    __extends(MyCheckBox, _super);
    function MyCheckBox() {
        _super.call(this);
        this._selectFlag = false;
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this._bitmap = new egret.Bitmap();
        this.addChild(this._bitmap);
        this._bitmap.touchEnabled = true;
        this._bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
    }
    var d = __define,c=MyCheckBox,p=c.prototype;
    p.onTouchTapHandler = function (evt) {
        if (this._selectFlag) {
            this._selectFlag = false;
        }
        else {
            this._selectFlag = true;
        }
        this.updateView();
        this.dispatchEvent(new MyCheckBoxEvent(MyCheckBoxEvent.CHACKBOXCHANGEEVENT));
    };
    p.onSetCheckBoxImg = function (normalImg, selectedImg) {
        this._normalBitmapName = normalImg;
        this._selectedBitmapName = selectedImg;
        this.updateView();
    };
    p.onBgBitmapSource = function (normalImg, selectedImg, r1, r2, r3, r4) {
        this._bgNormalName = normalImg;
        this._bgSelectName = selectedImg;
        var rect = new egret.Rectangle(r1, r2, r3, r4);
        this._bg.scale9Grid = rect;
        this.updateView();
    };
    p.setWidth = function (width) {
        this._bitmap.width = width;
        this._bg.width = width;
    };
    p.setHeight = function (height) {
        this._bitmap.height = height;
        this._bg.height = height;
    };
    p.onSetSelect = function (select) {
        this._selectFlag = select;
        this.updateView();
    };
    p.onGetSelect = function () {
        return this._selectFlag;
    };
    p.updateView = function () {
        if (this._selectFlag) {
            this._bg.texture = RES.getRes(this._bgSelectName);
            this._bitmap.texture = RES.getRes(this._selectedBitmapName);
        }
        else {
            this._bg.texture = RES.getRes(this._bgNormalName);
            this._bitmap.texture = RES.getRes(this._normalBitmapName);
        }
    };
    return MyCheckBox;
}(egret.Sprite));
egret.registerClass(MyCheckBox,'MyCheckBox');
//# sourceMappingURL=MyCheckBox.js.map