import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
      this.paddle = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.5, 
        'paddle')
        .setImmovable();

      
     }
};
