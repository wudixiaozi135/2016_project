/**
 * Created by xiaoding on 2016/5/9.
 */
var ClientSocket = (function () {
    function ClientSocket() {
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
        // this.webSocket.connect(url, port);
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
        var message = new Message();
        message.event = "HelloWebSocket";
        message.type = "show";
        message.userid = "001";
        var cmd = JSON.stringify(message);
        console.log("连接成功，发送数据：" + cmd);
        this.webSocket.writeUTF(cmd);
    };
    /**
     * 传送数据
     */
    p.sendMesssage = function (str) {
        this.webSocket.writeUTF(str);
        this.webSocket.flush();
    };
    /**
     * 接收消息
     */
    p.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        console.info(msg);
    };
    p.onSocketClose = function () {
        console.log("WebSocketClose");
    };
    p.onSocketError = function () {
        console.log("WebSocketError");
    };
    ClientSocket.instance = new ClientSocket();
    return ClientSocket;
}());
egret.registerClass(ClientSocket,'ClientSocket');
