/**
 * Created by longxing on 2015/4/15.
 */
class GameDialogView extends egret.Sprite
{
	private static _instance:GameDialogView;

	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	public static getInstance():GameDialogView
	{
		if (this._instance == null)
		{
			this._instance = new GameDialogView();
		}
		return this._instance;
	}

	private _callFun:Function;

	public onShowDialog(des:string, container:egret.Sprite, callFun:Function = null):void
	{
		container.addChild(GameDialogView._instance);
		this._callFun = callFun;
		this._desTF.text = des;
	}

	private _desTF:egret.TextField;

	private onAddToStage(evt:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.graphics.beginFill(0x000000, 0.6);
		this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
		this.graphics.endFill();
		this.touchEnabled = true;

		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("bg_dialog");
		bg.anchorOffsetX=bg.width*.5;
		bg.anchorOffsetY=bg.height*.5;

		bg.scaleY = bg.scaleX = 0.7;
		this.addChild(bg);
		bg.x = this.stage.stageWidth / 2;
		bg.y = this.stage.stageHeight / 2;

		var closeBtn:KXButton = new KXButton();
		closeBtn.onSetButtonRes("quit_button", "quit_button");
		this.addChild(closeBtn);
		closeBtn.x = bg.x + 160;
		closeBtn.y = bg.y - 80;
		closeBtn.touchEnabled = true;
		closeBtn.scaleX = closeBtn.scaleY = 0.6;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseDialog, this);

		var submitBtn:KXButton = new KXButton();
		submitBtn.onSetButtonRes("life_sure", "life_sure");
		this.addChild(submitBtn);
		submitBtn.x = bg.x;
		submitBtn.y = bg.y + 70;
		submitBtn.scaleX = submitBtn.scaleY = 0.5;
		submitBtn.touchEnabled = true;
		submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitHandler, this);

		this._desTF = new egret.TextField();
		this._desTF.textAlign = "left";
		this._desTF.size = 20;
		this._desTF.bold = true;

		this._desTF.width = 300;
		this._desTF.height = 100;
		
		this._desTF.anchorOffsetX=this._desTF.width*.5;
		this._desTF.anchorOffsetY=this._desTF.height*.5;

		this._desTF.x = bg.x;
		this._desTF.y = bg.y;
		this._desTF.multiline = true;
		this._desTF.text = "确定使用10个小星星来重新开始本局游戏吗？";
		this.addChild(this._desTF);
	}

	private onSubmitHandler(evt:egret.TouchEvent):void
	{
		if (this._callFun)
		{
			console.log("callFun...");
			this._callFun();
		}
		this.onCloseDialog();
	}

	private onCloseDialog(evt:egret.TouchEvent = null):void
	{
		this.parent.removeChild(this);
	}
}