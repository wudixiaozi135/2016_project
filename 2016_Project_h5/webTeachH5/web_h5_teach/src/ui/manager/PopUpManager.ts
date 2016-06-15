/**
 * 面板弹出的管理类
 */
module PopUpManager
{
	import Rectangle = egret.Rectangle;
	export var darkSprite:eui.Rect;

	/**
	 * 添加面板方法
	 * panel 面板
	 * dark  背景是否变黑
	 * position  定位
	 * effectType 0：没有动画 1:从中间轻微弹出
	 */
	export function addPopUp(panel:PanelEx, dark:boolean = false, position:any, effectType:number = 0):void
	{
		if (global.uiLayerManager.uiLayer.contains(panel))
		{//判断是否包含panel
			return;
		}

		if (panel.hasOwnProperty("isPlay"))
		{
			panel.isPlay = true;
		}

		if (panel.hasOwnProperty("playStartAnimateFinish"))
		{
			panel.playStartAnimateFinish = false;
		}

		var temp:number = 0;
		var rect:Rectangle = panel.panelRect();

		if (dark)
		{
			this.darkSprite = new eui.Rect();
			this.darkSprite.fillColor = 0x0;
			this.darkSprite.fillAlpha = .3;
			this.darkSprite.percentWidth = 100;
			this.darkSprite.percentHeight = 100;

			if (!global.uiLayerManager.uiLayer.contains(this.darkSprite))
			{
				global.uiLayerManager.uiLayer.addChild(this.darkSprite);
			}
			this.darkSprite.touchEnabled = true;

			egret.Tween.get(this.darkSprite).to({alpha: 1}, 150);
			this.darkSprite.visible = true;
		}

		global.uiLayerManager.uiLayer.addChild(panel);
		global.curPanel = panel;


		if (position.hasOwnProperty("top"))
		{
			panel.y = position.top;
		}

		if (position.hasOwnProperty("bottom"))
		{
			panel.y = global.curHeight() - rect.height - position.bottom;
		}

		if (position.hasOwnProperty("left"))
		{
			panel.x = position.left;
		}
		if (position.hasOwnProperty("right"))
		{
			panel.x = global.curWidth() - rect.width - position.right;
		}

		if (position.hasOwnProperty("horizontalCenter"))
		{
			temp = position.horizontalCenter;
			if (temp >= 1)
			{
				temp = 1;
			}
			if (temp <= -1)
			{
				temp = -1;
			}
			panel.x = (global.curWidth() - rect.width) * .5 + temp * rect.width;
		}

		if (position.hasOwnProperty("verticalCenter"))
		{
			temp = position.verticalCenter;
			if (temp >= 1)
			{
				temp = 1;
			}
			if (temp <= -1)
			{
				temp = -1;
			}
			panel.y = (global.curHeight() - rect.height) * .5 + temp * rect.height;
		}

		if (position.hasOwnProperty("initX"))
		{
			panel.x = position.initX;
		}

		if (position.hasOwnProperty("initY"))
		{
			panel.y = position.initY;
		}

		var onComplete:Function = function ()
		{
			if (panel.hasOwnProperty("isPlay"))
			{
				panel.isPlay = false;
			}
			if (panel.hasOwnProperty("playStartAnimateFinish"))
			{
				panel.playStartAnimateFinish = true;
			}
		};

		if (effectType == 1)
		{
			panel.alpha = 0;
			panel.scaleX = 0.3;
			panel.scaleY = 0.3;
			egret.Tween.get(panel).to({alpha: 1, scaleX: 1, scaleY: 1}, 300, egret.Ease.backOut).call(onComplete, this);
		} else
		{
			onComplete();
		}
	}

	/**
	 * 移除面板方法
	 * panel             面板
	 * effectType        0：没有动画 1:有动画
	 */
	export function removePopUp(panel, effectType:number = 0):void
	{
		if (panel.hasOwnProperty("isPlay"))
		{
			panel.isPlay = true;
		}
		if (panel.hasOwnProperty("playStartAnimateFinish"))
		{
			panel.playStartAnimateFinish = false;
		}
		var onComplete:Function = function ()
		{
			if (global.uiLayerManager.uiLayer.contains(this.darkSprite))
			{
				global.uiLayerManager.uiLayer.removeChild(this.darkSprite);
			}
		};
		if (this.darkSprite)
		{
			egret.Tween.get(this.darkSprite).to({alpha: 0}, 100).call(onComplete, this);
		}

		var onEnd:Function = function ()
		{
			if (global.uiLayerManager.uiLayer.contains(panel))
			{//判断是否包含panel
				global.uiLayerManager.uiLayer.removeChild(panel);
			}
			if (panel.hasOwnProperty("isPlay"))
			{
				panel.isPlay = false;
			}
		};

		var endP:egret.Point = panel.closeAnimatePos();
		if (endP)
		{
			if (effectType == 1)
			{
				egret.Tween.get(panel).to({
					alpha: 0,
					scaleX: 0,
					scaleY: 0,
					x: endP.x,
					y: endP.y
				}, 300).call(onEnd, this);
			} else
			{
				onEnd();
			}
		}
	}

	export function resize(w:number, h:number):void
	{
	}
}


