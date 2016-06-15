/**
 * Created by xiaoding on 2016/5/10.
 */
declare function getConfigData();
class GameScenePanel extends eui.Group implements xd.IObserver
{
	constructor()
	{
		super();
		let s = egret.MainContext.instance.stage;
		this.width = s.stageWidth;
		this.height = s.stageHeight;

		ClientSocket.getInstance().attach(this);
		this.init();
	}

	private init():void
	{
		let config=getConfigData();
		ClientSocket.getInstance().init("ws://" + config.host, config.port);


		xd.GameDispatcher.addEventListener(FruitMachineClientEventName.GAME_STATE, this.onGameState, this);
		xd.GameDispatcher.dispatchEvent(FruitMachineClientEventName.GAME_STATE, {type: GameState.gameStart});
	}

	private onGameState(ev:xd.GameEvent):void
	{
		this.removeChildren();

		let type = ev.param.type;
		switch (type)
		{
			case GameState.gameStart:
				let login:LoginPanel = new LoginPanel();
				this.addChild(login);
				break;
			case GameState.gameProcess:
				let gameProcess:GameProcessPanel = new GameProcessPanel();
				this.addChild(gameProcess);
				break;
			case GameState.gameEnd:
				break;
			default:
				break;
		}
	}

	update(message):void
	{
		if (message.type == ProcType.TYPE_CONTROL)
		{
			//登陆回传成功
			if (message.proc == ClientProtocol.CM_PROTOCOL_LOGIN)
			{
				xd.GameDispatcher.dispatchEvent(FruitMachineClientEventName.GAME_STATE, {type: GameState.gameProcess});
			}
		}
	}
}