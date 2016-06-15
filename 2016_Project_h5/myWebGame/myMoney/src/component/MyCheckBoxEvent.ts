/**
 * Created by lx on 2015/1/24.
 */
class MyCheckBoxEvent extends egret.Event{
    public static CHACKBOXCHANGEEVENT:string = "chackBoxChange";
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}