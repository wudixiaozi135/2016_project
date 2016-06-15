/**
 * Created by longxing on 2015/4/14.
 */
class GameFirstRewardView extends egret.Sprite
{
	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onaddToStage, this);
	}

	private _obtainBtn:KXButton;

	private onaddToStage(evt:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onaddToStage, this);

		var desBmp:egret.Bitmap = new egret.Bitmap();
		desBmp.texture = RES.getRes("samsung_bg");
		desBmp.width = this.stage.stageWidth;
		desBmp.height = this.stage.stageWidth / 640 * 720;
		this.addChild(desBmp);
		desBmp.anchorOffsetX = desBmp.width * .5;
		desBmp.anchorOffsetY = desBmp.height * .5;


		desBmp.x = this.stage.stageWidth / 2;
		desBmp.y = this.stage.stageHeight / 2;

		this._obtainBtn = new KXButton();
		this._obtainBtn.onSetButtonRes("daily_ok", "daily_ok");
		this.addChild(this._obtainBtn);
		this._obtainBtn.scaleX = this._obtainBtn.scaleY = 0.6;
		this._obtainBtn.x = this.stage.stageWidth / 2;
		this._obtainBtn.y = this.stage.stageHeight / 2 + 200;
		this._obtainBtn.touchEnabled = true;
		this._obtainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainStar, this);
	}

	private onObtainStar(evt:egret.TouchEvent):void
	{
		this._obtainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onObtainStar, this);
		egret.localStorage.setItem("toolStar", "10");
		this.parent.removeChild(this);
	}
}