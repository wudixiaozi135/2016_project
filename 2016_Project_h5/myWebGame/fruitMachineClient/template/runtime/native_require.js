
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/socket/socket.js",
	"libs/modules/greensock/greensock.js",
	"libs/modules/xiaodingCore/xiaodingCore.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/data/ClientProtocol.js",
	"bin-debug/data/FruitItemType.js",
	"bin-debug/data/GameState.js",
	"bin-debug/data/MapUtils.js",
	"bin-debug/data/ProcType.js",
	"bin-debug/data/ServerProtocol.js",
	"bin-debug/data/UserData.js",
	"bin-debug/event/FruitMachineClientEventName.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/socket/ClientSocket.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ui/AlertPanel.js",
	"bin-debug/ui/FruitItem.js",
	"bin-debug/ui/GameProcessPanel.js",
	"bin-debug/ui/GameScenePanel.js",
	"bin-debug/ui/LoginPanel.js",
	//----auto game_file_list end----
];

var window = this;

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
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
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