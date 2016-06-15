/**
 * Created by xiaoding on 2016/2/16.
 */
class DragTxt extends eui.Group
{
	private editTxt:eui.EditableText;

	constructor()
	{
		super();
	}

	protected createChildren():void
	{
		super.createChildren();
		this.editTxt = new eui.EditableText();
		this.editTxt.type = "input";
		this.editTxt.border = true;
		this.editTxt.borderColor = 0xf;

		this.editTxt.multiline = true;
		this.editTxt.wordWrap = true;

		this.addChild(this.editTxt);
		this.editTxt.addEventListener(egret.TextEvent.CHANGE, this.changeTxt, this);
	}

	private changeTxt(ev:egret.Event):void
	{
		var that:DragTxt = this;
		that.editTxt.width = that.editTxt.textWidth + that.editTxt.size;
		that.editTxt.height = that.editTxt.textHeight + that.editTxt.size + 10;

		if (that.editTxt.width > that.stage.stageWidth - that.editTxt.x)
		{
			that.editTxt.width = that.stage.stageWidth - that.editTxt.x;
		}
	}
}