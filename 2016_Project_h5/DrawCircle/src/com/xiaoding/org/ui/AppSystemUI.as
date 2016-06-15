/**
 * Created by Administrator on 2015/11/12.
 */
package com.xiaoding.org.ui
{
	import org.flexlite.domCore.Injector;
	import org.flexlite.domUI.core.Theme;
	import org.flexlite.domUI.managers.SystemManager;
	import org.flexlite.domUI.skins.themes.VectorTheme;

	public class AppSystemUI extends SystemManager
	{
		public function AppSystemUI()
		{
			super();
			Injector.mapClass(Theme, VectorTheme);
		}

		override protected function childrenCreated():void
		{
			super.childrenCreated();

			addElement(ShapeContainerUI.getInstance);
			addElement(LeftToolUI.getInstance);
		}
	}
}
