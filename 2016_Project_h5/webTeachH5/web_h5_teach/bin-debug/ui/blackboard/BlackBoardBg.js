/**
 * Created by xiaoding on 2016/2/18.
 * 黑板背景
 */
var BlackBoardBg = (function (_super) {
    __extends(BlackBoardBg, _super);
    function BlackBoardBg() {
        _super.call(this);
        this._offH = 12;
        this._blackBoard_bottom = "blackBoard_bottom";
        this._blackBoard_topLeft = "blackBoard_topLeft";
        this._blackBoard_topRight = "blackBoard_topRight";
        this._blackBoard_up = "blackBoard_up";
        this._blackBoard_left = "blackBoard_left";
        this._blackBoard_right = "blackBoard_right";
        this._blackBoard_bottomLeft = "blackBoard_bottomLeft";
        this._blackBoard_bottomRight = "blackBoard_bottomRight";
        this._blackBoard_down = "blackBoard_down";
        this.touchChildren = false;
        this.touchEnabled = false;
        this.addEvent();
    }
    var d = __define,c=BlackBoardBg,p=c.prototype;
    p.addEvent = function () {
        xd.GameDispatcher.addEventListener(GameEventName.STAGE_RESIZE, this.onResize, this);
    };
    p.onResize = function (e) {
        var param = e.param;
        this.width = param.width;
        this.height = param.height;
        this._topBmp.width = this.width - this._topLeftBmp.width - this._topRightBmp.width + 5;
        this._downBmp.width = this.width - this._bottomLeftBmp.width - this._topRightBmp.width;
        this._leftBmp.height = this.height - this._topLeftBmp.height - this._bottomLeftBmp.height - this._bottomBmp.height + this._offH;
        this._rightBmp.height = this.height - this._topRightBmp.height - this._bottomRightBmp.height - this._bottomBmp.height + this._offH + 2;
        this._bottomBmp.width = this.width + 10;
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._bgRect = new eui.Rect();
        this._bgRect.fillColor = 0x02746C;
        this._bgRect.percentWidth = this._bgRect.percentHeight = 100;
        this._bgRect.fillAlpha = 1;
        this.addChild(this._bgRect);
        this._bottomGroup = new eui.Group();
        this.addChild(this._bottomGroup);
        this._bottomBmp = xd.CommonUtils.getBmp(this._blackBoard_bottom);
        this._bottomGroup.addChild(this._bottomBmp);
        this._bottomGroup.left = -5;
        this._bottomGroup.bottom = this._bottomBmp.height - 2;
        this._topLeftGroup = new eui.Group();
        this.addChild(this._topLeftGroup);
        this._topLeftBmp = new egret.Bitmap();
        this._topLeftBmp = xd.CommonUtils.getBmp(this._blackBoard_topLeft);
        this._topLeftGroup.addChild(this._topLeftBmp);
        this._topLeftGroup.left = 0;
        this._topLeftGroup.top = 0;
        this._topRightGroup = new eui.Group();
        this.addChild(this._topRightGroup);
        this._topRightBmp = xd.CommonUtils.getBmp(this._blackBoard_topRight);
        this._topRightGroup.addChild(this._topRightBmp);
        this._topRightGroup.top = 0;
        this._topRightGroup.right = this._topRightBmp.width;
        this._topGroup = new eui.Group();
        this.addChild(this._topGroup);
        this._topBmp = new egret.Bitmap();
        this._topBmp = xd.CommonUtils.getBmp(this._blackBoard_up);
        this._topGroup.addChild(this._topBmp);
        this._topGroup.top = 0;
        this._topGroup.left = this._topRightBmp.width - 5;
        this._topBmp = this._topBmp;
        this._leftGroup = new eui.Group();
        this.addChild(this._leftGroup);
        this._leftBmp = xd.CommonUtils.getBmp(this._blackBoard_left);
        this._leftGroup.addChild(this._leftBmp);
        this._leftGroup.left = 0;
        this._leftGroup.top = this._topLeftBmp.height;
        this._rightGroup = new eui.Group();
        this.addChild(this._rightGroup);
        this._rightBmp = xd.CommonUtils.getBmp(this._blackBoard_right);
        this._rightGroup.addChild(this._rightBmp);
        this._rightGroup.right = this._rightBmp.width;
        this._rightGroup.top = this._leftGroup.top;
        this._bottomLeftGroup = new eui.Group();
        this.addChild(this._bottomLeftGroup);
        this._bottomLeftBmp = xd.CommonUtils.getBmp(this._blackBoard_bottomLeft);
        this._bottomLeftGroup.addChild(this._bottomLeftBmp);
        this._bottomRightGroup = new eui.Group();
        this.addChild(this._bottomRightGroup);
        this._bottomRightBmp = xd.CommonUtils.getBmp(this._blackBoard_bottomRight);
        this._bottomRightGroup.addChild(this._bottomRightBmp);
        this._downGroup = new eui.Group();
        this.addChild(this._downGroup);
        this._downBmp = xd.CommonUtils.getBmp(this._blackBoard_down);
        this._downGroup.addChild(this._downBmp);
        var offH = this._offH;
        this._bottomLeftGroup.left = this._topLeftGroup.left;
        this._bottomLeftGroup.bottom = this._bottomLeftBmp.height + this._bottomBmp.height - offH;
        this._bottomRightGroup.right = this._topRightGroup.right;
        this._bottomRightGroup.bottom = this._bottomRightBmp.height + this._bottomBmp.height - offH;
        this._downGroup.bottom = this._downBmp.height + this._bottomBmp.height - offH;
        this._downGroup.left = this._bottomLeftBmp.width;
    };
    return BlackBoardBg;
}(eui.Group));
egret.registerClass(BlackBoardBg,'BlackBoardBg');
//# sourceMappingURL=BlackBoardBg.js.map