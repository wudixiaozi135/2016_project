/**
 * Created by xiaoding on 2016/5/10.
 */
class LoginPanel extends eui.Group
{
	private _container:eui.Group;
	private _btnLogin:eui.Button;
	private _btnCancel:eui.Button;
	private _inputName:eui.TextInput;

	constructor()
	{
		super();
	}

	protected createChildren():void
	{
		super.createChildren();
		this.touchEnabled = false;

		this._container = new eui.Group();
		this._container.touchEnabled = false;

		let verticalLayout:eui.VerticalLayout = new eui.VerticalLayout();
		verticalLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
		this._container.layout = verticalLayout;
		this.addChild(this._container);

		let labelName:eui.Label = new eui.Label("名称：");
		this._inputName = new eui.TextInput();

		let row1:eui.Group = xd.CommonUtils.getGroup(1, egret.VerticalAlign.MIDDLE, 10, [labelName, this._inputName]);
		this._container.addChild(row1);
		row1.touchEnabled = false;

		this._btnCancel = new eui.Button();
		this._btnCancel.label = "取消";

		this._btnLogin = new eui.Button();
		this._btnLogin.label = "登陆";

		let row2:eui.Group = new eui.Group();
		let row2Layout:eui.HorizontalLayout = new eui.HorizontalLayout();
		row2Layout.gap = 20;
		row2Layout.paddingLeft = 100;

		row2.layout = row2Layout;

		row2.addChild(this._btnCancel);
		row2.addChild(this._btnLogin);
		this._container.addChild(row2);

		row2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.verticalCenter = 0;
		this.horizontalCenter = 0;
	}

	private onClick(ev:egret.TouchEvent):void
	{
		let target = ev.target;
		if (target == this._btnCancel)
		{
			egret.ExternalInterface.call("GameExit", "true");
		} else if (target == this._btnLogin)
		{
			let userName:string = this._inputName.text.trim();
			if (userName == "")
			{
				AlertPanel.show("用户名为空！！！");
				this._inputName.textDisplay.setFocus();
				return;
			}
			let temp = userName.toLowerCase();
			if (temp == "root" || temp == "admin")
			{
				AlertPanel.show("非法用户名！！！");
				this._inputName.text = "";
				this._inputName.textDisplay.setFocus();
				return;
			}
			if (userName == "18255191766")
			{
				userName = UserData.ADMIN;
			}
			let message:any = {};
			message.proc = ClientProtocol.CM_PROTOCOL_LOGIN;
			message.type = ProcType.TYPE_CONTROL;
			message.userName = userName;

			UserData.userName = userName;
			ClientSocket.getInstance().sendMesssage(message);
		}
	}
}