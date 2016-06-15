/**
 * Created by longxing on 2015/4/9.
 */
class GamePreView extends egret.Sprite
{
	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private rePlayBtn:KXButton;

	private onAddToStage(evt:egret.Event):void
	{

		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		this.initTaskInfo();

		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("background_layer0");
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;
		this.addChild(bg);

		var preDes:egret.Bitmap = this.createBitmapByName("tips");
//        this.addChild(preDes);
		preDes.anchorOffsetX = preDes.width * .5;
		preDes.anchorOffsetY = preDes.height * .5;

		preDes.scaleX = preDes.scaleY = 0.6;
		preDes.x = this.stage.stageWidth / 2;
		preDes.y = this.stage.stageHeight / 2 - 280;

		var logo:egret.Bitmap = this.createBitmapByName("title_popstar");
		this.addChild(logo);
		logo.anchorOffsetX = logo.width * .5;
		logo.anchorOffsetY = logo.height * .5;


		logo.scaleX = logo.scaleY = 0.6;
		logo.x = this.stage.stageWidth / 2;
		logo.y = this.stage.stageHeight / 2 - 100;

		var startBtn:KXButton = new KXButton();
		startBtn.onSetButtonRes("menu_start", "menu_start");
		startBtn.x = this.stage.stageWidth / 2;
		startBtn.y = this.stage.stageHeight / 2 + 50;
		startBtn.scaleX = startBtn.scaleY = 0.6;
		startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartNewGame, this);
		this.addChild(startBtn);

		this.rePlayBtn = new KXButton();
		this.rePlayBtn.onSetButtonRes("menu_resume", "menu_resume_disabled");
		if (egret.localStorage.getItem("hasgame"))
		{
			this.rePlayBtn.onSetEnable(true);
			this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
		} else
		{
			this.rePlayBtn.onSetEnable(false);
		}

		this.rePlayBtn.x = this.stage.stageWidth / 2;
		this.rePlayBtn.y = this.stage.stageHeight / 2 + 100;
		this.rePlayBtn.scaleX = this.rePlayBtn.scaleY = 0.6;

		this.addChild(this.rePlayBtn);

		var shopBtn:KXButton = new KXButton();
		shopBtn.onSetButtonRes("menu_shop", "menu_shop");
		shopBtn.x = this.stage.stageWidth / 2;
		shopBtn.y = this.stage.stageHeight / 2 + 150;
		shopBtn.scaleX = shopBtn.scaleY = 0.6;
		this.addChild(shopBtn);
		shopBtn.touchEnabled = true;
		shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShopWindow, this);

		var maxBmp:egret.Bitmap = new egret.Bitmap();
		maxBmp.texture = RES.getRes("highscore");
		maxBmp.anchorOffsetX=maxBmp.width*.5;

		maxBmp.scaleX = maxBmp.scaleY = 0.6;
		maxBmp.x = this.stage.stageWidth / 2;
		maxBmp.y = 10;
		this.addChild(maxBmp);

		var maxScoreTF:egret.TextField = new egret.TextField();
		maxScoreTF.size = 20;
		maxScoreTF.textAlign = "left";
		maxScoreTF.bold = true;
		maxScoreTF.text = egret.localStorage.getItem("maxscore");
		this.addChild(maxScoreTF);
		maxScoreTF.x = maxBmp.x;
		maxScoreTF.y = 15;

		var liNum:string = egret.localStorage.getItem("toolStar");
		if (liNum == null)
		{
			//首次赠送刀具
			var rewardView:GameFirstRewardView = new GameFirstRewardView();
			this.addChild(rewardView);
			rewardView.y = -rewardView.height;
			egret.Tween.get(rewardView).to({y: 0}, 300);
		}
	}

	private _clearView:GameClearDialogView;

	private onStartNewGame(evt:egret.TouchEvent):void
	{
		if (egret.localStorage.getItem("hasgame"))
		{
			if (this._clearView == null)
			{
				this._clearView = new GameClearDialogView();
				this._clearView.addEventListener(GameFunEvent.GAME_EVENT_CLEAR, this.onClearGameInfo, this);
			}
			this.addChild(this._clearView);
		} else
		{
			this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_FUN_EVENT_START));
			egret.localStorage.setItem("hasgame", 'yes');
		}
	}

	private onClearGameInfo(evt:GameFunEvent):void
	{
		egret.localStorage.removeItem("level");
		egret.localStorage.removeItem("score");
		this.dispatchEvent(new GameFunEvent((GameFunEvent.GAME_EVENT_CLEAR)));
	}

	private onStartGame(evt:egret.TouchEvent = null):void
	{
		this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_FUN_EVENT_START));
	}

	private createBitmapByName(name:string):egret.Bitmap
	{
		var result:egret.Bitmap = new egret.Bitmap();
		result.texture = RES.getRes(name);
		return result;
	}

	private onShopWindow(evt:egret.TouchEvent):void
	{
		GameShopView.getInstance().onOpenShopWindow(this);
	}

	public onRefreshView()
	{
		if (egret.localStorage.getItem("hasgame"))
		{
			this.rePlayBtn.onSetEnable(true);
			this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
		} else
		{
			this.rePlayBtn.onSetEnable(false);
		}
	}

	private initTaskInfo()
	{
		if (!egret.localStorage.getItem('task1'))
		{
			egret.localStorage.setItem('task1', '1');
		}
		if (!egret.localStorage.getItem('task2'))
		{
			egret.localStorage.setItem('task2', '1');
		}
		if (!egret.localStorage.getItem('task3'))
		{
			egret.localStorage.setItem('task3', '1');
		}
		if (!egret.localStorage.getItem('task4'))
		{
			egret.localStorage.setItem('task4', '1');
		}
		if (!egret.localStorage.getItem('task5'))
		{
			egret.localStorage.setItem('task5', '1');
		}
		if (!egret.localStorage.getItem('task6'))
		{
			egret.localStorage.setItem('task6', '1');
		}
	}
}