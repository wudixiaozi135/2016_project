/**
 *
 * 建造等待动画
 * @author
 *
 */
class BuildWait extends egret.Sprite
{
	private bm:egret.Bitmap;

	private buildType:any = {
		"ArrowTower01": "building1",
		"ShieldTower01": "building2",
		"MagicTower01": "building3",
		"ExploTower01": "building4"
	};

	public constructor(name:string)
	{
		super();

		var res = this.buildType[name];
		this.bm = Utils.createBitmapByName(res);
		this.addChild(this.bm);

		this.bm = Utils.createBitmapByName("buildbarbg");
		this.bm.x = 23;
		this.bm.y = 23;
		this.addChild(this.bm);

		this.bm = Utils.createBitmapByName("buildbartop");
		this.bm.x = 24;
		this.bm.y = 24;
		this.bm.width = 1;//37
		this.addChild(this.bm);

		this.building();
		this.anchorOffsetX = this.width * .5;
		this.anchorOffsetY = this.height;
		//播放音效
		SoundManager.playEffect("building");
	}

	private building()
	{
		var that = this;
		TweenLite.to(this.bm, 1.5, {
			width: 37, ease: Linear.easeNone, onComplete: function ()
			{
				that.dispatchEvent(new ToolEvent(ToolEvent.BUILD_COMP));
			}
		});
	}
}
