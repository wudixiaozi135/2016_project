/**
 * Created by lx on 2015/1/23.
 */
var OpenGameViewEvent = (function (_super) {
    __extends(OpenGameViewEvent, _super);
    function OpenGameViewEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=OpenGameViewEvent,p=c.prototype;
    OpenGameViewEvent.OPENGAMEVIEW = "openGameView";
    return OpenGameViewEvent;
}(egret.Event));
egret.registerClass(OpenGameViewEvent,'OpenGameViewEvent');
//# sourceMappingURL=OpenGameViewEvent.js.map