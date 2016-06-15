/**
 * Created by Administrator on 2016/5/11.
 */

//客户端报文
var ClientProtocol = require('../data/ClientProtocol');
//服务端报文
var ServerProtocol = require('../data/ServerProtocol');

var ProcType = require("../data/ProcType");

var HandlerControl = (function ()
{
	function HandlerControl()
	{
	}

	//处理控制端数据
	HandlerControl.handler = function (data)
	{
		var msg = {};
		if (data.proc == ClientProtocol.CM_PROTOCOL_LOGIN)//登陆报文
		{
			msg.type = ProcType.TYPE_SHOW;
			msg.proc = ServerProtocol.SM_PROTOCOL_LOGIN;
			msg.userName = data.userName;
		} else if (data.proc == ClientProtocol.CM_START_GAME)
		{
			msg.type = ProcType.TYPE_SHOW;
			msg.proc = ServerProtocol.SM_START_GAME;
			msg.userName = data.userName;
		} else if (data.proc == ClientProtocol.CM_GAIN_REWARD)//获得收益
		{
			msg.type = ProcType.TYPE_SHOW;
			msg.proc = ServerProtocol.SM_GAIN_REWARD;
			msg.userName = data.userName;
			msg.gainCoin = data.gainCoin;
		}
		return msg;
	}
	return HandlerControl;
}());
module.exports = HandlerControl