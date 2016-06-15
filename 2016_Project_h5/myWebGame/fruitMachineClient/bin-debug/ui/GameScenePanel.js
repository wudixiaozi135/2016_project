var GameScenePanel = (function (_super) {
    __extends(GameScenePanel, _super);
    function GameScenePanel() {
        _super.call(this);
        var s = egret.MainContext.instance.stage;
        this.width = s.stageWidth;
        this.height = s.stageHeight;
        ClientSocket.getInstance().attach(this);
        this.init();
    }
    var d = __define,c=GameScenePanel,p=c.prototype;
    p.init = function () {
        var config = getConfigData();
        ClientSocket.getInstance().init("ws://" + config.host, config.port);
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
                var gameProcess = new GameProcessPanel();
                this.addChild(gameProcess);
                break;
            case GameState.gameEnd:
                break;
            default:
                break;
        }
    };
    p.update = function (message) {
        if (message.type == ProcType.TYPE_CONTROL) {
            //登陆回传成功
            if (message.proc == ClientProtocol.CM_PROTOCOL_LOGIN) {
                xd.GameDispatcher.dispatchEvent(FruitMachineClientEventName.GAME_STATE, { type: GameState.gameProcess });
            }
        }
    };
    return GameScenePanel;
}(eui.Group));
egret.registerClass(GameScenePanel,'GameScenePanel',["xd.IObserver"]);
//# sourceMappingURL=GameScenePanel.js.map