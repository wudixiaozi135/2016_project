/**
 * Created by qingzhu on 15/7/1.
 */
var qr;
(function (qr) {
    var QRErrorCorrectLevel = (function () {
        function QRErrorCorrectLevel() {
        }
        var d = __define,c=QRErrorCorrectLevel,p=c.prototype;
        QRErrorCorrectLevel.L = 1;
        QRErrorCorrectLevel.M = 0;
        QRErrorCorrectLevel.Q = 3;
        QRErrorCorrectLevel.H = 2;
        return QRErrorCorrectLevel;
    }());
    qr.QRErrorCorrectLevel = QRErrorCorrectLevel;
    egret.registerClass(QRErrorCorrectLevel,'qr.QRErrorCorrectLevel');
})(qr || (qr = {}));
//# sourceMappingURL=QRErrorCorrectLevel.js.map