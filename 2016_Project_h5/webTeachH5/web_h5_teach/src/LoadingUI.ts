class LoadingUI extends egret.Sprite
{
	private textField:egret.TextField;

	public constructor()
	{
		super();
		this.createView();
	}

	private createView():void
	{
		this.textField = new egret.TextField();
		this.addChild(this.textField);
		this.textField.width = 480;
		this.textField.height = 100;
		this.textField.textAlign = "center";
	}

	public setProgress(current, total):void
	{
		this.textField.text = "Loading..." + current + "/" + total;
	}
}
