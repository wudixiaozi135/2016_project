/**
 * Created by xiaoding on 2016/2/18.
 */
var global;
(function (global) {
    //颜色选择器里的颜色代码
    global.color = 0;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    global.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    global.curHeight = curHeight;
})(global || (global = {}));
//# sourceMappingURL=Globals.js.map