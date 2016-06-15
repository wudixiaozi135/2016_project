/**
 * Created by xiaoding on 2016/5/11.
 */
var xd;
(function (xd) {
    var Stock = (function () {
        function Stock() {
            this.observers = [];
        }
        var d = __define,c=Stock,p=c.prototype;
        p.attach = function (observer) {
            if (this.observers.indexOf(observer) == -1) {
                this.observers.push(observer);
            }
        };
        p.detach = function (observer) {
            var pos = this.observers.indexOf(observer);
            if (pos > -1) {
                this.observers.splice(pos, 1);
            }
        };
        p.notifiy = function (message) {
            if (this.observers && this.observers.length > 0) {
                this.observers.forEach(function (element, index, vector) {
                    element.update(message);
                });
            }
        };
        return Stock;
    }());
    xd.Stock = Stock;
    egret.registerClass(Stock,'xd.Stock',["xd.INotifier"]);
})(xd || (xd = {}));
//# sourceMappingURL=Stock.js.map