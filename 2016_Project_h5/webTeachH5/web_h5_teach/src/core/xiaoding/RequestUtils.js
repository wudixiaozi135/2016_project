/**
 * Created by xiaoding on 2016/1/31.
 */
var RequestUtils = (function () {
    function RequestUtils() {
    }
    RequestUtils.process = function (urlLoader) {
        RequestUtils.completeCall["call_" + RequestUtils._regID] = function (data) {
            var id = RequestUtils._regID;
            urlLoader.data = data;
            urlLoader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            delete RequestUtils.completeCall["call_" + id];
        };
        RequestUtils.startLoader(urlLoader, RequestUtils._regID++);
    };
    RequestUtils.startLoader = function (loader, id) {
        var script = document.createElement('script');
        script.src = loader._request.url + "RequestUtils.completeCall.call_" + id + "";
        document.body.appendChild(script);
    };
    RequestUtils._regID = 0;
    RequestUtils.completeCall = {};
    return RequestUtils;
})();
//# sourceMappingURL=RequestUtils.js.map