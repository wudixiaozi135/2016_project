/**
 * Created by longxing on 2015/4/9.
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this._chuiFlag = false;
        this._rowIndex = 0;
        this._selectStarArr = new Array();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }
    var d = __define,c=GameView,p=c.prototype;
    p.initView = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
        this._container = new egret.Sprite();
        this.addChild(this._container);
        this._topView = new GameTopView();
        this.addChild(this._topView);
        this._topView.addEventListener(GameFunEvent.GAME_EVENT_USETOOL_CHUI, this.onUseToolChui, this);
        this._topView.addEventListener(GameFunEvent.GAME_EVENT_RESET, this.onResetGameHandler, this);
        this._topView.addEventListener(GameFunEvent.GAME_EVENT_PAUSE, this.onPauseGameHandler, this);
        //egret.localStorage.clear();
        var lev = egret.localStorage.getItem('level');
        if (lev == null) {
            lev = '1';
            egret.localStorage.setItem('level', lev);
        }
        this._topView.setCurLevel(lev);
        this._curScore = Number(egret.localStorage.getItem("score"));
        if (this._curScore == 0) {
            this._curScore = 0;
            egret.localStorage.setItem('score', this._curScore.toString());
        }
        this._topView.setCurScore(this._curScore.toString());
        this._targetScore = this.onGetTargetScoreByLev(Number(lev));
        this._topView.setTargetScore(this._targetScore.toString());
        this._topView.setToolStar(egret.localStorage.getItem("toolStar"));
        this.initStarLayout();
    };
    p.onClearGame = function () {
        var lev = egret.localStorage.getItem('level');
        if (lev == null) {
            lev = '1';
            egret.localStorage.setItem('level', lev);
        }
        this._topView.setCurLevel(lev);
        this._curScore = Number(egret.localStorage.getItem("score"));
        if (this._curScore == 0) {
            this._curScore = 0;
            egret.localStorage.setItem('score', this._curScore.toString());
        }
        this._topView.setCurScore(this._curScore.toString());
        this._targetScore = this.onGetTargetScoreByLev(Number(lev));
        this._topView.setTargetScore(this._targetScore.toString());
        this._topView.setToolStar(egret.localStorage.getItem("toolStar"));
        this.initStarLayout();
    };
    p.onGetTargetScoreByLev = function (lev) {
        var targetScore = 0;
        if (lev < 5) {
            targetScore = (lev - 1) * 2000 + 1000;
        }
        else if (lev >= 5 && lev < 10) {
            targetScore = (lev - 5) * 3000 + 1000 + 8000;
        }
        else if (lev >= 10 && lev < 20) {
            targetScore = (lev - 10) * 4000 + 1000 + 8000 + 12000;
        }
        else if (lev >= 20 && lev < 40) {
            targetScore = (lev - 20) * 5000 + 1000 + 8000 + 40000 + 12000;
        }
        else {
            targetScore = (lev - 40) * 6000 + 1000 + 8000 + 12000 + 40000 + 50000;
        }
        return targetScore;
    };
    p.onUseToolChui = function (evt) {
        this._chuiFlag = true;
    };
    p.onPauseGameHandler = function (evt) {
        var self = this;
        if (this._pauseView == null) {
            this._pauseView = new GamePauseView();
            this._pauseView.addEventListener(GameFunEvent.GAME_EVENT_MAINMENU, function () {
                self.removeChild(self._pauseView);
                this.dispatchEvent(new GameFunEvent(GameFunEvent.GAME_EVENT_MAINMENU));
            }, this);
        }
        this.addChild(this._pauseView);
    };
    p.onResetGameHandler = function (evt) {
        this._curScore = Number(egret.localStorage.getItem("score"));
        this._topView.setCurScore(this._curScore.toString());
        this.initStarLayout();
    };
    p.initStarLayout = function () {
        this._rowIndex = 0;
        this._starArr = new Array([], [], [], [], [], [], [], [], [], []);
        this.onRemoveAllStar();
        this.playTextEffectPreGame();
    };
    p.playTextEffectPreGame = function () {
        if (this._kaTF == null) {
            this._kaTF = new egret.TextField();
        }
        var lev = Number(egret.localStorage.getItem('level'));
        this._kaTF.text = "关卡:" + lev;
        this._kaTF.size = 30;
        this._kaTF.textAlign = 'center';
        this._kaTF.bold = true;
        this._kaTF.anchorOffsetX = this._kaTF.width * .5;
        this._kaTF.anchorOffsetY = this._kaTF.height * .5;
        this.addChild(this._kaTF);
        this._kaTF.x = this.stage.stageWidth + this._kaTF.width;
        this._kaTF.y = this.stage.stageHeight / 2 - 30;
        if (this._scoreTF == null) {
            this._scoreTF = new egret.TextField();
        }
        this._scoreTF.text = "目标分数:" + this._targetScore;
        this._scoreTF.size = 24;
        this._scoreTF.bold = true;
        this._scoreTF.textAlign = "center";
        this._scoreTF.anchorOffsetX = this._scoreTF.width * .5;
        this._scoreTF.anchorOffsetY = this._scoreTF.height * .5;
        this.addChild(this._scoreTF);
        this._scoreTF.x = this.stage.stageWidth + this._scoreTF.width;
        this._scoreTF.y = this.stage.stageHeight / 2 + 30;
        egret.Tween.get(this._kaTF).to({ x: this.stage.stageWidth / 2 }, 300).wait(1000).to({ x: -this._kaTF.width }, 300);
        egret.Tween.get(this._scoreTF).wait(500).to({ x: this.stage.stageWidth / 2 }, 300).wait(1000).to({ x: -this._scoreTF.width }, 300).call(this.initStarByRow, this);
    };
    p.onRemoveAllStar = function () {
        while (this._container.numChildren > 0) {
            this._container.removeChildAt(0);
        }
    };
    p.initStarByRow = function () {
        for (var j = 0; j < 10; j++) {
            var starRender = new GameStarRender();
            starRender.onSetStarType(Math.round(Math.random() * 4));
            starRender.posX = j;
            starRender.posY = this._rowIndex;
            this._container.addChild(starRender);
            this._starArr[j].push(starRender);
            starRender.setStarSize(this.stage.stageWidth / 10);
            starRender.x = j * starRender.width;
            starRender.y = 300;
            egret.Tween.get(starRender).to({ y: this.stage.stageHeight - (this._rowIndex + 1) * starRender.height }, 500);
        }
        this._rowIndex++;
        if (this._rowIndex >= 10) {
            this._container.touchEnabled = true;
            this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapStar, this);
        }
        else {
            egret.setTimeout(this.initStarByRow, this, 100);
        }
    };
    p.onTouchTapStar = function (evt) {
        var starCol = Math.floor(evt.localX / (this.stage.stageWidth / 10));
        var starRow = Math.floor((this.stage.stageHeight - evt.localY) / (this.stage.stageWidth / 10));
        if (starCol < 10 && starRow < 10) {
            if (this._chuiFlag) {
                this._chuiFlag = false;
                //减去星星
                var toolnum = Number(egret.localStorage.getItem("toolStar"));
                egret.localStorage.setItem("toolStar", (toolnum - 5).toString());
                this._topView.setToolStar((toolnum - 5).toString());
                if (this._selectStarArr.length > 0) {
                    //设置选中数组中的星星为未选中状态，并从选中数组中移除
                    this.setStarUnselectAndRemove();
                }
                //移除该星星
                this.removeStarByPos(starCol, starRow);
                //空出来的区域用上方的星星填充
                this.setStarVerticalLayout();
                //横向排布，把有空的列移除
                this.setStarHorizontalLayout();
                //判断游戏是否结束
                if (!this.checkRoundHaveSameAsType()) {
                    this.saveMaxScore();
                    if (this._curScore >= this._targetScore) {
                        this.onRestartNextRoundGame();
                    }
                    else {
                        //闯关失败
                        console.log("闯关失败...");
                    }
                }
            }
            else {
                if (this._selectStarArr.length > 0) {
                    if (this.checkStarInSelectArr(starCol, starRow)) {
                        //计算得分
                        this.checkStarToAddScore();
                        //把选中的星星移除
                        this.removeSelectStar();
                        //空出来的区域用上方的星星填充
                        this.setStarVerticalLayout();
                        //横向排布，把有空的列移除
                        this.setStarHorizontalLayout();
                        //判断游戏是否结束
                        if (!this.checkRoundHaveSameAsType()) {
                            this.saveMaxScore();
                            if (this._curScore >= this._targetScore) {
                                this.onRestartNextRoundGame();
                            }
                            else {
                                //闯关失败
                                console.log("闯关失败...");
                            }
                        }
                    }
                    else {
                        //设置选中数组中的星星为未选中状态，并从选中数组中移除
                        this.setStarUnselectAndRemove();
                        this.addStarIntoListByPos(starCol, starRow);
                    }
                }
                else {
                    this.addStarIntoListByPos(starCol, starRow);
                }
            }
        }
    };
    p.saveMaxScore = function () {
        var maxScore = Number(egret.localStorage.getItem("maxscore"));
        if (maxScore == 0 || this._curScore > maxScore) {
            egret.localStorage.setItem("maxscore", this._curScore.toString());
        }
    };
    /**
     * 开始下一关卡的游戏
     */
    p.onRestartNextRoundGame = function () {
        var lev = Number(egret.localStorage.getItem('level'));
        console.log(lev + 'pre');
        lev++;
        console.log(lev + 'after');
        egret.localStorage.setItem('level', lev.toString());
        this._topView.setCurLevel(lev.toString());
        this._targetScore = this.onGetTargetScoreByLev(Number(lev));
        this._topView.setTargetScore(this._targetScore.toString());
        egret.localStorage.setItem('score', this._curScore.toString());
        this.initStarLayout();
    };
    /**
     * 计算本次消去星星获得的分数
     */
    p.checkStarToAddScore = function () {
        var starNum = this._selectStarArr.length;
        var singleStarScore = (starNum - 1) * 5;
        var totalScore = singleStarScore * starNum;
        this._curScore += totalScore;
        this._topView.setCurScore(this._curScore.toString());
    };
    /***
     * 检查星星中是否存在相邻位置是同一类型的星星，如果不存在则本局游戏结束
     */
    p.checkRoundHaveSameAsType = function () {
        for (var i = 0; i < this._starArr.length; i++) {
            for (var j = 0; j < this._starArr[i].length; j++) {
                var star = this._starArr[i][j];
                //检测左边
                var leftX = star.posX - 1;
                if (leftX >= 0 && leftX < 10 && leftX < this._starArr.length) {
                    if (this._starArr[leftX][j] && this._starArr[leftX][j]._starType == star._starType)
                        return true;
                }
                //检测右边
                var rightX = star.posX + 1;
                if (rightX >= 0 && rightX < 10 && rightX < this._starArr.length) {
                    if (this._starArr[rightX][j] && this._starArr[rightX][j]._starType == star._starType)
                        return true;
                }
                //检测上边
                var topY = star.posY + 1;
                if (topY >= 0 && topY < 10 && topY < this._starArr[i].length) {
                    if (this._starArr[i][topY] && this._starArr[i][topY]._starType == star._starType)
                        return true;
                }
                //检测下边
                var bottomY = star.posY - 1;
                if (bottomY >= 0 && bottomY < 10 && bottomY < this._starArr[i].length) {
                    if (this._starArr[i][bottomY] && this._starArr[i][bottomY]._starType == star._starType)
                        return true;
                }
            }
        }
        return false;
    };
    /**
     * 设置星星的横向排布，有空的列移除
     */
    p.setStarHorizontalLayout = function () {
        for (var i = 0; i < this._starArr.length; i++) {
            if (this._starArr[i].length == 0) {
                this._starArr.splice(i, 1);
                i = 0;
            }
        }
        for (var j = 0; j < this._starArr.length; j++) {
            if (this._starArr[j].length > 0) {
                for (var k = 0; k < this._starArr[j].length; k++) {
                    if (this._starArr[j][k].posX != j) {
                        this._starArr[j][k].posX = j;
                        egret.Tween.get(this._starArr[j][k]).to({ x: j * this._starArr[j][k].width }, 200);
                    }
                }
            }
            else {
                console.log("Error....");
            }
        }
    };
    /**
     * 设置星星的垂直排列
     */
    p.setStarVerticalLayout = function () {
        for (var i = 0; i < this._starArr.length; i++) {
            for (var j = 0; j < this._starArr[i].length; j++) {
                if (this._starArr[i][j].posY != j) {
                    this._starArr[i][j].posY = j;
                    egret.Tween.get(this._starArr[i][j]).to({ y: this.stage.stageHeight - (j + 1) * this._starArr[i][j].height }, 200);
                }
            }
        }
    };
    /**
     * 根据位置移除指定的星星
     * @param posX
     * @param posY
     */
    p.removeStarByPos = function (posX, posY) {
        for (var i = 0; i < this._starArr[posX].length; i++) {
            if (this._starArr[posX][i].posX == posX && this._starArr[posX][i].posY == posY) {
                var star = this._starArr[posX][i];
                if (star && this._container.contains(star)) {
                    this._container.removeChild(star);
                    this.removeStarFromStarListByPos(star.posX, star.posY);
                    star = null;
                }
                break;
            }
        }
    };
    /**
     * 移除选中的星星
     */
    p.removeSelectStar = function () {
        while (this._selectStarArr.length > 0) {
            var star = this._selectStarArr[this._selectStarArr.length - 1];
            this._selectStarArr.pop();
            if (star && this._container.contains(star)) {
                this._container.removeChild(star);
                this.removeStarFromStarListByPos(star.posX, star.posY);
                star = null;
            }
        }
    };
    /**
     * 把星星从星星集合中移除
     * @param posX
     * @param posY
     */
    p.removeStarFromStarListByPos = function (posX, posY) {
        for (var i = 0; i < this._starArr[posX].length; i++) {
            if (this._starArr[posX][i].posX == posX && this._starArr[posX][i].posY == posY) {
                this._starArr[posX].splice(i, 1);
                break;
            }
        }
    };
    p.addStarIntoListByPos = function (starCol, starRow) {
        this._tempSelectStarArr = new Array();
        for (var i = 0; i < this._starArr[starCol].length; i++) {
            if (this._starArr[starCol][i].posX == starCol && this._starArr[starCol][i].posY == starRow) {
                this._tempSelectStarArr.push(this._starArr[starCol][i]);
                break;
            }
        }
        this.checkRoundStarIsType();
    };
    /**
     * 检测周围星星的类型是否存在一致的
     */
    p.checkRoundStarIsType = function () {
        var tempArr = new Array();
        for (var i = 0; i < this._tempSelectStarArr.length; i++) {
            var star = this._tempSelectStarArr[i];
            this._selectStarArr.push(star);
            //查找四个方向
            var posX = star.posX;
            var posY = star.posY;
            //左侧
            var tempX = posX - 1;
            if (tempX >= 0 && tempX < 10) {
                for (var j = 0; j < this._starArr[tempX].length; j++) {
                    if (this._starArr[tempX][j].posX == tempX && this._starArr[tempX][j].posY == posY && this._starArr[tempX][j]._starType == star._starType && !this.checkStarInSelectArr(tempX, posY)) {
                        tempArr.push(this._starArr[tempX][j]);
                        break;
                    }
                }
            }
            //右侧
            var rightX = posX + 1;
            if (rightX >= 0 && rightX < 10 && rightX < this._starArr.length) {
                for (var j = 0; j < this._starArr[rightX].length; j++) {
                    if (this._starArr[rightX][j].posX == rightX && this._starArr[rightX][j].posY == posY && this._starArr[rightX][j]._starType == star._starType && !this.checkStarInSelectArr(rightX, posY)) {
                        tempArr.push(this._starArr[rightX][j]);
                        break;
                    }
                }
            }
            //上侧
            var topY = posY + 1;
            if (topY >= 0 && topY < 10 && topY < this._starArr[posX].length) {
                for (var j = 0; j < this._starArr[posX].length; j++) {
                    if (this._starArr[posX][j].posX == posX && this._starArr[posX][j].posY == topY && this._starArr[posX][j]._starType == star._starType && !this.checkStarInSelectArr(posX, topY)) {
                        tempArr.push(this._starArr[posX][j]);
                        break;
                    }
                }
            }
            //下侧
            var bottomY = posY - 1;
            if (bottomY >= 0 && bottomY < 10) {
                for (var j = 0; j < this._starArr[posX].length; j++) {
                    if (this._starArr[posX][j].posX == posX && this._starArr[posX][j].posY == bottomY && this._starArr[posX][j]._starType == star._starType && !this.checkStarInSelectArr(posX, bottomY)) {
                        tempArr.push(this._starArr[posX][j]);
                        break;
                    }
                }
            }
        }
        if (tempArr.length > 0) {
            this._tempSelectStarArr = tempArr;
            this.checkRoundStarIsType();
        }
        else {
            if (this._selectStarArr.length > 1) {
                //设置选中状态
                for (var s = 0; s < this._selectStarArr.length; s++) {
                    this._selectStarArr[s].setStarSelected(true);
                }
            }
            else {
                //一个或零个同类型的星星不做处理
                this._selectStarArr.splice(0, this._selectStarArr.length);
            }
        }
    };
    /**
     * 设置选中数组中的星星为未选中状态并从选中数组中移除
     */
    p.setStarUnselectAndRemove = function () {
        for (var i = 0; i < this._selectStarArr.length; i++) {
            this._selectStarArr[i].setStarSelected(false);
        }
        this._selectStarArr = new Array();
    };
    /**
     * 检测当前位置的星星是否存在于选择数组中
     * @param starCol
     * @param starRow
     * @returns {boolean}
     */
    p.checkStarInSelectArr = function (starCol, starRow) {
        for (var i = 0; i < this._selectStarArr.length; i++) {
            if (this._selectStarArr[i].posX == starCol && this._selectStarArr[i].posY == starRow) {
                //进行消除
                return true;
            }
        }
        return false;
    };
    return GameView;
}(egret.Sprite));
egret.registerClass(GameView,'GameView');
