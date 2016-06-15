/**
 * Created by lx on 2015/1/23.
 */
class OpenGameViewEvent extends egret.Event{
    public static OPENGAMEVIEW:string = "openGameView";
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}