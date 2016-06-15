/**
 *
 * @author
 *此类为打印输出类 效果和AS3的trace一样
 */
function trace() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var _content = "";
    var _count = args.length;
    for (var i = 0; i < _count; i++) {
        _content += " " + args[i];
    }
    console.log(_content);
}
/**
 * 带有标签的控制台打印输出函数
 * @param tag 标签
 * @param msg 信息
 */
function log(tag, msg) {
    trace(tag + ": ", msg);
}
//# sourceMappingURL=trace.js.map