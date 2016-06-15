/**
 * Created by Administrator on 2016/5/10.
 */
var controlArr = new Array();//记录所有control端的连接
var showArr = new Array();//记录所有show端的连接

var ws = require('./node_modules/nodejs-websocket');
//客户端报文
var ClientProtocol = require('./data/ClientProtocol');
//服务端报文
var ServerProtocol = require('./data/ServerProtocol');

var ProcType = require("./data/ProcType");
var HandlerControl = require("./handler/HandlerControl");
var HandlerShow = require("./handler/HandlerShow");
var UsersData = require("./data/UsersData");

var server = ws.createServer(function (connection)
{
	connection.data = null;
	connection.type = null;
	console.log("new connetion");
	console.log("连接数connection = " + server.connections.length);
	//接收数据
	connection.on("text", function (str)
	{
		var data = JSON.parse(str);
		if (connection.data === null)
		{
			if (data.type == ProcType.TYPE_CONTROL)
			{
				if (controlArr.lastIndexOf(connection) == -1)
				{
					controlArr.push(connection);
				}
			} else if (data.type == ProcType.TYPE_SHOW)
			{
				if (showArr.lastIndexOf(connection) == -1)
				{
					showArr.push(connection);
				}
			}

			connection.userName = data.userName;
			connection.type = data.type;

			//如果是第一次发送消息什么都不做。
			if (data.proc == ClientProtocol.HAND_SHAKE_SUCCESS)
			{
				return;
			}

			//如果发送消息的是控制端
			if (data.type == ProcType.TYPE_CONTROL)
			{
				var msg1 = HandlerControl.handler(data);
				if (msg1 != null)
				{
					var sendMsg1 = JSON.stringify(msg1);
					sendMessageToShow(sendMsg1);
					sendMessageToSpecificControl(connection, JSON.stringify(data));
				}
			}

			//如果发送消息的是show端
			if (data.type == ProcType.TYPE_SHOW)
			{
				var msg2 = HandlerShow.handler(data);
				if (msg2 != null)
				{
					var sendMsg2 = JSON.stringify(msg2);
					sendMessageToControl(sendMsg2);
				}
			}
		} else
		{
			broadcast("[" + connection.userid + "] " + connection.userid);
			console.log("connection.userid = " + connection.userid);
		}

	});

	connection.on("close", function ()
	{
		var data = {};
		data.type = ProcType.TYPE_ALL;
		data.proc = ServerProtocol.SM_PROTOCOL_EXIT;
		data.userName = connection.userName;

		var str = JSON.stringify(data);
		broadcast(str);
	});

	connection.on("error", function ()
	{
		if (connection.type == "control")
		{
			var indexControl = controlArr.indexOf(connection);
			if (indexControl != -1)
			{
				controlArr.splice(indexControl, 1);
			}
		}
		if (connection.type == "show")
		{
			var indexShow = controlArr.indexOf(connection);
			if (indexShow != -1)
			{
				controlArr.splice(indexShow, 1);
			}
		}
	});
})
server.listen(8001);
/**
 *
 * 发送消息到所有连接
 */
function broadcast(str)
{
	server.connections.forEach(function (connection)
	{
		connection.sendText(str);
	})
}
/**
 *
 * 发送消息到control(控制)端
 */
function sendMessageToControl(str)
{
	server.connections.forEach(function (connection)
	{
		if (connection.type == ProcType.TYPE_CONTROL)
		{
			connection.sendText(str);
		}
	})
}


function sendMessageToSpecificControl(control, msg)
{
	server.connections.forEach(function (connection)
	{
		if (connection == control)
		{
			connection.sendText(msg);
		}
	})
}

/**
 *
 * 发送消息到show(表现)端
 */
function sendMessageToShow(str)
{
	server.connections.forEach(function (connection)
	{
		if (connection.type == ProcType.TYPE_SHOW)
		{
			connection.sendText(str);
		}
	})
}

console.log("服务器启动");