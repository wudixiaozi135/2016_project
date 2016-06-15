/**
 * Created by xiaoding on 2016/2/19.
 */
class BottomMenuBtn extends eui.Group
{
	private _menuType:BottomMenuType;

	private _menuNormal:egret.DisplayObjectContainer;
	private _menuSelect:egret.DisplayObjectContainer;

	private _selected:boolean;

	public constructor(menuType:BottomMenuType)
	{
		super();
		this._menuType = menuType;
	}

	protected createChildren():void
	{
		super.createChildren();

		var btnNormal:string, btnSelect:string;
		switch (this._menuType)
		{
			case BottomMenuType.MENU_CALL_ROLL:
				btnNormal = "menuCallRoll";
				break;
			case BottomMenuType.MENU_SNIPPING:
				btnNormal = "menuSnipping";
				break;
			case BottomMenuType.MENU_COLOR:
				btnNormal = "menuColor";
				break;
			case BottomMenuType.MENU_WORD:
				btnNormal = "menuWord";
				btnSelect="menuWord_down";
				break;
			case BottomMenuType.MENU_ERASER:
				btnNormal = "menuEraser";
				btnSelect = "menuEraserLight";
				break;
			case BottomMenuType.MENU_CHOOSE:
				btnNormal = "menuChoose";
				btnSelect = "menuChooseLight";
				break;
			case BottomMenuType.MENU_BOOK:
				btnNormal = "menuBook";
				break;
			case BottomMenuType.MENU_CLOUD_DISK:
				btnNormal = "menuDisk";
				break;
			case BottomMenuType.MENU_HOUSE_WORK:
				btnNormal = "menuWork";
				break;
			case BottomMenuType.MENU_SYNC_CLASS:
				btnNormal = "menuSync";
				break;
			case BottomMenuType.MENU_STATISTIC:
				btnNormal = "menuStastic";
				break;
			case BottomMenuType.MENU_SAVE:
				btnNormal = "menuSave";
				break;
			default:
				break;
		}

		if (btnNormal)
		{
			this._menuNormal = new egret.DisplayObjectContainer();
			var bmp:egret.Bitmap = xd.CommonUtils.getBmp(btnNormal);
			this._menuNormal.addChild(bmp);
			this.addChild(this._menuNormal);

			this.width = this._menuNormal.width;
			this.height = this._menuNormal.height;
		}
		if (btnSelect)
		{
			this._menuSelect = new egret.DisplayObjectContainer();
			var selectBmp:egret.Bitmap = xd.CommonUtils.getBmp(btnSelect);
			this._menuSelect.addChild(selectBmp);
			this.addChild(this._menuSelect);
		}
		this.selected = false;
	}

	get menuType():BottomMenuType
	{
		return this._menuType;
	}

	get selected():boolean
	{
		return this._selected;
	}

	set selected(value:boolean)
	{
		this._selected = value;

		if (this._menuType != BottomMenuType.MENU_CHOOSE && this._menuType != BottomMenuType.MENU_ERASER&&this._menuType!=BottomMenuType.MENU_WORD)
		{
			return;
		}
		if (value)
		{
			if (this._menuNormal)
			{
				if (this.contains(this._menuNormal))
				{
					this.removeChild(this._menuNormal);
				}
			}
			if (this._menuSelect)
			{
				if (!this.contains(this._menuSelect))
				{
					this.addChild(this._menuSelect);
				}
			}
		} else
		{
			if (this._menuSelect)
			{
				if (this.contains(this._menuSelect))
				{
					this.removeChild(this._menuSelect);
				}
			}
			if (this._menuNormal)
			{
				if (!this.contains(this._menuNormal))
				{
					this.addChild(this._menuNormal);
				}
			}
		}
	}
}