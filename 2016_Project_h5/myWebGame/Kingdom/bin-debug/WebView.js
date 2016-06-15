/**
 * Created by Administrator on 2016/4/8.
 */
/**
 * WebView
 * 适配FIXED_WIDTH、FIXED_HEIGHT、NO_BORDER、SHOW_ALL四种缩放模式
 * 暂未考虑屏幕大小改变、屏幕旋转以及单页面多Webplay实例的情形
 * Created by yxiao on 2015/9/30.
 */
var WebView = (function (_super) {
    __extends(WebView, _super);
    /**
     * @param src
     */
    function WebView(src) {
        _super.call(this);
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._src = "";
        this._scaleMode = egret.MainContext.instance.stage.scaleMode;
        this._iframeWrapper = null;
        this._iframe = null;
        var stageDelegateDom = document.getElementById("StageDelegateDiv"), playerContainer = stageDelegateDom.parentElement;
        var iframeWrapperDom = document.getElementById("iframe-wrapper");
        if (!iframeWrapperDom) {
            iframeWrapperDom = document.createElement("div");
            iframeWrapperDom.style.display = "none";
            iframeWrapperDom.attributes['style'].value += 'position:absolute;-webkit-overflow-scrolling: touch;overflow-y: scroll;'; //解决iframe在ios下的显示问题
            iframeWrapperDom.id = "iframe-wrapper";
            stageDelegateDom.appendChild(iframeWrapperDom);
        }
        this._iframeWrapper = iframeWrapperDom;
        this._iframeWrapper.style.display = "none";
        this._iframeWrapper.style.opacity = "0";
        var iframe = document.createElement("iframe"), t = new Date().getTime();
        iframe.src = src;
        iframe.id = "webview-iframe-" + t;
        iframe.name = "webview-iframe-" + t;
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.opacity = "0";
        iframe.style.display = 'none';
        iframe.frameBorder = '0';
        iframe.border = "0";
        this._iframeWrapper.appendChild(iframe);
        this._iframe = document.getElementById("webview-iframe-" + t);
        var self = this;
        this._iframe.onload = function () {
            self._iframeWrapper.style.opacity = "1";
            self._iframe.style.opacity = "1";
        };
        this._stageW = egret.MainContext.instance.stage.stageWidth;
        this._stageH = egret.MainContext.instance.stage.stageHeight;
        this._windowW = window.innerWidth;
        this._windowH = window.innerHeight;
        this._designH = parseInt(playerContainer.attributes['data-content-height'].value);
        this._designW = parseInt(playerContainer.attributes['data-content-width'].value);
        var stageSize = egret.sys.screenAdapter.calculateStageSize(egret.MainContext.instance.stage.scaleMode, this._windowW, this._windowH, this._designW, this._designH);
        this._displayH = stageSize.displayHeight;
        this._displayW = stageSize.displayWidth;
        console.log("windowW:" + this._windowW);
        console.log("stageW:" + this._stageW);
        console.log("disPlayW:" + this._displayW);
        console.log("windowH:" + this._windowH);
        console.log("stageH:" + this._stageH);
        console.log("displayH:" + this._displayH);
    }
    var d = __define,c=WebView,p=c.prototype;
    p.show = function () {
        this._iframe.style.display = 'block';
        this._iframeWrapper.style.display = 'block';
    };
    p.destroy = function () {
        if (this._iframe) {
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.removeChild(this._iframe);
        }
    };
    d(p, "width"
        ,function () {
            return this._width;
        }
        ,function (value) {
            this._width = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframe.width = this._width / this._stageW * this._windowW + "px";
                this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._iframe.style.width = this._width / this._stageW * this._windowW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._windowW + "px";
                }
                else {
                    this._iframe.style.width = this._width / this._stageW * this._displayW + "px";
                    this._iframeWrapper.style.width = this._width / this._stageW * this._displayW + "px";
                }
            }
        }
    );
    d(p, "height"
        ,function () {
            return this._height;
        }
        ,function (value) {
            this._height = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframe.height = this._height / this._stageH * this._windowH + "px";
                this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._iframe.style.height = this._height / this._stageH * this._windowH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._windowH + "px";
                }
                else {
                    this._iframe.style.height = this._height / this._stageH * this._displayH + "px";
                    this._iframeWrapper.style.height = this._height / this._stageH * this._displayH + "px";
                }
            }
        }
    );
    d(p, "x"
        ,function () {
            return this._x;
        }
        ,function (value) {
            this._x = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowW == this._displayW) {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._windowW + "px";
                }
                else {
                    this._iframeWrapper.style.left = this._x / this._stageW * this._displayW + "px";
                }
            }
        }
    );
    d(p, "y"
        ,function () {
            return this._y;
        }
        ,function (value) {
            this._y = value;
            if (this._scaleMode == egret.StageScaleMode.FIXED_WIDTH || this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
            }
            if (this._scaleMode == egret.StageScaleMode.SHOW_ALL || this._scaleMode == egret.StageScaleMode.NO_BORDER) {
                if (this._windowH == this._displayH) {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._windowH + "px";
                }
                else {
                    this._iframeWrapper.style.top = this._y / this._stageH * this._displayH + "px";
                }
            }
        }
    );
    d(p, "src"
        ,function () {
            return this._src;
        }
        ,function (value) {
            this._src = value;
        }
    );
    return WebView;
}(egret.DisplayObjectContainer));
egret.registerClass(WebView,'WebView');
//# sourceMappingURL=WebView.js.map