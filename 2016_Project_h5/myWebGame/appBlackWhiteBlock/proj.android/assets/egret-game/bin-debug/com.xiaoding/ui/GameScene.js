/**
 * Created by Administrator on 2016/3/30.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.rowAndColumn = 4;
        this._score = 0;
        /*
         * 过一个加5分
         * */
        this.radix = 5;
        this.width = egret.MainContext.instance.stage.stageWidth;
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.gridW = this.width / this.rowAndColumn;
        this.gridH = this.height / this.rowAndColumn;
        this.moveGrids = [];
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.drawGrids = function (row, column) {
        this.map = this.map || [[], [], [], [], []];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < column; j++) {
                this.map[i][j] = 0;
                this.gridLayer.graphics.drawRect(i * this.gridW, j * this.gridH, this.gridW, this.gridH);
            }
        }
        this.gridLayer.graphics.endFill();
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.startTxt = new eui.Label();
        this.startTxt.text = "开始";
        this.startTxt.textColor = 0xffffff;
        this.startTxt.size = 45;
        this.startTxt.bold = true;
        this.startTxt.touchEnabled = false;
        this.gridLayer = new egret.Shape();
        this.addChild(this.gridLayer);
        this.gridLayer.graphics.clear();
        this.gridLayer.graphics.lineStyle(1, 0, 1);
        this.gridLayer.graphics.beginFill(0xffffff, .8);
        this.drawGrids(this.rowAndColumn, this.rowAndColumn);
        this.startGame();
        this.titleLabel = new eui.Label();
        this.addChild(this.titleLabel);
        this.titleLabel.textColor = 0xff0000;
        this.titleLabel.bold = true;
        this.titleLabel.horizontalCenter = 0;
        this.titleLabel.touchEnabled = false;
        this.titleLabel.top = 0;
        this.score = 0;
        this.addEvent();
        xd.GameDispatcher.addEventListener(GameEventConstant.RESTART_GAME, this.handlerRestart, this);
        xd.GameDispatcher.addEventListener(GameEventConstant.EXIT, this.onExitGame, this);
    };
    p.onExitGame = function (ev) {
        egret.ExternalInterface.call("exitGame", "true");
    };
    p.handlerRestart = function (ev) {
        if (this.gameOver) {
            if (this.contains(this.gameOver)) {
                this.removeChild(this.gameOver);
            }
        }
        if (this.redGrid) {
            if (this.contains(this.redGrid)) {
                this.removeChild(this.redGrid);
            }
        }
        this.score = 0;
        this.initGridsPosition();
        egret.callLater(function () {
            this.addEvent();
        }, this, 50);
    };
    p.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickHandler, this);
    };
    p.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickHandler, this);
    };
    p.onClickHandler = function (ev) {
        var row = Math.floor(ev.stageY / this.gridH);
        var column = Math.floor(ev.stageX / this.gridW);
        var simpleData = new SimpleData();
        simpleData.setData(row, column);
        var diamond = ev.target;
        if (diamond instanceof Diamond) {
            if (diamond.data.row == this.rowAndColumn - 2) {
                diamond.hide();
                this.score += this.radix;
            }
            else {
                if (this.gameOverHandler(simpleData)) {
                    return;
                }
            }
        }
        else {
            if (this.gameOverHandler(simpleData)) {
                return;
            }
        }
        this.stepNext();
    };
    p.gameOverHandler = function (simpleData) {
        var row, column;
        if (simpleData) {
            row = simpleData.row;
            column = simpleData.column;
        }
        if (this.map[row][column]) {
            return true;
        }
        this.removeEvent();
        this.redGrid = this.redGrid = new Diamond(this.gridW, this.gridH);
        this.redGrid.changeColor(ColorType.red);
        if (!this.contains(this.redGrid)) {
            this.addChild(this.redGrid);
            this.redGrid.x = column * this.gridW;
            this.redGrid.y = row * this.gridH;
        }
        this.gameOver = this.gameOver || new GameOver();
        if (!this.contains(this.gameOver)) {
            this.addChild(this.gameOver);
        }
        console.info("game over!!!");
        return true;
    };
    p.startGame = function () {
        this.grids = new Array();
        for (var i = 0; i < this.rowAndColumn - 1; i++) {
            var diamond = new Diamond(this.gridW, this.gridH);
            diamond.data.setData(0, 0);
            this.grids[i] = diamond;
            this.addChild(diamond);
        }
        this.initGridsPosition();
    };
    p.initGridsPosition = function () {
        var diamond;
        var random = 0;
        for (var i = 0, len = this.rowAndColumn - 1; i < len; i++) {
            if (this.grids && this.grids.length > 0) {
                diamond = this.grids[i];
                random = Math.floor(Math.random() * 4);
                diamond.x = random * this.gridW;
                diamond.y = i * this.gridH;
                diamond.data.setData(i, random);
                this.map[i][random] = 1;
                this.moveGrids[i] = diamond;
                if (i == len - 1) {
                    if (!this.contains(this.startTxt)) {
                        this.addChild(this.startTxt);
                        this.startTxt.x = diamond.x + (diamond.width - this.startTxt.width) * .5;
                        this.startTxt.y = diamond.y + (diamond.height - this.startTxt.height) * .5;
                    }
                }
            }
        }
    };
    /*
     * 进行下一步
     * */
    p.stepNext = function () {
        var diamond;
        var random;
        var len = this.rowAndColumn - 1;
        if (this.contains(this.startTxt)) {
            this.removeChild(this.startTxt);
        }
        for (var i = 0; i < len; i++) {
            diamond = this.moveGrids[i];
            diamond.data.row++;
            diamond.y += this.gridH;
            if (diamond.data.row == len) {
                random = Math.floor(Math.random() * len);
                diamond.x = random * this.gridW;
                diamond.y = 0;
                diamond.data.row = 0;
                diamond.data.column = random;
                diamond.show();
            }
        }
        this.updateMapData();
    };
    p.updateMapData = function () {
        var i, j;
        var len = this.rowAndColumn;
        for (i = 0; i < len; i++) {
            for (j = 0; j < 5; j++) {
                this.map[i][j] = 0;
            }
        }
        var diamond;
        var row, column;
        for (i = 0; i < this.moveGrids.length; i++) {
            diamond = this.moveGrids[i];
            row = diamond.data.row;
            column = diamond.data.column;
            this.map[row][column] = 1;
        }
    };
    d(p, "score"
        ,function () {
            return this._score;
        }
        ,function (value) {
            this._score = value;
            if (this.titleLabel) {
                this.titleLabel.text = "Score: " + value;
            }
            if (this._score > 0) {
                if (this._score % 1000 == 0) {
                    var colorType;
                    for (var i = 0; i < this.moveGrids.length; i++) {
                        colorType = ColorType.color000000 + Math.floor(this._score / 1000) % (ColorType.color0099ff - ColorType.color009900 + 2);
                        this.moveGrids[i].changeColor(colorType);
                    }
                }
            }
            else if (this._score == 0) {
                if (this.moveGrids) {
                    this.moveGrids.forEach(function (element, index, vector) {
                        element.reset();
                    }, this);
                }
            }
        }
    );
    return GameScene;
}(eui.Group));
egret.registerClass(GameScene,'GameScene');
