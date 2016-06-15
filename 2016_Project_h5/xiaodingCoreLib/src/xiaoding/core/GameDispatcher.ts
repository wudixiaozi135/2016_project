/**
 * Created by xiaoding on 2016/1/27.
 */
module xd
{
	export class GameDispatcher
	{
		private static dispatcher:egret.IEventDispatcher = new egret.EventDispatcher();

		public static addEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void
		{
			GameDispatcher.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
		}

		public static once(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void
		{
			GameDispatcher.dispatcher.once(type, listener, thisObject, useCapture, priority);
		}

		public static removeEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean):void
		{
			GameDispatcher.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
		}

		public static hasEventListener(type:string):boolean
		{
			return GameDispatcher.hasEventListener(type);
		}

		public static dispatchEvent(eventName:string, obj:any = null):boolean
		{
			return GameDispatcher.dispatcher.dispatchEvent(new xd.GameEvent(eventName, obj));
		}

		public static willTrigger(type:string):boolean
		{
			return GameDispatcher.dispatcher.willTrigger(type);
		}
	}
}