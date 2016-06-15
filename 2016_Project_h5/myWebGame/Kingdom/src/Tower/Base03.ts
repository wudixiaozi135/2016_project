/**
 *
 * 地基02
 * @author 
 *
 */
class Base03 extends Base{
    
	public constructor() {
        super();
        this.cacheAsBitmap = true;
        var bm: egret.Bitmap = Utils.createBitmapByName("Base03");
		this.anchorOffsetX =this.width* 0.5;
		this.anchorOffsetY = this.height;
        this.addChild(bm);
	}
	
    public onEnterFrame(advancedTime:number){
        
    }
    
    
}
