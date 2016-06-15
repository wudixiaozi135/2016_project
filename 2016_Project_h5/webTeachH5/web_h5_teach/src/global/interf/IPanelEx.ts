/**
 * Created by xiaoding on 2016/3/11.
 */
interface IPanelEx
{
	isShow():boolean;
	panelRect():egret.Rectangle;
	panelType():PanelTypes;
	destroy():void;

	//显示且显示动画完成
	isShowCompleted():boolean;
}