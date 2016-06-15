/**
 * Created by longxing on 2015/4/9.
 */
class GameTopView extends egret.Sprite
{
	public constructor()
	{
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
	}

	private kaTF:egret.TextField;
	private targetScoreTF:egret.TextField;
	private scoreTF:egret.TextField;
	private toolStarTF:egret.TextField;

	private initView(evt:egret.Event)
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);

		var liBtn:KXButton = new KXButton();
		liBtn.onSetButtonRes("shop", "shop");
		liBtn.scaleX = liBtn.scaleY = 0.6;
		this.addChild(liBtn);
		liBtn.x = this.stage.stageWidth - liBtn.width / 2;
		liBtn.y = 25;
		liBtn.touchEnabled = true;
		liBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenShopWindow, this);

		var chuiBtn:KXButton = new KXButton();
		chuiBtn.onSetButtonRes("hammer", "hammer");
		chuiBtn.scaleX = chuiBtn.scaleY = 0.6;
		this.addChild(chuiBtn);
		chuiBtn.touchEnabled = true;
		chuiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseToolsChui, this);
		chuiBtn.x = this.stage.stageWidth - 60;
		chuiBtn.y = 80;

		var moBtn:KXButton = new KXButton();
		moBtn.onSetButtonRes("item_shuffle", "item_shuffle");
		moBtn.scaleX = moBtn.scaleY = 0.6;
		this.addChild(moBtn);
		moBtn.touchEnabled = true;
		moBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetGame, this);
		moBtn.x = this.stage.stageWidth - 120;
		moBtn.y = 80;

		this.kaTF = new egret.TextField();
		this.kaTF.text = "关卡:1";
		this.kaTF.textAlign = "left";
		this.kaTF.size = 20;
		this.kaTF.anchorOffsetY = this.kaTF.height * .5;

		this.kaTF.bold = true;
		this.kaTF.y = 25;
		this.addChild(this.kaTF);

		this.targetScoreTF = new egret.TextField();
		this.targetScoreTF.text = "目标分:3000";
		this.targetScoreTF.textAlign = "left";
		this.targetScoreTF.size = 20;
		this.targetScoreTF.bold = true;
		this.targetScoreTF.anchorOffsetY = this.targetScoreTF.height * .5;


		this.targetScoreTF.x = 150;
		this.targetScoreTF.y = 25;
		this.addChild(this.targetScoreTF);


		this.scoreTF = new egret.TextField();
		this.scoreTF.text = "3000";
		this.scoreTF.textAlign = "left";
		this.scoreTF.size = 20;
		this.scoreTF.bold = true;
		this.scoreTF.anchorOffsetX = this.scoreTF.width * .5;
		this.scoreTF.anchorOffsetY = this.scoreTF.height * .5;

		this.scoreTF.x = this.stage.stageWidth / 2;
		this.scoreTF.y = 80;
		this.addChild(this.scoreTF);

		this.toolStarTF = new egret.TextField();
		this.toolStarTF.text = "0";
		this.toolStarTF.textAlign = "left";
		this.toolStarTF.size = 20;
		this.toolStarTF.bold = true;
		this.toolStarTF.x = liBtn.x - 18;
		this.toolStarTF.y = liBtn.y - 6;
		this.addChild(this.toolStarTF);

		var stopBtn:KXButton = new KXButton();
		stopBtn.onSetButtonRes("option_button", "option_button");
		this.addChild(stopBtn);
		stopBtn.touchEnabled = true;
		stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPauseGame, this);
		stopBtn.scaleX = stopBtn.scaleY = 0.6;
		stopBtn.x = stopBtn.width / 2 + 5;
		stopBtn.y = 80;

		var taskBtn:KXButton = new KXButton();
		taskBtn.onSetButtonRes("bottom_2", "bottom_2");
		this.addChild(taskBtn);
		taskBtn.x = stopBtn.x + 80;
		taskBtn.y = 80;
		taskBtn.scaleX = taskBtn.scaleY = 0.6;
		taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaskWindow, this);

	}

	private onTaskWindow(evt:egret.TouchEvent):void
	{
		var self = this;
		var callFun = function ()
		{
			self.setToolStar(egret.localStorage.getItem("toolStar"));
		}
		GameTaskView.getInstance().onShowTaskWindow(this, callFun);
	}

	private onOpenShopWindow(evt:egret.TouchEvent):void
	{
		GameShopView.getInstance().onOpenShopWindow(this);
	}

	public setCurLevel(value:string)
	{
		this.kaTF.text = "关卡:" + value;
	}

	public setCurScore(value:string)
	{
		this.scoreTF.text = value;
	}

	public setTargetScore(value:string)
	{
		this.targetScoreTF.text = "目标:" + value;
	}

	public setToolStar(value:string)
	{
		this.toolStarTF.text = value;
	}

	private onUseToolsChui(evt:egret.TouchEvent):void
	{
		var toolnum:number = Number(egret.localStorage.getItem("toolStar"));
		if (toolnum >= 5)
		{
			var self = this;
			var useToolFun = function ():void
			{
				self.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_USETOOL_CHUI));
			}
			GameDialogView.getInstance().onShowDialog("确定使用5个小星星来使用小锤子吗？", this, useToolFun);
		} else
		{
			GameDialogView.getInstance().onShowDialog("小星星道具不足！请购买小星星！", this);
		}

	}

	private onResetGame(evt:egret.TouchEvent):void
	{
		var toolnum:number = Number(egret.localStorage.getItem("toolStar"));
		if (toolnum >= 10)
		{
			var self = this;
			var resetFun = function ():void
			{
				egret.localStorage.setItem("toolStar", (toolnum - 10).toString());
				self.setToolStar((toolnum - 10).toString());
				self.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_RESET));
			}
			GameDialogView.getInstance().onShowDialog("确定使用10个小星星来重新开始本局游戏吗？", this, resetFun);
		} else
		{
			GameDialogView.getInstance().onShowDialog("小星星道具不足！请购买小星星！", this);
		}

	}

	private onPauseGame(evt:egret.TouchEvent):void
	{
		this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_PAUSE));
	}
}