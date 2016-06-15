/**
 * Created by xiaoding on 2016/1/31.
 */
class RequestUtils
{
	private static _regID:number = 0;
	public static completeCall:any = {};

	public static process(urlLoader:egret.URLLoader):void
	{
		RequestUtils.completeCall["call_" + RequestUtils._regID] = (data)=>
		{
			var id = RequestUtils._regID;
			urlLoader.data = data;
			urlLoader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
			delete RequestUtils.completeCall["call_" + id];
		};
		RequestUtils.startLoader(urlLoader, RequestUtils._regID++);
	}

	private static startLoader(loader:egret.URLLoader, id:number):void
	{
		var script = document.createElement('script');
		script.src = loader._request.url + "RequestUtils.completeCall.call_" + id + "";
		document.body.appendChild(script);
	}
}