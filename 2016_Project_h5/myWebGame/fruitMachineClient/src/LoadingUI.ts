class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.textAlign = "left";
    }

    public setProgress(current, total):void {
        this.textField.text = "Loading..." + current + "/" + total;
    }
}
