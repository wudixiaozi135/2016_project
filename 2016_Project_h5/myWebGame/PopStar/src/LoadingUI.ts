class LoadingUI extends egret.Sprite
{

	public constructor()
	{
		super();
		this.createView();
	}

	private textField:egret.TextField;

	private createView():void
	{

		var data = RES.getRes("loading");
		var texture = RES.getRes("loading_png");
		var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
		var chunli:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("loading"));
		chunli.anchorOffsetY = 0.5 * chunli.height;
		chunli.x = egret.MainContext.instance.stage.stageWidth / 2;
		chunli.y = egret.MainContext.instance.stage.stageHeight / 2;
		this.addChild(chunli);
		chunli.play(-1);


		this.textField = new egret.TextField();
		this.addChild(this.textField);
		this.textField.width = 480;
		this.textField.height = 100;
		this.textField.size = 12;
		this.textField.anchorOffsetX=this.textField.width*.5;
		this.textField.anchorOffsetY=this.textField.height*.5;

		this.textField.x = egret.MainContext.instance.stage.stageWidth / 2;
		this.textField.y = egret.MainContext.instance.stage.stageHeight / 2;
		this.textField.textAlign = "center";
	}

	public setProgress(current, total):void
	{
		this.textField.text = current + "/" + total;
	}
}
