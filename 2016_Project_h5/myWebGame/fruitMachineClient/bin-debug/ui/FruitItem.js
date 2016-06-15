/**
 * Created by xiaoding on 2016/5/11.
 */
var FruitItem = (function (_super) {
    __extends(FruitItem, _super);
    function FruitItem(type) {
        _super.call(this);
        this.price = 0;
        this._itemCount = 0;
        this._enabled = true;
        this.fruitType = type;
        var price = MapUtils.getPrice(this.fruitType);
        this.price = price;
    }
    var d = __define,c=FruitItem,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var rowLayout = new eui.HorizontalLayout();
        rowLayout.verticalAlign = egret.VerticalAlign.BOTTOM;
        rowLayout.gap = 10;
        this.layout = rowLayout;
        var iconContainer = new eui.Group();
        iconContainer.touchEnabled = false;
        var resName = this.getResName(this.fruitType);
        var icon;
        if (resName) {
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
        var btnContainer = xd.CommonUtils.getGroup(1, null, 30, [this.btnAdd, this.btnMinus]);
        this.addChild(btnContainer);
        btnContainer.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.enabled = true;
    };
    d(p, "itemCount"
        ,function () {
            return this._itemCount;
        }
        ,function (value) {
            this._itemCount = value;
            this.countLabel.text = "+ " + this._itemCount + "x￥" + this.price;
        }
    );
    d(p, "enabled"
        ,function () {
            return this._enabled;
        }
        ,function (value) {
            this._enabled = value;
            this.btnAdd.enabled = value;
            this.btnMinus.enabled = value;
        }
    );
    p.onClick = function (ev) {
        var obj = ev.target;
        if (obj == this.btnAdd) {
            if (this.addHandler) {
                this.addHandler(this.fruitType, this.price);
            }
        }
        else if (obj == this.btnMinus) {
            if (this.minusHandler) {
                this.minusHandler(this.fruitType, this.price);
            }
        }
    };
    p.getResName = function (type) {
        switch (type) {
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
    };
    p.getBmp = function (resName) {
        var bmp = new egret.Bitmap();
        bmp.texture = RES.getRes(resName);
        return bmp;
    };
    return FruitItem;
}(eui.Group));
egret.registerClass(FruitItem,'FruitItem');
//# sourceMappingURL=FruitItem.js.map