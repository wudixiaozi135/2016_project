/**
 * Created by lx on 2015/1/23.
 */
class WelcomeView extends egret.Sprite
{
	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initWelcomeView, this);
	}


	private textContainer:egret.Sprite;

	private initWelcomeView()
	{
		var headimg:egret.Bitmap = this.createBitmapByName("toufa");
		this.addChild(headimg);
		headimg.x = (this.stage.stageWidth - headimg.width) / 2;
		headimg.y = (this.stage.stageHeight - headimg.height) / 2;

		var labelTxt:egret.TextField = new egret.TextField();
		labelTxt.text = "天天数钱";
		labelTxt.textColor = 0xbbffa0;
		labelTxt.size = 35;
		labelTxt.x = this.stage.stageWidth / 2;
		labelTxt.y = this.stage.stageHeight / 2 + 150;
		labelTxt.anchorOffsetX = labelTxt.anchorOffsetY = 0.5;
		labelTxt.textAlign = "center";
		this.addChild(labelTxt);

		var versionTxt:egret.TextField = new egret.TextField();
		versionTxt.text = "天天数钱 For Egret Version 1.0";
		versionTxt.textColor = 0xffffff;
		versionTxt.alpha = 0.55;
		versionTxt.size = 12;
		versionTxt.x = this.stage.stageWidth / 2;
		versionTxt.y = this.stage.stageHeight - 20;
		versionTxt.anchorOffsetX = versionTxt.anchorOffsetY = 0.5;
		versionTxt.textAlign = "center";
		this.addChild(versionTxt);

		var textContainer:egret.Sprite = new egret.Sprite();
		textContainer.anchorOffsetX = textContainer.anchorOffsetY = 0.5;
		this.addChild(textContainer);
		textContainer.x = this.stage.stageWidth / 2;
		textContainer.y = this.stage.stageHeight / 2 + 200;
		textContainer.alpha = 1;

		this.textContainer = textContainer;

		//根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
		RES.getResAsync("description", this.startAnimation, this);
	}

	/**
	 * 描述文件加载成功，开始播放动画
	 */
	private startAnimation(result:Array<any>):void
	{

		var textContainer:egret.Sprite = this.textContainer;
		var count:number = -1;
		var self:any = this;
		var change:Function = function ()
		{
			count++;
			if (count >= result.length)
			{
				count = 0;
			}
			var lineArr = result[count];

			self.changeDescription(textContainer, lineArr);

			var tw = egret.Tween.get(textContainer);
			tw.to({"alpha": 1}, 200);
			tw.wait(2000);
			tw.to({"alpha": 0}, 200);
			tw.call(change, this);
		}

		change();
	}

	/**
	 * 切换描述内容
	 */
	private changeDescription(textContainer:egret.Sprite, lineArr:Array<any>):void
	{
		textContainer.removeChildren();
		var w:number = 0;
		for (var i:number = 0; i < lineArr.length; i++)
		{
			var info:any = lineArr[i];
			var colorLabel:egret.TextField = new egret.TextField();
			colorLabel.x = w;
			colorLabel.anchorOffsetX = colorLabel.anchorOffsetY = 0;
			colorLabel.textColor = parseInt(info["textColor"]);
			colorLabel.text = info["text"];

			colorLabel.size = 18;
			textContainer.addChild(colorLabel);

			w += colorLabel.width;
		}
	}

	/**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 */
	private createBitmapByName(name:string):egret.Bitmap
	{
		var result:egret.Bitmap = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}