/**
 * Created by xiaoding on 2016/2/19.
 */
var CButton = (function (_super) {
    __extends(CButton, _super);
    /*
     * @param menuType：CButtonType  按钮类型
     * @param isSelectable:boolean  是否是选择性按钮
     * */
    function CButton(menuType, isSelectable) {
        if (isSelectable === void 0) { isSelectable = false; }
        _super.call(this);
        this._isSlectable = false;
        this._isSlectable = isSelectable;
        this._menuType = menuType;
    }
    var d = __define,c=CButton,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var btnNormal, btnSelect;
        switch (this._menuType) {
            case CButtonType.buttonPhoto:
                btnNormal = "photo_up";
                btnSelect = "photo_down";
                break;
            case CButtonType.buttonPhotoShare:
                btnNormal = "photoShare_up";
                btnSelect = "photoShare_down";
                break;
            case CButtonType.buttonPhotoCancel:
                btnNormal = "photoClose_up";
                btnSelect = "photoClose_down";
                break;
            case CButtonType.buttonMenuReCover:
                btnNormal = "reCover_up";
                btnSelect = "reCover_down";
                break;
            case CButtonType.buttonMenuDrawPen:
                btnNormal = "drawPen_up";
                btnSelect = "drawPen_down";
                break;
            case CButtonType.buttonMenuEraser:
                btnNormal = "eraserSmall_up";
                btnSelect = "eraserSamll_down";
                break;
            case CButtonType.buttonMenuRotate90:
                btnNormal = "rotate_90_up";
                btnSelect = "rotate_90_down";
                break;
            case CButtonType.buttonMenuZoomIn:
                btnNormal = "zoomIn_up";
                btnSelect = "zoomIn_down";
                break;
            case CButtonType.buttonMenuZoomOut:
                btnNormal = "zoomOut_up";
                btnSelect = "zoomOut_down";
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
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.handlerDown, this);
    };
    p.handlerDown = function (ev) {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.handlerUp, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.handlerUp, this);
        if (this._isSlectable) {
            return;
        }
        this.selected = true;
    };
    p.handlerUp = function (ev) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.handlerUp, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.handlerUp, this);
        if (this._isSlectable) {
            return;
        }
        this.selected = false;
    };
    d(p, "menuType"
        ,function () {
            return this._menuType;
        }
    );
    d(p, "selected"
        ,function () {
            return this._selected;
        }
        ,function (value) {
            this._selected = value;
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
        }
    );
    return CButton;
}(eui.Group));
egret.registerClass(CButton,'CButton');
//# sourceMappingURL=CButton.js.map