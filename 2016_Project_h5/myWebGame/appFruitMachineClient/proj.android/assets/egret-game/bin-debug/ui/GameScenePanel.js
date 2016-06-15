/**
 * Created by xiaoding on 2016/5/10.
 */
var GameScenePanel = (function (_super) {
    __extends(GameScenePanel, _super);
    function GameScenePanel() {
        _super.call(this);
        var s = egret.MainContext.instance.stage;
        this.width = s.stageWidth;
        this.height = s.stageHeight;
        this.init();
    }
    var d = __define,c=GameScenePanel,p=c.prototype;
    p.init = function () {
        xd.GameDispatcher.addEventListener(FruitMachineClientEventName.GAME_STATE, this.onGameState, this);
        xd.GameDispatcher.dispatchEvent(FruitMachineClientEventName.GAME_STATE, { type: GameState.gameStart });
    };
    p.onGameState = function (ev) {
        this.removeChildren();
        var type = ev.param.type;
        switch (type) {
            case GameState.gameStart:
                var login = new LoginPanel();
                this.addChild(login);
                break;
            case GameState.gameProcess:
                break;
            case GameState.gameEnd:
                break;
            default:
                break;
        }
    };
    return GameScenePanel;
}(eui.Group));
egret.registerClass(GameScenePanel,'GameScenePanel');
