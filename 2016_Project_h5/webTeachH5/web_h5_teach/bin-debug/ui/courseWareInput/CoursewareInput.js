/**
 * Created by Administrator on 2016/4/1.
 */
var CoursewareInput = (function (_super) {
    __extends(CoursewareInput, _super);
    function CoursewareInput() {
        _super.call(this);
        /*
         * 启用文本输入焦点
         * */
        this._enableInputFocus = false;
        this.record = new egret.Point();
        this.clicpP = new egret.Point();
        this._state = CoursewareInputState.idle;
    }
    var d = __define,c=CoursewareInput,p=c.prototype;
    d(p, "state"
        ,function () {
            return this._state;
        }
        ,function (value) {
            this._state = value;
            if (this._state == CoursewareInputState.idle) {
                this.touchEnabled = true;
                this._input.touchEnabled = false;
            }
            else if (this._state == CoursewareInputState.selectable) {
                this.touchEnabled = true;
                this._input.touchEnabled = true;
            }
            else if (this._state == CoursewareInputState.editable) {
                this.touchEnabled = false;
                this._input.touchEnabled = true;
                this._input.setFocus();
            }
        }
    );
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._input = new eui.EditableText();
        this.addChild(this._input);
        this._input.multiline = true;
        this._input.width = 200;
        this._input.height = 100;
        this._input.text = "编辑文本";
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
    };
    p.onDown = function (ev) {
        global.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
        global.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        this.record.setTo(ev.stageX, ev.stageY);
        this.clicpP.setTo(ev.stageX, ev.stageY);
    };
    p.onStageMove = function (ev) {
        var offP = new egret.Point(ev.stageX, ev.stageY).subtract(this.record);
        this.x += offP.x;
        this.y += offP.y;
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= global.curWidth() - this.width) {
            this.x = global.curWidth() - this.width;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y >= global.curHeight() - this.height) {
            this.y = global.curHeight() - this.height;
        }
        this.record.setTo(ev.stageX, ev.stageY);
    };
    p.onStageEnd = function (ev) {
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
        global.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        if (!new egret.Point(ev.stageX, ev.stageY).equals(this.clicpP)) {
            GlobalData.persistInputState = true;
        }
    };
    p.contentIsNull = function () {
        if (!this.txtContent || this.txtContent == "") {
            return true;
        }
        return false;
    };
    d(p, "txtContent"
        ,function () {
            if (this._input) {
                return this._input.text;
            }
        }
        ,function (value) {
            if (this._input) {
                this._input.text = value;
            }
        }
    );
    p.destroy = function () {
        this.detach();
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        if (this._input) {
            this._input = null;
        }
    };
    p.attach = function (controlBar) {
        this._controlBar = controlBar;
        this._controlBar.addEventListener(ControlInputRein.CHANGE_POSITION_SIZE, this.changePositionSize, this);
        this.changePositionSize(null);
        this._controlBar.show();
    };
    p.changePositionSize = function (ev) {
        var rect = this._controlBar.controlRegion();
        if (rect) {
            this.x = rect.x + 10;
            this.y = rect.y + 10;
            this._input.width = rect.width - 10;
            this._input.height = rect.height - 10;
        }
    };
    p.detach = function () {
        if (this._controlBar) {
            this._controlBar.removeEventListener(ControlInputRein.CHANGE_POSITION_SIZE, this.changePositionSize, this);
            this._controlBar.hide();
            this._controlBar = null;
        }
    };
    return CoursewareInput;
}(eui.Group));
egret.registerClass(CoursewareInput,'CoursewareInput');
//# sourceMappingURL=CoursewareInput.js.map