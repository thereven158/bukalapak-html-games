import ScreenUtility from "../screen/screen_utility";

export default class Text extends Phaser.GameObjects.Text{
    
    /** 
    * @param {Phaser.Scene} scene 
    * @param {Number} x
    * @param {Number} y
    * @param {String} text
    * @param {Phaser.Types.GameObjects.Text.TextStyle} style
    */
    constructor(scene, x, y, text, style){
        super(scene, x, y, text, style);

        this.scene = scene;
        this.ScalePercentage = ScreenUtility.getInstance().ScalePercentage;

        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
    }

    /** @return {Phaser.GameObjects.Text} */
    setFontSizeR(size){
        this.setFontSize(size * this.ScalePercentage);
        return this;
    }

    /** @return {Phaser.GameObjects.Text} */
    setFontSizeRS(size, percent=1){
        this.setFontSize(size);
        this.setToResponsiveScale(percent);
        return this;
    }

    /** @return {Phaser.GameObjects.Text} */
    setToResponsiveScale(percent){
        this.setScale(this.ScalePercentage * percent);
        return this;
    }
    
    ResetScale(){
        this.setScale(1);
    }
}