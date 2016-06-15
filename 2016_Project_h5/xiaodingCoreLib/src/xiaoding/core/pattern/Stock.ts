/**
 * Created by xiaoding on 2016/5/11.
 */
module xd
{
	export class Stock implements INotifier
	{
		public observers:IObserver[] = [];

		constructor()
		{
		}

		attach(observer:IObserver):void
		{
			if (this.observers.indexOf(observer) == -1)
			{
				this.observers.push(observer);
			}
		}

		detach(observer:IObserver):void
		{
			let pos = this.observers.indexOf(observer);
			if (pos > -1)
			{
				this.observers.splice(pos, 1);
			}
		}

		notifiy(message):void
		{
			if (this.observers && this.observers.length > 0)
			{
				this.observers.forEach(function (element:IObserver, index:number, vector:IObserver[]):void
				{
					element.update(message);
				});
			}
		}
	}
}