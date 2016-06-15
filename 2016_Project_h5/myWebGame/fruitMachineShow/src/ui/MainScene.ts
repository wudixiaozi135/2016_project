/**
 * Created by xiaoding on 2016/5/11.
 */
class MainScene extends eui.Group implements xd.IObserver
{
	private clientUrl:string;
	private logView:xd.LogView;

	private timeLabel:eui.Label;
	private timerCount:number = 10;

	private redBorder:RedBorder;

	private mapData:MapData[] = [];

	private timer:egret.Timer;
	private luckyNumber = 0;
	private startNumber = 0;

	private recordPos:number = -1;

	constructor()
	{
		super();

		this.clientUrl = getConfigData().qrUrl;

		ClientSocket.getInstance().attach(this);
		//初始化地图数据
		MapUtils.createMapData(this.mapData);
	}

	protected createChildren():void
	{
		super.createChildren();
		this.touchChildren = false;
		this.touchEnabled = false;

		let bgContainer:eui.Group = new eui.Group();
		bgContainer.touchEnabled = false;
		bgContainer.touchChildren = false;
		let bg:egret.Bitmap = this.getBmp("bg");
		bgContainer.addChild(bg);
		bgContainer.width = bg.width;
		bgContainer.height = bg.height;


		let logLabel:eui.Label = new eui.Label("公告");
		logLabel.touchEnabled = false;

		let horizonLayout:eui.VerticalLayout = new eui.VerticalLayout();
		horizonLayout.gap = 10;
		let bottomContainer:eui.Group = new eui.Group();
		bottomContainer.layout = horizonLayout;


		let mainContainer:eui.Group = xd.CommonUtils.getGroup(2, null, 10, [bgContainer, logLabel, bottomContainer,]);
		this.addChild(mainContainer);
		mainContainer.touchEnabled = false;

		this.redBorder = new RedBorder();
		this.addChild(this.redBorder);


		let logContainer:eui.Group = new eui.Group();
		let logView = new xd.LogView(this.stage.stageWidth, 240);
		logContainer.addChild(logView);
		logContainer.height = 240;
		bottomContainer.addChild(logContainer);
		this.logView = logView;

		this.timeLabel = new eui.Label();
		this.timeLabel.bold = true;
		this.timeLabel.touchEnabled = false;
		this.timeLabel.width = this.stage.stageWidth;
		this.timeLabel.textAlign = "center";
		this.timeLabel.size = 60;
		this.updateTimerLabel();
		this.addChild(this.timeLabel);
		this.timeLabel.top = 427;

		let qrSprite1:egret.Sprite = qr.QRCode.create(this.clientUrl + "?random=" + Math.random() * 999999);
		this.addChild(qrSprite1);
		let gap:number = ((this.stage.stageWidth) - qrSprite1.width * 3) / 3;

		qrSprite1.x = 10;
		qrSprite1.y = this.stage.stageHeight - qrSprite1.height - 10;

		let qrSprite2:egret.Sprite = qr.QRCode.create(this.clientUrl + "?random=" + Math.random() * 999999);
		this.addChild(qrSprite2);
		qrSprite2.x = this.stage.stageWidth - qrSprite2.width - 10;
		qrSprite2.y = this.stage.stageHeight - qrSprite2.height - 10;


		this.timer = new egret.Timer(900, 10);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
	}

	//开始跑
	private startRun():void
	{
		this.timerCount = 10;
		this.updateTimerLabel();

		this.timer.reset();
		this.timer.start();
	}

	private updateTimerLabel():void
	{
		this.timeLabel.text = this.timerCount + "";
	}

	private onTimerComplete(ev:egret.TimerEvent):void
	{
		this.timer.reset();
		let random:number = 30 + (Math.random() * 20) >> 0;
		if (this.recordPos >= 0)
		{
			random += this.recordPos;
		}
		this.setLoopTime(random);
	}

	private onTimer(ev:egret.TimerEvent):void
	{
		this.timerCount--;
		this.updateTimerLabel();
	}

