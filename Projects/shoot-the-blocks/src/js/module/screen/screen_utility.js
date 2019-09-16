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
    Init(scene)
    {
        this.scene = scene;
        this.GameDefaultWidth = 1080;
        this.GameDefaultHeight = 1920;
        this.GameWidth = scene.cameras.main.width;
        this.GameHeight = scene.cameras.main.height;

        this.CenterX = this.GameWidth * 0.5;
        this.CenterY = this.GameHeight * 0.5;

        this.ScalePercentage = this.GameWidth / this.GameDefaultWidth;
    }
}