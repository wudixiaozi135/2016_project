/**
 * Created by lx on 2015/1/23.
 */
class CommonButton extends egret.Sprite{
    private tf:egret.TextField;
    public constructor(){
        super();
    }

    public onSetBgAndText(name:string,txt:string,width:number,height:number,s9Flag:boolean=false,b1:number=0,b2:number=2,b3:number=0,b4:number=0){
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes(name);
        if(s9Flag){
            var rect:egret.Rectangle = new egret.Rectangle(b1,b2,b3,b4);
            bg.scale9Grid = rect;
        }
        bg.width = width;
        bg.height = height;
        this.addChild(bg);

        this.tf = new egret.TextField();
        this.tf.text = txt;
        this.tf.width = width;
        this.tf.textAlign = "center";
        this.tf.y = (height-this.tf.height)/2;
        this.addChild(this.tf);
    }

    public setText(txt:string){
        this.tf.text = txt;
    }

    public getText():string{
        return this.tf.text;
    }
}