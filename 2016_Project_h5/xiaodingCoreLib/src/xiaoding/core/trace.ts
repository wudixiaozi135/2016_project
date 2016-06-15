/**
 *
 * @author
 *此类为打印输出类 效果和AS3的trace一样
 */
function trace(...args):void
{
	var _content = "";
	var _count:number = args.length;
	for (var i = 0; i < _count; i++)
	{
		_content += " " + args[i];
	}
	console.log(_content);
}

/**
 * 带有标签的控制台打印输出函数
 * @param tag 标签
 * @param msg 信息
 */
function log(tag:string, msg:string):void
{
	trace(tag + ": ", msg);
}




