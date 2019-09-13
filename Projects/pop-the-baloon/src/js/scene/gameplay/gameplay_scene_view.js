import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
        this.textTimer = this.scene.add.text(this.ScreenUtility.GameWidth / 1.75,
          this.ScreenUtility.CenterY - this.ScreenUtility.GameHeight / 2.25, 
          "90.00", 
          { fontSize: "100px", fill: "#fff" });
        this.textTimer.setDepth(1);

        this.textScore = this.scene.add.text(this.ScreenUtility.CenterX - this.ScreenUtility.GameWidth / 3,
          this.ScreenUtility.CenterY - this.ScreenUtility.GameHeight / 2.25, 
          "0", 
          { fontSize: "100px", fill: "#fff" });
        this.textScore.setDepth(1);
     }
};
