/**
 * Created by xiaoding on 2016/5/3.
 */
var ShapeData = (function () {
    function ShapeData() {
        this.row = 0;
        this.column = 0;
    }
    var d = __define,c=ShapeData,p=c.prototype;
    p.update = function (row, column) {
        this.row = row;
        this.column = column;
    };
    return ShapeData;
}());
egret.registerClass(ShapeData,'ShapeData');
//# sourceMappingURL=ShapeData.js.map