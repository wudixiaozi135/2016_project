/**
 * Created by Administrator on 2016/4/6.
 */
class GameHead extends eui.Group
{
	private scoreLabel:eui.Label;
	private maxScoreLabel:eui.Label;
	private data:any;

	constructor()
	{
		super();
	}

	protected createChildren():void
	{
		super.createChildren();
		this.width = this.stage.stageWidth;
		this.height = GameData.gameHeadHeight;

		let bg = new eui.Rect();
		bg.percentWidth = bg.percentHeight = 100;
		bg.fillColor = 0x00ff00;
		bg.ellipseWidth = bg.ellipseHeight = 20;
		this.addChild(bg);


		let labelContainer = new eui.Group();
		labelContainer.left = 10;
		let horizonLayout = new eui.HorizontalLayout();
		horizonLayout.gap = 50;
		labelContainer.layout = horizonLayout;
		this.addChild(labelContainer);
		labelContainer.verticalCenter = 0;

		this.scoreLabel = new eui.Label();
		this.scoreLabel.textColor = 0xffff00;
		this.scoreLabel.size = 25;
		labelContainer.addChild(this.scoreLabel);

		this.maxScoreLabel = new eui.Label();
		this.maxScoreLabel.textColor = 0xff0000;
		this.maxScoreLabel.size = 25;
		labelContainer.addChild(this.maxScoreLabel);

		let maxScore:number = parseFloat(egret.localStorage.getItem(GameData.maxScoreKey));
		if (isNaN(maxScore))
		{
			maxScore = 0;
		}
		this.setData({score: 0, maxScore: maxScore});

		if (this.data)
		{
			this.setData(this.data);
		}
	}

	public setData(param:{score; maxScore}):void
	{
		this.data = param;
		if (this.maxScoreLabel)
		{
			this.maxScoreLabel.text = "MaxScore: " + param.maxScore;
		}
		if (this.scoreLabel)
		{
			this.scoreLabel.text = "Score: " + param.score;
		}
	}
}