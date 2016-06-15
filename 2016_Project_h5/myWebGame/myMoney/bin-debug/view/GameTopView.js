/**
 * Created by lx on 2015/1/23.
 */
var GameTopView = (function (_super) {
    __extends(GameTopView, _super);
    function GameTopView() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initTopView, this);
    }
    var d = __define,c=GameTopView,p=c.prototype;
    p.initTopView = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("hfb_top_bg");
        var rect = new egret.Rectangle(1, 18, 2, 1);
        bg.scale9Grid = rect;
        bg.width = this.stage.stageWidth;
        bg.height = 50;
        this.addChild(bg);
        //坐上音乐控制按钮
        this.musicBtn = new MyCheckBox();
        this.musicBtn.onSetCheckBoxImg("music_btn_open", "music_btn_close");
        this.musicBtn.onBgBitmapSource("img_btn_bg_normal", "img_btn_bg_select.9", 5, 5, 1, 1);
        this.addChild(this.musicBtn);
        this.musicBtn.x = 5;
        this.musicBtn.y = 5;
        this.musicBtn.setHeight(40);
        this.musicBtn.setWidth(40);
        this.timeTxt = new MyTextView();
        this.addChild(this.timeTxt);
        this.timeTxt.onSetBg("log_but_default", 40, true, 20, 20, 20, 20);
        this.timeTxt.onSetExternalImage("icon_arrangement_time", 'left', 35, 35, true, 27, 27, 2, 2);
        this.timeTxt.text("00:00");
        this.timeTxt.x = this.stage.stageWidth - this.timeTxt.width - 5;
        this.timeTxt.y = (50 - this.timeTxt.height) / 2;
        this.cashTxt = new MyTextView();
        this.addChild(this.cashTxt);
        this.cashTxt.onSetBg("log_but_default", 40, true, 20, 20, 20, 20);
        this.cashTxt.text(".00元");
        this.cashTxt.x = this.stage.stageWidth - this.timeTxt.width - this.cashTxt.width - 10;
        this.cashTxt.y = (50 - this.cashTxt.height) / 2;
    };
    return GameTopView;
}(egret.Sprite));
egret.registerClass(GameTopView,'GameTopView');
//# sourceMappingURL=GameTopView.js.map