
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/greensock/greensock.js",
	"libs/modules/h5uploader/h5uploader.js",
	"libs/modules/xiaodingCore/xiaodingCore.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/core/xiaoding/ColorPicker.js",
	"bin-debug/core/xiaoding/RequestUtils.js",
	"bin-debug/core/xiaoding/SnippingTool.js",
	"bin-debug/global/eventName/GameEventName.js",
	"bin-debug/global/GlobalData.js",
	"bin-debug/global/GlobalHandlerManager.js",
	"bin-debug/global/GlobalInterface.js",
	"bin-debug/global/Globals.js",
	"bin-debug/global/interf/IBottomMenuBtnPosition.js",
	"bin-debug/global/interf/IDragable.js",
	"bin-debug/global/interf/IGetPanelExByPanelType.js",
	"bin-debug/global/interf/IPanelColor.js",
	"bin-debug/global/interf/IPanelEx.js",
	"bin-debug/global/interf/ISnippingTool.js",
	"bin-debug/global/PanelTypes.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ui/blackboard/BlackBoardBg.js",
	"bin-debug/ui/bottomMenus/BottomMenuBtn.js",
	"bin-debug/ui/bottomMenus/BottomMenuGroup.js",
	"bin-debug/ui/bottomMenus/BottomMenuHandler.js",
	"bin-debug/ui/bottomMenus/BottomMenuManager.js",
	"bin-debug/ui/bottomMenus/BottomMenuType.js",
	"bin-debug/ui/commons/components/panel/PanelEx.js",
	"bin-debug/ui/callRoll/PanelCallRoll.js",
	"bin-debug/ui/color/PanelColor.js",
	"bin-debug/ui/commons/components/cbutton/CButton.js",
	"bin-debug/ui/commons/components/cbutton/CButtonType.js",
	"bin-debug/ui/courseWare/CourseTypes.js",
	"bin-debug/ui/courseWare/Courseware.js",
	"bin-debug/ui/courseWare/data/CoursewareVo.js",
	"bin-debug/ui/courseWare/interf/ICourseware.js",
	"bin-debug/ui/courseWare/interf/ICoursewareToolbar.js",
	"bin-debug/ui/courseWare/toolBar/CoursewareToolBar.js",
	"bin-debug/ui/courseWareInput/ControlInputRein.js",
	"bin-debug/ui/courseWareInput/CoursewareInput.js",
	"bin-debug/ui/courseWareInput/CoursewareInputManager.js",
	"bin-debug/ui/courseWareInput/CoursewareInputState.js",
	"bin-debug/ui/draw/DrawLayerUI.js",
	"bin-debug/ui/manager/PanelManager.js",
	"bin-debug/ui/manager/PanelMediator.js",
	"bin-debug/ui/manager/PopUpManager.js",
	"bin-debug/ui/manager/UILayerManager.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:20,textColor:0xF1E2FF,bgAlpha:0.3",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};