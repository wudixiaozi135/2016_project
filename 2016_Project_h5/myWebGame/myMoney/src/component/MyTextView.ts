/**
 * Created by lx on 2015/1/24.
 */
class MyTextView extends egret.Sprite{
    private _bg:egret.Bitmap;
    private _externalImg:egret.Bitmap;
    private _externalImgAlign:string = "left";
    private _textField:egret.TextField;
    public constructor(){
        super();

        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this._textField = new egret.TextField();
        this.addChild(this._textField);
    }

    public onSetBg(bgImg:string,height:number,scale9Flag:boolean=false,r1:number=0,r2:number=0,r3:number=0,r4:number=0){

        this._bg.texture = RES.getRes(bgImg);

        if(scale9Flag){
            var rect:egret.Rectangle = new egret.Rectangle(r1,r2,r3,r4);
            this._bg.scale9Grid = rect;
        }
        this._bg.height = height;

        this.updateLayout();
    }

    public onSetExternalImage(externalImg:string,align:string,width:number,height:number,scale9Flag:boolean=false,r1:number=0,r2:number=0,r3:number=0,r4:number=0){
        this._externalImg = new egret.Bitmap();
        this._externalImg.texture = RES.getRes(externalImg);
        this.addChild(this._externalImg);
        if(scale9Flag){
            var rect:egret.Rectangle = new egret.Rectangle(r1,r2,r3,r4);
            this._externalImg.scale9Grid = rect;
        }
        this._externalImg.width = width;
        this._externalImg.height = height;
        this._externalImgAlign = align;

        this.updateLayout();
    }

    public text(txt:string){
        this._textField.text = txt;
        this.updateLayout();
    }

    private updateLayout(){
        var bgWidth:number=0;
        if(this._externalImg){
            bgWidth += this._externalImg.width;
            bgWidth += 5;
        }

        bgWidth += this._textField.width;
        bgWidth += 10;

        if(this._bg){
            this._bg.width = bgWidth;
        }

        if(this._externalImg){
            if(this._externalImgAlign == 'left'){
                this._externalImg.x = 5;
                this._externalImg.y = (this._bg.height-this._externalImg.height)/2;
                this._textField.x = this._externalImg.width + 10;
                this._textField.y = (this._bg.height-this._textField.height)/2;;
            }else{
                this._externalImg.x = this._bg.width - this._externalImg.width - 5;
                this._externalImg.y = (this._bg.height-this._externalImg.height)/2;
                this._textField.x = 5;
                this._textField.y = (this._bg.height-this._textField.height)/2;;
            }
        }else{
            this._textField.x = 5;
            this._textField.y = (this._bg.height-this._textField.height)/2;
        }
    }

    public getTextField():egret.TextField{
        return this._textField;
    }
}