/**
 * Created by longxing on 2015/4/15.
 */
class GameClearDialogView extends egret.Sprite
{
	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(evt:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.graphics.beginFill(0x000000, 0.5);
		this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
		this.graphics.endFill();
		this.touchEnabled = true;
		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("clearbg");
		bg.width = this.stage.stageWidth - 100;
		bg.height = bg.width / 550 * 254;
		this.addChild(bg);
		bg.anchorOffsetX = bg.width * .5;
		bg.anchorOffsetY = bg.height * .5;

		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;

		var submitBtn:KXButton = new KXButton();
		submitBtn.onSetButtonRes("clearok", "clearok");
		this.addChild(submitBtn);
		submitBtn.x = bg.x - 70;
		submitBtn.y = bg.y + 55;
		submitBtn.scaleX = submitBtn.scaleY = 0.5;
		submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmit, this);

		var cancelBtn:KXButton = new KXButton();
		cancelBtn.onSetButtonRes("clearcancel", "clearcancel");
		this.addChild(cancelBtn);
		cancelBtn.x = bg.x + 70;
		cancelBtn.y = bg.y + 55;
		cancelBtn.scaleX = cancelBtn.scaleY = 0.5;
		cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
	}

	private onCancel(evt:egret.TouchEvent):void
	{
		this.parent.removeChild(this);
	}

	private onSubmit(evt:egret.TouchEvent):void
	{
		this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_CLEAR));
		this.parent.removeChild(this);
	}
}