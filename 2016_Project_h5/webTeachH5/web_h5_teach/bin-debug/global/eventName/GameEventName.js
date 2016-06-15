/**
 * Created by xiaoding on 2016/2/18.
 */
var GameEventName = (function () {
    function GameEventName() {
    }
    var d = __define,c=GameEventName,p=c.prototype;
    /*
     * {width:number,height:number}
     * */
    GameEventName.STAGE_RESIZE = "stage_resize";
    /*
     * {type:BottomMenuType}
     * */
    GameEventName.BOTTOM_MENU_CLICK = "bottom_menu_click";
    /*
     * {panelType:PanelTypes}
     * */
    GameEventName.CLOSE_PANEL = "close_panel";
    /*
     * 添加事件
     * {type:number} 1 wordLayer
     * */
    GameEventName.ADD_CLICK_HANDLER = "add_click_handler";
    /*
     * 移除事件
     * {type:number} 1 wordLayer
     * */
    GameEventName.REMOVE_CLICK_HANDLER = "remove_click_handler";
    return GameEventName;
}());
egret.registerClass(GameEventName,'GameEventName');
//# sourceMappingURL=GameEventName.js.map