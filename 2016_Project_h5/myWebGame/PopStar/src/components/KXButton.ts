/**
 * Created by longxing on 2015/4/9.
 */
class KXButton extends egret.Sprite
{
	private _enableFlag:boolean = true;
	private _btnBitmap:egret.Bitmap;

	public constructor()
	{
		super();
		this._btnBitmap = new egret.Bitmap();
		this.addChild(this._btnBitmap);
		this.touchEnabled = true;
	}

	private _normalRes:string;
	private _enabledRes:string;

	public onSetButtonRes(normalRes:string, enabledRes:string = "", text:string = "")
	{
		this._normalRes = normalRes;
		this._enabledRes = enabledRes;

		this.updateProperty();

		if (text != "")
		{
			var tf:egret.TextField = new egret.TextField();
			tf.text = text;
			tf.size = 30;
			tf.bold = true;
			tf.textAlign = "center";
			tf.width = this._btnBitmap.width;
			tf.anchorOffsetX=tf.width*.5;
			tf.anchorOffsetY=tf.height*.5;
			this.addChild(tf);
		}
	}

	public onSetEnable(enable:boolean)
	{
		this._enableFlag = enable;
		this.updateProperty();
	}


	private updateProperty()
	{
		if (this._enableFlag)
		{
			this._btnBitmap.texture = RES.getRes(this._normalRes);
		} else
		{
			this._btnBitmap.texture = RES.getRes(this._enabledRes);
		}
		this._btnBitmap.anchorOffsetX = this._btnBitmap.width * .5;
		this._btnBitmap.anchorOffsetY = this._btnBitmap.height * .5;
	}
}