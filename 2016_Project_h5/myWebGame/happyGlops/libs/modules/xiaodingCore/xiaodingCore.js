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
/**
 * Created by xiaoding on 2016/2/18.
 */
var xd;
(function (xd) {
    var CommonUtils = (function () {
        function CommonUtils() {
        }
        var d = __define,c=CommonUtils,p=c.prototype;
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
    }());
    xd.CommonUtils = CommonUtils;
    egret.registerClass(CommonUtils,'xd.CommonUtils');
})(xd || (xd = {}));
//# sourceMappingURL=CommonUtils.js.map
/**
 * Created by xiaoding on 2016/1/27.
 */
var xd;
(function (xd) {
    var EventDispatcher = egret.EventDispatcher;
    var GameDispatcher = (function () {
        function GameDispatcher() {
        }
        var d = __define,c=GameDispatcher,p=c.prototype;
        GameDispatcher.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            GameDispatcher.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        GameDispatcher.once = function (type, listener, thisObject, useCapture, priority) {
            GameDispatcher.dispatcher.once(type, listener, thisObject, useCapture, priority);
        };
        GameDispatcher.removeEventListener = function (type, listener, thisObject, useCapture) {
            GameDispatcher.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        };
        GameDispatcher.hasEventListener = function (type) {
            return GameDispatcher.hasEventListener(type);
        };
        GameDispatcher.dispatchEvent = function (eventName, obj) {
            if (obj === void 0) { obj = null; }
            return GameDispatcher.dispatcher.dispatchEvent(new xd.GameEvent(eventName, obj));
        };
        GameDispatcher.willTrigger = function (type) {
            return GameDispatcher.dispatcher.willTrigger(type);
        };
        GameDispatcher.dispatcher = new EventDispatcher();
        return GameDispatcher;
    }());
    xd.GameDispatcher = GameDispatcher;
    egret.registerClass(GameDispatcher,'xd.GameDispatcher');
})(xd || (xd = {}));

/**
 * Created by xiaoding on 2016/1/27.
 */
var xd;
(function (xd) {
    var GameEvent = (function (_super) {
        __extends(GameEvent, _super);
        function GameEvent(type, obj, bubbles, cancelable) {
            if (obj === void 0) { obj = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            if (obj) {
                this._obj = obj;
            }
        }
        var d = __define,c=GameEvent,p=c.prototype;
        p.clone = function (obj) {
            return new GameEvent(this.type, obj ? obj : this._obj, this.bubbles, this.cancelable);
        };
        p.toString = function () {
            console.log("GameEvent: ", "type", "bubbles", "cancelable");
        };
        d(p, "param"
            /**
             * 传参获取
             * @returns any
             */
            ,function () {
                return this._obj;
            }
        );
        return GameEvent;
    }(egret.Event));
    xd.GameEvent = GameEvent;
    egret.registerClass(GameEvent,'xd.GameEvent');
})(xd || (xd = {}));

/**
 *
 * @author
 *此类为打印输出类 效果和AS3的trace一样
 */
function trace() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var _content = "";
    var _count = args.length;
    for (var i = 0; i < _count; i++) {
        _content += " " + args[i];
    }
    console.log(_content);
}
/**
 * 带有标签的控制台打印输出函数
 * @param tag 标签
 * @param msg 信息
 */
function log(tag, msg) {
    trace(tag + ": ", msg);
}
//# sourceMappingURL=trace.js.map
