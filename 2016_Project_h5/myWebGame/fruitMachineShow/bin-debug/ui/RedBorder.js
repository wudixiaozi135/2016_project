/**
 * Created by xiaoding on 2016/5/12.
 */
var RedBorder = (function (_super) {
    __extends(RedBorder, _super);
    function RedBorder(w, h) {
        if (w === void 0) { w = 88; }
        if (h === void 0) { h = 88; }
        _super.call(this);
        this._row = 0;
        this._column = 0;
        this.w = 0;
        this.h = 0;
        this.w = w;
        this.h = h;
        this.width = w;
        this.height = h;
    }
    var d = __define,c=RedBorder,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.redBorder = new eui.Rect();
        this.redBorder.fillAlpha = 0;
        this.redBorder.strokeAlpha = 1;
        this.redBorder.strokeWeight = 5;
        this.redBorder.strokeColor = 0xFF00FF;
        this.addChild(this.redBorder);
        this.redBorder.percentWidth = 100;
        this.redBorder.percentHeight = 100;
    };
    d(p, "row"
        ,function () {
            return this._row;
        }
        ,function (value) {
            this._row = value;
            this.y = value * (this.w + 1.8);
        }
    );
    d(p, "column"
        ,function () {
            return this._column;
        }
        ,function (value) {
            this._column = value;
            this.x = value * (this.h + 4);
        }
    );
    return RedBorder;
}(eui.Group));
egret.registerClass(RedBorder,'RedBorder');
//# sourceMappingURL=RedBorder.js.map