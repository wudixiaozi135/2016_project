/**
 *
 * 声音管理类
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    var d = __define,c=SoundManager,p=c.prototype;
    /**播放音效*/
    SoundManager.playEffect = function (name, value) {
        if (value === void 0) { value = 1; }
        //判断音效按钮是否静音，是则return 否则播放
        var sound_eff = RES.getRes(name);
        sound_eff.type = egret.Sound.EFFECT;
        sound_eff.play(value);
    };
    /**播放背景音乐*/
    SoundManager.playBgSound = function (name, loop) {
        if (loop === void 0) { loop = true; }
        this.sdbg = RES.getRes(name);
        this.sdbg.type = egret.Sound.MUSIC;
        this.soundChannel = this.sdbg.play(0, loop ? 0 : 1);
    };
    /**停止背景音乐*/
    SoundManager.stopBgSound = function () {
        if (this.soundChannel) {
            this.soundChannel.stop();
        }
    };
    return SoundManager;
}());
egret.registerClass(SoundManager,'SoundManager');
//# sourceMappingURL=SoundManager.js.map