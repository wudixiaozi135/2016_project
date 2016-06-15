/**
 * Created by xiaoding on 2016/5/12.
 */
class RedBorder extends eui.Group
{
	private redBorder:eui.Rect;

	private _row:number = 0;
	private _column:number = 0;

	private w:number = 0;
	private h:number = 0;

	constructor(w:number = 88, h:number = 88)
	{
		super();
		this.w = w;
		this.h = h;
		this.width = w;
		this.height = h;
	}

	protected createChildren():void
	{
		super.createChildren();

		this.redBorder = new eui.Rect();
		this.redBorder.fillAlpha = 0;
		this.redBorder.strokeAlpha = 1;
		this.redBorder.strokeWeight = 5;
		this.redBorder.strokeColor = 0xFF00FF;
		this.addChild(this.redBorder);
		this.redBorder.percentWidth = 100;
		this.redBorder.percentHeight = 100;
	}

	get row():number
	{
		return this._row;
	}

	set row(value:number)
	{
		this._row = value;
		this.y = value * (this.w + 1.8);
	}

	get column():number
	{
		return this._column;
	}

	set column(value:number)
	{
		this._column = value;
		this.x = value * (this.h + 4);
	}
}