/**
 * Created by xiaoding on 2016/1/27.
 */
module xd
{
	export class GameEvent extends egret.Event
	{
		private _obj:any;

		public constructor(type:string, obj:any = null, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable);
			if (obj)
			{
				this._obj = obj;
			}
		}

		public clone(obj?:any):GameEvent
		{
			return new GameEvent(this.type, obj ? obj : this._obj, this.bubbles, this.cancelable);
		}

		public toString():void
		{
			console.log("GameEvent: ", "type", "bubbles", "cancelable");
		}

		/**
		 * 传参获取
		 * @returns any
		 */
		public get param():any
		{
			return this._obj;
		}
	}
}