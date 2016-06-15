/**
 * Created by xiaoding on 2016/5/10.
 */
var LoginPanel = (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel() {
        _super.call(this);
    }
    var d = __define,c=LoginPanel,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchEnabled = false;
        this._container = new eui.Group();
        this._container.touchEnabled = false;
        var verticalLayout = new eui.VerticalLayout();
        verticalLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this._container.layout = verticalLayout;
        this.addChild(this._container);
        var labelName = new eui.Label("名称：");
        var inputName = new eui.TextInput();
        var row1 = xd.CommonUtils.getGroup(1, egret.VerticalAlign.MIDDLE, 10, [labelName, inputName]);
        this._container.addChild(row1);
        row1.touchEnabled = false;
        this._btnCancel = new eui.Button();
        this._btnCancel.label = "取消";
        this._btnLogin = new eui.Button();
        this._btnLogin.label = "登陆";
        var row2 = new eui.Group();
        var row2Layout = new eui.HorizontalLayout();
        row2Layout.gap = 20;
        row2Layout.paddingLeft = 100;
        row2.layout = row2Layout;
        row2.addChild(this._btnCancel);
        row2.addChild(this._btnLogin);
        this._container.addChild(row2);
        row2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.verticalCenter = 0;
        this.horizontalCenter = 0;
    };
    p.onClick = function (ev) {
        var target = ev.target;
        if (target == this._btnCancel) {
            egret.ExternalInterface.call("GameExit", "true");
        }
        else if (target == this._btnLogin) {
        }
    };
    return LoginPanel;
}(eui.Group));
egret.registerClass(LoginPanel,'LoginPanel');
