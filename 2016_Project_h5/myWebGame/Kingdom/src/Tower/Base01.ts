/**
 *
 * 地基01
 * @author 
 *
 */
class Base01 extends Base{
    
	public constructor() {
        super();
        this.cacheAsBitmap = true;
        var bm: egret.Bitmap = Utils.createBitmapByName("empty01");
        this.anchorOffsetX =this.width* 0.5;
        this.anchorOffsetY = this.height;
        this.addChild(bm);
	}
	
    public onEnterFrame(advancedTime:number){
        
    }
    
    
}
