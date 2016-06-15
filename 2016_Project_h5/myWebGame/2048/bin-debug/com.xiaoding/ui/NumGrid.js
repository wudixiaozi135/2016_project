/**
 * Created by Administrator on 2016/4/5.
 */
var NumGrid = (function (_super) {
    __extends(NumGrid, _super);
    function NumGrid() {
        _super.call(this);
        this.row = 0;
        this.column = 0;
        this.touchChildren = false;
        this.touchEnabled = false;
    }
    var d = __define,c=NumGrid,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.width = GameData.gridW - 10;
        this.height = GameData.gridH - 10;
        this._grid = new egret.Shape();
        this._grid.touchEnabled = false;
        this.addChild(this._grid);
        this._num = new eui.Label();
        this.addChild(this._num);
        this._num.touchEnabled = false;
        this._num.bold = true;
        this._num.size = 50;
        this._num.textColor = 0xffffff;
        this._num.horizontalCenter = 0;
        this._num.verticalCenter = 0;
        if (!isNaN(this._data)) {
            this.data = this._data;
        }
    };
    d(p, "data"
        ,function () {
            return this._data;
        }
        ,function (value) {
            this._data = value;
            if (this._num) {
                this._num.text = value.toString();
                if (value > 999) {
                    this._num.size = 25;
                }
                else if (value > 100) {
                    this._num.size = 30;
                }
            }
            if (this._grid) {
                this._grid.graphics.clear();
                this._grid.graphics.lineStyle(1, 0, .2, true);
                this._grid.graphics.beginFill(this.getColor(value), 1);
                this._grid.graphics.drawCircle(this.width * .5, this.height * .5, this.width * .5);
                this._grid.graphics.endFill();
            }
        }
    );
    p.getColor = function (value) {
        var color = 0;
        switch (value) {
            case 2:
                color = xd.ColorUtils.getColorValue(238, 228, 218);
                break;
            case 4:
                color = xd.ColorUtils.getColorValue(238, 224, 198);
                break;
            case 8:
                color = xd.ColorUtils.getColorValue(243, 243, 116);
                break;
            case 16:
                color = xd.ColorUtils.getColorValue(243, 177, 116);
                break;
            case 32:
                color = xd.ColorUtils.getColorValue(248, 149, 90);
                break;
            case 64:
                color = xd.ColorUtils.getColorValue(249, 94, 50);
                break;
            case 128:
                color = xd.ColorUtils.getColorValue(239, 207, 108);
                break;
            case 256:
                color = xd.ColorUtils.getColorValue(239, 207, 99);
                break;
            case 512:
                color = xd.ColorUtils.getColorValue(239, 203, 82);
                break;
            case 1024:
                color = xd.ColorUtils.getColorValue(239, 199, 57);
                break;
            case 2048:
                color = xd.ColorUtils.getColorValue(239, 195, 41);
                break;
            case 4096:
                color = xd.ColorUtils.getColorValue(255, 60, 57);
                break;
        }
        return color;
    };
    return NumGrid;
}(eui.Group));
egret.registerClass(NumGrid,'NumGrid');
//# sourceMappingURL=NumGrid.js.map