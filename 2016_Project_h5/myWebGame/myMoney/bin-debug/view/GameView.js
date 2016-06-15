/**
 * Created by lx on 2015/1/23.
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.moneyImage = ['kagaz_1', 'kagaz_1mo', 'kagaz_1motatur', 'kagaz_2mo', 'kagaz_5', 'kagaz_5mo', 'kagaz_5motatur', 'kagaz_10', 'kagaz_10tatur', 'kagaz_20', 'kagaz_50', 'kagaz_100', 'kagaz_kona_1', 'kagaz_kona10'];
        this.money = [1, 0.1, 0.1, 0.2, 5, 0.5, 0.5, 10, 10, 20, 50, 100, 1, 10];
        this.selfMoney = 0;
        this.useHeight = 0;
        this.gametimelong = 60;
        this.curgame = this.gametimelong;
        this.allPrice = 0;
        this.scaleNumber = 0.5;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }
    var d = __define,c=GameView,p=c.prototype;
    p.initView = function () {
        this.initGameView();
        this.topView = new GameTopView();
        this.addChild(this.topView);
        this.topView.musicBtn.addEventListener(MyCheckBoxEvent.CHACKBOXCHANGEEVENT, this.onMusicButtonHandler, this);
        this.onLoadMusic();
    };
    p.onMusicButtonHandler = function (evt) {
        if (this.topView.musicBtn.onGetSelect()) {
            if (this.bgSoundChannel) {
                this.bgSoundChannel.stop();
            }
        }
        else {
            if (this.bgSound) {
                if (this.bgSoundChannel) {
                    this.bgSoundChannel.stop();
                }
                this.bgSoundChannel = this.bgSound.play(0, 0);
            }
        }
    };
    p.onLoadMusic = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onMusicLoadComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("gameMusic");
    };
    p.onMusicLoadComplete = function (evt) {
        if (evt.groupName == 'gameMusic') {
            this.bgSound = RES.getRes("beijing");
            this.bgSoundChannel = this.bgSound.play(0, 0);
        }
    };
    p.initGameView = function () {
        this.useHeight = this.stage.stageHeight - 190;
        this.useHeight = this.useHeight / 4;
        this.moneyImg1 = new egret.Bitmap();
        this.addChild(this.moneyImg1);
        this.moneyImg2 = new egret.Bitmap();
        this.addChild(this.moneyImg2);
        this.moneyImg3 = new egret.Bitmap();
        this.addChild(this.moneyImg3);
        this.moneyImg4 = new egret.Bitmap();
        this.addChild(this.moneyImg4);
        this.priceBtn1 = new CommonButton();
        this.priceBtn1.onSetBgAndText("stop_button", "100", 200, 50, true, 13, 13, 2, 42);
        this.addChild(this.priceBtn1);
        this.priceBtn1.x = this.stage.stageWidth / 2 - this.priceBtn1.width - 10;
        this.priceBtn1.y = this.stage.stageHeight - this.priceBtn1.height * 2 - 10;
        this.priceBtn2 = new CommonButton();
        this.priceBtn2.onSetBgAndText("stop_button", "100", 200, 50, true, 13, 13, 2, 42);
        this.addChild(this.priceBtn2);
        this.priceBtn2.x = this.stage.stageWidth / 2 + 10;
        this.priceBtn2.y = this.stage.stageHeight - this.priceBtn2.height * 2 - 10;
        this.priceBtn3 = new CommonButton();
        this.priceBtn3.onSetBgAndText("stop_button", "100", 200, 50, true, 13, 13, 2, 42);
        this.addChild(this.priceBtn3);
        this.priceBtn3.x = this.stage.stageWidth / 2 - this.priceBtn3.width - 10;
        this.priceBtn3.y = this.stage.stageHeight - this.priceBtn3.height - 5;
        this.priceBtn4 = new CommonButton();
        this.priceBtn4.onSetBgAndText("stop_button", "100", 200, 50, true, 13, 13, 2, 42);
        this.addChild(this.priceBtn4);
        this.priceBtn4.x = this.stage.stageWidth / 2 + 10;
        this.priceBtn4.y = this.stage.stageHeight - this.priceBtn4.height - 5;
        this.createNewRoundView();
        if (!this.timer) {
            this.timer = new egret.Timer(1000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.start();
        this.priceBtn1.touchEnabled = true;
        this.priceBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
        this.priceBtn2.touchEnabled = true;
        this.priceBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
        this.priceBtn3.touchEnabled = true;
        this.priceBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
        this.priceBtn4.touchEnabled = true;
        this.priceBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
    };
    p.onTimerHandler = function (evt) {
        this.curgame -= 1;
        if (this.curgame <= 0) {
            this.timer.stop();
            this.onGameOverHandler();
        }
        this.topView.timeTxt.text(this.onGetTimeFormat(this.curgame));
        this.topView.timeTxt.x = this.stage.stageWidth - this.topView.timeTxt.width - 5;
    };
    p.onGetTimeFormat = function (time) {
        var timestr = '';
        var h = Math.floor(time / 3600);
        if (h > 0) {
            if (h >= 10) {
                timestr += h.toString();
            }
            else {
                timestr += ('0' + h.toString());
            }
            timestr += ":";
        }
        var m = Math.floor((time - h * 3600) / 60);
        if (m >= 10) {
            timestr += m;
        }
        else {
            timestr += ('0' + m.toString());
        }
        timestr += ":";
        var s = (time - h * 3600 - m * 60);
        if (s >= 10) {
            timestr += s;
        }
        else {
            timestr += ('0' + s.toString());
        }
        return timestr;
    };
    p.createNewRoundView = function () {
        this.allPrice = 0;
        var random = Math.round(Math.random() * 13);
        var angle = Math.round(Math.random() * 10);
        if (angle % 2 == 0)
            angle *= -1;
        this.moneyImg1.texture = RES.getRes(this.moneyImage[random]);
        this.moneyImg1.x = (this.stage.stageWidth - this.moneyImg1.width * this.scaleNumber) / 2;
        this.moneyImg1.y = 60 + (this.useHeight - this.moneyImg1.height * this.scaleNumber) / 2;
        this.moneyImg1.scaleX = this.moneyImg1.scaleY = this.scaleNumber;
        this.moneyImg1.rotation = angle;
        this.allPrice += this.money[random];
        this.allPrice.toFixed(2);
        random = Math.round(Math.random() * 13);
        angle = Math.round(Math.random() * 10);
        if (angle % 2 == 0)
            angle *= -1;
        this.moneyImg2.texture = RES.getRes(this.moneyImage[random]);
        this.moneyImg2.x = (this.stage.stageWidth - this.moneyImg2.width * this.scaleNumber) / 2;
        this.moneyImg2.y = 60 + this.useHeight + (this.useHeight - this.moneyImg2.height * this.scaleNumber) / 2;
        this.moneyImg2.scaleX = this.moneyImg2.scaleY = this.scaleNumber;
        this.moneyImg2.rotation = angle;
        this.allPrice += this.money[random];
        this.allPrice.toFixed(2);
        random = Math.round(Math.random() * 13);
        angle = Math.round(Math.random() * 10);
        if (angle % 2 == 0)
            angle *= -1;
        this.moneyImg3.texture = RES.getRes(this.moneyImage[random]);
        this.moneyImg3.x = (this.stage.stageWidth - this.moneyImg3.width * this.scaleNumber) / 2;
        this.moneyImg3.y = 60 + this.useHeight * 2 + (this.useHeight - this.moneyImg3.height * this.scaleNumber) / 2;
        this.moneyImg3.scaleX = this.moneyImg3.scaleY = this.scaleNumber;
        this.moneyImg3.rotation = angle;
        this.allPrice += this.money[random];
        this.allPrice.toFixed(2);
        random = Math.round(Math.random() * 13);
        angle = Math.round(Math.random() * 10);
        if (angle % 2 == 0)
            angle *= -1;
        this.moneyImg4.texture = RES.getRes(this.moneyImage[random]);
        this.moneyImg4.x = (this.stage.stageWidth - this.moneyImg4.width * this.scaleNumber) / 2;
        this.moneyImg4.y = 60 + this.useHeight * 3 + (this.useHeight - this.moneyImg4.height * this.scaleNumber) / 2;
        this.moneyImg4.scaleX = this.moneyImg4.scaleY = this.scaleNumber;
        this.moneyImg4.rotation = angle;
        this.allPrice += this.money[random];
        this.allPrice.toFixed(2);
        random = Math.round(Math.random() * 3);
        if (random == 0) {
            this.priceBtn1.setText(this.allPrice.toFixed(2) + "元");
            this.priceBtn2.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn3.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn4.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
        }
        else if (random == 1) {
            this.priceBtn2.setText(this.allPrice.toFixed(2) + "元");
            this.priceBtn1.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn3.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn4.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
        }
        else if (random == 2) {
            this.priceBtn3.setText(this.allPrice.toFixed(2) + "元");
            this.priceBtn2.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn1.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn4.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
        }
        else {
            this.priceBtn4.setText(this.allPrice.toFixed(2) + "元");
            this.priceBtn2.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn3.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
            this.priceBtn1.setText(this.getRandomPrice(this.allPrice).toFixed(2) + "元");
        }
    };
    p.getRandomPrice = function (allPrice) {
        var random = Math.round(Math.random() * 10) * 10;
        random.toFixed(2);
        if ((random / 10) % 2 == 0)
            random *= -1;
        allPrice += random;
        if (allPrice > 400)
            allPrice = 400 - (allPrice - 400);
        if (allPrice < 0)
            allPrice = -allPrice;
        return allPrice;
    };
    p.onTouchTapHandler = function (evt) {
        if (this.gameResultView)
            return;
        var targetBtn = evt.currentTarget;
        var index = targetBtn.getText().indexOf('元');
        if (Number(targetBtn.getText().substring(0, index)).toFixed(2) == this.allPrice.toFixed(2)) {
            this.selfMoney += this.allPrice;
            this.topView.cashTxt.text(this.selfMoney.toFixed(2) + '元');
            this.topView.cashTxt.x = this.stage.stageWidth - this.topView.timeTxt.width - this.topView.cashTxt.width - 10;
            this.curgame += 3;
            this.onPlayEffect(true);
            this.onPlaySound(true);
        }
        else {
            this.curgame -= 5;
            this.onPlayEffect(false);
            this.onPlaySound(false);
        }
        this.createNewRoundView();
    };
    p.onPlaySound = function (result) {
        var sound;
        if (result) {
            sound = RES.getRes("great");
        }
        else {
            sound = RES.getRes("shibai");
        }
        sound.play();
    };
    p.onPlayEffect = function (result) {
        var succTxt = new egret.TextField();
        if (result) {
            succTxt.text = "时间: +3";
            succTxt.textColor = 0x00ff00;
        }
        else {
            succTxt.text = "时间: -5";
            succTxt.textColor = 0xff0000;
        }
        succTxt.size = 24;
        this.addChild(succTxt);
        succTxt.x = this.stage.stageWidth - 150;
        succTxt.y = 350;
        var tw = egret.Tween.get(succTxt);
        tw.to({ 'y': 250 }, 500);
        tw.call(function removeComp() {
            succTxt.parent.removeChild(succTxt);
        }, this);
    };
    p.onGameOverHandler = function () {
        this.gameResultView = new GameResultView();
        this.addChild(this.gameResultView);
        this.gameResultView.onSetDes("恭喜你数钱数到" + this.selfMoney.toFixed(2) + "元，祝愿你2015数钱数到手抽筋!快来邀请好友或继续挑战吧!");
        this.gameResultView.addEventListener(GameResultEvent.RPLAYGAMEEVENT, this.onRplayGameHandler, this);
        //本地数据存储
        var score = egret.localStorage.getItem("bestScore");
        if (score == "") {
            egret.localStorage.setItem("bestScore", this.selfMoney.toFixed(2));
            this.gameResultView.onSetDes("[当前分数]：" + this.selfMoney.toFixed(2) + "元");
        }
        else {
            console.log(this.selfMoney.toFixed(2) + "---" + Number(score).toFixed(2));
            if (Number(this.selfMoney.toFixed(2)) > Number(Number(score).toFixed(2))) {
                egret.localStorage.setItem("bestScore", this.selfMoney.toFixed(2));
                this.gameResultView.onSetDes("[当前分数]：" + this.selfMoney.toFixed(2) + "\n[最高分数]：" + this.selfMoney.toFixed(2) + "元");
            }
            else {
                this.gameResultView.onSetDes("[当前分数]：" + this.selfMoney.toFixed(2) + "\n[最高分数]：" + Number(score).toFixed(2) + "元");
            }
        }
    };
    p.onRplayGameHandler = function (evt) {
        if (this.gameResultView && this.contains(this.gameResultView)) {
            this.gameResultView.removeEventListener(GameResultEvent.RPLAYGAMEEVENT, this.onRplayGameHandler, this);
            this.removeChild(this.gameResultView);
            this.gameResultView = null;
        }
        this.curgame = this.gametimelong;
        this.selfMoney = 0;
        this.timer.reset();
        this.timer.start();
        this.topView.cashTxt.text(".00元");
        this.topView.timeTxt.text(this.onGetTimeFormat(this.curgame));
        this.createNewRoundView();
    };
    return GameView;
}(egret.Sprite));
egret.registerClass(GameView,'GameView');
//# sourceMappingURL=GameView.js.map