/**
 * Created by xiaoding on 2016/3/10.
 * 全局接口类，跨模块调用，解耦(注意不能放具体类)
 */
class GlobalInterface
{
	public static bottomMenuPosition:IBottomMenuBtnPosition;
	public static getIPanelExByPanelType:IGetIPanelExByPanelType;
	public static courseMenuBar:ICoursewareToolbar;
}