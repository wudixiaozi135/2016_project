/**
 * Created by xiaoding on 2016/3/14.
 */
var Courseware = (function (_super) {
    __extends(Courseware, _super);
    function Courseware() {
        _super.call(this);
        this.MAX_SCALE = 3.3;
        this.MIN_SCALE = .1;
        this.ORIGIN_SCALE = 1;
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
    var d = __define,c=Courseware,p=c.prototype;
    p.onTouchBeginHandler = function (ev) {
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
    p.onStageMoveHandler = function (ev) {
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
    p.updateToolBarPosition = function () {
        var tool = GlobalInterface.courseMenuBar;
        var parentP = this.parent;
        if (parentP && tool) {
            var rect = this._container.getTransformedBounds(parentP);
            var off = tool.width - rect.width;
            tool.x = rect.x - off;
            tool.y = rect.y + rect.height;
        }
    };
    p.onStageUpHandler = function (ev) {
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUpHandler, this);
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMoveHandler, this);
    };
    /*
     * 设置资源
     * */
    p.setRes = function (vo) {
        this._vo = vo;
        this.courseType = this._vo.courseType;
        this._bitmap = this._vo.res;
        this._container.addChild(this._bitmap);
        this._originW = this._container.width;
        this._originH = this._container.height;
        this._originScale = this._container.scaleX;
    };
    d(p, "canDragable"
        ,function () {
            return true;
        }
    );
    d(p, "courseType"
        ,function () {
            return this._courseType;
        }
        ,function (value) {
            this._courseType = value;
        }
    );
    p.reCover = function () {
        if (this._newScale == this.ORIGIN_SCALE && this._container.rotation == 0) {
            return;
        }
        this._newScale = this.ORIGIN_SCALE;
        xd.CommonUtils.centerRotate(this._container, 0);
        xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
        this.updateToolBarPosition();
    };
    p.draw = function () {
    };
    p.eraser = function () {
    };
    p.rotate = function () {
        xd.CommonUtils.centerRotate(this._container, this._container.rotation + 90);
        this.updateToolBarPosition();
    };
    p.zoomIn = function () {
        this._newScale += .3;
        if (this._newScale >= this.MAX_SCALE + this.ORIGIN_SCALE) {
            this._newScale = this.MAX_SCALE + this.ORIGIN_SCALE;
        }
        xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
    };
    p.zoomOut = function () {
        this._newScale -= .3;
        if (this._newScale <= this.MIN_SCALE) {
            this._newScale = this.MIN_SCALE;
        }
        xd.CommonUtils.scaleAtPoint(this._container, new egret.Point(this._originW, this._originH), this._newScale);
    };
    return Courseware;
}(eui.Group));
egret.registerClass(Courseware,'Courseware',["ICourseware","IDragable"]);
//# sourceMappingURL=Courseware.js.map