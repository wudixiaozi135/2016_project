/**
 * Created by Administrator on 2016/4/1.
 */
class CoursewareInput extends eui.Group
{
	private _input:eui.EditableText;
	/*
	 * 启用文本输入焦点
	 * */
	private _enableInputFocus:boolean = false;

	/*
	 * 0是无状态
	 * 1是选中状态
	 * 2编辑状态
	 * */
	private _state:CoursewareInputState;

	constructor()
	{
		super();
		this._state = CoursewareInputState.idle;
	}

	get state():CoursewareInputState
	{
		return this._state;
	}

	set state(value:CoursewareInputState)
	{
		this._state = value;
		if (this._state == CoursewareInputState.idle)
		{
			this.touchEnabled = true;
			this._input.touchEnabled = false;
		} else if (this._state == CoursewareInputState.selectable)
		{
			this.touchEnabled = true;
			this._input.touchEnabled = true;
		} else if (this._state == CoursewareInputState.editable)
		{
			this.touchEnabled = false;
			this._input.touchEnabled = true;
			this._input.setFocus();
		}
	}

	protected createChildren():void
	{
		super.createChildren();

		this._input = new eui.EditableText();
		this.addChild(this._input);
		this._input.multiline = true;
		this._input.width = 200;
		this._input.height = 100;
		this._input.text = "编辑文本";

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
	}

	private record:egret.Point = new egret.Point();
	private clicpP:egret.Point = new egret.Point();

	private onDown(ev:egret.TouchEvent):void
	{
		global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
		global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
		this.record.setTo(ev.stageX, ev.stageY);
		this.clicpP.setTo(ev.stageX, ev.stageY);
	}

	private onStageMove(ev:egret.TouchEvent):void
	{
		let offP:egret.Point = new egret.Point(ev.stageX, ev.stageY).subtract(this.record);
		this.x += offP.x;
		this.y += offP.y;

		if (this.x <= 0)
		{
			this.x = 0;
		}
		if (this.x >= global.curWidth() - this.width)
		{
			this.x = global.curWidth() - this.width;
		}

		if (this.y <= 0)
		{
			this.y = 0;
		}
		if (this.y >= global.curHeight() - this.height)
		{
			this.y = global.curHeight() - this.height;
		}

		this.record.setTo(ev.stageX, ev.stageY);
	}

	private onStageEnd(ev:egret.TouchEvent):void
	{
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
		global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);

		if (!new egret.Point(ev.stageX, ev.stageY).equals(this.clicpP))
		{
			GlobalData.persistInputState = true;
		}
	}

	public contentIsNull():boolean
	{
		if (!this.txtContent || this.txtContent == "")
		{
			return true;
		}
		return false;
	}

	get txtContent():string
	{
		if (this._input)
		{
			return this._input.text;
		}
	}

	set txtContent(value:string)
	{
		if (this._input)
		{
			this._input.text = value;
		}
	}

	public destroy():void
	{
		this.detach();
		while (this.numChildren > 0)
		{
			this.removeChildAt(0);
		}
		if (this._input)
		{
			this._input = null;
		}
	}

	private _controlBar:ControlInputRein;

	public attach(controlBar:ControlInputRein):void
	{
		this._controlBar = controlBar;
		this._controlBar.addEventListener(ControlInputRein.CHANGE_POSITION_SIZE, this.changePositionSize, this);
		this.changePositionSize(null);
		this._controlBar.show();
	}

	private changePositionSize(ev:egret.Event):void
	{
		let rect:egret.Rectangle = this._controlBar.controlRegion();
		if (rect)
		{
			this.x = rect.x + 10;
			this.y = rect.y + 10;
			this._input.width = rect.width - 10;
			this._input.height = rect.height - 10;
		}
	}

	public detach():void
	{
		if (this._controlBar)
		{
			this._controlBar.removeEventListener(ControlInputRein.CHANGE_POSITION_SIZE, this.changePositionSize, this);
			this._controlBar.hide();
			this._controlBar = null;
		}
	}
}