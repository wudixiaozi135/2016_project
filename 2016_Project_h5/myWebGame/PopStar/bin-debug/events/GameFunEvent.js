/**
 * Created by longxing on 2015/4/9.
 */
var GameFunEvent = (function (_super) {
    __extends(GameFunEvent, _super);
    function GameFunEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GameFunEvent,p=c.prototype;
    GameFunEvent.GAME_FUN_EVENT_START = "gameFun_start";
    GameFunEvent.GAME_EVENT_USETOOL_CHUI = "game_useTool_chui";
    GameFunEvent.GAME_EVENT_RESET = "game_reset";
    GameFunEvent.GAME_EVENT_PAUSE = "game_pause";
    GameFunEvent.GAME_EVENT_MAINMENU = "game_mainmenu";
    GameFunEvent.GAME_EVENT_CLEAR = "game_clear";
    return GameFunEvent;
}(egret.Event));
egret.registerClass(GameFunEvent,'GameFunEvent');
