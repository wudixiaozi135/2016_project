/**
 * Created by xiaoding on 2016/4/29.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.column = 10;
        this.row = 10;
        this.index = 10;
        //已标记的为防止重复遍历
        this.flagShapes = [];
        //得到所有与点击相同的类型
        this.findShapes = [];
        //按存取的数组
        this.columnShapes = [];
        this.particlePool = [];
        this.animateCount = 0;
        this.doubleClick = 0;
        GameData.shapeW = Math.floor(egret.MainContext.instance.stage.stageWidth / 10);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.startGame();
    };
    p.startGame = function () {
        if (this.particlePool.length > 0) {
            this.particlePool.forEach(function (element, index, arr) {
                if (this.parent.contains(element)) {
                    this.parent.removeChild(element);
                }
                element.stop(true);
                element = null;
            }, this);
            this.particlePool.length = 0;
        }
        this.colorShapeVec = [[], [], [], [], [], [], [], [], [], []];
        this.index = 10;
        this.addRowShape(this.index);
    };
    p.addRowShape = function (row) {
        row -= 1;
        for (var i = 0; i < 10; i++) {
            var shape = new ColorShape(Math.floor(Math.random() * 4) + 1);
            shape.setData(row, i);
            shape.data = 1;
            this.colorShapeVec[row][i] = shape;
            this.addChild(shape);
            shape.x = i * shape.width;
            shape.alpha = 0;
            TweenMax.to(shape, .2, {
                y: row * shape.height,
                alpha: 1,
                onComplete: this.onTweenComplete.bind(this)
            });
        }
        if (this.index > 1) {
            TweenMax.delayedCall(row * 0.02 + .1, function () {
                this.index--;
                this.addRowShape(this.index);
            }.bind(this));
        }
    };
    p.onTweenComplete = function () {
        this.animateCount++;
        if (this.animateCount >= 100) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClick, this);
            this.animateCount = 0;
        }
    };
    p.onTouchClick = function (ev) {
        var column = Math.floor((ev.stageX - this.x) / GameData.shapeW);
        var row = Math.floor((ev.stageY - this.y) / GameData.shapeH);
        var target = ev.target;
        if (this.selectTarget) {
            this.selectTarget.state = 0;
            this.selectTarget = null;
        }
        this.selectTarget = target;
        if (target.state != 1) {
            target.state = 1;
        }
        var priorityBol = this.priorityCheck(row, column);
        if (!priorityBol) {
            //消除状态
            this.resetState();
            return;
        }
        this.handlerClick(row, column, target);
    };
    /*
     * 重置状态
     * */
    p.resetState = function () {
        if (this.findShapes.length > 0) {
            this.findShapes.forEach(function (element, index, vector) {
                element.state = 0;
                this.colorShapeVec[element.row][element.column] = element;
            }, this);
            if (this.findShapes.length > 0) {
                this.findShapes.length = 0;
            }
            if (this.flagShapes.length > 0) {
                this.flagShapes.length = 0;
            }
            this.columnShapes.length = 0;
            this.doubleClick = 0;
        }
    };
    p.handlerClick = function (row, column, target) {
        if (this.findShapes.length > 0) {
            var findIndex = this.findShapes.lastIndexOf(target);
            if (findIndex == -1) {
                this.resetState();
                this.traverseShape(row, column);
                return;
            }
        }
        else {
            this.traverseShape(row, column);
            if (this.findShapes.length <= 0) {
                this.flagShapes.length = 0;
                this.columnShapes.length = 0;
                this.doubleClick = 0;
                return;
            }
        }
        this.doubleClick++;
        if (this.doubleClick >= 2) {
            this.doubleClick = 0;
            if (this.findShapes.length > 0) {
                this.findShapes.forEach(function (element, index, vector) {
                    this.removeChild(element);
                    this.colorShapeVec[element.row][element.column] = null;
                    element = null;
                }, this);
                this.freeFallDown();
                this.resetGame();
            }
        }
    };
    /*
     * 重新检测是否游戏结束
     * */
    p.resetGame = function () {
        var shape;
        var i = 0;
        var j = 0;
        if (this.colorShapeVec.length > 0) {
            var gameOver = true;
            for (i = 0; i < this.row; i++) {
                for (j = 0; j < this.column; j++) {
                    shape = this.colorShapeVec[i][j];
                    if (shape) {
                        this.traverseShape(shape.row, shape.column);
                        if (this.findShapes.length > 0) {
                            this.findShapes.forEach(function (element, index, vector) {
                                element.state = 0;
                                this.colorShapeVec[element.row][element.column] = element;
                            }, this);
                            if (this.findShapes.length > 0) {
                                this.findShapes.length = 0;
                            }
                            if (this.flagShapes.length > 0) {
                                this.flagShapes.length = 0;
                            }
                            this.columnShapes.length = 0;
                            gameOver = false;
                            break;
                        }
                    }
                }
                if (gameOver == false) {
                    break;
                }
            }
            if (gameOver) {
                //重新开始
                var allChildren = [];
                for (i = 0; i < this.row; i++) {
                    for (j = 0; j < this.column; j++) {
                        shape = this.colorShapeVec[i][j];
                        if (shape) {
                            allChildren.push(shape);
                        }
                    }
                }
                if (allChildren.length > 0) {
                    var texture = RES.getRes("effectStar");
                    var config = RES.getRes("effectStar_json");
                    allChildren.forEach(function (element, index, arr) {
                        if (this.contains(element)) {
                            this.removeChild(element);
                        }
                    }, this);
                }
                var system = new particle.GravityParticleSystem(texture, config);
                this.parent.addChild(system);
                system.maxParticles = 100;
                system.start();
                system.emitterX = this.parent.width * .5;
                system.emitterY = this.parent.height * .5;
                this.particlePool.push(system);
                if (this.findShapes.length > 0) {
                    this.findShapes.length = 0;
                }
                if (this.flagShapes.length > 0) {
                    this.flagShapes.length = 0;
                }
                this.columnShapes.length = 0;
                TweenMax.delayedCall(3, this.startGame.bind(this));
            }
        }
    };
    /*
     * 自由下落
     * */
    p.freeFallDown = function () {
        if (this.columnShapes && this.columnShapes.length > 0) {
            var columnArr_1 = [];
            this.columnShapes.forEach(function (arr, index, vec) {
                columnArr_1.push(arr[0].column);
            });
            if (columnArr_1.length > 0) {
                var tempColumn = 0;
                var shape = void 0;
                var findShape = void 0;
                var checkColumnNull = void 0;
                var copyArr = columnArr_1.concat();
                var i = 0;
                while (columnArr_1.length > 0) {
                    tempColumn = columnArr_1.pop();
                    for (i = this.row - 1; i >= 0; i--) {
                        shape = this.colorShapeVec[i][tempColumn];
                        if (!shape) {
                            findShape = this.findShape(i, tempColumn);
                            if (findShape) {
                                i = this.row;
                            }
                        }
                    }
                }
                var recordColumn = 0;
                var totalNullColumn = 0;
                while (copyArr.length > 0) {
                    tempColumn = copyArr.pop();
                    checkColumnNull = this.columnArrIsNull(tempColumn);
                    if (checkColumnNull) {
                        totalNullColumn++;
                        recordColumn = tempColumn;
                    }
                }
                if (totalNullColumn > 0) {
                    var leftSize = this.countSize(tempColumn, 1);
                    var rightSize = this.countSize(tempColumn, 2);
                    if (leftSize <= rightSize) {
                        this.leftToRight(recordColumn, totalNullColumn);
                    }
                    else {
                        this.rightToLeft(recordColumn, totalNullColumn);
                    }
                }
            }
            this.columnShapes.length = 0;
        }
        if (this.findShapes.length > 0) {
            this.findShapes.length = 0;
        }
        if (this.flagShapes.length > 0) {
            this.flagShapes.length = 0;
        }
    };
    /*
     * 计算数组大小
     * type 1 计算左边数组
     * type 2 计算右边数组
     * */
    p.countSize = function (column, type) {
        if (type === void 0) { type = 1; }
        var size = 0;
        var i = 0;
        var j = 0;
        if (type == 1) {
            for (i = column; i >= 0; i--) {
                for (j = this.row - 1; j >= 0; j--) {
                    if (this.colorShapeVec[j][i]) {
                        size++;
                    }
                }
            }
        }
        else {
            for (i = this.column - 1; i >= column; i--) {
                for (j = this.row - 1; j >= 0; j--) {
                    if (this.colorShapeVec[j][i]) {
                        size++;
                    }
                }
            }
        }
        return size;
    };
    /*
     * column 划分左右的中界线
     * step 左移的步长
     * */
    p.leftToRight = function (column, step) {
        var colorShape;
        for (var i = column; i >= 0; i--) {
            for (var j = this.row - 1; j >= 0; j--) {
                colorShape = this.colorShapeVec[j][i];
                if (colorShape) {
                    this.colorShapeVec[colorShape.row][colorShape.column] = null;
                    colorShape.column += step;
                    TweenMax.to(colorShape, .3, { x: GameData.shapeW * colorShape.column });
                    this.colorShapeVec[colorShape.row][colorShape.column] = colorShape;
                }
            }
        }
    };
    p.rightToLeft = function (column, step) {
        var colorShape;
        for (var i = column; i <= this.column - 1; i++) {
            for (var j = this.row - 1; j >= 0; j--) {
                colorShape = this.colorShapeVec[j][i];
                if (colorShape) {
                    this.colorShapeVec[colorShape.row][colorShape.column] = null;
                    colorShape.column -= step;
                    TweenMax.to(colorShape, .3, { x: GameData.shapeW * colorShape.column });
                    this.colorShapeVec[colorShape.row][colorShape.column] = colorShape;
                }
            }
        }
    };
    /*
     * 判断某一列数据全部为空
     * */
    p.columnArrIsNull = function (column) {
        var bol = true;
        for (var i = this.row - 1; i >= 0; i--) {
            if (this.colorShapeVec[i][column]) {
                bol = false;
                break;
            }
        }
        return bol;
    };
    p.findShape = function (row, column) {
        var shape = null;
        for (var i = row; i >= 0; i--) {
            shape = this.colorShapeVec[i][column];
            if (shape && shape.data == 1) {
                this.colorShapeVec[shape.row][column] = null;
                shape.row++;
                TweenMax.to(shape, .3, { y: shape.row * GameData.shapeH });
                this.colorShapeVec[shape.row][column] = shape;
                break;
            }
        }
        return shape;
    };
    /*
     * 优先检查是否有相同的类型
     * true 至少存在一个
     * false 没有
     * */
    p.priorityCheck = function (row, column) {
        var target = this.colorShapeVec[row][column];
        if (!target || target.data == 0) {
            return false;
        }
        var temp;
        //左
        if (target.column - 1 >= 0) {
            temp = this.colorShapeVec[row][target.column - 1];
            if (temp && temp.type == target.type) {
                return true;
            }
        }
        //右
        if (target.column + 1 <= 9) {
            temp = this.colorShapeVec[row][target.column + 1];
            if (temp && temp.type == target.type) {
                return true;
            }
        }
        //上
        if (target.row - 1 >= 0) {
            temp = this.colorShapeVec[target.row - 1][column];
            if (temp && temp.type == target.type) {
                return true;
            }
        }
        //下
        if (target.row + 1 <= 9) {
            temp = this.colorShapeVec[target.row + 1][column];
            if (temp && temp.type == target.type) {
                return true;
            }
        }
        return false;
    };
    p.traverseShape = function (row, column) {
        var target = this.colorShapeVec[row][column];
        if (!target || target.data == 0) {
            return;
        }
        this.addShape(this.flagShapes, target);
        var temp;
        //左
        if (target.column - 1 >= 0) {
            temp = this.colorShapeVec[row][target.column - 1];
            if (temp && temp.type == target.type) {
                temp.state = target.state;
                this.addShape(this.findShapes, temp);
            }
        }
        //右
        if (target.column + 1 <= 9) {
            temp = this.colorShapeVec[row][target.column + 1];
            if (temp && temp.type == target.type) {
                temp.state = target.state;
                this.addShape(this.findShapes, temp);
            }
        }
        //上
        if (target.row - 1 >= 0) {
            temp = this.colorShapeVec[target.row - 1][column];
            if (temp && temp.type == target.type) {
                temp.state = target.state;
                this.addShape(this.findShapes, temp);
            }
        }
        //下
        if (target.row + 1 <= 9) {
            temp = this.colorShapeVec[target.row + 1][column];
            if (temp && temp.type == target.type) {
                temp.state = target.state;
                this.addShape(this.findShapes, temp);
            }
        }
        if (this.flagShapes.length > 0 && this.findShapes.length > 0) {
            if (this.flagShapes.length == this.findShapes.length && this.equalArr(this.flagShapes, this.findShapes)) {
                //下次遍历只在这些格子范围
                var shape = void 0;
                for (var t = 0; t < this.flagShapes.length; t++) {
                    shape = this.flagShapes[t];
                    if (!this.columnShapes[shape.column]) {
                        this.columnShapes[shape.column] = [];
                    }
                    this.columnShapes[shape.column].push(shape.shapeData);
                }
                return;
            }
        }
        if (this.findShapes.length > 0) {
            var that_1 = this;
            this.findShapes.forEach(function (element, index, vector) {
                if (that_1.flagShapes.indexOf(element) == -1) {
                    that_1.traverseShape(element.row, element.column);
                }
            });
        }
    };
    p.equalArr = function (arr1, arr2) {
        var bol = true;
        for (var i = 0; i < arr1.length; i++) {
            if (arr2.lastIndexOf(arr1[i]) == -1) {
                bol = false;
                break;
            }
        }
        return bol;
    };
    p.addShape = function (arr, shape) {
        var index = arr.lastIndexOf(shape);
        if (index == -1) {
            arr.push(shape);
        }
    };
    p.containShape = function (arr, shape) {
        return arr.lastIndexOf(shape) != -1;
    };
    return GameScene;
}(eui.Group));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map