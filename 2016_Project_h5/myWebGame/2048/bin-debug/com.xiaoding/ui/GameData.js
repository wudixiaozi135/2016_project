/**
 * Created by Administrator on 2016/4/5.
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.gridRow = 4;
    GameData.gridColumn = 4;
    GameData.gridW = 0;
    GameData.gridH = 0;
    GameData.gameHeadHeight = 50;
    GameData.maxScoreKey = "2048_maxScore";
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map