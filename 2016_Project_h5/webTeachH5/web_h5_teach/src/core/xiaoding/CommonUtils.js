/**
 * Created by xiaoding on 2016/2/18.
 */
var xd;
(function (xd) {
    var CommonUtils = (function () {
        function CommonUtils() {
        }
        CommonUtils.getBmp = function (resName) {
            var bmp = new egret.Bitmap();
            bmp.texture = RES.getRes(resName);
            return bmp;
        };
        CommonUtils.getGroup = function (layoutStyle, align, gap, childrens) {
            if (layoutStyle === void 0) { layoutStyle = 0; }
            if (align === void 0) { align = null; }
            if (gap === void 0) { gap = 5; }
            if (childrens === void 0) { childrens = null; }
            var group = new eui.Group();
            var layout = null;
            if (layoutStyle == 1) {
                layout = new eui.HorizontalLayout();
                layout.gap = gap;
                if (align) {
                    layout.verticalAlign = align;
                }
            }
            else if (layoutStyle == 2) {
                layout = new eui.VerticalLayout();
                layout.gap = gap;
                if (align) {
                    layout.horizontalAlign = align;
                }
            }
            group.layout = layout;
            if (childrens) {
                for (var i = 0, len = childrens.length; i < len; i++) {
                    group.addChild(childrens[i]);
                }
            }
            return group;
        };
        /*
         * 中心旋转
         * */
        CommonUtils.centerRotate = function (mc, angle) {
            var currentRotation = mc.rotation;
            //获取mc不旋转时候的尺寸
            mc.rotation = 0;
            var mcWidth = mc.width;
            var mcHeight = mc.height;
            mc.rotation = currentRotation;
            //获取mc当前中心点坐标
            var pointO = mc.localToGlobal(mcWidth / 2, mcHeight / 2);
            //旋转mc
            mc.rotation = angle;
            //获取mc旋转后中心点坐标
            var pointO2 = mc.localToGlobal(mcWidth / 2, mcHeight / 2);
            //平移到原来中心点O
            var p3 = pointO.subtract(pointO2);
            var matrix = mc.matrix;
            matrix.translate(p3.x, p3.y);
            mc.matrix = matrix;
        };
        /*
         * 固定点绽放
         * */
        CommonUtils.scaleAtPoint = function (target, point, scale) {
            var oriP = new egret.Point(target.x, target.y);
            var stagePoint = target.localToGlobal(point.x, point.y);
            target.scaleX = target.scaleY = scale;
            var currentStagePoint = target.localToGlobal(point.x, point.y);
            target.x -= currentStagePoint.x - stagePoint.x;
            target.y -= currentStagePoint.y - stagePoint.y;
            var rotation = target.rotation;
            var newP = new egret.Point(target.x, target.y);
            if (rotation == 90) {
                target.x -= newP.x - oriP.x;
            }
            else if (rotation == 180) {
                target.x -= newP.x - oriP.x;
                target.y -= newP.y - oriP.y;
            }
            else if (rotation == -90) {
                target.y -= newP.y - oriP.y;
            }
        };
        return CommonUtils;
    })();
    xd.CommonUtils = CommonUtils;
})(xd || (xd = {}));
//# sourceMappingURL=CommonUtils.js.map