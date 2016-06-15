/**
 * Created by lx on 2015/1/23.
 */
var MenuView = (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }
    var d = __define,c=MenuView,p=c.prototype;
    p.onAddedToStage = function () {
        var startBtn = new CommonButton();
        startBtn.onSetBgAndText("clean_widget_btn_pressed", "开始数钱", 228, 65);
        this.addChild(startBtn);
        startBtn.y = (this.stage.stageHeight - startBtn.height) / 2 - 100;
        startBtn.x = (this.stage.stageWidth - startBtn.width) / 2;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        var viewRank = new CommonButton();
        viewRank.onSetBgAndText("clean_widget_btn_pressed", "查看排行", 228, 65);
        //        this.addChild(viewRank);
        viewRank.x = (this.stage.stageWidth - viewRank.width) / 2;
        viewRank.y = (this.stage.stageHeight - viewRank.height) / 2;
        var moreBtn = new CommonButton();
        moreBtn.onSetBgAndText("clean_widget_btn_pressed", "更多游戏", 228, 65);
        //        this.addChild(moreBtn);
        moreBtn.x = (this.stage.stageWidth - moreBtn.width) / 2;
        moreBtn.y = (this.stage.stageHeight - moreBtn.height) / 2 + 100;
    };
    p.onTouchHandler = function (evt) {
        console.log('dispatchEvent...');
        this.dispatchEvent(new OpenGameViewEvent(OpenGameViewEvent.OPENGAMEVIEW));
        // var bodyConfig:BodyConfig = new BodyConfig;
        // bodyConfig.appId = "wx292f5e0a17763d79";
        // bodyConfig.debug = true;
        // wx.config( bodyConfig );
        // wx.ready( function(){
        //     /// 在这里调用微信相关功能的 API
        //     var bs:BodyMenuShareTimeline = new BodyMenuShareTimeline();
        //     bs.title = "天天数钱";
        //     wx.onMenuShareTimeline(bs);
        // } );
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return MenuView;
}(egret.Sprite));
egret.registerClass(MenuView,'MenuView');
//# sourceMappingURL=MenuView.js.map