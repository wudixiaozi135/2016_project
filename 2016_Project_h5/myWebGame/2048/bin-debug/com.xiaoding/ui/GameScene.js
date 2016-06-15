var ExternalInterface = egret.ExternalInterface;
/**
 * Created by Administrator on 2016/4/5.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        //间隙
        this._gap = 5;
        this._score = 0;
        this._tweenTime = .3;
        this._randomArr = [];
        this._mapData = [[], [], [], []];
        this._lastP = new egret.Point();
        this._moveP = new egret.Point();
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.width = this.sceneStage.stageWidth;
        this.height = this.sceneStage.stageHeight;
        this._bg = new egret.Shape();
        this.addChild(this._bg);
        this._bg.y = GameData.gameHeadHeight;
        this._gameHead = new GameHead();
        this.addChild(this._gameHead);
        this._gameHead.top = 0;
        this._gameHead.left = 0;
        GameData.gridW = (this.sceneStage.stageWidth / GameData.gridColumn) << 0;
        GameData.gridH = (this.sceneStage.stageHeight - GameData.gameHeadHeight) / GameData.gridRow << 0;
        this.drawBG();
        this.initGame();
        xd.GameDispatcher.addEventListener(GameEventConstant.RESTART_GAME, this.onRestartGame, this);
        xd.GameDispatcher.addEventListener(GameEventConstant.EXIT, this.onExitGame, this);
        this.addEvent();
    };
    p.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        xd.GameDispatcher.addEventListener(GameEventConstant.GAME_OVER, this.onGameOver, this);
    };
    p.removeEvent = function () {
        xd.GameDispatcher.removeEventListener(GameEventConstant.GAME_OVER, this.onGameOver, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onExitGame = function (e) {
        ExternalInterface.call("GameExit", "true");
    };
    p.onGameOver = function (e) {
        this.removeEvent();
    };
    p.onRestartGame = function (e) {
        if (this._gameHead) {
            var maxScore = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
            if (isNaN(maxScore)) {
                maxScore = 0;
            }
            this._gameHead.setData({ score: 0, maxScore: maxScore });
        }
        if (this._gameOver) {
            if (this.contains(this._gameOver)) {
                this.removeChild(this._gameOver);
            }
        }
        var grid;
        var i, j;
        for (i = 0; i < GameData.gridRow; i++) {
            for (j = 0; j < GameData.gridColumn; j++) {
                grid = this._mapData[i][j];
                if (grid) {
                    if (this.contains(grid)) {
                        this.removeChild(grid);
                        grid = null;
                    }
                }
            }
        }
        this._mapData = [[], [], [], []];
        this.initGame();
        this.addEvent();
    };
    p.onTouchBegin = function (e) {
        this.sceneStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sceneStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._lastP.setTo(e.stageX, e.stageY);
    };
    p.onTouchMove = function (e) {
        this._moveP.setTo(e.stageX, e.stageY);
        var diffP = this._moveP.subtract(this._lastP);
        var i = 0;
        var j = 0;
        var k = 0;
        var currentGrid;
        var nextGrid;
        var pos = 0;
        if (Math.abs(diffP.x) >= Math.abs(diffP.y)) {
            if (diffP.x > 0) {
                trace("左右");
                if (!this.fillLeftToRight()) {
                    this.removeMoveEvent();
                    return;
                }
            }
            else {
                trace("右左");
                if (!this.fillRightToLeft()) {
                    this.removeMoveEvent();
                    return;
                }
            }
        }
        else {
            if (diffP.y > 0) {
                trace("上下");
                if (!this.fillUpToDown()) {
                    this.removeMoveEvent();
                    return;
                }
            }
            else {
                trace("下上");
                if (!this.fillDownToUp()) {
                    this.removeMoveEvent();
                    return;
                }
            }
        }
        this.onTouchEnd(null);
    };
    p.fillLeftToRight = function () {
        var isChange = false;
        var i = 0;
        var j = 0;
        var k = 0;
        var pos = 0;
        var currentGrid;
        var nextGrid;
        for (i = 0; i < GameData.gridRow; i++) {
            for (j = GameData.gridColumn - 1; j >= 0; j--) {
                currentGrid = this._mapData[i][j];
                if (currentGrid) {
                    for (k = j - 1; k >= 0; k--) {
                        nextGrid = this._mapData[i][k];
                        if (nextGrid) {
                            if (nextGrid.data != currentGrid.data) {
                                break;
                            }
                            else {
                                currentGrid.data += nextGrid.data;
                                this.updateScore(currentGrid.data);
                                this._mapData[i][k] = null;
                                this.setChildIndex(nextGrid, this.numChildren - 1);
                                TweenMax.to(nextGrid, this._tweenTime, {
                                    x: currentGrid.column * GameData.gridW + this._gap,
                                    onComplete: this.onTweenCompleteHandler,
                                    onCompleteParams: [this, nextGrid]
                                });
                                if (!isChange) {
                                    isChange = true;
                                }
                                break;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                else {
                    pos = j;
                    for (k = j - 1; k >= 0; k--) {
                        nextGrid = this._mapData[i][k];
                        if (nextGrid) {
                            if (!isChange) {
                                isChange = true;
                            }
                            nextGrid.column = pos;
                            this._mapData[i][pos] = nextGrid;
                            this._mapData[i][k] = null;
                            TweenMax.to(nextGrid, this._tweenTime, { x: GameData.gridW * pos + this._gap });
                            j++;
                            break;
                        }
                    }
                }
            }
        }
        return isChange;
    };
    p.fillRightToLeft = function () {
        var isChange = false;
        var i = 0;
        var j = 0;
        var k = 0;
        var pos = 0;
        var currentGrid;
        var nextGrid;
        for (i = 0; i < GameData.gridRow; i++) {
            for (j = 0; j < GameData.gridColumn; j++) {
                currentGrid = this._mapData[i][j];
                if (currentGrid) {
                    for (k = j + 1; k < GameData.gridColumn; k++) {
                        nextGrid = this._mapData[i][k];
                        if (nextGrid) {
                            if (nextGrid.data != currentGrid.data) {
                                break;
                            }
                            else {
                                currentGrid.data += nextGrid.data;
                                this.updateScore(currentGrid.data);
                                this._mapData[i][k] = null;
                                this.setChildIndex(nextGrid, this.numChildren - 1);
                                TweenMax.to(nextGrid, this._tweenTime, {
                                    x: currentGrid.column * GameData.gridW + this._gap,
                                    onComplete: this.onTweenCompleteHandler,
                                    onCompleteParams: [this, nextGrid]
                                });
                                if (!isChange) {
                                    isChange = true;
                                }
                                break;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                else {
                    pos = j;
                    for (k = j + 1; k < GameData.gridColumn; k++) {
                        nextGrid = this._mapData[i][k];
                        if (nextGrid) {
                            nextGrid.column = pos;
                            this._mapData[i][pos] = nextGrid;
                            this._mapData[i][k] = null;
                            TweenMax.to(nextGrid, this._tweenTime, { x: GameData.gridW * pos + this._gap });
                            j--;
                            if (!isChange) {
                                isChange = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return isChange;
    };
    p.fillUpToDown = function () {
        var isChange = false;
        var i = 0;
        var j = 0;
        var k = 0;
        var pos = 0;
        var currentGrid;
        var nextGrid;
        for (i = 0; i < GameData.gridColumn; i++) {
            for (j = GameData.gridRow - 1; j >= 0; j--) {
                currentGrid = this._mapData[j][i];
                if (currentGrid) {
                    for (k = j - 1; k >= 0; k--) {
                        nextGrid = this._mapData[k][i];
                        if (nextGrid) {
                            if (nextGrid.data != currentGrid.data) {
                                break;
                            }
                            else {
                                currentGrid.data += nextGrid.data;
                                this.updateScore(currentGrid.data);
                                this._mapData[k][i] = null;
                                this.setChildIndex(nextGrid, this.numChildren - 1);
                                TweenMax.to(nextGrid, this._tweenTime, {
                                    y: currentGrid.row * GameData.gridH + this._gap + GameData.gameHeadHeight,
                                    onComplete: this.onTweenCompleteHandler,
                                    onCompleteParams: [this, nextGrid]
                                });
                                if (!isChange) {
                                    isChange = true;
                                }
                                break;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                else {
                    pos = j;
                    for (k = j - 1; k >= 0; k--) {
                        nextGrid = this._mapData[k][i];
                        if (nextGrid) {
                            nextGrid.row = pos;
                            this._mapData[pos][i] = nextGrid;
                            this._mapData[k][i] = null;
                            TweenMax.to(nextGrid, this._tweenTime, { y: GameData.gridH * pos + this._gap + GameData.gameHeadHeight });
                            j++;
                            if (!isChange) {
                                isChange = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return isChange;
    };
    p.fillDownToUp = function () {
        var isChange = false;
        var i = 0;
        var j = 0;
        var k = 0;
        var pos = 0;
        var currentGrid;
        var nextGrid;
        for (i = 0; i < GameData.gridColumn; i++) {
            for (j = 0; j < GameData.gridRow; j++) {
                currentGrid = this._mapData[j][i];
                if (currentGrid) {
                    for (k = j + 1; k < GameData.gridRow; k++) {
                        nextGrid = this._mapData[k][i];
                        if (nextGrid) {
                            if (nextGrid.data != currentGrid.data) {
                                break;
                            }
                            else {
                                currentGrid.data += nextGrid.data;
                                this.updateScore(currentGrid.data);
                                this._mapData[k][i] = null;
                                this.setChildIndex(nextGrid, this.numChildren - 1);
                                TweenMax.to(nextGrid, this._tweenTime, {
                                    y: currentGrid.row * GameData.gridH + this._gap + GameData.gameHeadHeight,
                                    onComplete: this.onTweenCompleteHandler,
                                    onCompleteParams: [this, nextGrid]
                                });
                                if (!isChange) {
                                    isChange = true;
                                }
                                break;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                else {
                    pos = j;
                    for (k = j + 1; k < GameData.gridRow; k++) {
                        nextGrid = this._mapData[k][i];
                        if (nextGrid) {
                            nextGrid.row = pos;
                            this._mapData[pos][i] = nextGrid;
                            this._mapData[k][i] = null;
                            TweenMax.to(nextGrid, this._tweenTime, { y: GameData.gridH * pos + this._gap + GameData.gameHeadHeight });
                            j--;
                            if (!isChange) {
                                isChange = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return isChange;
    };
    p.onTweenCompleteHandler = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args[0].removeChild(args[1]);
    };
    p.removeMoveEvent = function () {
        this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        if (this.isGameOver()) {
            this.handlerGameOver();
        }
    };
    p.isGameOver = function () {
        if (this._randomArr) {
            this._randomArr.length = 0;
        }
        var grid;
        var i, j;
        for (i = 0; i < GameData.gridRow; i++) {
            for (j = 0; j < GameData.gridColumn; j++) {
                grid = this._mapData[i][j];
                if (!grid) {
                    this._randomArr.push({ row: i, column: j });
                }
            }
        }
        return this._randomArr.length == 0;
    };
    p.onTouchEnd = function (e) {
        this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.sceneStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        var gameOver = this.isGameOver();
        if (!gameOver) {
            var randomIndex = (Math.random() * this._randomArr.length) << 0;
            if (randomIndex > -1) {
                var data = this._randomArr[randomIndex];
                var grid = this.getRandomGrid();
                var addFunc = function () {
                    var res = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        res[_i - 0] = arguments[_i];
                    }
                    this.addChild(res[0]);
                    res[0].alpha = 0;
                    TweenMax.to(res[0], this._tweenTime, { alpha: 1 });
                };
                TweenMax.delayedCall(.2, addFunc, [grid], this);
                grid.row = data.row;
                grid.column = data.column;
                grid.x = data.column * GameData.gridW + this._gap;
                grid.y = data.row * GameData.gridH + this._gap + GameData.gameHeadHeight;
                this._mapData[data.row][data.column] = grid;
            }
        }
        else {
            this.handlerGameOver();
        }
    };
    /*
     * 游戏结束
     * */
    p.handlerGameOver = function () {
        if (!this._gameOver) {
            this._gameOver = new GameOver();
        }
        if (!this.contains(this._gameOver)) {
            this.addChild(this._gameOver);
        }
        var maxScore = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
        if (isNaN(maxScore)) {
            maxScore = 0;
        }
        if (this._score > maxScore) {
            egret.localStorage.setItem(GameData.maxScoreKey, this._score.toString());
            maxScore = this._score;
        }
        this._gameOver.setData({ score: this._score, maxScore: maxScore });
        xd.GameDispatcher.dispatchEvent(GameEventConstant.GAME_OVER);
    };
    p.drawBG = function () {
        if (this._bg) {
            this._bg.graphics.clear();
            this._bg.graphics.beginFill(0xf3f3fa);
            this._bg.graphics.lineStyle(1, 0x0);
            for (var i = 0; i < GameData.gridRow; i++) {
                for (var j = 0; j < GameData.gridColumn; j++) {
                    this._bg.graphics.drawRect(j * GameData.gridW, i * GameData.gridH, GameData.gridW, GameData.gridH);
                }
            }
            this._bg.graphics.endFill();
        }
    };
    p.initGame = function () {
        var row = this.getRandom(GameData.gridRow);
        var column = this.getRandom(GameData.gridColumn);
        var grid = this.getRandomGrid();
        this.addChild(grid);
        grid.row = row;
        grid.column = column;
        grid.x = column * GameData.gridW + this._gap;
        grid.y = row * GameData.gridH + this._gap + GameData.gameHeadHeight;
        this._mapData[row][column] = grid;
        var temp = this.getRandom(GameData.gridRow);
        if (temp != row) {
            row = temp;
        }
        else {
            while (true) {
                if ((temp = this.getRandom(GameData.gridRow)) != row) {
                    break;
                }
            }
            row = temp;
        }
        column = this.getRandom(GameData.gridColumn);
        grid = this.getRandomGrid();
        this.addChild(grid);
        grid.row = row;
        grid.column = column;
        grid.x = column * GameData.gridW + this._gap;
        grid.y = row * GameData.gridH + this._gap + GameData.gameHeadHeight;
        this._mapData[row][column] = grid;
    };
    p.getRandom = function (value) {
        return (Math.random() * value) << 0;
    };
    /*
     * 随机一个格子
     * */
    p.getRandomGrid = function () {
        var grid = new NumGrid();
        grid.data = Math.random() > .5 ? 2 : 4;
        return grid;
    };
    p.updateScore = function (data) {
        this._score += data;
        if (this._gameHead) {
            var maxScore = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
            if (isNaN(maxScore)) {
                maxScore = 0;
            }
            this._gameHead.setData({ score: this._score, maxScore: maxScore });
        }
    };
    return GameScene;
}(eui.Group));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map