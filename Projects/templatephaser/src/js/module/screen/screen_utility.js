import { DeviceHelper } from "../../helper/device_Helper";

export default class ScreenUtility{
    /**
	 * @returns {ScreenUtility}
	 */
	static getInstance = () => {
		if (!ScreenUtility.instance) {
            ScreenUtility.instance = new ScreenUtility();
        }

		return ScreenUtility.instance;
    };

    /**@param {Phaser.Scene} scene */
    init(scene)
    {
        this.scene = scene;
        this.GameDefaultWidth = 1080;
        this.GameDefaultHeight = 1920;
        this.GameWidth = scene.game.config.width;
        this.GameHeight = scene.game.config.height;

        this.CenterX = this.GameWidth * 0.5;
        this.CenterY = this.GameHeight * 0.5;

        this.ScalePercentage = this.GameWidth / this.GameDefaultWidth;
        this.InverseScalePercentage = Phaser.Math.Difference(this.ScalePercentage, 1);
    }

    static ResetGameScreen(){
        window.focus();
        if(DeviceHelper.Env.iOS()){
            window.scrollTo(0, document.body.scrollHeight);
        }else{
            window.scrollTo(0, 0);
        }
    }

    
}