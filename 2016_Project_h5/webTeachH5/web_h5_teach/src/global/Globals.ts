/**
 * Created by xiaoding on 2016/2/18.
 */
module global
{
	export var stage:egret.Stage;
	export var uiLayerManager:UILayerManager;
	export var curPanel:egret.DisplayObject;

	//颜色选择器里的颜色代码
	export var color:number = 0;
	//当前游戏宽度
	export function curWidth():number
	{
		return egret.MainContext.instance.stage.stageWidth;
	}

	//当前游戏宽度
	export function curHeight():number
	{
		return egret.MainContext.instance.stage.stageHeight;
	}

	export var initIsVertical:boolean;
}