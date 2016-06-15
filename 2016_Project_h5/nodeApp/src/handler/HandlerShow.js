/**
 * Created by Administrator on 2016/5/11.
 */

//客户端报文
var ClientProtocol = require('../data/ClientProtocol');
//服务端报文
var ServerProtocol = require('../data/ServerProtocol');

var ProcType = require("../data/ProcType");

var HandlerShow = (function ()
{
	function HandlerShow()
	{
	}

	//处理控制端数据
	HandlerShow.handler = function (data)
	{
		var msg = {};
		if (data.proc == ServerProtocol.SM_SHOW_REWARD)//发放奖励
		{
			return data;
		}
		return msg;
	}
	return HandlerShow;
}());

module.exports = HandlerShow