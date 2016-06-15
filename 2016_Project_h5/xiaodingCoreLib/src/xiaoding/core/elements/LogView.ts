/**
 * Created by xiaoding on 2016/5/11.
 */
module xd
{
	export class LogView extends egret.Sprite
	{
		private msgs:string[] = [];
		private tf:egret.TextField;
		private org_Ypos:number;
		private MaxScrollV:number;
		private LineHeightGap:number;
		private maxW:number;
		private maxH:number;

		public constructor(maxW:number, maxH:number)
		{
			super();
			this.maxW = maxW;
			this.maxH = maxH;
			this.touchEnabled = true;

			this.drawBG(maxW, maxH);
			this.initTF();
		}

		private drawBG(w:number, h:number):void
		{
			this.graphics.beginFill(0x666666, 0.8);
			this.graphics.drawRect(0, 0, w, h + 5);
			this.graphics.endFill();
		}

		private initTF():void
		{
			this.tf = new egret.TextField();
			this.tf.textAlign = "left";
			this.tf.lineSpacing = 5;
			this.tf.touchEnabled = true;
			this.tf.height = this.maxH;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStartTF, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoveTF, this);
			this.addChild(this.tf);
		}

		private onTouchStartTF(event:egret.TouchEvent):void
		{
			this.org_Ypos = event.stageY;
		}

		private onTouchMoveTF(event:egret.TouchEvent):void
		{
			var offsetY:number = event.stageY - this.org_Ypos;
			if (offsetY < 0)
			{
				var gap:number = Math.abs(offsetY);
				var count:number = parseInt((gap / this.LineHeightGap).toString()) + this.tf.scrollV;
				if (count > this.MaxScrollV)
				{
					this.tf.scrollV = this.MaxScrollV;
				} else
				{
					this.tf.scrollV = count;
				}
			} else
			{
				var gap:number = Math.abs(offsetY);
				var count:number = this.tf.scrollV - parseInt((gap / this.LineHeightGap).toString());
				if (count < 1)
				{
					this.tf.scrollV = 1;
				} else
				{
					this.tf.scrollV = count;
				}
			}
		}

		public addLog(word:string, prefix:string = "系统"):void
		{
			if (this.msgs.length > 50)
			{
				this.msgs.shift();
			}
			this.msgs.push(word);
			this.tf.text = "";
			for (var i = 0, len = this.msgs.length; i < len; i++)
			{
				this.tf.appendText("[" + prefix + "]: " + this.msgs[i] + "\n");
			}
			this.LineHeightGap = this.tf.textHeight / this.tf.maxScrollV;
			this.tf.scrollV = parseInt(((this.tf.textHeight - this.maxH) / this.LineHeightGap).toString());
			this.MaxScrollV = this.tf.scrollV;
		}
	}
}