import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
        this.ScoreTxt = this.scene.add.text(this.ScreenUtility.GameWidth * 0.2, this.ScreenUtility.GameHeight * 0.1, this.scene.Score)
            .setFontSize(56)
            .setColor('#eeca83')
            .setAlign('center')
            .setFontFamily('panton_bold');
        this.ScoreTxt.setScale(this.ScreenUtility.ScalePercentage);
        this.ScoreTxt.setOrigin(0.5,0.5);

        this.TimerTxt = this.scene.add.text(this.ScreenUtility.GameWidth * 0.8, this.ScreenUtility.GameHeight * 0.1, this.scene.Timer)
            .setFontSize(56)
            .setColor('#eeca83')
            .setAlign('center')
            .setFontFamily('panton_bold');
        this.TimerTxt.setScale(this.ScreenUtility.ScalePercentage);
        this.TimerTxt.setOrigin(0.5,0.5);
     }

     InitScreen(){
         
     }

     update(){
        this.TimerTxt.setText(Phaser.Math.FloorTo(this.scene.Timer));
        this.ScoreTxt.setText(this.scene.Score);
     }

};
