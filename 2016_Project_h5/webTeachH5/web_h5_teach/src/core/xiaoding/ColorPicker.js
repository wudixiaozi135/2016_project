var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by xiaoding on 2016/2/15.
 */
var ColorPicker = (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        _super.call(this);
        this._gridSize = 11;
        this._rowNum = 12;
        this._columnNum = 18;
        this._canvasInitX = 5;
        this._canvasInitY = 30;
        this._colorIndex = 0;
        this._isClickSamePoint = true;
        this.initUI();
    }
    ColorPicker.prototype.initUI = function () {
        var colors = "0,13056,26112,39168,52224,65280,3342336,3355392,3368448,3381504,3394560,3407616,6684672,6697728,6710784,6723840,6736896,6749952,51,13107,26163,39219,52275,65331,3342387,3355443,3368499,3381555,3394611,3407667,6684723,6697779,6710835,6723891,6736947,6750003,102,13158,26214,39270,52326,65382,3342438,3355494,3368550,3381606,3394662,3407718,6684774,6697830,6710886,6723942,6736998,6750054,153,13209,26265,39321,52377,65433,3342489,3355545,3368601,3381657,3394713,3407769,6684825,6697881,6710937,6723993,6737049,6750105,204,13260,26316,39372,52428,65484,3342540,3355596,3368652,3381708,3394764,3407820,6684876,6697932,6710988,6724044,6737100,6750156,255,13311,26367,39423,52479,65535,3342591,3355647,3368703,3381759,3394815,3407871,6684927,6697983,6711039,6724095,6737151,6750207,10027008,10040064,10053120,10066176,10079232,10092288,13369344,13382400,13395456,13408512,13421568,13434624,16711680,16724736,16737792,16750848,16763904,16776960,10027059,10040115,10053171,10066227,10079283,10092339,13369395,13382451,13395507,13408563,13421619,13434675,16711731,16724787,16737843,16750899,16763955,16777011,10027110,10040166,10053222,10066278,10079334,10092390,13369446,13382502,13395558,13408614,13421670,13434726,16711782,16724838,16737894,16750950,16764006,16777062,10027161,10040217,10053273,10066329,10079385,10092441,13369497,13382553,13395609,13408665,13421721,13434777,16711833,16724889,16737945,16751001,16764057,16777113,10027212,10040268,10053324,10066380,10079436,10092492,13369548,13382604,13395660,13408716,13421772,13434828,16711884,16724940,16737996,16751052,16764108,16777164,10027263,10040319,10053375,10066431,10079487,10092543,13369599,13382655,13395711,13408767,13421823,13434879,16711935,16724991,16738047,16751103,16764159,16777215";
        this._colorArr = colors.split(",");
        this.graphics.clear();
        this.graphics.beginFill(0x99C7C4, 1);
        this.graphics.drawRoundRect(0, 0, 210, 170, 5, 5);
        this.graphics.endFill();
        var txtBg = new egret.Shape();
        txtBg.touchEnabled = false;
        txtBg.graphics.clear();
        txtBg.graphics.lineStyle(1, 0x34B9E6, 1);
        txtBg.graphics.drawRect(0, 0, 100, 20);
        this.addChild(txtBg);
        txtBg.x = 5;
        txtBg.y = 5;
        this._txtColor = new egret.TextField();
        this._txtColor.touchEnabled = false;
        this._txtColor.size = 12;
        this._txtColor.textAlign = "left";
        this._txtColor.textColor = 0x0;
        this._txtColor.type = egret.TextFieldType.INPUT;
        this._txtColor.multiline = false;
        this.addChild(this._txtColor);
        this._txtColor.x = 10;
        this._txtColor.y = 10;
        this._colorIndex = 0;
        this._txtColor.text = egret.toColorString(parseFloat(this._colorArr[this._colorIndex]));
        var size = this._rowNum * this._columnNum;
        this._canvas = new egret.Sprite();
        this._canvas.touchEnabled = true;
        this.addChild(this._canvas);
        this._canvas.x = this._canvasInitX;
        this._canvas.y = this._canvasInitY;
        this._canvas.graphics.clear();
        var offX = 0;
        var offY = 0;
        this._canvas.graphics.moveTo(offX, offY);
        for (var i = 0; i < size; i++) {
            this._canvas.graphics.lineStyle(.5, 0, 1);
            this._canvas.graphics.beginFill(parseFloat(this._colorArr[i]), 1);
            offX = (i % 18) * this._gridSize;
            offY = Math.floor((i / 18)) * this._gridSize;
            this._canvas.graphics.drawRect(offX, offY, this._gridSize, this._gridSize);
            this._canvas.graphics.endFill();
        }
        this._moveGrid = new egret.Shape();
        this.addChild(this._moveGrid);
        this._moveGrid.x = this._canvasInitX;
        this._moveGrid.y = this._canvasInitY;
        this._moveGrid.graphics.clear();
        this._moveGrid.graphics.lineStyle(1, 0xffffff, 1);
        this._moveGrid.graphics.drawRect(0, 0, this._gridSize, this._gridSize);
        this._moveGrid.graphics.endFill();
        this.touchEnabled = false;
        this._canvas.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    ColorPicker.prototype.setChooseColor = function (handler) {
        this._chooseColorHandler = handler;
        return this;
    };
    ColorPicker.prototype.onTouchTap = function (e) {
        this.limitMove(e.localX, e.localY);
        if (this._chooseColorHandler) {
            this._chooseColorHandler(this.color);
        }
    };
    ColorPicker.prototype.onTouchBegin = function (e) {
        this._isClickSamePoint = true;
        this._canvas.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._canvas.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    ColorPicker.prototype.onTouchEnd = function (e) {
        this._canvas.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._canvas.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        if (this._isClickSamePoint) {
            this.onTouchTap(e);
        }
    };
    ColorPicker.prototype.onTouchMove = function (e) {
        this.limitMove(e.localX, e.localY);
        this._isClickSamePoint = false;
    };
    ColorPicker.prototype.limitMove = function (moveX, moveY) {
        var row = Math.floor(moveY / this._gridSize);
        var column = Math.floor(moveX / this._gridSize);
        row = row <= 0 ? 0 : row;
        row = row >= this._rowNum - 1 ? this._rowNum - 1 : row;
        column = column <= 0 ? 0 : column;
        column = column >= this._columnNum - 1 ? this._columnNum - 1 : column;
        this._moveGrid.x = this._canvasInitX + column * this._gridSize;
        this._moveGrid.y = this._canvasInitY + row * this._gridSize;
        if (this._txtColor) {
            this._colorIndex = row * this._columnNum + column;
            this._txtColor.text = egret.toColorString(parseFloat(this._colorArr[this._colorIndex]));
        }
    };
    Object.defineProperty(ColorPicker.prototype, "color", {
        get: function () {
            return parseFloat(this._colorArr[this._colorIndex]);
        },
        enumerable: true,
        configurable: true
    });
    return ColorPicker;
})(egret.Sprite);
//# sourceMappingURL=ColorPicker.js.map