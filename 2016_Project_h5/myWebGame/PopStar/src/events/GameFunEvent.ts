/**
 * Created by longxing on 2015/4/9.
 */
class GameFunEvent extends egret.Event{
    public static GAME_FUN_EVENT_START:string = "gameFun_start";
    public static GAME_EVENT_USETOOL_CHUI:string = "game_useTool_chui";
    public static GAME_EVENT_RESET:string = "game_reset";
    public static GAME_EVENT_PAUSE:string = "game_pause";
    public static GAME_EVENT_MAINMENU:string = "game_mainmenu";
    public static GAME_EVENT_CLEAR:string = "game_clear";
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false){
        super(type,bubbles,cancelable);
    }
}