/**
 * Created by xiaoding on 2016/5/12.
 */
class AlertPanel
{
	private static stage:egret.Stage;

	static init(stage:egret.Stage):void
	{
		AlertPanel.stage = stage;
	}

	static show(msg:string):void
	{
		let container:egret.Sprite = new egret.Sprite();
		container.graphics.clear();
		container.graphics.beginFill(0x0, .5);
		container.graphics.drawRect(0, 0, AlertPanel.stage.stageWidth, 55);

		let alert:egret.TextField = new egret.TextField();
		alert.bold = true;
		alert.width = AlertPanel.stage.stageWidth;
		alert.textAlign = "center";
		alert.textColor = 0xff0000;
		alert.text = msg;
		container.addChild(alert);
		alert.y = (container.height - alert.height) * .5;

		AlertPanel.stage.addChild(container);
		container.y = AlertPanel.stage.stageHeight * .5;

		TweenMax.to(container, .7, {
			y: (AlertPanel.stage.stageHeight - container.height) * .5 - 100, ease: Back.easeOut,
			onComplete: AlertPanel.onCompleteHandler, onCompleteParams: [container]
		})
	}

	private static onCompleteHandler(...rest):void
	{
		if (rest.length > 0)
		{
			AlertPanel.stage.removeChild(rest.pop());
		}
	}
}