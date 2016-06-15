/**
 * Created by xiaoding on 2016/5/11.
 */
class FruitItem extends eui.Group
{
	public fruitType:FruitItemType;

	private countLabel:eui.Label;
	private btnAdd:eui.Button;
	private btnMinus:eui.Button;

	public price:number = 0;

	public addHandler:Function;
	public minusHandler:Function;

	private _itemCount:number = 0;

	private _enabled:boolean = true;

	constructor(type:FruitItemType)
	{
		super();
		this.fruitType = type;
		let price:number = MapUtils.getPrice(this.fruitType);
		this.price = price;
	}

	protected createChildren():void
	{
		super.createChildren();

		let rowLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		rowLayout.verticalAlign = egret.VerticalAlign.BOTTOM;
		rowLayout.gap = 10;
		this.layout = rowLayout;

		let iconContainer:eui.Group = new eui.Group();
		iconContainer.touchEnabled = false;
		let resName:string = this.getResName(this.fruitType);
		let icon:egret.Bitmap;
		if (resName)
		{
			icon = this.getBmp(resName);
		}
		iconContainer.addChild(icon);
		iconContainer.width = icon.width;
		iconContainer.height = icon.height;
		this.addChild(iconContainer);

		this.countLabel = new eui.Label();
		this.addChild(this.countLabel);
		this.countLabel.width = 150;
		this.itemCount = 0;
		this.countLabel.touchEnabled = false;


		this.btnAdd = new eui.Button();
		this.btnAdd.label = "增加";

		this.btnMinus = new eui.Button();
		this.btnMinus.label = "减少";

		let btnContainer:eui.Group = xd.CommonUtils.getGroup(1, null, 30, [this.btnAdd, this.btnMinus]);
		this.addChild(btnContainer);
		btnContainer.touchEnabled = false;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.enabled = true;
	}

	get itemCount():number
	{
		return this._itemCount;
	}

	set itemCount(value:number)
	{
		this._itemCount = value;
		this.countLabel.text = "+ " + this._itemCount + "x￥" + this.price;
	}

	get enabled():boolean
	{
		return this._enabled;
	}

	set enabled(value:boolean)
	{
		this._enabled = value;

		this.btnAdd.enabled = value;
		this.btnMinus.enabled = value;
	}

	private onClick(ev:egret.TouchEvent):void
	{
		let obj:eui.Button = ev.target;
		if (obj == this.btnAdd)
		{
			if (this.addHandler)
			{
				this.addHandler(this.fruitType, this.price);
			}
		} else if (obj == this.btnMinus)
		{
			if (this.minusHandler)
			{
				this.minusHandler(this.fruitType, this.price);
			}
		}
	}


	private getResName(type:FruitItemType):string
	{
		switch (type)
		{
			case FruitItemType.typeApple:
				return "apple";
			case FruitItemType.typeBar:
				return "bar";
			case FruitItemType.typeOrange:
				return "orange";
			case FruitItemType.typePear:
				return "pear";
			case FruitItemType.typeRing:
				return "ring";
			case FruitItemType.typeSeven:
				return "seven";
			case FruitItemType.typeStar:
				return "star";
			case FruitItemType.typeWatermelon:
				return "watermelon";
		}
		return null;
	}

	private getBmp(resName:string):egret.Bitmap
	{
		let bmp:egret.Bitmap = new egret.Bitmap();
		bmp.texture = RES.getRes(resName);
		return bmp;
	}
}