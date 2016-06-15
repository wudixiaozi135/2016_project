var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/3/14.
 */
var Courseware = (function (_super) {
    __extends(Courseware, _super);
    function Courseware() {
        _super.call(this);
        this._newScale = 1;
        this._offP = new egret.Point();
        this._moveP = new egret.Point();
        this._container = new egret.Sprite();
        this.addChild(this._container);
        this._container.touchEnabled = false;
        var rect = new eui.Rect();
        rect.percentWidth = 100;
        rect.percentHeight = 100;
        rect.fillAlpha = .5;
        rect.fillColor = 0xff0000;
        this.addChild(rect);
        rect.touchChildren = false;
        rect.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
    }
    Courseware.prototype.onTouchBeginHandler = function (ev) {
        if (ev.target != this) {
            return;
        }
        if (this.parent) {
            this.parent.setChildIndex(this, this.parent.numChildren - 1);
        }
        this._offP.setTo(ev.stageX, ev.stageY);
        global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMoveHandler, this);
        global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageUpHandler, this);
    };
    Courseware.prototype.onStageMoveHandler = function (ev) {
        this._moveP.setTo(ev.stageX, ev.stageY);
        this._offP = this._moveP.subtract(this._offP);
        this.x += this._offP.x;
        this.y += this._offP.y;
        this._offP.setTo(ev.stageX, ev.stageY);
        this.updateToolBarPosition();
    };
    /*
     * 较正工具栏的位置
     * */
    Courseware.prototype.updateToolBarPosition = function () {
        var tool = GlobalInterface.courseMenuBar;
        var parentP = this.parent;
        if (parentP && tool) {
            var rect = this._container.getTransformedBounds(parentP);
            var off = tool.width - rect.width;
            tool.x = rect.x - off;
            tool.y = rect.y + rect.height;
        }
    };
    Courseware.prototype.onStageUpHandler = function (ev) {
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUpHandler, this);
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMoveHandler, this);
    };
    /*
     * 设置资源
     * */
    Courseware.prototype.setRes = function (vo) {
        this._vo = vo;
        this.courseType = this._vo.courseType;
        this._bitmap = this._vo.res;
        this._container.addChild(this._bitmap);
        this._originW = this._container.width;
        this._originH = this._container.height;
        this._originScale = this._container.scaleX;
    };
    Object.defineProperty(Courseware.prototype, "canDragable", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Courseware.prototype, "courseType", {
        get: function () {
            return this._courseType;
        },
        set: function (value) {
            this._courseType = value;
        },
        enumerable: true,
        configurable: true
    });
    Courseware.prototype.reCover = function () {
    };
    Courseware.prototype.draw = function () {
    };
    Courseware.prototype.eraser = function () {
    };
    Courseware.prototype.rotate = function () {
        xd.CommonUtils.centerRotate(this._container, this._container.rotation + 90);
        this.updateToolBarPosition();
    };
    Courseware.prototype.zoomIn = function () {
        this._newScale += .3;
        this._newW = this._newScale * this._originW;
        this._newH = this._newScale * this._originH;
        xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
    };
    Courseware.prototype.zoomOut = function () {
        this._newScale -= .3;
        this._newW = this._newScale * this._originW;
        this._newH = this._newScale * this._originH;
        xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
    };
    return Courseware;
})(eui.Group);
//# sourceMappingURL=Courseware.js.map