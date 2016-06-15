/**
 * Created by xiaoding on 2016/4/29.
 */
class ColorShape extends eui.Group
{
	private shape:eui.Rect;
	private _type:ColorShapeType;

	private w:number = 0;
	private h:number = 0;

	private _row:number = 0;
	private _column:number = 0;


	/*
	 * 1表示有数据 0表示无数据
	 * */
	private _data:number = 0;

	/*
	 * 状态 1选中 0未选中
	 * */
	private _state:number = 0;

	public shapeData:ShapeData = new ShapeData();

	constructor(type:ColorShapeType)
	{
		super();
		this._type = type;
		this.touchChildren = false;
		this.cacheAsBitmap=true;
	}

	get data():number
	{
		return this._data;
	}

	set data(value:number)
	{
		this._data = value;
	}

	get type():ColorShapeType
	{
		return this._type;
	}

	protected createChildren():void
	{
		super.createChildren();
		this.w = GameData.shapeW;
		this.h = GameData.shapeH;

		let pic:egret.Bitmap = new egret.Bitmap();
		this.addChild(pic);
		this.shape = new eui.Rect();

		let key:string;
		if (this.type == ColorShapeType.blue)
		{
			key = "blueStar";
		} else if (this.type == ColorShapeType.red)
		{
			key = "redStar";
		} else if (this.type == ColorShapeType.green)
		{
			key = "greenStar";
		} else if (this.type == ColorShapeType.yellow)
		{
			key = "yellowStar";
		} else if (this.type == ColorShapeType.purple)
		{
			key = "purpleStar";
		}
		if (key)
		{
			pic.width = this.w;
			pic.height = this.h;
			pic.texture = RES.getRes(key);
		}
		this.width = this.w;
		this.height = this.h;
		this.addChildAt(this.shape, 0);

		this.shape.percentWidth = 100;
		this.shape.percentHeight = 100;
		this.shape.horizontalCenter = 0;
		this.shape.verticalCenter = 0;

		this.hightlight(false);
	}

	get state():number
	{
		return this._state;
	}

	set state(value:number)
	{
		this._state = value;
		this.hightlight(this._state == 1 ? true : false);
	}

	private hightlight(isHightlight:boolean = true):void
	{
		this.shape.visible = isHightlight;
		if (isHightlight)
		{
			this.shape.strokeWeight = 2;
			this.shape.strokeColor = 0xffffff;
			this.shape.strokeAlpha = 1;
		} else
		{
			this.shape.strokeWeight = 1;
			this.shape.strokeColor = 0xffffff;
			this.shape.strokeAlpha = 0
		}
	}

	setData(row:number, column:number)
	{
		this.row = row;
		this.column = column;
		this.shapeData.update(row, column);
	}

	get row():number
	{
		return this._row;
	}

	set row(value:number)
	{
		this._row = value;
		this.shapeData.row = value;
	}

	get column():number
	{
		return this._column;
	}

	set column(value:number)
	{
		this._column = value;
		this.shapeData.column = value;
	}
}