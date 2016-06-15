/**
 * Created by xiaoding on 2016/4/29.
 */
var ColorShape = (function (_super) {
    __extends(ColorShape, _super);
    function ColorShape(type) {
        _super.call(this);
        this.w = 0;
        this.h = 0;
        this._row = 0;
        this._column = 0;
        /*
         * 1表示有数据 0表示无数据
         * */
        this._data = 0;
        /*
         * 状态 1选中 0未选中
         * */
        this._state = 0;
        this.shapeData = new ShapeData();
        this._type = type;
        this.touchChildren = false;
        this.cacheAsBitmap = true;
    }
    var d = __define,c=ColorShape,p=c.prototype;
    d(p, "data"
        ,function () {
            return this._data;
        }
        ,function (value) {
            this._data = value;
        }
    );
    d(p, "type"
        ,function () {
            return this._type;
        }
    );
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.w = GameData.shapeW;
        this.h = GameData.shapeH;
        var pic = new egret.Bitmap();
        this.addChild(pic);
        this.shape = new eui.Rect();
        var key;
        if (this.type == ColorShapeType.blue) {
            key = "blueStar";
        }
        else if (this.type == ColorShapeType.red) {
            key = "redStar";
        }
        else if (this.type == ColorShapeType.green) {
            key = "greenStar";
        }
        else if (this.type == ColorShapeType.yellow) {
            key = "yellowStar";
        }
        else if (this.type == ColorShapeType.purple) {
            key = "purpleStar";
        }
        if (key) {
            pic.width = this.w;
            pic.height = this.h;
            pic.texture = RES.getRes(key);
        }
        this.width = this.w;
        this.height = this.h;
        this.addChildAt(this.shape, 0);
        this.shape.percentWidth = 100;
        this.shape.percentHeight = 100;
        this.shape.horizontalCenter = 0;
        this.shape.verticalCenter = 0;
        this.hightlight(false);
    };
    d(p, "state"
        ,function () {
            return this._state;
        }
        ,function (value) {
            this._state = value;
            this.hightlight(this._state == 1 ? true : false);
        }
    );
    p.hightlight = function (isHightlight) {
        if (isHightlight === void 0) { isHightlight = true; }
        this.shape.visible = isHightlight;
        if (isHightlight) {
            this.shape.strokeWeight = 2;
            this.shape.strokeColor = 0xffffff;
            this.shape.strokeAlpha = 1;
        }
        else {
            this.shape.strokeWeight = 1;
            this.shape.strokeColor = 0xffffff;
            this.shape.strokeAlpha = 0;
        }
    };
    p.setData = function (row, column) {
        this.row = row;
        this.column = column;
        this.shapeData.update(row, column);
    };
    d(p, "row"
        ,function () {
            return this._row;
        }
        ,function (value) {
            this._row = value;
            this.shapeData.row = value;
        }
    );
    d(p, "column"
        ,function () {
            return this._column;
        }
        ,function (value) {
            this._column = value;
            this.shapeData.column = value;
        }
    );
    return ColorShape;
}(eui.Group));
egret.registerClass(ColorShape,'ColorShape');
//# sourceMappingURL=ColorShape.js.map