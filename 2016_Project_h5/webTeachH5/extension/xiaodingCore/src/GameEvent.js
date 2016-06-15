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
