var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/2/19.
 */
var BottomMenuBtn = (function (_super) {
    __extends(BottomMenuBtn, _super);
    function BottomMenuBtn(menuType) {
        _super.call(this);
        this._menuType = menuType;
    }
    BottomMenuBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var btnNormal, btnSelect;
        switch (this._menuType) {
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
        if (btnNormal) {
            this._menuNormal = new egret.DisplayObjectContainer();
            var bmp = xd.CommonUtils.getBmp(btnNormal);
            this._menuNormal.addChild(bmp);
            this.addChild(this._menuNormal);
            this.width = this._menuNormal.width;
            this.height = this._menuNormal.height;
        }
        if (btnSelect) {
            this._menuSelect = new egret.DisplayObjectContainer();
            var selectBmp = xd.CommonUtils.getBmp(btnSelect);
            this._menuSelect.addChild(selectBmp);
            this.addChild(this._menuSelect);
        }
        this.selected = false;
    };
    Object.defineProperty(BottomMenuBtn.prototype, "menuType", {
        get: function () {
            return this._menuType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomMenuBtn.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            if (this._menuType != BottomMenuType.MENU_CHOOSE && this._menuType != BottomMenuType.MENU_ERASER) {
                return;
            }
            if (value) {
                if (this._menuNormal) {
                    if (this.contains(this._menuNormal)) {
                        this.removeChild(this._menuNormal);
                    }
                }
                if (this._menuSelect) {
                    if (!this.contains(this._menuSelect)) {
                        this.addChild(this._menuSelect);
                    }
                }
            }
            else {
                if (this._menuSelect) {
                    if (this.contains(this._menuSelect)) {
                        this.removeChild(this._menuSelect);
                    }
                }
                if (this._menuNormal) {
                    if (!this.contains(this._menuNormal)) {
                        this.addChild(this._menuNormal);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return BottomMenuBtn;
})(eui.Group);
//# sourceMappingURL=BottomMenuBtn.js.map