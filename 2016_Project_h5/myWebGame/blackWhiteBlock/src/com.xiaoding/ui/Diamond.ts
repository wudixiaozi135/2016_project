/**
 * Created by Administrator on 2016/3/30.
 */
class Diamond extends eui.Group implements IDiamond
{
	private block:eui.Rect;
	private blockW:number;
	private blockH:number;

	private _data:SimpleData;
	private color:number;

	constructor(w:number, h:number)
	{
		super();
		this.blockW = w;
		this.blockH = h;
		this._data = new SimpleData();
	}

	protected createChildren():void
	{
		super.createChildren();
		this.block = new eui.Rect()
		this.block.width = this.blockW;
		this.block.height = this.blockH;
		this.block.fillAlpha = .9;
		this.block.strokeColor = 0xffffff;
		if (this.color)
		{
			this.block.fillColor = this.color;
		} else
		{
			this.block.fillColor = Color.BLACK;
		}
		this.addChild(this.block);
		this.block.touchEnabled = false;
		this.block.touchChildren = false;
	}

	changeColor(colorType:ColorType):void
	{
		switch (colorType)
		{
			case ColorType.black:
				this.color = Color.BLACK;
				break;
			case ColorType.white:
				this.color = Color.WHITE;
				break;
			case ColorType.red:
				this.color = Color.RED;
				break;
			case ColorType.color009900:
				this.color = Color.COLOR_009900;
				break;
			case ColorType.color009933:
				this.color = Color.COLOR_009933;
				break;
			case ColorType.color009966:
				this.color = Color.COLOR_009966;
				break;
			case ColorType.color009999:
				this.color = Color.COLOR_009999;
				break;
			case ColorType.color0099cc:
				this.color = Color.COLOR_0099cc;
				break;
			case ColorType.color0099ff:
				this.color = Color.COLOR_0099ff;
				break;
			case ColorType.color000000:
				this.color = Color.COLOR_000000;
				break;
			default:
				break;
		}
		if (this.block)
		{
			this.block.fillColor = this.color;
		}
	}

	reset():void
	{
		if (this.block)
		{
			this.block.fillColor = Color.BLACK;
		}
	}

	hide():boolean
	{
		this.touchEnabled = false;
		this.visible = false;
		return this.visible;
	}

	show():boolean
	{
		this.touchEnabled = true;
		this.visible = true;
		return this.visible;
	}

	get data():SimpleData
	{
		return this._data;
	}
}