import LoadingSceneController from "./loading_scene_controller";

export default class LoadingSceneView{
   /** @param {LoadingSceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
    
    }

    create(){
        this.loadingScreen = this.scene.add.graphics();
        this.loadingScreen.fillStyle('0x00000', 1);
        this.loadingScreen.fillRect(0,0, this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);

        this.PercentText = this.scene.add.text(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, "0%")
          .setFontSize(60).setAlign('center').setFontFamily('arial').setColor('#ffffff');
        this.PercentText.setOrigin(0.5,0.5);
        
    }
    
    SetProgressText(value){
        this.PercentText.setText(parseInt(value * 100)+'%');
    }

};