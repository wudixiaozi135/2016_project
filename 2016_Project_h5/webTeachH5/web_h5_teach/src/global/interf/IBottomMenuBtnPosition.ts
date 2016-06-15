/**
 * Created by xiaoding on 2016/3/10.
 * 用于获取底部菜单栏各个按钮的具体位置
 */
interface IBottomMenuBtnPosition
{
	getMenuPositionByType(type:BottomMenuType):egret.Point;
}