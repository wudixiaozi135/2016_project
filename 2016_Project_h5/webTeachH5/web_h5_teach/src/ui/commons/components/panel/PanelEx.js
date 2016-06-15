var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/2/19.
 */
var PanelEx = (function (_super) {
    __extends(PanelEx, _super);
    function PanelEx() {
        _super.call(this);
        this.playStartAnimateFinish = false;
        this._isShow = false;
        this._isPlay = false;
        this.skinName = "resource/skinsEx/PanelSkinEx.exml";
        xd.GameDispatcher.addEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
        this.addEventListener(egret.Event.ADDED, this.onAddHandler, this);
        this.addEventListener(egret.Event.REMOVED, this.onRemoveHandler, this);
    }
    PanelEx.prototype.onAddHandler = function (ev) {
        if (ev.target == this) {
            this._isShow = true;
        }
    };
    PanelEx.prototype.onRemoveHandler = function (ev) {
        if (ev.target == this) {
            this._isShow = false;
        }
    };
    PanelEx.prototype.onStageResize = function (ev) {
        this.updatePosition();
    };
    PanelEx.prototype.onTouchMove = function (event) {
        _super.prototype.onTouchMove.call(this, event);
        this.updatePosition();
    };
    PanelEx.prototype.updatePosition = function () {
        var rect = this.panelRect();
        var borderW = global.curWidth() - rect.width;
        var borderH = global.curHeight() - rect.height;
        this.x = this.x <= 0 ? 0 : this.x;
        this.x = this.x >= borderW ? borderW : this.x;
        this.y = this.y <= 0 ? 0 : this.y;
        this.y = this.y >= borderH ? borderH : this.y;
    };
    PanelEx.prototype.onTouchEnd = function (event) {
        if (this.isPlay)
            return;
        _super.prototype.onTouchEnd.call(this, event);
        this.updatePosition();
    };
    /*
     * 关闭面板动画位置,默认在中间
     * */
    PanelEx.prototype.closeAnimatePos = function () {
        return new egret.Point(global.curWidth() * .5, global.curHeight() * .5);
    };
    /*
     * 界面是否被打开
     * addChild 打开
     * removeChild 关闭
     * */
    PanelEx.prototype.isShow = function () {
        return this._isShow;
    };
    Object.defineProperty(PanelEx.prototype, "positionAttribute", {
        /*
         * 位置属性，影响面板打开的位置
         * */
        get: function () {
            return { horizontalCenter: 0, verticalCenter: 0 };
        },
        enumerable: true,
        configurable: true
    });
    /*
     * 强制不能设置visible
     * */
    PanelEx.prototype.$setVisible = function (value) {
        throw new Error("The function is not called");
    };
    /*
     * 面板的边界，定位使用
     * */
    PanelEx.prototype.panelRect = function () {
        return new egret.Rectangle(this.x, this.y, this.width, this.height);
    };
    PanelEx.prototype.panelType = function () {
        return null;
    };
    Object.defineProperty(PanelEx.prototype, "isPlay", {
        /*
         * 是否在动画状态
         * */
        get: function () {
            return this._isPlay;
        },
        set: function (value) {
            this._isPlay = value;
        },
        enumerable: true,
        configurable: true
    });
    PanelEx.prototype.close = function () {
        _super.prototype.close.call(this);
        xd.GameDispatcher.dispatchEvent(GameEventName.CLOSE_PANEL, { panelType: this.panelType() });
    };
    PanelEx.prototype.isShowCompleted = function () {
        return this.playStartAnimateFinish;
    };
    /*
     * 析构函数
     * 不建议调用
     * 面板最好单态
     * */
    PanelEx.prototype.destroy = function () {
        xd.GameDispatcher.removeEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
        this.removeChildren();
    };
    return PanelEx;
})(eui.Panel);
//# sourceMappingURL=PanelEx.js.map