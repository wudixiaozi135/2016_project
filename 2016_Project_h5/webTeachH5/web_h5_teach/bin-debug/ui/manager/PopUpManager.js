/**
 * 面板弹出的管理类
 */
var PopUpManager;
(function (PopUpManager) {
    /**
     * 添加面板方法
     * panel 面板
     * dark  背景是否变黑
     * position  定位
     * effectType 0：没有动画 1:从中间轻微弹出
     */
    function addPopUp(panel, dark, position, effectType) {
        if (dark === void 0) { dark = false; }
        if (effectType === void 0) { effectType = 0; }
        if (global.uiLayerManager.uiLayer.contains(panel)) {
            return;
        }
        if (panel.hasOwnProperty("isPlay")) {
            panel.isPlay = true;
        }
        if (panel.hasOwnProperty("playStartAnimateFinish")) {
            panel.playStartAnimateFinish = false;
        }
        var temp = 0;
        var rect = panel.panelRect();
        if (dark) {
            this.darkSprite = new eui.Rect();
            this.darkSprite.fillColor = 0x0;
            this.darkSprite.fillAlpha = .3;
            this.darkSprite.percentWidth = 100;
            this.darkSprite.percentHeight = 100;
            if (!global.uiLayerManager.uiLayer.contains(this.darkSprite)) {
                global.uiLayerManager.uiLayer.addChild(this.darkSprite);
            }
            this.darkSprite.touchEnabled = true;
            egret.Tween.get(this.darkSprite).to({ alpha: 1 }, 150);
            this.darkSprite.visible = true;
        }
        global.uiLayerManager.uiLayer.addChild(panel);
        global.curPanel = panel;
        if (position.hasOwnProperty("top")) {
            panel.y = position.top;
        }
        if (position.hasOwnProperty("bottom")) {
            panel.y = global.curHeight() - rect.height - position.bottom;
        }
        if (position.hasOwnProperty("left")) {
            panel.x = position.left;
        }
        if (position.hasOwnProperty("right")) {
            panel.x = global.curWidth() - rect.width - position.right;
        }
        if (position.hasOwnProperty("horizontalCenter")) {
            temp = position.horizontalCenter;
            if (temp >= 1) {
                temp = 1;
            }
            if (temp <= -1) {
                temp = -1;
            }
            panel.x = (global.curWidth() - rect.width) * .5 + temp * rect.width;
        }
        if (position.hasOwnProperty("verticalCenter")) {
            temp = position.verticalCenter;
            if (temp >= 1) {
                temp = 1;
            }
            if (temp <= -1) {
                temp = -1;
            }
            panel.y = (global.curHeight() - rect.height) * .5 + temp * rect.height;
        }
        if (position.hasOwnProperty("initX")) {
            panel.x = position.initX;
        }
        if (position.hasOwnProperty("initY")) {
            panel.y = position.initY;
        }
        var onComplete = function () {
            if (panel.hasOwnProperty("isPlay")) {
                panel.isPlay = false;
            }
            if (panel.hasOwnProperty("playStartAnimateFinish")) {
                panel.playStartAnimateFinish = true;
            }
        };
        if (effectType == 1) {
            panel.alpha = 0;
            panel.scaleX = 0.3;
            panel.scaleY = 0.3;
            egret.Tween.get(panel).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).call(onComplete, this);
        }
        else {
            onComplete();
        }
    }
    PopUpManager.addPopUp = addPopUp;
    /**
     * 移除面板方法
     * panel             面板
     * effectType        0：没有动画 1:有动画
     */
    function removePopUp(panel, effectType) {
        if (effectType === void 0) { effectType = 0; }
        if (panel.hasOwnProperty("isPlay")) {
            panel.isPlay = true;
        }
        if (panel.hasOwnProperty("playStartAnimateFinish")) {
            panel.playStartAnimateFinish = false;
        }
        var onComplete = function () {
            if (global.uiLayerManager.uiLayer.contains(this.darkSprite)) {
                global.uiLayerManager.uiLayer.removeChild(this.darkSprite);
            }
        };
        if (this.darkSprite) {
            egret.Tween.get(this.darkSprite).to({ alpha: 0 }, 100).call(onComplete, this);
        }
        var onEnd = function () {
            if (global.uiLayerManager.uiLayer.contains(panel)) {
                global.uiLayerManager.uiLayer.removeChild(panel);
            }
            if (panel.hasOwnProperty("isPlay")) {
                panel.isPlay = false;
            }
        };
        var endP = panel.closeAnimatePos();
        if (endP) {
            if (effectType == 1) {
                egret.Tween.get(panel).to({
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    x: endP.x,
                    y: endP.y
                }, 300).call(onEnd, this);
            }
            else {
                onEnd();
            }
        }
    }
    PopUpManager.removePopUp = removePopUp;
    function resize(w, h) {
    }
    PopUpManager.resize = resize;
})(PopUpManager || (PopUpManager = {}));
//# sourceMappingURL=PopUpManager.js.map