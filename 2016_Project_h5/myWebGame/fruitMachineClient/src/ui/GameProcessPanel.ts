/**
 * Created by xiaoding on 2016/5/12.
 */
class GameProcessPanel extends eui.Group implements xd.IObserver
{
	private appleItem:FruitItem;
	private barItem:FruitItem;
	private orangeItem:FruitItem;
	private pearItem:FruitItem;
	private ringItem:FruitItem;
	private sevenItem:FruitItem;
	private starItem:FruitItem;
	private watermelonItem:FruitItem;
	private coinInput:eui.Label;
	private logView:xd.LogView;

	private btnLock:eui.Button;
	private btnStart:eui.Button;
	private fruitItems:FruitItem[];

	constructor()
	{
		super();
		ClientSocket.getInstance().attach(this);
	}

	update(message):void
	{
		if (message.type == ProcType.TYPE_SHOW)
		{
			//展示奖励
			if (message.proc == ServerProtocol.SM_SHOW_REWARD)
			{
				//显示公告获得收益
				this.updateLog(message);
				this.lockBtns(true);
				this.btnLock.enabled = true;
				if (UserData.userName == UserData.ADMIN)
				{
					if (this.btnStart)
					{
						this.btnStart.enabled = true;
					}
				}
			}
		}
	}

	private updateLog(message):void
	{
		let i:number = 0;
		let cost:number = 0;
		let gainCoin:number = 0;
		if (this.fruitItems && this.fruitItems.length > 0)
		{
			this.fruitItems.forEach(function (element:FruitItem):void
			{
				if (element.itemCount > 0)
				{
					if (message.fruitType == element.fruitType)
					{
						i++;
						gainCoin = message.price * element.itemCount;
						this.addLog(gainCoin.toString());
						this.sendShowGain(gainCoin);
					}
					cost += (element.itemCount * element.price);
				}
				element.itemCount = 0;
			}.bind(this));
		}

		if (i <= 0)
		{
			if (cost > 0)
			{
				this.logView.addLog("扣除￥" + cost);
			}
		}
	}

	private addLog(msg:string):void
	{
		this.logView.addLog("您获得收益￥" + msg);
	}

	//发送获得收益
	private sendShowGain(gainCoin:number):void
	{
		let data:any = {};
		data.type = ProcType.TYPE_CONTROL;
		data.proc = ClientProtocol.CM_GAIN_REWARD;
		data.userName = UserData.userName;
		data.gainCoin = gainCoin;
		ClientSocket.getInstance().sendMesssage(data);
	}

	protected createChildren():void
	{
		super.createChildren();
		this.percentWidth = 100;
		this.percentHeight = 100;

		let verLayout:eui.VerticalLayout = new eui.VerticalLayout();
		verLayout.gap = 20;
		verLayout.paddingTop = 10;
		verLayout.paddingLeft = 10;
		this.layout = verLayout;

		let coinLabel:eui.Label = new eui.Label();
		coinLabel.bold = true;
		coinLabel.text = "我的金币：";
		coinLabel.touchEnabled = false;

		this.coinInput = new eui.Label();
		this.coinInput.touchEnabled = false;
		this.updateCoin();


		let titleContainer:eui.Group = xd.CommonUtils.getGroup(1, null, 10, [coinLabel, this.coinInput]);
		this.addChild(titleContainer);

		this.appleItem = new FruitItem(FruitItemType.typeApple);
		this.appleItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.appleItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.appleItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.appleItem.itemCount > 0)
			{
				this.appleItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.barItem = new FruitItem(FruitItemType.typeBar);
		this.barItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.barItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.barItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.barItem.itemCount > 0)
			{
				this.barItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.orangeItem = new FruitItem(FruitItemType.typeOrange);
		this.orangeItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.orangeItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.orangeItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.orangeItem.itemCount > 0)
			{
				this.orangeItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.pearItem = new FruitItem(FruitItemType.typePear);
		this.pearItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.pearItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.pearItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.pearItem.itemCount > 0)
			{
				this.pearItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.ringItem = new FruitItem(FruitItemType.typeRing);
		this.ringItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.ringItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.ringItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.ringItem.itemCount > 0)
			{
				this.ringItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.sevenItem = new FruitItem(FruitItemType.typeSeven);
		this.sevenItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.sevenItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.sevenItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.sevenItem.itemCount > 0)
			{
				this.sevenItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.starItem = new FruitItem(FruitItemType.typeStar);
		this.starItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.starItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.starItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.starItem.itemCount > 0)
			{
				this.starItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);


