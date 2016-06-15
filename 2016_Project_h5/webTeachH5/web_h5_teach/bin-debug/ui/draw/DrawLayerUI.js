/**
 * Created by xiaoding on 2016/5/6.
 */
var DrawLayerUI = (function (_super) {
    __extends(DrawLayerUI, _super);
    function DrawLayerUI() {
        _super.call(this);
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=DrawLayerUI,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.pen = new egret.Shape();
        this.pen.touchEnabled = false;
        this.addChild(this.pen);
    };
    return DrawLayerUI;
}(eui.Group));
egret.registerClass(DrawLayerUI,'DrawLayerUI');
//# sourceMappingURL=DrawLayerUI.js.map