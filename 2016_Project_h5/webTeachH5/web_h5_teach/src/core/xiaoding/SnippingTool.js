var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/3/7.
 */
/*
 * 自定义截图
 * */
var SnippingTool = (function () {
    /*
     * @param minSnipW 最小截图宽
     * @param minSnipH 最小截图高
     * */
    function SnippingTool(minSnipW, minSnipH) {
        if (minSnipW === void 0) { minSnipW = 5; }
        if (minSnipH === void 0) { minSnipH = 5; }
        this._minSnipW = 5;
        this._minSnipH = 5;
        this._minSnipW = minSnipW;
        this._minSnipH = minSnipW;
    }
    //group 要截图的UI,callBack 截图成功时的回调，参数bitmapData
    SnippingTool.prototype.snipping = function (group, callBack) {
        if (!group)
            return;
        this._group = group;
        this._callBack = callBack;
        this.initUI();
        this.addEvent();
    };
    SnippingTool.prototype.removeEvent = function () {
        xd.GameDispatcher.removeEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
        if (global.stage) {
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
        }
    };
    SnippingTool.prototype.addEvent = function () {
        this.removeEvent();
        xd.GameDispatcher.addEventListener(GameEventName.STAGE_RESIZE, this.onStageResize, this);
        if (global.stage) {
            global.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
        }
    };
    SnippingTool.prototype.onMouseDown = function (event) {
        if (global.stage) {
            global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
            global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
        }
        this._clipStartP = new egret.Point(event.stageX, event.stageY);
    };
    SnippingTool.prototype.onStageUp = function (event) {
        this._clipStartP = null;
        if (global.stage) {
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
        }
        if (this._clipMask) {
            if (this._clipMask.bounds && this._clipMask.bounds.width > 0 && this._clipMask.height > 0) {
                global.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
            }
        }
    };
    SnippingTool.prototype.onMouseMove = function (event) {
        if (this._clipMask) {
            if (this._clipStartP) {
                this._clipMask.show();
                this._clipMask.setStart(this._clipStartP);
                this._clipMask.moveToP(new egret.Point(event.stageX, event.stageY));
            }
        }
    };
    SnippingTool.prototype.onStageResize = function (event) {
        this._container.visible = false;
        //这里延时是因为在绘制时，UI可能未及时改变大小
        egret.callLater(this.repaint, this, 100);
    };
    SnippingTool.prototype.repaint = function () {
        if (this._sourceBmd) {
            this._sourceBmd.drawToTexture(global.stage);
            this._container.visible = true;
        }
        if (this._clipMask) {
            this._clipMask.updateAdjustPosition();
        }
    };
    SnippingTool.prototype.initUI = function () {
        if (!this._container) {
            this._container = new eui.Group();
            this._container.touchEnabled = false;
            this._container.percentWidth = 100;
            this._container.percentHeight = 100;
            this._group.addChild(this._container);
        }
        if (!this._sourceBmd) {
            this._sourceBmd = new egret.RenderTexture();
            this._sourceBmd.drawToTexture(global.stage);
        }
        if (!this._modalBg) {
            this._modalBg = new eui.Rect();
            this._modalBg.touchChildren = false;
            this._modalBg.touchEnabled = true;
            this._modalBg.percentWidth = 100;
            this._modalBg.percentHeight = 100;
            this._modalBg.fillColor = 0x0;
            this._modalBg.fillAlpha = .3;
            this._container.addChild(this._modalBg);
        }
        if (!this._rectBmp) {
            this._rectBmp = new egret.Bitmap();
            this._rectBmp.texture = this._sourceBmd;
            this._container.addChild(this._rectBmp);
        }
        if (!this._clipMask) {
            this._clipMask = new ClipMask();
            this._clipMask.addEventListener(ClipMask.CANCEL_SNIPPING, this.onCancelSnipping, this);
            this._clipMask.addEventListener(ClipMask.CONFIRM_SNIPPING, this.onConfirmSnipping, this);
            this._clipMask.addEventListener(ClipMask.PHOTO_SHARE, this.onPhotoShare, this);
            this._clipMask.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onClipCreateFinish, this);
            this._container.addChild(this._clipMask);
            this._clipMask.hide();
        }
    };
    SnippingTool.prototype.onClipCreateFinish = function () {
        this._rectBmp.mask = this._clipMask.rectMask;
    };
    SnippingTool.prototype.onPhotoShare = function (e) {
        this.snipPhoto(2);
    };
    /*
     * type 1 截图  2截图并分享
     * */
    SnippingTool.prototype.snipPhoto = function (type) {
        if (type === void 0) { type = 1; }
        if (this._clipMask) {
            this._clipMask.snippingBeforeSomeThing();
            if (this._container) {
                this._container.visible = false;
            }
            var bounds = this._clipMask.bounds;
            if (bounds) {
                var distination = new egret.RenderTexture();
                var globalStage = global.stage;
                var rect;
                if (bounds.width > this._minSnipW && bounds.height > this._minSnipH) {
                    rect = new egret.Rectangle(Math.floor(bounds.x), Math.floor(bounds.y), Math.floor(bounds.width + 2), Math.floor(bounds.height + 2));
                    distination.drawToTexture(globalStage, rect);
                    if (this._callBack != null) {
                        this._callBack.call(null, distination);
                    }
                }
            }
            bounds = null;
        }
        if (type == 2) {
            var base64 = distination.toDataURL("image/png");
            var urlLoader = new egret.URLLoader();
            var request = new egret.URLRequest();
            var urlVariable = new egret.URLVariables();
            urlVariable.variables = { data: base64, time: new Date().getTime() };
            request.url = "http://ul.xueleyun.com/upload";
            request.data = urlVariable;
            request.method = egret.URLRequestMethod.POST;
            urlLoader.load(request);
        }
        this.onCancelSnipping(null);
    };
    SnippingTool.prototype.onConfirmSnipping = function (event) {
        this.snipPhoto(1);
    };
    SnippingTool.prototype.onCancelSnipping = function (event) {
        if (event === void 0) { event = null; }
        this.destroy();
    };
    SnippingTool.prototype.clearUI = function () {
        if (this._container) {
            this._container.removeChildren();
        }
        if (this._sourceBmd) {
            this._sourceBmd.dispose();
            this._sourceBmd = null;
        }
        this._modalBg && (this._modalBg = null);
        if (this._rectBmp) {
            this._rectBmp.mask = null;
            this._rectBmp = null;
        }
        if (this._clipMask) {
            this._clipMask.removeEventListener(ClipMask.CANCEL_SNIPPING, this.onCancelSnipping, this);
            this._clipMask.removeEventListener(ClipMask.CONFIRM_SNIPPING, this.onConfirmSnipping, this);
            this._clipMask.removeEventListener(ClipMask.PHOTO_SHARE, this.onPhotoShare, this);
            this._clipMask.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.onClipCreateFinish, this);
            this._clipMask.destroy();
            this._clipMask = null;
        }
    };
    SnippingTool.prototype.destroy = function () {
        this.removeEvent();
        this._callBack = null;
        this.clearUI();
        if (this._group) {
            if (this._group.contains(this._container)) {
                this._group.removeChild(this._container);
            }
            this._group = null;
            this._container = null;
        }
    };
    return SnippingTool;
})();
var ClipMask = (function (_super) {
    __extends(ClipMask, _super);
    function ClipMask(color, w) {
        if (color === void 0) { color = 0xffffff; }
        if (w === void 0) { w = 10; }
        _super.call(this);
        this._defaultW = 10;
        this._defaultColor = 0xffffff;
        this._lastP = new egret.Point();
        /*
         * 模拟双击的时长
         * */
        this._clickTime = 0;
        this._defaultW = w;
        this._defaultColor = color;
        this._rect = new egret.Rectangle();
    }
    ClipMask.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchEnabled = false;
        this._canvas = new egret.Sprite();
        this._canvas.touchEnabled = false;
        this.addChild(this._canvas);
        this._rectMask = new eui.Rect();
        this._rectMask.touchEnabled = false;
        this._rectMask.touchChildren = false;
        this._rectMask.strokeWeight = 1;
        this._rectMask.strokeColor = 1;
        this._rectMask.fillColor = 0x0;
        this.addChild(this._rectMask);
        this._clickClip = new eui.Rect();
        this._clickClip.strokeWeight = 1;
        this._clickClip.strokeColor = 1;
        this._clickClip.fillColor = 0xff;
        this._clickClip.fillAlpha = 0;
        this.addChild(this._clickClip);
        this._topLeftBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._topLeftBar);
        this._topBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._topBar);
        this._topRight = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._topRight);
        this._leftBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._leftBar);
        this._rightBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._rightBar);
        this._bottomLeftBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._bottomLeftBar);
        this._bottomBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._bottomBar);
        this._bottomRightBar = new ControlBar(this._defaultColor, this._defaultW);
        this.addChild(this._bottomRightBar);
        this._bottomTool = new BottomTool().sender(this);
        this.addChild(this._bottomTool);
        this._drawContainer = new eui.Group();
        this.addChild(this._drawContainer);
        this._drawContainer.touchEnabled = false;
        this.addEvent();
    };
    ClipMask.prototype.bottomToolClick = function (commondType) {
        if (commondType == BottomTool.COMMAND_PHOTO) {
            this.dispatchEvent(new egret.Event(ClipMask.CONFIRM_SNIPPING));
        }
        else if (commondType == BottomTool.COMMAND_PHOTO_SHARE) {
            this.dispatchEvent(new egret.Event(ClipMask.PHOTO_SHARE));
        }
        else if (commondType == BottomTool.COMMAND_PHOTO_CANCEL) {
            this.dispatchEvent(new egret.Event(ClipMask.CANCEL_SNIPPING));
        }
    };
    ClipMask.prototype.show = function () {
        this.visible = true;
    };
    ClipMask.prototype.hide = function () {
        this.visible = false;
    };
    ClipMask.prototype.setStart = function (p) {
        if (this._topLeftBar) {
            this._topLeftBar.x = p.x;
            this._topLeftBar.y = p.y;
        }
        this._selectObj = this._topLeftBar;
        this.onStageMove(null);
    };
    ClipMask.prototype.moveToP = function (p) {
        if (this._bottomRightBar) {
            this._bottomRightBar.x = p.x;
            this._bottomRightBar.y = p.y;
        }
        this._selectObj = this._bottomRightBar;
        this.onStageMove(null);
    };
    ClipMask.prototype.addEvent = function () {
        this.removeEvent();
        global.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClipMouseDown, this);
        this._clickClip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClipClick, this);
    };
    ClipMask.prototype.onClipClick = function (ev) {
        if (egret.getTimer() - this._clickTime < 500) {
            this.dispatchEvent(new egret.Event(ClipMask.CONFIRM_SNIPPING));
        }
        this._clickTime = egret.getTimer();
    };
    ClipMask.prototype.removeEvent = function () {
        this._clickClip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClipClick, this);
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClipMouseDown, this);
    };
    ClipMask.prototype.onClipMouseDown = function (event) {
        this._lastP.setTo(event.stageX, event.stageY);
        if (global.stage) {
            this._selectObj = event.target;
            global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
            global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
            global.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageUp, this);
        }
    };
    ClipMask.prototype.onStageUp = function (event) {
        if (global.stage) {
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageUp, this);
            global.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageUp, this);
            this.onStageMove(null);
            var temp = 0;
            if (this._leftBar.x > this._rightBar.x) {
                temp = this._leftBar.x;
                this._leftBar.x = this._rightBar.x;
                this._rightBar.x = temp;
                this.updateControlBarPosition(this._leftBar);
                this.updateControlBarPosition(this._rightBar);
            }
            if (this._topBar.y > this._bottomBar.y) {
                temp = this._topBar.y;
                this._topBar.y = this._bottomBar.y;
                this._bottomBar.y = temp;
                this.updateControlBarPosition(this._topBar);
                this.updateControlBarPosition(this._bottomBar);
            }
        }
    };
    ClipMask.prototype.onStageMove = function (event) {
        if (this._selectObj == null)
            return;
        if (event) {
            var temp = new egret.Point(event.stageX, event.stageY).subtract(this._lastP);
            this._selectObj.x += temp.x;
            this._selectObj.y += temp.y;
            this._lastP.setTo(event.stageX, event.stageY);
        }
        if (this._selectObj.x <= 0) {
            this._selectObj.x = 0;
        }
        if (this._selectObj.y <= 0) {
            this._selectObj.y = 0;
        }
        if (global.stage) {
            if (this._selectObj.x >= global.stage.stageWidth - this._selectObj.width) {
                this._selectObj.x = global.stage.stageWidth - this._selectObj.width;
            }
            if (this._selectObj.y >= global.stage.stageHeight - this._selectObj.height) {
                this._selectObj.y = global.stage.stageHeight - this._selectObj.height;
            }
        }
        if (this._selectObj instanceof ControlBar) {
            this.updateControlBarPosition(this._selectObj);
            this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
            if (this._rectMask) {
                this._rectMask.width = this._bounds.width;
                this._rectMask.height = this._bounds.height;
                this._rectMask.x = this._bounds.x;
                this._rectMask.y = this._bounds.y;
            }
            if (this._clickClip) {
                this._clickClip.width = this._bounds.width;
                this._clickClip.height = this._bounds.height;
                this._clickClip.x = this._bounds.x;
                this._clickClip.y = this._bounds.y;
            }
        }
        else if (this._selectObj == this._clickClip) {
            if (this._rectMask) {
                this._rectMask.x = this._clickClip.x;
                this._rectMask.y = this._clickClip.y;
                this._rectMask.width = this._clickClip.width;
                this._rectMask.height = this._clickClip.height;
            }
            var haltW = this._defaultW * .5;
            this._topLeftBar.x = this._clickClip.x - haltW;
            this._topLeftBar.y = this._clickClip.y - haltW;
            this.updateControlBarPosition(this._topLeftBar);
            this._bottomRightBar.x = this._clickClip.x + this._clickClip.width - haltW;
            this._bottomRightBar.y = this._clickClip.y + this._clickClip.height - haltW;
            this.updateControlBarPosition(this._bottomRightBar);
        }
        this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
        this.updateBottomToolPosition();
    };
    ClipMask.prototype.updateAdjustPosition = function () {
        if (this._clickClip) {
            this._clickClip.x = (global.curWidth() - this._clickClip.width) * .5;
            this._clickClip.y = (global.curHeight() - this._clickClip.height) * .5;
        }
        if (this._rectMask) {
            this._rectMask.x = this._clickClip.x;
            this._rectMask.y = this._clickClip.y;
            this._rectMask.width = this._clickClip.width;
            this._rectMask.height = this._clickClip.height;
        }
        var haltW = this._defaultW * .5;
        this._topLeftBar.x = this._clickClip.x - haltW;
        this._topLeftBar.y = this._clickClip.y - haltW;
        this.updateControlBarPosition(this._topLeftBar);
        this._bottomRightBar.x = this._clickClip.x + this._clickClip.width - haltW;
        this._bottomRightBar.y = this._clickClip.y + this._clickClip.height - haltW;
        this.updateControlBarPosition(this._bottomRightBar);
        this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
        this.updateBottomToolPosition();
    };
    /*
     * 工具条位置
     * */
    ClipMask.prototype.updateBottomToolPosition = function () {
        this._bounds = this._canvas.getBounds(new egret.Rectangle(0, 0, this.parent.width, this.parent.height));
        if (this._bottomTool) {
            if (this._bounds.y > global.stage.stageHeight - this._bounds.height - this._bottomTool.height) {
                this._bottomTool.y = this._bounds.y - this._bottomTool.height - 5;
            }
            else {
                this._bottomTool.y = this._bounds.bottom + 5;
            }
            this._bottomTool.x = this._bounds.right - this._bottomTool.width;
            this._bottomTool.x = this._bottomTool.x <= 0 ? 0 : this._bottomTool.x;
        }
    };
    ClipMask.prototype.updateControlBarPosition = function (selectObj) {
        if (selectObj === void 0) { selectObj = null; }
        var drawBounds = this.getDrawBounds();
        if (selectObj == this._topLeftBar) {
            if (drawBounds) {
                this._topLeftBar.x = this._topLeftBar.x >= drawBounds.left ? drawBounds.left : this._topLeftBar.x;
                this._topLeftBar.y = this._topLeftBar.y >= drawBounds.top ? drawBounds.top : this._topLeftBar.y;
            }
            this._leftBar.x = this._bottomLeftBar.x = this._topLeftBar.x;
            this._topBar.y = this._topRight.y = this._topLeftBar.y;
        }
        else if (selectObj == this._topBar) {
            if (drawBounds) {
                this._topBar.y = this._topBar.y >= drawBounds.top ? drawBounds.top : this._topBar.y;
            }
            this._bottomBar.x = this._topBar.x;
            this._topLeftBar.y = this._topRight.y = this._topBar.y;
        }
        else if (selectObj == this._topRight) {
            if (drawBounds) {
                this._topRight.x = this._topRight.x <= drawBounds.right ? drawBounds.right : this._topRight.x;
                this._topRight.y = this._topRight.y >= drawBounds.top ? drawBounds.top : this._topRight.y;
            }
            this._rightBar.x = this._bottomRightBar.x = this._topRight.x;
            this._topLeftBar.y = this._topBar.y = this._topRight.y;
        }
        else if (selectObj == this._leftBar) {
            if (drawBounds) {
                this._leftBar.x = this._leftBar.x >= drawBounds.left ? drawBounds.left : this._leftBar.x;
            }
            this._topLeftBar.x = this._bottomLeftBar.x = this._leftBar.x;
            this._rightBar.y = this._leftBar.y;
        }
        else if (selectObj == this._rightBar) {
            if (drawBounds) {
                this._rightBar.x = this._rightBar.x <= drawBounds.right ? drawBounds.right : this._rightBar.x;
            }
            this._topRight.x = this._bottomRightBar.x = this._rightBar.x;
            this._leftBar.y = this._rightBar.y;
        }
        else if (selectObj == this._bottomLeftBar) {
            if (drawBounds) {
                this._bottomLeftBar.x = this._bottomLeftBar.x >= drawBounds.left ? drawBounds.left : this._bottomLeftBar.x;
                this._bottomLeftBar.y = this._bottomLeftBar.y <= drawBounds.bottom ? drawBounds.bottom : this._bottomLeftBar.y;
            }
            this._topLeftBar.x = this._leftBar.x = this._bottomLeftBar.x;
            this._bottomBar.y = this._bottomRightBar.y = this._bottomLeftBar.y;
        }
        else if (selectObj == this._bottomBar) {
            if (drawBounds) {
                this._bottomBar.y = this._bottomBar.y <= drawBounds.bottom ? drawBounds.bottom : this._bottomBar.y;
            }
            this._topBar.x = this._bottomBar.x;
            this._bottomLeftBar.y = this._bottomRightBar.y = this._bottomBar.y;
        }
        else if (selectObj == this._bottomRightBar) {
            if (drawBounds) {
                this._bottomRightBar.x = this._bottomRightBar.x <= drawBounds.right ? drawBounds.right : this._bottomRightBar.x;
                this._bottomRightBar.y = this._bottomRightBar.y <= drawBounds.bottom ? drawBounds.bottom : this._bottomRightBar.y;
            }
            this._topRight.x = this._rightBar.x = this._bottomRightBar.x;
            this._bottomLeftBar.y = this._bottomBar.y = this._bottomRightBar.y;
        }
        this._topBar.x = this._topLeftBar.x + (this._topRight.x - this._topLeftBar.x) * .5;
        this._bottomBar.x = this._bottomLeftBar.x + (this._bottomRightBar.x - this._bottomLeftBar.x) * .5;
        this._leftBar.y = this._topLeftBar.y + (this._bottomLeftBar.y - this._topLeftBar.y) * .5;
        this._rightBar.y = this._topRight.y + (this._bottomRightBar.y - this._topRight.y) * .5;
        if (this._canvas) {
            this._canvas.graphics.clear();
            this._canvas.graphics.lineStyle(1, 0x0);
            this._canvas.graphics.beginFill(0x0, 0);
            this._canvas.graphics.drawRect(this._topLeftBar.x + this._defaultW * .5, this._topLeftBar.y + this._defaultW * .5, this._topRight.x - this._topLeftBar.x, this._bottomLeftBar.y - this._topLeftBar.y);
            this._canvas.graphics.endFill();
        }
    };
    ClipMask.prototype.getDrawBounds = function () {
        if (this._drawContainer) {
            var rect = this._drawContainer.getBounds(new egret.Rectangle(0, 0, this.width, this.height));
            if (rect.width == 0 && rect.height == 0) {
                return null;
            }
            else {
                this._rect.x = rect.x - 5;
                this._rect.y = rect.y - 5;
                this._rect.width = rect.width + 5;
                this._rect.height = rect.height + 5;
            }
            return this._rect;
        }
        return null;
    };
    Object.defineProperty(ClipMask.prototype, "bounds", {
        get: function () {
            return this._bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClipMask.prototype, "rectMask", {
        get: function () {
            return this._rectMask;
        },
        enumerable: true,
        configurable: true
    });
    //截图前要做的一些事情
    ClipMask.prototype.snippingBeforeSomeThing = function () {
        if (this._canvas) {
            this._canvas.graphics.clear();
        }
        if (this._clickClip) {
            this._clickClip.graphics.clear();
        }
        if (this._rectMask) {
            this._rectMask.graphics.clear();
        }
        this._topLeftBar && (this._topLeftBar.visible = false);
        this._topBar && (this._topBar.visible = false);
        this._topRight && (this._topRight.visible = false);
        this._leftBar && (this._leftBar.visible = false);
        this._rightBar && (this._rightBar.visible = false);
        this._bottomLeftBar && (this._bottomLeftBar.visible = false);
        this._bottomBar && (this._bottomBar.visible = false);
        this._bottomRightBar && (this._bottomRightBar.visible = false);
    };
    ClipMask.prototype.destroy = function () {
        this.removeEvent();
        this.removeChildren();
        if (this._drawContainer) {
            this._drawContainer.removeChildren();
            this._drawContainer = null;
        }
        if (this._topLeftBar) {
            this._topLeftBar.destroy();
            this._topLeftBar = null;
        }
        if (this._topBar) {
            this._topBar.destroy();
            this._topBar = null;
        }
        if (this._topRight) {
            this._topRight.destroy();
            this._topRight = null;
        }
        if (this._leftBar) {
            this._leftBar.destroy();
            this._leftBar = null;
        }
        if (this._rightBar) {
            this._rightBar.destroy();
            this._rightBar = null;
        }
        if (this._bottomLeftBar) {
            this._bottomLeftBar.destroy();
            this._bottomLeftBar = null;
        }
        if (this._bottomBar) {
            this._bottomBar.destroy();
            this._bottomBar = null;
        }
        if (this._bottomRightBar) {
            this._bottomRightBar.destroy();
            this._bottomRightBar = null;
        }
        if (this._bottomTool) {
            this._bottomTool.destroy();
            this._bottomTool = null;
        }
        this._rect = null;
        this._bounds = null;
        this._canvas = null;
        this._rectMask = null;
        this._selectObj = null;
        this._clickClip = null;
    };
    //取消截图
    ClipMask.CANCEL_SNIPPING = "cancel_snipping";
    //确认截图
    ClipMask.CONFIRM_SNIPPING = "confirm_snipping";
    /*
     * 截图分享
     * */
    ClipMask.PHOTO_SHARE = "photo_share";
    return ClipMask;
})(eui.Group);
//控制点
var ControlBar = (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar(color, w) {
        if (color === void 0) { color = 0x0; }
        if (w === void 0) { w = 8; }
        _super.call(this);
        this._color = color;
        this._w = w;
        this._rect = new eui.Rect();
        this._rect.strokeColor = 0;
        this._rect.strokeAlpha = 1;
        this._rect.strokeWeight = 1;
        this._rect.fillColor = this._color;
        this._rect.width = this._w;
        this._rect.height = this._w;
        this.addChild(this._rect);
        this._rect.touchChildren = false;
        this._rect.touchEnabled = false;
    }
    ControlBar.prototype.destroy = function () {
        this.removeChildren();
        this._rect = null;
    };
    return ControlBar;
})(eui.Group);
var BottomTool = (function (_super) {
    __extends(BottomTool, _super);
    function BottomTool() {
        _super.call(this);
    }
    BottomTool.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._bg = new eui.Rect();
        this._bg.touchEnabled = false;
        this._bg.touchChildren = false;
        this.addChild(this._bg);
        this._bg.fillColor = 0xffffff;
        this._bg.ellipseHeight = 10;
        this._bg.ellipseWidth = 10;
        this._bg.width = BottomTool.TOTAL_WIDTH;
        this._bg.height = BottomTool.TOTAL_HEIGHT;
        this._containerLayout = new eui.HorizontalLayout();
        this._containerLayout.gap = 5;
        this._containerLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._container = new eui.Group();
        this._container.touchEnabled = false;
        this._container.layout = this._containerLayout;
        this.addChild(this._container);
        this._container.verticalCenter = 0;
        this._container.horizontalCenter = 0;
        this._btnPhoto = new CButton(CButtonType.buttonPhoto);
        this._container.addChild(this._btnPhoto);
        this._btnShare = new CButton(CButtonType.buttonPhotoShare);
        this._container.addChild(this._btnShare);
        this._btnCancel = new CButton(CButtonType.buttonPhotoCancel);
        this._container.addChild(this._btnCancel);
        this.addEvent();
    };
    BottomTool.prototype.addEvent = function () {
        this.removeEvent();
        if (this._container) {
            this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        }
    };
    BottomTool.prototype.removeEvent = function () {
        if (this._container) {
            this._container.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        }
    };
    BottomTool.prototype.onClickHandler = function (event) {
        var target = event.target;
        var commandType = 0;
        switch (target) {
            case this._btnPhoto:
                commandType = BottomTool.COMMAND_PHOTO;
                break;
            case this._btnShare:
                commandType = BottomTool.COMMAND_PHOTO_SHARE;
                break;
            case this._btnCancel:
                commandType = BottomTool.COMMAND_PHOTO_CANCEL;
                break;
        }
        if (this._sender != null) {
            this._sender.bottomToolClick(commandType);
        }
    };
    BottomTool.prototype.sender = function (value) {
        this._sender = value;
        return this;
    };
    BottomTool.prototype.destroy = function () {
        this.removeEvent();
        this.removeChildren();
        if (this._container) {
            this._container.removeChildren();
            this._container = null;
        }
        this._containerLayout = null;
        this._bg = null;
        this._sender = null;
    };
    BottomTool.TOTAL_WIDTH = 150;
    BottomTool.TOTAL_HEIGHT = 50;
    /*
     * 截图
     * */
    BottomTool.COMMAND_PHOTO = 1;
    /*
     * 分享
     * */
    BottomTool.COMMAND_PHOTO_SHARE = 2;
    /*
     * 取消截图
     * */
    BottomTool.COMMAND_PHOTO_CANCEL = 3;
    return BottomTool;
})(eui.Group);
//# sourceMappingURL=SnippingTool.js.map