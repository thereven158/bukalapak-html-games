import GameplaySceneController from "./gameplay_scene_controller";
import Button from "../../module/objects/button";

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

        this.scoreText = this.scene.add.text(this.ScreenUtility.CenterX - this.ScreenUtility.GameWidth / 3,
          this.ScreenUtility.CenterY - this.ScreenUtility.GameHeight / 2.25, 
          "0", 
          { fontSize: "100px", fill: "#fff" });
        this.scoreText.setDepth(1);

        this.baloon = this.scene.add.sprite(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'baloon');

        this.pump = new Button(this.scene, 
          this.ScreenUtility.GameWidth / 1.75, 
          this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 3, 
          'pump');
     }

     onClickPumped(event){
      this.pump.OnClick(event);
     }

     createBaloon(){
      this.baloon = this.scene.add.sprite(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'baloon');
     }
};
