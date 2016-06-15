/**
 * Created by Administrator on 2015/10/27.
 */
package com.xiaoding.org.solidGeometry.manager
{
	import com.xiaoding.org.solidGeometry.ui.BottomToolUI;
	import com.xiaoding.org.solidGeometry.ui.SolidShapeLayerUI;

	import org.flexlite.domUI.components.Group;

	public class LayerManager
	{
		private var _app:Group;

		public function LayerManager()
		{
		}

		public function initApp(app:Group):void
		{
			_app = app;

			var solidShapeLayerUI:SolidShapeLayerUI = SolidShapeLayerUI.getInstance;
			_app.addElement(solidShapeLayerUI);

			var bottomUI:BottomToolUI = BottomToolUI.getInstance;
			_app.addElement(bottomUI);
		}

		private static var _instance:LayerManager = null;

		public static function get getInstance():LayerManager
		{
			if (_instance == null)
			{
				_instance = new LayerManager();
			}
			return _instance;
		}
	}
}
