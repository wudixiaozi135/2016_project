/**
 * Created by xiaoding on 2016/5/6.
 */
class DrawLayerUI extends eui.Group
{
	public pen:egret.Shape;

	constructor()
	{
		super();
		this.percentWidth = 100;
		this.percentHeight = 100;
	}

	protected createChildren():void
	{
		super.createChildren();
		this.pen = new egret.Shape();
		this.pen.touchEnabled=false;
		this.addChild(this.pen);
	}
}