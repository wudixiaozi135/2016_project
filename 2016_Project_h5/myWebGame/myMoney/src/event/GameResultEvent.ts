/**
 * Created by lx on 2015/1/26.
 */
class GameResultEvent extends egret.Event{
    public static RPLAYGAMEEVENT:string = "rplayGame";
    public static ONSHARETOFRIENDS:string = "onShareToFriends";
    public constructor(type:string,bubbles:boolean=false,cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}