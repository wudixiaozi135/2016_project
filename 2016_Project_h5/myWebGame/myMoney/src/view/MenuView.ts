/**
 * Created by lx on 2015/1/23.
 */
class MenuView extends egret.Sprite{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
    }

    private onAddedToStage(){
       var startBtn:CommonButton = new CommonButton();
        startBtn.onSetBgAndText("clean_widget_btn_pressed","开始数钱",228,65);
        this.addChild(startBtn);
        startBtn.y = (this.stage.stageHeight-startBtn.height)/2 - 100;
        startBtn.x = (this.stage.stageWidth-startBtn.width)/2;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);

        var viewRank:CommonButton = new CommonButton();
        viewRank.onSetBgAndText("clean_widget_btn_pressed","查看排行",228,65);
//        this.addChild(viewRank);
        viewRank.x = (this.stage.stageWidth-viewRank.width)/2;
        viewRank.y = (this.stage.stageHeight-viewRank.height)/2;

        var moreBtn:CommonButton = new CommonButton();
        moreBtn.onSetBgAndText("clean_widget_btn_pressed","更多游戏",228,65);
//        this.addChild(moreBtn);
        moreBtn.x = (this.stage.stageWidth-moreBtn.width)/2;
        moreBtn.y = (this.stage.stageHeight-moreBtn.height)/2 + 100;
    }


    private onTouchHandler(evt:egret.TouchEvent):void{
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
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}