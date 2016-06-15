/**
 * Created by xiaoding on 2016/5/10.
 */
var GameState;
(function (GameState) {
    GameState[GameState["gameStart"] = 100] = "gameStart";
    GameState[GameState["gameProcess"] = 200] = "gameProcess";
    GameState[GameState["gameEnd"] = 300] = "gameEnd";
})(GameState || (GameState = {}));
