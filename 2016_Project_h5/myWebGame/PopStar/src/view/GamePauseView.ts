/**
 * Created by longxing on 2015/4/14.
 */
class GamePauseView extends egret.Sprite{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addedtostage,this);
    }

    private addedtostage(evt:egret.Event):void{
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addedtostage,this);

        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("pausebg");
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;

        var backBtn:KXButton = new KXButton();
        backBtn.onSetButtonRes("color_back","color_back");
        this.addChild(backBtn);
        backBtn.x = this.stage.stageWidth - backBtn.width;
        backBtn.y = backBtn.height/2;
        backBtn.touchEnabled = true;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backGame,this);

        var menuBtn:KXButton = new KXButton();
        menuBtn.onSetButtonRes("mainmenu","mainmenu");
        this.addChild(menuBtn);
        menuBtn.scaleX = menuBtn.scaleY = 0.6;
        menuBtn.x = this.stage.stageWidth/2;
        menuBtn.y = this.stage.stageHeight/2 - 50;
        menuBtn.touchEnabled = true;
        menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMainMenu,this);

        var soundBtn:KXButton = new KXButton();
        soundBtn.onSetButtonRes("sound","sound");
        this.addChild(soundBtn);
        soundBtn.scaleX = soundBtn.scaleY = 0.6;
        soundBtn.x = this.stage.stageWidth/2;
        soundBtn.y = this.stage.stageHeight/2;

        var shopBtn:KXButton = new KXButton();
        shopBtn.onSetButtonRes("menu_shop","menu_shop");
        this.addChild(shopBtn);
        shopBtn.scaleX = shopBtn.scaleY = 0.6;
        shopBtn.x = this.stage.stageWidth/2;
        shopBtn.y = this.stage.stageHeight/2 + 50;
        shopBtn.touchEnabled = true;
        shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenShopWindow,this);
    }

    private onOpenShopWindow(evt:egret.TouchEvent):void{
        GameShopView.getInstance().onOpenShopWindow(this);
    }

    private backGame(evt:egret.Event):void{
        this.parent.removeChild(this);
    }

    private onMainMenu(evt:egret.Event):void{
        this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_MAINMENU));
    }
}