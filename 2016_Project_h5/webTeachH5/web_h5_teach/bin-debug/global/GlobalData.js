/**
 * Created by xiaoding on 2016/3/15.
 */
var GlobalData = (function () {
    function GlobalData() {
    }
    var d = __define,c=GlobalData,p=c.prototype;
    /*
     * 文字层是否添加了点击事件
     * */
    GlobalData.isAddWorkLayerClick = false;
    /*
     * 是否文字层发生移动
     * */
    GlobalData.wordInputMove = false;
    /*
     *为true时，表示保持文本原来的状态不变
     * */
    GlobalData.persistInputState = false;
    return GlobalData;
}());
egret.registerClass(GlobalData,'GlobalData');
//# sourceMappingURL=GlobalData.js.map