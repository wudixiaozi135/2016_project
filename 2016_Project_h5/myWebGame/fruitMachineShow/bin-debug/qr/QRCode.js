/**
 * Created by qingzhu on 15/7/1.
 */
var qr;
(function (qr) {
    var QRCode = (function () {
        function QRCode() {
        }
        var d = __define,c=QRCode,p=c.prototype;
        /**
         * msg
         * width,height 二维码宽度，高度
         * color 颜色
         * */
        QRCode.create = function (msg, color, width, height, errorCorrectLevel) {
            if (color === void 0) { color = 0; }
            if (width === void 0) { width = 200; }
            if (height === void 0) { height = 200; }
            if (errorCorrectLevel === void 0) { errorCorrectLevel = 2; }
            var _htOption = {
                width: width,
                height: height,
                correctLevel: qr.QRErrorCorrectLevel.H,
                color: color
            };
            var _oQRCode = new qr.QRCodeModel(qr.QRUtil._getTypeNumber(msg, _htOption.correctLevel), _htOption.correctLevel);
            _oQRCode.addData(msg);
            _oQRCode.make();
            return QRCode.draw(_oQRCode, _htOption);
        };
        QRCode.draw = function (m, _htOption) {
            var sc = new egret.Sprite();
            var _htOption = _htOption;
            var nCount = m.getModuleCount();
            var nWidth = Math.floor(_htOption.width / nCount);
            var nHeight = Math.floor(_htOption.height / nCount);
            for (var row = 0; row < nCount; row++) {
                for (var col = 0; col < nCount; col++) {
                    var b = m.isDark(row, col);
                    if (b) {
                        sc.graphics.beginFill(_htOption.color);
                        sc.graphics.drawRect(col * nWidth, row * nHeight, nWidth, nHeight);
                        sc.graphics.endFill();
                    }
                }
            }
            return sc;
        };
        return QRCode;
    }());
    qr.QRCode = QRCode;
    egret.registerClass(QRCode,'qr.QRCode');
})(qr || (qr = {}));
//# sourceMappingURL=QRCode.js.map