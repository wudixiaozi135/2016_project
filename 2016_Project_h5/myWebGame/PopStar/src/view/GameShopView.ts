/**
 * Created by longxing on 2015/4/15.
 */
class GameShopView extends egret.Sprite
{
	private static _instance:GameShopView;

	public constructor()
	{
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	public static getInstance():GameShopView
	{
		if (this._instance == null)
		{
			this._instance = new GameShopView();
		}
		return this._instance;
	}

	public onOpenShopWindow(container:egret.Sprite):void
	{
		container.addChild(GameShopView._instance);
		GameShopView._instance.y = -GameShopView._instance.height;
		egret.Tween.get(GameShopView._instance).to({y: 0}, 500);
	}

	private onAddToStage(evt:egret.Event):void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("background_layer0");
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;
		this.addChild(bg);

		var tf:egret.TextField = new egret.TextField();
		tf.size = 22;
		tf.bold = true;
		tf.textAlign = "left";
		tf.text = "你有" + egret.localStorage.getItem("toolStar") + "个幸运星";
		tf.x = 40;
		tf.y = 40;
		this.addChild(tf);

		var backBtn:KXButton = new KXButton();
		backBtn.onSetButtonRes("color_back", "color_back");
		this.addChild(backBtn);
		backBtn.x = this.stage.stageWidth - backBtn.width;
		backBtn.y = backBtn.height;
		backBtn.touchEnabled = true;
		backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backGame, this);

		var buyBg1:egret.Bitmap = new egret.Bitmap();
		buyBg1.texture = RES.getRes("bg_shopitem");
		buyBg1.width = this.stage.stageWidth;
		buyBg1.height = buyBg1.width / 640 * 104;
		buyBg1.anchorOffsetX = buyBg1.width * .5;
		buyBg1.anchorOffsetY = buyBg1.height * .5;

		this.addChild(buyBg1);
		buyBg1.x = this.stage.stageWidth / 2;
		buyBg1.y = 150;

		var star1:egret.Bitmap = new egret.Bitmap();
		star1.texture = RES.getRes("lucky_star");
		star1.anchorOffsetY = star1.height * .5;
		this.addChild(star1);
		star1.scaleX = star1.scaleY = 0.7;
		star1.x = 40;
		star1.y = buyBg1.y;

		var tf1:egret.TextField = new egret.TextField();
		tf1.text = "X20";
		tf1.size = 22;
		tf1.bold = true;
		tf1.anchorOffsetY = tf1.height * .5;

		this.addChild(tf1);
		tf1.x = 120;
		tf1.y = buyBg1.y;

		var buyBtn1:KXButton = new KXButton();
		buyBtn1.onSetButtonRes("btn_buy", "btn_buy", "购买");
		this.addChild(buyBtn1);
		buyBtn1.scaleX = buyBtn1.scaleY = 0.6;
		buyBtn1.y = buyBg1.y;
		buyBtn1.x = buyBg1.width - 100;

		//第二个
		var buyBg2:egret.Bitmap = new egret.Bitmap();
		buyBg2.texture = RES.getRes("bg_shopitem");
		buyBg2.width = this.stage.stageWidth;
		buyBg2.height = buyBg2.width / 640 * 104;
		buyBg2.anchorOffsetX = buyBg2.width * .5;
		buyBg2.anchorOffsetY = buyBg2.height * .5;


		this.addChild(buyBg2);
		buyBg2.x = this.stage.stageWidth / 2;
		buyBg2.y = 250;

		var star2:egret.Bitmap = new egret.Bitmap();
		star2.texture = RES.getRes("lucky_star");
		star2.anchorOffsetY = star2.height * .5;

		this.addChild(star2);
		star2.scaleX = star2.scaleY = 0.7;
		star2.x = 40;
		star2.y = buyBg2.y;

		var tf2:egret.TextField = new egret.TextField();
		tf2.text = "X40";
		tf2.size = 22;
		tf2.bold = true;
		tf2.anchorOffsetY = tf2.height * .5;

		this.addChild(tf2);
		tf2.x = 120;
		tf2.y = buyBg2.y;

		var buyBtn2:KXButton = new KXButton();
		buyBtn2.onSetButtonRes("btn_buy", "btn_buy", "购买");
		this.addChild(buyBtn2);
		buyBtn2.scaleX = buyBtn2.scaleY = 0.6;
		buyBtn2.y = buyBg2.y;
		buyBtn2.x = buyBg2.width - 100;

		//第三个
		var buyBg3:egret.Bitmap = new egret.Bitmap();
		buyBg3.texture = RES.getRes("bg_shopitem");
		buyBg3.width = this.stage.stageWidth;
		buyBg3.height = buyBg3.width / 640 * 104;
		buyBg3.anchorOffsetX = buyBg3.width * .5;
		buyBg3.anchorOffsetY = buyBg3.height * .5;


		this.addChild(buyBg3);
		buyBg3.x = this.stage.stageWidth / 2;
		buyBg3.y = 350;

		var star3:egret.Bitmap = new egret.Bitmap();
		star3.texture = RES.getRes("lucky_star");
		star3.anchorOffsetY = star3.height * .5;
		
		this.addChild(star3);
		star3.scaleX = star3.scaleY = 0.7;
		star3.x = 40;
		star3.y = buyBg3.y;

