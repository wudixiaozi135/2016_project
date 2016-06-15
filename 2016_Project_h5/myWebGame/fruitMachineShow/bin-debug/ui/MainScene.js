/**
 * Created by xiaoding on 2016/5/11.
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        _super.call(this);
        this.timerCount = 10;
        this.mapData = [];
        this.luckyNumber = 0;
        this.startNumber = 0;
        this.recordPos = -1;
        this.clientUrl = getConfigData().qrUrl;
        ClientSocket.getInstance().attach(this);
        //初始化地图数据
        MapUtils.createMapData(this.mapData);
    }
    var d = __define,c=MainScene,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchChildren = false;
        this.touchEnabled = false;
        var bgContainer = new eui.Group();
        bgContainer.touchEnabled = false;
        bgContainer.touchChildren = false;
        var bg = this.getBmp("bg");
        bgContainer.addChild(bg);
        bgContainer.width = bg.width;
        bgContainer.height = bg.height;
        var logLabel = new eui.Label("公告");
        logLabel.touchEnabled = false;
        var horizonLayout = new eui.VerticalLayout();
        horizonLayout.gap = 10;
        var bottomContainer = new eui.Group();
        bottomContainer.layout = horizonLayout;
        var mainContainer = xd.CommonUtils.getGroup(2, null, 10, [bgContainer, logLabel, bottomContainer,]);
        this.addChild(mainContainer);
        mainContainer.touchEnabled = false;
        this.redBorder = new RedBorder();
        this.addChild(this.redBorder);
        var logContainer = new eui.Group();
        var logView = new xd.LogView(this.stage.stageWidth, 240);
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
        var qrSprite1 = qr.QRCode.create(this.clientUrl + "?random=" + Math.random() * 999999);
        this.addChild(qrSprite1);
        var gap = ((this.stage.stageWidth) - qrSprite1.width * 3) / 3;
        qrSprite1.x = 10;
        qrSprite1.y = this.stage.stageHeight - qrSprite1.height - 10;
        var qrSprite2 = qr.QRCode.create(this.clientUrl + "?random=" + Math.random() * 999999);
        this.addChild(qrSprite2);
        qrSprite2.x = this.stage.stageWidth - qrSprite2.width - 10;
        qrSprite2.y = this.stage.stageHeight - qrSprite2.height - 10;
        this.timer = new egret.Timer(900, 10);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
    };
    //开始跑
    p.startRun = function () {
        this.timerCount = 10;
        this.updateTimerLabel();
        this.timer.reset();
        this.timer.start();
    };
    p.updateTimerLabel = function () {
        this.timeLabel.text = this.timerCount + "";
    };
    p.onTimerComplete = function (ev) {
        this.timer.reset();
        var random = 30 + (Math.random() * 20) >> 0;
        if (this.recordPos >= 0) {
            random += this.recordPos;
        }
        this.setLoopTime(random);
    };
    p.onTimer = function (ev) {
        this.timerCount--;
        this.updateTimerLabel();
    };
    p.setLoopTime = function (value) {
        if (value === void 0) { value = 150; }
        this.luckyNumber = value;
        if (this.recordPos >= 0) {
            this.startNumber = this.recordPos;
        }
        this.loopRun();
    };
    p.loopRun = function () {
        var pos = 0;
        if (this.startNumber < this.luckyNumber) {
            var delayTime = 50;
            if (this.startNumber > this.luckyNumber - 10) {
                delayTime = 300;
            }
            egret.setTimeout(function () {
                this.startNumber++;
                this.loopRun();
            }, this, delayTime);
        }
        else {
            this.recordPos = this.findCurrentPos();
            var temp = this.mapData[this.recordPos];
            this.playAnimate(temp);
            trace("endGame" + this.recordPos);
            this.timeEnd(temp);
            return;
        }
        pos = this.startNumber % 24;
        if (this.recordPos >= 0) {
            this.recordPos = -1;
        }
        var mapData = this.mapData[pos];
        this.redBorder.row = mapData.row;
        this.redBorder.column = mapData.column;
    };
    p.playAnimate = function (mapData) {
        var bmp = this.getBmp(this.getResName(mapData.fruitType));
        bmp.x = this.redBorder.x;
        bmp.y = this.redBorder.y;
        this.addChild(bmp);
        bmp.scaleX = bmp.scaleY = .1;
        var w = (this.stage.stageWidth - bmp.width) * .5;
        var h = 200;
        TweenMax.to(bmp, 2, {
            x: w, y: h, scaleX: 1, scaleY: 1, onComplete: function () {
                egret.setTimeout(function () {
                    this.removeChild(bmp);
                }, this, 300);
            }.bind(this)
        });
    };
    p.getResName = function (type) {
        switch (type) {
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
    };
    /*
     * 抽奖结束
     * */
    p.timeEnd = function (mapData) {
        var data = {};
        data.proc = ServerProtocol.SM_SHOW_REWARD;
        data.type = ProcType.TYPE_SHOW;
        data.price = mapData.price;
        data.fruitType = mapData.fruitType;
        ClientSocket.getInstance().sendMesssage(data);
    };
    p.findCurrentPos = function () {
        var data;
        for (var i = 0; i < this.mapData.length; i++) {
            data = this.mapData[i];
            if (data.column == this.redBorder.column && data.row == this.redBorder.row) {
                return i;
            }
        }
        return -1;
    };
    p.update = function (message) {
        if (message) {
            if (message.type == ProcType.TYPE_SHOW) {
                if (message.proc == ServerProtocol.SM_PROTOCOL_LOGIN) {
                    this.logView.addLog("欢迎" + message.userName + "登陆");
                }
                else if (message.proc == ServerProtocol.SM_START_GAME) {
                    this.startRun();
                }
                else if (message.proc == ServerProtocol.SM_GAIN_REWARD) {
                    this.logView.addLog(message.userName + "获得￥" + message.gainCoin);
                }
            }
            else if (message.type == ProcType.TYPE_ALL) {
                if (message.proc == ServerProtocol.SM_PROTOCOL_EXIT) {
                    this.logView.addLog(message.userName + "退出了系统");
                }
            }
        }
    };
    p.getBmp = function (resName) {
        var bmp = new egret.Bitmap();
        var texture = RES.getRes(resName);
        if (texture) {
            bmp.texture = texture;
        }
        return bmp;
    };
    return MainScene;
}(eui.Group));
egret.registerClass(MainScene,'MainScene',["xd.IObserver"]);
//# sourceMappingURL=MainScene.js.map