var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/3/10.
 */
var PanelCallRoll = (function (_super) {
    __extends(PanelCallRoll, _super);
    function PanelCallRoll() {
        _super.call(this);
        this.width = 700;
        this.height = 300;
    }
    PanelCallRoll.prototype.panelType = function () {
        return PanelTypes.PANEL_CALL_ROLL;
    };
    PanelCallRoll.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Object.defineProperty(PanelCallRoll.prototype, "positionAttribute", {
        get: function () {
            return { bottom: 54, horizontalCenter: 0 };
        },
        enumerable: true,
        configurable: true
    });
    PanelCallRoll.prototype.closeAnimatePos = function () {
        return GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_CALL_ROLL);
    };
    return PanelCallRoll;
})(PanelEx);
//# sourceMappingURL=PanelCallRoll.js.map