/**
 * Created by xiaoding on 2016/2/19.
 */
var BottomMenuGroup = (function (_super) {
    __extends(BottomMenuGroup, _super);
    function BottomMenuGroup() {
        _super.call(this);
        this._clickTime = 0;
    }
    var d = __define,c=BottomMenuGroup,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var horizonLayout = new eui.HorizontalLayout();
        horizonLayout.gap = 80;
        horizonLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.layout = horizonLayout;
        this._menuCallRoll = new BottomMenuBtn(BottomMenuType.MENU_CALL_ROLL);
        this._menuSnipping = new BottomMenuBtn(BottomMenuType.MENU_SNIPPING);
        this._menuColor = new BottomMenuBtn(BottomMenuType.MENU_COLOR);
        this._menuWord = new BottomMenuBtn(BottomMenuType.MENU_WORD);
        this._menuEraser = new BottomMenuBtn(BottomMenuType.MENU_ERASER);
        this._menuChoose = new BottomMenuBtn(BottomMenuType.MENU_CHOOSE);
        var leftGroup = xd.CommonUtils.getGroup(1, egret.VerticalAlign.MIDDLE, 10, [this._menuCallRoll, this._menuSnipping, this._menuColor, this._menuWord, this._menuEraser, this._menuChoose]);
        this.addChild(leftGroup);
        leftGroup.touchEnabled = false;
        this._menuBook = new BottomMenuBtn(BottomMenuType.MENU_BOOK);
        this._menuCloudDisk = new BottomMenuBtn(BottomMenuType.MENU_CLOUD_DISK);
        this._menuHousework = new BottomMenuBtn(BottomMenuType.MENU_HOUSE_WORK);
        this._menuSyncClass = new BottomMenuBtn(BottomMenuType.MENU_SYNC_CLASS);
        this._menuStatistic = new BottomMenuBtn(BottomMenuType.MENU_STATISTIC);
        this._menuSave = new BottomMenuBtn(BottomMenuType.MENU_SAVE);
        var rightGroup = xd.CommonUtils.getGroup(1, egret.VerticalAlign.MIDDLE, 10, [this._menuBook, this._menuCloudDisk, this._menuHousework, this._menuSyncClass, this._menuStatistic, this._menuSave]);
        this.addChild(rightGroup);
        rightGroup.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._bottomMenuHandler = new BottomMenuHandler();
    };
    p.onClickHandler = function (e) {
        if (egret.getTimer() - this._clickTime < 500) {
            return;
        }
        this._clickTime = egret.getTimer();
        if (BottomMenuManager.selectMenu) {
            BottomMenuManager.selectMenu.selected = false;
            BottomMenuManager.selectMenu = null;
        }
        var target = e.target;
        BottomMenuManager.selectMenu = target;
        if (BottomMenuManager.selectMenu) {
            BottomMenuManager.menuType = BottomMenuManager.selectMenu.menuType;
        }
        if (!isNaN(target.menuType)) {
            xd.GameDispatcher.dispatchEvent(GameEventName.BOTTOM_MENU_CLICK, { type: target.menuType });
        }
        if (target == this._menuCallRoll) {
            this._bottomMenuHandler.handlerMenuCallRoll();
        }
        else if (target == this._menuSnipping) {
            this._bottomMenuHandler.handlerSnippingTool();
        }
        else if (target == this._menuColor) {
            this._bottomMenuHandler.handlerMenuColor();
        }
        else if (target == this._menuWord) {
            if (BottomMenuManager.selectMenu) {
                BottomMenuManager.selectMenu.selected = true;
            }
            this._bottomMenuHandler.handlerInput();
        }
        else if (target == this._menuEraser) {
            this._bottomMenuHandler.handlerEraser();
        }
    };
    /*
     * 获取指定菜单的位置
     * */
    p.getMenuPositionByType = function (type) {
        switch (type) {
            case BottomMenuType.MENU_CALL_ROLL:
                return this._menuCallRoll.parent.localToGlobal(this._menuCallRoll.x + this._menuCallRoll.width * .5, this._menuCallRoll.y + this._menuCallRoll.height * .5);
                break;
            case BottomMenuType.MENU_SNIPPING:
                return this._menuSnipping.parent.localToGlobal(this._menuSnipping.x + this._menuSnipping.width * .5, this._menuSnipping.y + this._menuSnipping.height * .5);
                break;
            case BottomMenuType.MENU_COLOR:
                return this._menuColor.parent.localToGlobal(this._menuColor.x + this._menuColor.width * .5, this._menuColor.y + this._menuColor.height * .5);
                break;
            case BottomMenuType.MENU_WORD:
                return this._menuWord.parent.localToGlobal(this._menuWord.x + this._menuWord.width * .5, this._menuWord.y + this._menuWord.height * .5);
                break;
            case BottomMenuType.MENU_ERASER:
                return this._menuEraser.parent.localToGlobal(this._menuEraser.x + this._menuEraser.width * .5, this._menuEraser.y + this._menuEraser.height * .5);
                break;
            case BottomMenuType.MENU_CHOOSE:
                return this._menuChoose.parent.localToGlobal(this._menuChoose.x + this._menuChoose.width * .5, this._menuChoose.y + this._menuChoose.height * .5);
                break;
            case BottomMenuType.MENU_BOOK:
                return this._menuBook.parent.localToGlobal(this._menuBook.x + this._menuBook.width * .5, this._menuBook.y + this._menuBook.height * .5);
                break;
            case BottomMenuType.MENU_CLOUD_DISK:
                return this._menuCloudDisk.parent.localToGlobal(this._menuCloudDisk.x + this._menuCloudDisk.width * .5, this._menuCloudDisk.y + this._menuCloudDisk.height * .5);
                break;
            case BottomMenuType.MENU_HOUSE_WORK:
                return this._menuHousework.parent.localToGlobal(this._menuHousework.x + this._menuHousework.width * .5, this._menuHousework.y + this._menuHousework.height * .5);
                break;
            case BottomMenuType.MENU_SYNC_CLASS:
                return this._menuSyncClass.parent.localToGlobal(this._menuSyncClass.x + this._menuSyncClass.width * .5, this._menuSyncClass.y + this._menuSyncClass.height * .5);
                break;
            case BottomMenuType.MENU_STATISTIC:
                return this._menuStatistic.parent.localToGlobal(this._menuStatistic.x + this._menuStatistic.width * .5, this._menuStatistic.y + this._menuStatistic.height * .5);
                break;
            case BottomMenuType.MENU_SAVE:
                return this._menuSave.parent.localToGlobal(this._menuSave.x + this._menuSave.width * .5, this._menuSave.y + this._menuSave.height * .5);
                break;
            default:
                break;
        }
        return null;
    };
    return BottomMenuGroup;
}(eui.Group));
egret.registerClass(BottomMenuGroup,'BottomMenuGroup',["IBottomMenuBtnPosition"]);
//# sourceMappingURL=BottomMenuGroup.js.map