/**
 * Created by longxing on 2015/4/9.
 */
class GameStarRender extends egret.Sprite{
    public _starType:number=0;//星星的类型
    private _starBitmap:egret.Bitmap;
    private _posX:number;//星星在界面布局中的位置X
    private _posY:number;//星星在界面布局中的位置Y
    public constructor(){
        super();

        this._starBitmap = new egret.Bitmap();
        this.addChild(this._starBitmap);
    }

    public onSetStarType(type:number){
        this._starType = type;
        if(this._starType == 0){
            this._starBitmap.texture = RES.getRes("block_blue");
        }else if(this._starType == 1){
            this._starBitmap.texture = RES.getRes("block_green");
        }else if(this._starType == 2){
            this._starBitmap.texture = RES.getRes("block_purple");
        }else if(this._starType == 3){
            this._starBitmap.texture = RES.getRes("block_red");
        }else{
            this._starBitmap.texture = RES.getRes("block_yellow");
        }
    }

    private _selectBmp:egret.Bitmap = new egret.Bitmap();
    public setStarSelected(select:boolean){
        if(select){
            if(this._selectBmp == null){
                this._selectBmp = new egret.Bitmap();
            }
            this._selectBmp.texture = RES.getRes("block_select");
            this.addChild(this._selectBmp);
        }else{
            if(this._selectBmp && this.contains(this._selectBmp)){
                this.removeChild(this._selectBmp);
            }
        }
    }

    public setStarSize(value:number){
        this._starBitmap.width = this._starBitmap.height = value;
        this._selectBmp.width = this._selectBmp.height = value;
    }

    public set posX(value:number){
        this._posX = value;
    }

    public get posX():number{
        return this._posX;
    }

    public set posY(value:number){
        this._posY = value;
    }

    public get posY():number{
        return this._posY;
    }
}