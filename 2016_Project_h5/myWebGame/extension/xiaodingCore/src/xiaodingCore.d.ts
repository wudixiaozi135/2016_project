declare module xd
{
	class LogView extends egret.Sprite
	{
		public constructor(maxW:number, maxH:number);

		public addLog(word:string, prefix?:string):void;
	}

	interface INotifier
	{
		attach(observer:IObserver):void;
		detach(observer:IObserver):void;
		notifiy(message):void;
	}

	interface IObserver
	{
		update(message:any):void;
	}

	class Stock
	{
		public observers:IObserver[];

		public attach(observer:IObserver):void;

		public detach(observer:IObserver):void;

		public notifiy(message:any):void;
	}

	class GameDispatcher
	{
		public static addEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void;

		public static once(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void;

		public static removeEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean):void;

		public static hasEventListener(type:string):boolean;

		public static dispatchEvent(eventName:string, obj?:any):boolean;

		public static willTrigger(type:string):boolean;
	}

	class GameEvent
	{
		public constructor(type:string, obj:any, bubbles:boolean, cancelable:boolean);

		public clone(obj?:any):GameEvent;

		public toString():void;

		/**
		 * 传参获取
		 * @returns any
		 */
		public param:any;
	}

	class CommonUtils
	{
		public static getBmp(resName:string):egret.Bitmap

		public static  getGroup(layoutStyle?:number, align?:string, gap?:number, childrens?:egret.DisplayObject[]):eui.Group;

		public static centerRotate(mc:egret.DisplayObject, angle:number):void;

		public static scaleAtPoint(target:egret.DisplayObject, point:egret.Point, scale:number):void;

	}

	class ColorUtils
	{
		public static getColorValue(red:number, green:number, blue:number):number;
	}
}

declare function trace(...args):void;
declare function log(tag, msg):void;