		var tf3:egret.TextField = new egret.TextField();
		tf3.text = "X80";
		tf3.size = 22;
		tf3.bold = true;
		tf3.anchorOffsetY = tf3.height * .5;

		this.addChild(tf3);
		tf3.x = 120;
		tf3.y = buyBg3.y;

		var buyBtn3:KXButton = new KXButton();
		buyBtn3.onSetButtonRes("btn_buy", "btn_buy", "购买");
		this.addChild(buyBtn3);
		buyBtn3.scaleX = buyBtn3.scaleY = 0.6;
		buyBtn3.y = buyBg3.y;
		buyBtn3.x = buyBg3.width - 100;

		//第四个
		var buyBg4:egret.Bitmap = new egret.Bitmap();
		buyBg4.texture = RES.getRes("bg_shopitem");
		buyBg4.width = this.stage.stageWidth;
		buyBg4.height = buyBg4.width / 640 * 104;
		buyBg4.anchorOffsetX = buyBg4.width * .5;
		buyBg4.anchorOffsetY = buyBg4.height * .5;


		this.addChild(buyBg4);
		buyBg4.x = this.stage.stageWidth / 2;
		buyBg4.y = 450;

		var star4:egret.Bitmap = new egret.Bitmap();
		star4.texture = RES.getRes("lucky_star");
		star4.anchorOffsetY=star4.height*.5;

		this.addChild(star4);
		star4.scaleX = star4.scaleY = 0.7;
		star4.x = 40;
		star4.y = buyBg4.y;

		var tf4:egret.TextField = new egret.TextField();
		tf4.text = "X160";
		tf4.size = 22;
		tf4.bold = true;
		tf4.anchorOffsetY=tf4.height*.5;
		this.addChild(tf4);
		tf4.x = 120;
		tf4.y = buyBg4.y;

		var buyBtn4:KXButton = new KXButton();
		buyBtn4.onSetButtonRes("btn_buy", "btn_buy", "购买");
		this.addChild(buyBtn4);
		buyBtn4.scaleX = buyBtn4.scaleY = 0.6;
		buyBtn4.y = buyBg4.y;
		buyBtn4.x = buyBg4.width - 100;

		//第五个
		var buyBg5:egret.Bitmap = new egret.Bitmap();
		buyBg5.texture = RES.getRes("bg_shopitem");
		buyBg5.width = this.stage.stageWidth;
		buyBg5.height = buyBg5.width / 640 * 104;
		buyBg5.anchorOffsetX=buyBg5.width*.5;
		buyBg5.anchorOffsetY=buyBg5.height*.5;
		
		this.addChild(buyBg5);
		buyBg5.x = this.stage.stageWidth / 2;
		buyBg5.y = 550;

		var star5:egret.Bitmap = new egret.Bitmap();
		star5.texture = RES.getRes("lucky_star");
		star5.anchorOffsetY=star5.height*.5;
		
		this.addChild(star5);
		star5.scaleX = star5.scaleY = 0.7;
		star5.x = 40;
		star5.y = buyBg5.y;

		var tf5:egret.TextField = new egret.TextField();
		tf5.text = "X320";
		tf5.size = 22;
		tf5.bold = true;
		tf5.anchorOffsetY=tf5.height*.5;
		
		this.addChild(tf5);
		tf5.x = 120;
		tf5.y = buyBg5.y;

		var buyBtn5:KXButton = new KXButton();
		buyBtn5.onSetButtonRes("btn_buy", "btn_buy", "购买");
		this.addChild(buyBtn5);
		buyBtn5.scaleX = buyBtn5.scaleY = 0.6;
		buyBtn5.y = buyBg5.y;
		buyBtn5.x = buyBg5.width - 100;

		//第六个
		var buyBg6:egret.Bitmap = new egret.Bitmap();
		buyBg6.texture = RES.getRes("bg_shopitem");
		buyBg6.width = this.stage.stageWidth;
		buyBg6.height = buyBg6.width / 640 * 104;
		buyBg6.anchorOffsetX=buyBg6.width*.5;
		buyBg6.anchorOffsetY=buyBg6.height*.5;
		
		
		this.addChild(buyBg6);
		buyBg6.x = this.stage.stageWidth / 2;
		buyBg6.y = 650;

		var star6:egret.Bitmap = new egret.Bitmap();
		star6.texture = RES.getRes("lucky_star");
		star6.anchorOffsetY=star6.height*.5;
		
		this.addChild(star6);
		star6.scaleX = star6.scaleY = 0.7;
		star6.x = 40;
		star6.y = buyBg6.y;

		var tf6:egret.TextField = new egret.TextField();
		tf6.text = "X640";
		tf6.size = 22;
		tf6.bold = true;
		tf6.anchorOffsetY=tf6.height*.5;
		this.addChild(tf6);
		tf6.x = 120;
		tf6.y = buyBg6.y;

		var buyBtn6:KXButton = new KXButton();
		buyBtn6.onSetButtonRes("btn_buy", "btn_buy", "购买");
		this.addChild(buyBtn6);
		buyBtn6.scaleX = buyBtn6.scaleY = 0.6;
		buyBtn6.y = buyBg6.y;
		buyBtn6.x = buyBg6.width - 100;
	}

	private backGame(evt:egret.Event):void
	{
		this.parent.removeChild(this);
	}
}