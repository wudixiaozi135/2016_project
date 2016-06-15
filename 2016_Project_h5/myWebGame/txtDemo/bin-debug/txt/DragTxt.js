/**
 * Created by xiaoding on 2016/2/16.
 */
var DragTxt = (function (_super) {
    __extends(DragTxt, _super);
    function DragTxt() {
        _super.call(this);
    }
    var d = __define,c=DragTxt,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.editTxt = new eui.EditableText();
        this.editTxt.type = "input";
        this.editTxt.border = true;
        this.editTxt.borderColor = 0xf;
        this.editTxt.multiline = true;
        this.editTxt.wordWrap = true;
        this.addChild(this.editTxt);
        this.editTxt.addEventListener(egret.TextEvent.CHANGE, this.changeTxt, this);
    };
    p.changeTxt = function (ev) {
        var that = this;
        that.editTxt.width = that.editTxt.textWidth + that.editTxt.size;
        that.editTxt.height = that.editTxt.textHeight + that.editTxt.size + 10;
        if (that.editTxt.width > that.stage.stageWidth - that.editTxt.x) {
            that.editTxt.width = that.stage.stageWidth - that.editTxt.x;
        }
    };
    return DragTxt;
}(eui.Group));
egret.registerClass(DragTxt,'DragTxt');