		this.watermelonItem = new FruitItem(FruitItemType.typeWatermelon);
		this.watermelonItem.addHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (totalCoin >= price)
			{
				this.watermelonItem.itemCount++;
				totalCoin -= price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			} else
			{
				AlertPanel.show("金币不足");
			}
		}.bind(this);

		this.watermelonItem.minusHandler = function (type:FruitItemType, price:number):void
		{
			let totalCoin:number = UserData.userCoin;
			if (this.watermelonItem.itemCount > 0)
			{
				this.watermelonItem.itemCount--;
				totalCoin += price;
				UserData.userCoin = totalCoin;
				this.updateCoin();
			}
		}.bind(this);

		this.fruitItems = [this.appleItem, this.barItem, this.orangeItem, this.pearItem, this.ringItem, this.sevenItem, this.starItem, this.watermelonItem];
		this.fruitItems.sort(function (element1:FruitItem, element2:FruitItem):number
		{
			if (element1.price < element2.price)
			{
				return -1;
			} else if (element1.price > element2.price)
			{
				return 1;
			} else
			{
				return 0;
			}
		});

		let fruitContainer:eui.Group = xd.CommonUtils.getGroup(2, null, 10, this.fruitItems);
		this.addChild(fruitContainer);

		this.logView = new xd.LogView(this.stage.stageWidth - 20, 280);
		let bottomContainer:eui.Group = xd.CommonUtils.getGroup(1, null, 0, [this.logView]);
		this.addChild(bottomContainer);
		this.logView.addLog("欢迎" + UserData.userName + "进入");

		this.btnStart = new eui.Button();
		this.btnStart.label = "抽奖";
		this.btnStart.width = 100;

		this.btnLock = new eui.Button();
		this.btnLock.width = 100;
		this.btnLock.label = "交易锁定";

		let btns:eui.Button[];
		if (UserData.userName != UserData.ADMIN)
		{
			btns = [this.btnLock];
		} else
		{
			btns = [this.btnStart, this.btnLock];
		}

		let btnContainer:eui.Group = xd.CommonUtils.getGroup(1, null, 15, btns);
		this.addChild(btnContainer);
		btnContainer.includeInLayout = false;
		btnContainer.x = this.stage.stageWidth - btnContainer.width - 10;
		btnContainer.y = 10;
		btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		btnContainer.touchEnabled = false;
	}

	private updateCoin():void
	{
		this.coinInput.text = "￥" + UserData.userCoin;
	}

	private onClick(ev:egret.TouchEvent):void
	{
		let obj:eui.Button = ev.target;
		if (obj == this.btnStart)
		{
			let data:any = {};
			data.type = ProcType.TYPE_CONTROL;
			data.proc = ClientProtocol.CM_START_GAME;
			data.userName = UserData.userName;
			ClientSocket.getInstance().sendMesssage(data);
			if (UserData.userName == UserData.ADMIN)
			{
				this.btnStart.enabled = false;
			}
		} else if (obj == this.btnLock)
		{
			if (this.checkIsBought())
			{
				this.lockBtns(false);
				this.btnLock.enabled = false;
				AlertPanel.show("交易已锁定");

				//锁定交易
			} else
			{
				AlertPanel.show("购买后才能锁定");
			}
		}
	}

	private getLockItems():any[]
	{
		let items:any[] = [];
		if (this.fruitItems && this.fruitItems.length > 0)
		{
			this.fruitItems.forEach(function (element:FruitItem):void
			{
				if (element.itemCount > 0)
				{
					items.push({fruitType: element.fruitType, itemCount: element.itemCount});
				}
			});
		}
		return items;
	}

	/*
	 * 是否已购买
	 * */
	private checkIsBought():boolean
	{
		let bol:boolean = false;
		if (this.fruitItems && this.fruitItems.length > 0)
		{
			bol = this.fruitItems.some(function (element:FruitItem):boolean
			{
				return element.itemCount > 0;
			});
		}
		return bol;
	}

	/*
	 * false 禁用或 true启用按钮
	 * */
	private lockBtns(enabled:boolean):void
	{
		if (this.fruitItems && this.fruitItems.length > 0)
		{
			this.fruitItems.forEach(function (element:FruitItem):void
			{
				element.enabled = enabled;
			});
		}
	}
}