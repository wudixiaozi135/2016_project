/**
 * Created by Administrator on 2016/4/5.
 */
module xd
{
	export class ColorUtils
	{
		public static getColorValue(red:number, green:number, blue:number):number
		{
			let color:number = 0;
			color = red << 16 | green << 8 | blue;
			return color;
		}
	}
}
