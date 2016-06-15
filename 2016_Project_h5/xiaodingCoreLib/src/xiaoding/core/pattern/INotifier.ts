/**
 * Created by xiaoding on 2016/5/11.
 */
module xd
{
	export interface INotifier
	{
		attach(observer:IObserver):void;
		detach(observer:IObserver):void;
		notifiy(message):void;
	}
}