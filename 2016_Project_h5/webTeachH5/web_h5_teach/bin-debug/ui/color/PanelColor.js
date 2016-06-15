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
    var d = __define,c=PanelColor,p=c.prototype;
    p.panelType = function () {
        return PanelTypes.PANEL_COLOR;
    };
    p.onChooseColor = function (color) {
        global.color = color;
        var timeId = egret.setTimeout(function () {
            xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, { panelType: PanelTypes.PANEL_COLOR });
            egret.clearTimeout(timeId);
        }, this, 120);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.removeChildren();
        this.touchEnabled = false;
        this.addChild(this._colorPicker);
    };
    p.updatePosition = function () {
        egret.callLater(this.resetPosition, this, 100);
    };
    p.resetPosition = function () {
        var position = this.positionAttribute;
        this.x = position.initX;
        this.bottom = position.bottom;
    };
    p.closeAnimatePos = function () {
        var point = GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_COLOR);
        return point;
    };
    d(p, "positionAttribute"
        ,function () {
            var point = GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_COLOR);
            return { bottom: 0, initX: point.x + 20 };
        }
    );
    return PanelColor;
}(PanelEx));
egret.registerClass(PanelColor,'PanelColor');
//# sourceMappingURL=PanelColor.js.map