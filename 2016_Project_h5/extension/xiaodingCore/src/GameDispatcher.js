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
