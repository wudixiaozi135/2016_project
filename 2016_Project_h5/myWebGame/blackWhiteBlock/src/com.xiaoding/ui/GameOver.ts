/**
 * Created by Administrator on 2016/3/31.
 */
class GameOver extends eui.Group
{
	private endLabel:eui.Label;
	private restart:eui.Button;
	private exit:eui.Button;
	private buttonContainer:eui.Group;

	constructor()
	{
		super();
		this.touchThrough = false;
	}

	protected createChildren():void
	{
		super.createChildren();
		this.percentWidth = this.percentHeight = 100;

		let bg:eui.Rect = new eui.Rect();
		bg.percentWidth = 100;
		bg.percentHeight = 100;
		bg.fillAlpha = .8;
		bg.fillColor = 0;
		this.addChild(bg);

		this.endLabel = new eui.Label("Game Over!");
		this.endLabel.size = 50;
		this.addChild(this.endLabel);
		this.endLabel.touchEnabled = false;
		this.endLabel.horizontalCenter = 0;
		this.endLabel.verticalCenter = 0;

		this.buttonContainer = new eui.Group();
		var layout:eui.HorizontalLayout = new eui.HorizontalLayout();
		layout.gap = 30;
		this.buttonContainer.layout = layout;
		this.addChild(this.buttonContainer);

		this.restart = new eui.Button();
		this.restart.addEventListener(eui.UIEvent.CREATION_COMPLETE, function ():void
		{
			this.restart.labelDisplay["size"] = 45;
			this.restart.removeEventListener(eui.UIEvent.CREATION_COMPLETE, arguments.callee);
		}, this);

		this.restart.width = 150;
		this.restart.height = 80;
		this.restart.label = "重玩";
		this.buttonContainer.addChild(this.restart);

		this.exit = new eui.Button();
		this.exit.addEventListener(eui.UIEvent.CREATION_COMPLETE, function ():void
		{
			this.exit.labelDisplay["size"] = 45;
			this.exit.removeEventListener(eui.UIEvent.CREATION_COMPLETE, arguments.callee);
		}, this);

		this.exit.width = 150;
		this.exit.height = 80;
		this.exit.label = "退出";
		this.buttonContainer.addChild(this.exit);
		this.buttonContainer.bottom = 100;
		this.buttonContainer.horizontalCenter = 0;

		this.buttonContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	private onClickHandler(ev:egret.TouchEvent):void
	{
		var target = ev.target;
		if (target == this.exit)
		{
			xd.GameDispatcher.dispatchEvent(GameEventConstant.EXIT);
		} else if (target == this.restart)
		{
			xd.GameDispatcher.dispatchEvent(GameEventConstant.RESTART_GAME);
		}
	}
}