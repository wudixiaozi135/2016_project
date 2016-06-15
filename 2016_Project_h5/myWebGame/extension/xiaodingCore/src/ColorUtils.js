/**
 * Created by Administrator on 2016/4/5.
 */
var xd;
(function (xd) {
    var ColorUtils = (function () {
        function ColorUtils() {
        }
        var d = __define,c=ColorUtils,p=c.prototype;
        ColorUtils.getColorValue = function (red, green, blue) {
            var color = 0;
            color = red << 16 | green << 8 | blue;
            return color;
        };
        return ColorUtils;
    }());
    xd.ColorUtils = ColorUtils;
    egret.registerClass(ColorUtils,'xd.ColorUtils');
})(xd || (xd = {}));
//# sourceMappingURL=ColorUtils.js.map