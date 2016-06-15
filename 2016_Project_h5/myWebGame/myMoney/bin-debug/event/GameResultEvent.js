/**
 * Created by lx on 2015/1/26.
 */
var GameResultEvent = (function (_super) {
    __extends(GameResultEvent, _super);
    function GameResultEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GameResultEvent,p=c.prototype;
    GameResultEvent.RPLAYGAMEEVENT = "rplayGame";
    GameResultEvent.ONSHARETOFRIENDS = "onShareToFriends";
    return GameResultEvent;
}(egret.Event));
egret.registerClass(GameResultEvent,'GameResultEvent');
//# sourceMappingURL=GameResultEvent.js.map