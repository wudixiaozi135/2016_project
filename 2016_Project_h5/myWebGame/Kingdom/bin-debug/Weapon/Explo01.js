/**
 *
 * 炮弹01
 * @author
 *
 */
var Explo01 = (function (_super) {
    __extends(Explo01, _super);
    function Explo01() {
        _super.call(this);
        this.ratioSoldY = this.minSoldRadius / this.maxSoldRadius;
        //获取纹理
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = 1 * this.height;
        var data = RES.getRes("Explo01json");
        var texture = RES.getRes("Explo01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("Explo01");
        this.view.anchorOffsetX = this.view.width * 0.5;
        this.view.anchorOffsetY = 1 * this.view.height;
        this.view.x = this.view.width / 2;
        this.view.y = this.view.height;
        //设置数据属性
        this.damage = 1;
    }
    var d = __define,c=Explo01,p=c.prototype;
    /**创建-初始化*/
    p.onCreate = function () {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.isMiss = false;
        this.target = null;
        this.view.gotoAndStop(1);
        this.t0 = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.pos = null;
    };
    /**数据初始化 起始坐标 目标对象*/
    p.init = function (p1, tar, offy) {
        //设置目标状态
        this.x = p1.x;
        this.y = p1.y;
        this.p1 = p1;
        this.target = tar;
        this.offy = 0;
        this.setTarget(this.target.x, this.target.y - this.offy);
        this.follow = true;
    };
    /**帧事件*/
    p.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    return Explo01;
}(ExploBase));
egret.registerClass(Explo01,'Explo01');
//# sourceMappingURL=Explo01.js.map