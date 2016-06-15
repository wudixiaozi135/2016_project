/**
 * Created by Administrator on 2016/3/31.
 */
var GameEventConstant = (function () {
    function GameEventConstant() {
    }
    var d = __define,c=GameEventConstant,p=c.prototype;
    GameEventConstant.GAME_OVER = "game_over";
    GameEventConstant.EXIT = "exit";
    GameEventConstant.RESTART_GAME = "restart_game";
    return GameEventConstant;
}());
egret.registerClass(GameEventConstant,'GameEventConstant');
