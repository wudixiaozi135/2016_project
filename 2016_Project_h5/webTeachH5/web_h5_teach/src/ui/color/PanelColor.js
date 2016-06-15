var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/3/10.
 */
var PanelColor = (function (_super) {
    __extends(PanelColor, _super);
    function PanelColor() {
        _super.call(this);
        this._colorPicker = new ColorPicker().setChooseColor(this.onChooseColor);
        this.addChild(this._colorPicker);
        this.width = this._colorPicker.width;
        this.height = this._colorPicker.height;
    }
    PanelColor.prototype.panelType = function () {
        return PanelTypes.PANEL_COLOR;
    };
    PanelColor.prototype.onChooseColor = function (color) {
        global.color = color;
        var timeId = egret.setTimeout(function () {
            xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, { panelType: PanelTypes.PANEL_COLOR });
            egret.clearTimeout(timeId);
        }, this, 120);
    };
    PanelColor.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.removeChildren();
        this.touchEnabled = false;
        this.addChild(this._colorPicker);
    };
    PanelColor.prototype.updatePosition = function () {
        egret.callLater(this.resetPosition, this, 100);
    };
    PanelColor.prototype.resetPosition = function () {
        var position = this.positionAttribute;
        this.x = position.initX;
        this.bottom = position.bottom;
    };
    PanelColor.prototype.closeAnimatePos = function () {
        var point = GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_COLOR);
        return point;
    };
    Object.defineProperty(PanelColor.prototype, "positionAttribute", {
        get: function () {
            var point = GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_COLOR);
            return { bottom: 0, initX: point.x + 20 };
        },
        enumerable: true,
        configurable: true
    });
    return PanelColor;
})(PanelEx);
//# sourceMappingURL=PanelColor.js.map