	private setLoopTime(value:number = 150):void
	{
		this.luckyNumber = value;
		if (this.recordPos >= 0)
		{
			this.startNumber = this.recordPos;
		}
		this.loopRun();
	}

	private loopRun():void
	{
		let pos:number = 0;
		if (this.startNumber < this.luckyNumber)
		{
			let delayTime:number = 50;
			if (this.startNumber > this.luckyNumber - 10)
			{
				delayTime = 300;
			}
			egret.setTimeout(function ():void
			{
				this.startNumber++;
				this.loopRun();
			}, this, delayTime);
		} else
		{
			this.recordPos = this.findCurrentPos();
			let temp:MapData = this.mapData[this.recordPos];
			this.playAnimate(temp);
			trace("endGame" + this.recordPos);
			this.timeEnd(temp);
			return;
		}

		pos = this.startNumber % 24;
		if (this.recordPos >= 0)
		{
			this.recordPos = -1;
		}

		let mapData:MapData = this.mapData[pos];
		this.redBorder.row = mapData.row;
		this.redBorder.column = mapData.column;
	}

	private playAnimate(mapData:MapData):void
	{
		let bmp:egret.Bitmap = this.getBmp(this.getResName(mapData.fruitType));
		bmp.x = this.redBorder.x;
		bmp.y = this.redBorder.y;
		this.addChild(bmp);
		bmp.scaleX = bmp.scaleY = .1;

		let w:number = (this.stage.stageWidth - bmp.width) * .5;
		let h:number = 200;
		TweenMax.to(bmp, 2, {
			x: w, y: h, scaleX: 1, scaleY: 1, onComplete: function ():void
			{
				egret.setTimeout(function ():void
				{
					this.removeChild(bmp);
				}, this, 300);
			}.bind(this)
		});
	}

	private getResName(type:FruitItemType):string
	{
		switch (type)
		{
			case FruitItemType.typeApple:
				return "apple";
			case FruitItemType.typeBar:
				return "bar";
			case FruitItemType.typeOrange:
				return "orange";
			case FruitItemType.typePear:
				return "pear";
			case FruitItemType.typeRing:
				return "ring";
			case FruitItemType.typeSeven:
				return "seven";
			case FruitItemType.typeStar:
				return "star";
			case FruitItemType.typeWatermelon:
				return "watermelon";
		}
		return null;
	}


	/*
	 * 抽奖结束
	 * */
	private timeEnd(mapData:MapData):void
	{
		let data:any = {};
		data.proc = ServerProtocol.SM_SHOW_REWARD;
		data.type = ProcType.TYPE_SHOW;
		data.price = mapData.price;
		data.fruitType = mapData.fruitType;
		ClientSocket.getInstance().sendMesssage(data);
	}

	private findCurrentPos():number
	{
		let data:MapData;
		for (let i = 0; i < this.mapData.length; i++)
		{
			data = this.mapData[i];
			if (data.column == this.redBorder.column && data.row == this.redBorder.row)
			{
				return i;
			}
		}
		return -1;
	}


	update(message):void
	{
		if (message)
		{
			if (message.type == ProcType.TYPE_SHOW)
			{
				if (message.proc == ServerProtocol.SM_PROTOCOL_LOGIN)
				{
					this.logView.addLog("欢迎" + message.userName + "登陆");
				} else if (message.proc == ServerProtocol.SM_START_GAME)
				{
					this.startRun();
				} else if (message.proc == ServerProtocol.SM_GAIN_REWARD)//日志收益
				{
					this.logView.addLog(message.userName + "获得￥" + message.gainCoin);
				}
			} else if (message.type == ProcType.TYPE_ALL)
			{
				if (message.proc == ServerProtocol.SM_PROTOCOL_EXIT)
				{
					this.logView.addLog(message.userName + "退出了系统");
				}
			}
		}
	}

	private getBmp(resName:string):egret.Bitmap
	{
		let bmp:egret.Bitmap = new egret.Bitmap();
		let texture:egret.Texture = RES.getRes(resName);
		if (texture)
		{
			bmp.texture = texture;
		}
		return bmp;
	}
}