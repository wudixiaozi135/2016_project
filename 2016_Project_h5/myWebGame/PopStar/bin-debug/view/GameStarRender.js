/**
 * Created by longxing on 2015/4/9.
 */
var GameStarRender = (function (_super) {
    __extends(GameStarRender, _super);
    function GameStarRender() {
        _super.call(this);
        this._starType = 0; //星星的类型
        this._selectBmp = new egret.Bitmap();
        this._starBitmap = new egret.Bitmap();
        this.addChild(this._starBitmap);
    }
    var d = __define,c=GameStarRender,p=c.prototype;
    p.onSetStarType = function (type) {
        this._starType = type;
        if (this._starType == 0) {
            this._starBitmap.texture = RES.getRes("block_blue");
        }
        else if (this._starType == 1) {
            this._starBitmap.texture = RES.getRes("block_green");
        }
        else if (this._starType == 2) {
            this._starBitmap.texture = RES.getRes("block_purple");
        }
        else if (this._starType == 3) {
            this._starBitmap.texture = RES.getRes("block_red");
        }
        else {
            this._starBitmap.texture = RES.getRes("block_yellow");
        }
    };
    p.setStarSelected = function (select) {
        if (select) {
            if (this._selectBmp == null) {
                this._selectBmp = new egret.Bitmap();
            }
            this._selectBmp.texture = RES.getRes("block_select");
            this.addChild(this._selectBmp);
        }
        else {
            if (this._selectBmp && this.contains(this._selectBmp)) {
                this.removeChild(this._selectBmp);
            }
        }
    };
    p.setStarSize = function (value) {
        this._starBitmap.width = this._starBitmap.height = value;
        this._selectBmp.width = this._selectBmp.height = value;
    };
    d(p, "posX"
        ,function () {
            return this._posX;
        }
        ,function (value) {
            this._posX = value;
        }
    );
    d(p, "posY"
        ,function () {
            return this._posY;
        }
        ,function (value) {
            this._posY = value;
        }
    );
    return GameStarRender;
}(egret.Sprite));
egret.registerClass(GameStarRender,'GameStarRender');
