import ByteArray = egret.ByteArray;
/**
 * Created by xiaoding on 2016/5/9.
 */
class ClientSocket extends xd.Stock
{
	private static instance:ClientSocket = new ClientSocket();
	private webSocket:egret.WebSocket = new egret.WebSocket();

	constructor()
	{
		super();
	}

	static getInstance():ClientSocket
	{
		if (ClientSocket.instance == null)
		{
			ClientSocket.instance = new ClientSocket();
		}
		return ClientSocket.instance;
	}

	//初始化
	init(url:string, port:any):void
	{
		this.webSocket.type = egret.WebSocket.TYPE_BINARY;
		//接收消息
		this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
		//连接
		this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

		this.webSocket.connectByUrl(url + ":" + port);

		//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
		this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
		//添加异常侦听，出现异常会调用此方法
		this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
	}

	/**
	 * 连接成功
	 */
	private onSocketOpen():void
	{
		var byte:egret.ByteArray = new egret.ByteArray();
		byte.writeInt(10001);
		byte.writeUTF("哈尔滨");
		byte.position = 0;
		this.webSocket.writeBytes(byte);
		this.webSocket.flush();

		return;

		var msg:any = {};
		msg.data = "hello,world";
		this.sendMesssage(msg);
		console.log("连接成功，发送数据：");
	}


	/**
	 * 传送数据
	 */
	sendMesssage(str:any):void
	{
		let cmd:string = JSON.stringify(str);
		if (cmd != null)
		{
			this.webSocket.writeUTF(cmd);
			this.webSocket.flush();
		}
	}

	/**
	 * 接收消息
	 */
	onReceiveMessage(e:egret.Event):void
	{
		var byte:ByteArray = new ByteArray();
		if (this.webSocket.connected)
		{
			this.webSocket.readBytes(byte);
		}
		byte.position = 0;

		trace("length: ", byte.bytesAvailable);

		var a6 = byte.readUTF();
		trace(a6);


		return;
		let msg = this.webSocket.readUTF();
		let data = JSON.parse(msg);
		if (data)
		{
			this.notifiy(data);
		}
	}

	private onSocketClose():void
	{
		console.log("WebSocketClose");
	}

	private onSocketError():void
	{
		console.log("WebSocketError");
	}
}