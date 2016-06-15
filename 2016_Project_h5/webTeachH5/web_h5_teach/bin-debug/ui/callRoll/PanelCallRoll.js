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
    var d = __define,c=PanelCallRoll,p=c.prototype;
    p.panelType = function () {
        return PanelTypes.PANEL_CALL_ROLL;
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    d(p, "positionAttribute"
        ,function () {
            return { bottom: 54, horizontalCenter: 0 };
        }
    );
    p.closeAnimatePos = function () {
        return GlobalInterface.bottomMenuPosition.getMenuPositionByType(BottomMenuType.MENU_CALL_ROLL);
    };
    return PanelCallRoll;
}(PanelEx));
egret.registerClass(PanelCallRoll,'PanelCallRoll');
//# sourceMappingURL=PanelCallRoll.js.map