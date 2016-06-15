/**
 * Created by xiaoding on 2016/5/12.
 */
var GameProcessPanel = (function (_super) {
    __extends(GameProcessPanel, _super);
    function GameProcessPanel() {
        _super.call(this);
        ClientSocket.getInstance().attach(this);
    }
    var d = __define,c=GameProcessPanel,p=c.prototype;
    p.update = function (message) {
        if (message.type == ProcType.TYPE_SHOW) {
            //展示奖励
            if (message.proc == ServerProtocol.SM_SHOW_REWARD) {
                //显示公告获得收益
                this.updateLog(message);
                this.lockBtns(true);
                this.btnLock.enabled = true;
                if (UserData.userName == UserData.ADMIN) {
                    if (this.btnStart) {
                        this.btnStart.enabled = true;
                    }
                }
            }
        }
    };
    p.updateLog = function (message) {
        var i = 0;
        var cost = 0;
        var gainCoin = 0;
        if (this.fruitItems && this.fruitItems.length > 0) {
            this.fruitItems.forEach(function (element) {
                if (element.itemCount > 0) {
                    if (message.fruitType == element.fruitType) {
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
        if (i <= 0) {
            if (cost > 0) {
                this.logView.addLog("扣除￥" + cost);
            }
        }
    };
    p.addLog = function (msg) {
        this.logView.addLog("您获得收益￥" + msg);
    };
    //发送获得收益
    p.sendShowGain = function (gainCoin) {
        var data = {};
        data.type = ProcType.TYPE_CONTROL;
        data.proc = ClientProtocol.CM_GAIN_REWARD;
        data.userName = UserData.userName;
        data.gainCoin = gainCoin;
        ClientSocket.getInstance().sendMesssage(data);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.percentWidth = 100;
        this.percentHeight = 100;
        var verLayout = new eui.VerticalLayout();
        verLayout.gap = 20;
        verLayout.paddingTop = 10;
        verLayout.paddingLeft = 10;
        this.layout = verLayout;
        var coinLabel = new eui.Label();
        coinLabel.bold = true;
        coinLabel.text = "我的金币：";
        coinLabel.touchEnabled = false;
        this.coinInput = new eui.Label();
        this.coinInput.touchEnabled = false;
        this.updateCoin();
        var titleContainer = xd.CommonUtils.getGroup(1, null, 10, [coinLabel, this.coinInput]);
        this.addChild(titleContainer);
        this.appleItem = new FruitItem(FruitItemType.typeApple);
        this.appleItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.appleItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.appleItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.appleItem.itemCount > 0) {
                this.appleItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.barItem = new FruitItem(FruitItemType.typeBar);
        this.barItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.barItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.barItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.barItem.itemCount > 0) {
                this.barItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.orangeItem = new FruitItem(FruitItemType.typeOrange);
        this.orangeItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.orangeItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.orangeItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.orangeItem.itemCount > 0) {
                this.orangeItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.pearItem = new FruitItem(FruitItemType.typePear);
        this.pearItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.pearItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.pearItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.pearItem.itemCount > 0) {
                this.pearItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.ringItem = new FruitItem(FruitItemType.typeRing);
        this.ringItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.ringItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.ringItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.ringItem.itemCount > 0) {
                this.ringItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.sevenItem = new FruitItem(FruitItemType.typeSeven);
        this.sevenItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.sevenItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.sevenItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.sevenItem.itemCount > 0) {
                this.sevenItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.starItem = new FruitItem(FruitItemType.typeStar);
        this.starItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.starItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.starItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.starItem.itemCount > 0) {
                this.starItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.watermelonItem = new FruitItem(FruitItemType.typeWatermelon);
        this.watermelonItem.addHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (totalCoin >= price) {
                this.watermelonItem.itemCount++;
                totalCoin -= price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
            else {
                AlertPanel.show("金币不足");
            }
        }.bind(this);
        this.watermelonItem.minusHandler = function (type, price) {
            var totalCoin = UserData.userCoin;
            if (this.watermelonItem.itemCount > 0) {
                this.watermelonItem.itemCount--;
                totalCoin += price;
                UserData.userCoin = totalCoin;
                this.updateCoin();
            }
        }.bind(this);
        this.fruitItems = [this.appleItem, this.barItem, this.orangeItem, this.pearItem, this.ringItem, this.sevenItem, this.starItem, this.watermelonItem];
        this.fruitItems.sort(function (element1, element2) {
            if (element1.price < element2.price) {
                return -1;
            }
            else if (element1.price > element2.price) {
                return 1;
            }
            else {
                return 0;
            }
        });
        var fruitContainer = xd.CommonUtils.getGroup(2, null, 10, this.fruitItems);
        this.addChild(fruitContainer);
        this.logView = new xd.LogView(this.stage.stageWidth - 20, 280);
        var bottomContainer = xd.CommonUtils.getGroup(1, null, 0, [this.logView]);
        this.addChild(bottomContainer);
        this.logView.addLog("欢迎" + UserData.userName + "进入");
        this.btnStart = new eui.Button();
        this.btnStart.label = "抽奖";
        this.btnStart.width = 100;
        this.btnLock = new eui.Button();
        this.btnLock.width = 100;
        this.btnLock.label = "交易锁定";
        var btns;
        if (UserData.userName != UserData.ADMIN) {
            btns = [this.btnLock];
        }
        else {
            btns = [this.btnStart, this.btnLock];
        }
        var btnContainer = xd.CommonUtils.getGroup(1, null, 15, btns);
        this.addChild(btnContainer);
        btnContainer.includeInLayout = false;
        btnContainer.x = this.stage.stageWidth - btnContainer.width - 10;
        btnContainer.y = 10;
        btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        btnContainer.touchEnabled = false;
    };
    p.updateCoin = function () {
        this.coinInput.text = "￥" + UserData.userCoin;
    };
    p.onClick = function (ev) {
        var obj = ev.target;
        if (obj == this.btnStart) {
            var data = {};
            data.type = ProcType.TYPE_CONTROL;
            data.proc = ClientProtocol.CM_START_GAME;
            data.userName = UserData.userName;
            ClientSocket.getInstance().sendMesssage(data);
            if (UserData.userName == UserData.ADMIN) {
                this.btnStart.enabled = false;
            }
        }
        else if (obj == this.btnLock) {
            if (this.checkIsBought()) {
                this.lockBtns(false);
                this.btnLock.enabled = false;
                AlertPanel.show("交易已锁定");
            }
            else {
                AlertPanel.show("购买后才能锁定");
            }
        }
    };
    p.getLockItems = function () {
        var items = [];
        if (this.fruitItems && this.fruitItems.length > 0) {
            this.fruitItems.forEach(function (element) {
                if (element.itemCount > 0) {
                    items.push({ fruitType: element.fruitType, itemCount: element.itemCount });
                }
            });
        }
        return items;
    };
    /*
     * 是否已购买
     * */
    p.checkIsBought = function () {
        var bol = false;
        if (this.fruitItems && this.fruitItems.length > 0) {
            bol = this.fruitItems.some(function (element) {
                return element.itemCount > 0;
            });
        }
        return bol;
    };
    /*
     * false 禁用或 true启用按钮
     * */
    p.lockBtns = function (enabled) {
        if (this.fruitItems && this.fruitItems.length > 0) {
            this.fruitItems.forEach(function (element) {
                element.enabled = enabled;
            });
        }
    };
    return GameProcessPanel;
}(eui.Group));
egret.registerClass(GameProcessPanel,'GameProcessPanel',["xd.IObserver"]);
//# sourceMappingURL=GameProcessPanel.js.map