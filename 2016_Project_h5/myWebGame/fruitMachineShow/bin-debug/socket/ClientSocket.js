/**
 * Created by xiaoding on 2016/5/9.
 */
var ClientSocket = (function (_super) {
    __extends(ClientSocket, _super);
    function ClientSocket() {
        _super.call(this);
        this.webSocket = new egret.WebSocket();
    }
    var d = __define,c=ClientSocket,p=c.prototype;
    ClientSocket.getInstance = function () {
        if (ClientSocket.instance == null) {
            ClientSocket.instance = new ClientSocket();
        }
        return ClientSocket.instance;
    };
    //初始化
    p.init = function (url, port) {
        //接收消息
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //连接
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.connectByUrl(url + ":" + port);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    /**
     * 连接成功
     */
    p.onSocketOpen = function () {
        var message = {};
        message.proc = ClientProtocol.CM_HAND_SHAKE_SUCCESS;
        message.type = ProcType.TYPE_SHOW;
        this.sendMesssage(message);
        console.log("Show端：" + message);
    };
    /**
     * 传送数据
     */
    p.sendMesssage = function (str) {
        var cmd = JSON.stringify(str);
        if (cmd != null) {
            this.webSocket.writeUTF(cmd);
            this.webSocket.flush();
        }
    };
    /**
     * 接收消息
     */
    p.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        var data = JSON.parse(msg);
        if (data) {
            this.notifiy(data);
        }
    };
    p.onSocketClose = function () {
        console.log("WebSocketClose");
    };
    p.onSocketError = function () {
        console.log("WebSocketError");
    };
    ClientSocket.instance = new ClientSocket();
    return ClientSocket;
}(xd.Stock));
egret.registerClass(ClientSocket,'ClientSocket');
//# sourceMappingURL=ClientSocket.js.map