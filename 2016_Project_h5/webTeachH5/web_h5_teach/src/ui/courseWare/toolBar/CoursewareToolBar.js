var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/3/14.
 */
var CoursewareToolBar = (function (_super) {
    __extends(CoursewareToolBar, _super);
    function CoursewareToolBar(w, h) {
        if (w === void 0) { w = 225; }
        if (h === void 0) { h = 40; }
        _super.call(this);
        this._w = w;
        this._h = h;
        this.width = this._w;
        this.height = this._h;
    }
    CoursewareToolBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var rect = new eui.Rect();
        rect.fillAlpha = 1;
        rect.fillColor = 0xF1F1F1;
        rect.ellipseHeight = 10;
        rect.ellipseWidth = 10;
        rect.width = this._w;
        rect.height = this._h;
        this.addChild(rect);
        rect.touchChildren = false;
        rect.touchEnabled = false;
        this._container = new eui.Group();
        this._container.touchEnabled = false;
        var horizontal = new eui.HorizontalLayout();
        horizontal.gap = 5;
        this._container.layout = horizontal;
        this.addChild(this._container);
        this._container.horizontalCenter = 0;
        this._container.verticalCenter = 0;
        this._btnRecover = new CButton(CButtonType.buttonMenuReCover);
        this._container.addChild(this._btnRecover);
        this._btnPen = new CButton(CButtonType.buttonMenuDrawPen);
        this._container.addChild(this._btnPen);
        this._btnEraser = new CButton(CButtonType.buttonMenuEraser);
        this._container.addChild(this._btnEraser);
        this._btnRotate = new CButton(CButtonType.buttonMenuRotate90);
        this._container.addChild(this._btnRotate);
        this._btnZoomIn = new CButton(CButtonType.buttonMenuZoomIn);
        this._container.addChild(this._btnZoomIn);
        this._btnZoomOut = new CButton(CButtonType.buttonMenuZoomOut);
        this._container.addChild(this._btnZoomOut);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    CoursewareToolBar.prototype.onClickHandler = function (e) {
        var target = e.target;
        if (target == this._btnRecover) {
            if (this.master) {
                this.master.reCover.call(this.master);
            }
        }
        else if (target == this._btnEraser) {
            if (this.master) {
                this.master.eraser.call(this.master);
            }
        }
        else if (target == this._btnPen) {
            if (this.master) {
                this.master.draw.call(this.master);
            }
        }
        else if (target == this._btnRotate) {
            if (this.master) {
                this.master.rotate.call(this.master);
            }
        }
        else if (target == this._btnZoomIn) {
            if (this.master) {
                this.master.zoomIn.call(this.master);
            }
        }
        else if (target == this._btnZoomOut) {
            if (this.master) {
                this.master.zoomOut.call(this.master);
            }
        }
    };
    CoursewareToolBar.prototype.removeSelf = function () {
    };
    return CoursewareToolBar;
})(eui.Group);
//# sourceMappingURL=CoursewareToolBar.js.map