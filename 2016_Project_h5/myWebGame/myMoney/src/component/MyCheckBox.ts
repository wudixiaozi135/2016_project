/**
 * Created by lx on 2015/1/24.
 */
class MyCheckBox extends egret.Sprite{
    private _normalBitmapName:string;
    private _selectedBitmapName:string;
    private _selectFlag:boolean = false;
    private _bgNormalName:string;
    private _bgSelectName:string;
    private _bitmap:egret.Bitmap;
    private _bg:egret.Bitmap;
    public constructor(){
        super();

        this._bg = new egret.Bitmap();
        this.addChild(this._bg);

        this._bitmap = new egret.Bitmap();
        this.addChild(this._bitmap);
        this._bitmap.touchEnabled = true;
        this._bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);
    }

    private onTouchTapHandler(evt:egret.TouchEvent){
        if(this._selectFlag){
            this._selectFlag = false;
        }else{
            this._selectFlag = true;
        }
        this.updateView();
        this.dispatchEvent(new MyCheckBoxEvent(MyCheckBoxEvent.CHACKBOXCHANGEEVENT));
    }

    public onSetCheckBoxImg(normalImg:string,selectedImg:string){
        this._normalBitmapName = normalImg;
        this._selectedBitmapName = selectedImg;
        this.updateView();
    }

    public onBgBitmapSource(normalImg:string,selectedImg:string,r1,r2,r3,r4){
        this._bgNormalName = normalImg;
        this._bgSelectName = selectedImg;
        var rect:egret.Rectangle = new egret.Rectangle(r1,r2,r3,r4);
        this._bg.scale9Grid = rect;
        this.updateView();
    }

    public setWidth(width:number){
        this._bitmap.width = width;
        this._bg.width = width;
    }

    public setHeight(height:number){
        this._bitmap.height = height;
        this._bg.height = height;
    }

    public onSetSelect(select:boolean){
        this._selectFlag = select;
        this.updateView();
    }

    public onGetSelect():boolean{
        return this._selectFlag;
    }

    private updateView(){
        if(this._selectFlag){
            this._bg.texture = RES.getRes(this._bgSelectName);
            this._bitmap.texture = RES.getRes(this._selectedBitmapName);
        }else{
            this._bg.texture = RES.getRes(this._bgNormalName);
            this._bitmap.texture = RES.getRes(this._normalBitmapName);
        }
    }
}