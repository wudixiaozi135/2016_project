/**
 * Created by xiaoding on 2016/2/18.
 */
class GameEventName
{
	/*
	 * {width:number,height:number}
	 * */
	public static STAGE_RESIZE:string = "stage_resize";
	/*
	 * {type:BottomMenuType}
	 * */
	public static BOTTOM_MENU_CLICK:string = "bottom_menu_click";
	/*
	 * {panelType:PanelTypes}
	 * */
	public static CLOSE_PANEL:string = "close_panel";

	/*
	 * 添加事件
	 * {type:number} 1 wordLayer
	 * */
	public static ADD_CLICK_HANDLER:string = "add_click_handler";


	/*
	 * 移除事件
	 * {type:number} 1 wordLayer
	 * */
	public static REMOVE_CLICK_HANDLER:string = "remove_click_handler";

}