/**
 * Created by Administrator on 2016/3/30.
 */
var SimpleData = (function () {
    function SimpleData() {
    }
    var d = __define,c=SimpleData,p=c.prototype;
    p.setData = function (row, column) {
        this.row = row;
        this.column = column;
    };
    return SimpleData;
}());
egret.registerClass(SimpleData,'SimpleData');
