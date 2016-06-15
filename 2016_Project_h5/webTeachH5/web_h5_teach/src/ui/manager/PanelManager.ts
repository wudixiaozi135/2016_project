/**
 * 面板的管理类
 */
module PanelManager
{
	export function initPanel():void
	{
		var _width = document.documentElement.clientWidth;
		var _height = document.documentElement.clientHeight;
		if (_width < _height)
		{
			global.initIsVertical = true;
		}
	}
}


