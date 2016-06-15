/**
 * Created by lx on 2015/1/24.
 */
var MyCheckBoxEvent = (function (_super) {
    __extends(MyCheckBoxEvent, _super);
    function MyCheckBoxEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=MyCheckBoxEvent,p=c.prototype;
    MyCheckBoxEvent.CHACKBOXCHANGEEVENT = "chackBoxChange";
    return MyCheckBoxEvent;
}(egret.Event));
egret.registerClass(MyCheckBoxEvent,'MyCheckBoxEvent');
//# sourceMappingURL=MyCheckBoxEvent.js.map