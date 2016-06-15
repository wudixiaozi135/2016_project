/**
 * Created by xiaoding on 2016/3/15.
 */
class GlobalData
{
	public static snippintTool:SnippingTool;
	public static courseware:ICourseware;

	/*
	 * 输入框
	 * */
	public static coursewareInput:CoursewareInput;
	/*
	 * 输入控制框
	 * */
	public static controlInputRein:ControlInputRein;

	/*
	 * 文字层是否添加了点击事件
	 * */
	public static isAddWorkLayerClick:boolean = false;

	/*
	 * 是否文字层发生移动
	 * */
	public static wordInputMove:boolean = false;

	/*
	 *为true时，表示保持文本原来的状态不变
	 * */
	public static persistInputState:boolean = false;
}