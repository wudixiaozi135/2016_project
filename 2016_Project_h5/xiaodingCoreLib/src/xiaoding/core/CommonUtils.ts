/**
 * Created by xiaoding on 2016/2/18.
 */
module xd
{
	export class CommonUtils
	{
		public static getBmp(resName:string):egret.Bitmap
		{
			var bmp:egret.Bitmap = new egret.Bitmap();
			bmp.texture = RES.getRes(resName);
			return bmp;
		}

		public static  getGroup(layoutStyle:number = 0, align:string = null, gap:number = 5, childrens:egret.DisplayObject[] = null):eui.Group
		{
			var group:eui.Group = new eui.Group();
			var layout:any = null;
			if (layoutStyle == 1)
			{
				layout = new eui.HorizontalLayout();
				layout.gap = gap;
				if (align)
				{
					layout.verticalAlign = align;
				}
			} else if (layoutStyle == 2)
			{
				layout = new eui.VerticalLayout();
				layout.gap = gap;
				if (align)
				{
					layout.horizontalAlign = align;
				}
			}
			group.layout = layout;
			if (childrens)
			{
				for (var i:number = 0, len:number = childrens.length; i < len; i++)
				{
					group.addChild(childrens[i]);
				}
			}
			return group;
		}

		/*
		 * 中心旋转
		 * */
		public static centerRotate(mc:egret.DisplayObject, angle:number):void
		{
			var currentRotation:number = mc.rotation;
			//获取mc不旋转时候的尺寸
			mc.rotation = 0;
			var mcWidth:number = mc.width;
			var mcHeight:number = mc.height;
			mc.rotation = currentRotation;

			//获取mc当前中心点坐标
			var pointO:egret.Point = mc.localToGlobal(mcWidth / 2, mcHeight / 2);

			//旋转mc
			mc.rotation = angle;

			//获取mc旋转后中心点坐标
			var pointO2:egret.Point = mc.localToGlobal(mcWidth / 2, mcHeight / 2);
			//平移到原来中心点O
			var p3 = pointO.subtract(pointO2);
			var matrix:egret.Matrix = mc.matrix;
			matrix.translate(p3.x, p3.y);
			mc.matrix = matrix;
		}

		/*
		 * 固定点绽放
		 * */
		public static scaleAtPoint(target:egret.DisplayObject, point:egret.Point, scale:number):void
		{
			var oriP = new egret.Point(target.x, target.y);
			var stagePoint = target.localToGlobal(point.x, point.y);
			target.scaleX = target.scaleY = scale;
			var currentStagePoint = target.localToGlobal(point.x, point.y);
			target.x -= currentStagePoint.x - stagePoint.x;
			target.y -= currentStagePoint.y - stagePoint.y;

			var rotation = target.rotation;
			var newP = new egret.Point(target.x, target.y);
			if (rotation == 90)
			{
				target.x -= newP.x - oriP.x;
			} else if (rotation == 180)
			{
				target.x -= newP.x - oriP.x;
				target.y -= newP.y - oriP.y;
			} else if (rotation == -90)
			{
				target.y -= newP.y - oriP.y;
			}
		}
	}
}