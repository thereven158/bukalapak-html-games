import GameplaySceneController from "./gameplay_scene_controller";
import Button from "../../module/objects/button";
import Minion from '../../gameobject/Minion';

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
        this.background = this.scene.add.image(this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 'background');

        this.timerWindow = this.scene.add.image(0, 0, 'ui-timer');
          this.timerWindow.displayWidth = 500;
        this.timerWindow.setPosition(this.ScreenUtility.GameWidth - this.timerWindow.displayWidth /2, 
            0 + this.timerWindow.displayHeight /2);

        this.textTimer = this.scene.add.text(this.timerWindow.x / 1.275,
          this.timerWindow.y / 2, 
          "90.00", 
          { fontSize: "125px", fill: "#fff" });
        this.textTimer.setDepth(1);

        this.scoreWindow = this.scene.add.image(0, 0, 'ui-score');
        this.scoreWindow.setPosition(this.scoreWindow.displayWidth / 2,
        this.scoreWindow.displayHeight / 2);

        this.scoreText = this.scene.add.text(this.scoreWindow.x,
          this.scoreWindow.y + 20, 
          "0", 
          { fontSize: "100px", fill: "#fff" });
        this.scoreText.setDepth(1);

        this.baloon = this.scene.add.sprite(this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'baloon');
        this.baloon.setDepth(0);

        this.pump = new Button(this.scene, 
          this.ScreenUtility.CenterX + this.ScreenUtility.CenterX / 2, 
          this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 4, 
          'pump');
        this.pump.setDepth(2);

        this.lever = this.scene.add.image(this.pump.x - 55,
          this.pump.y - 170,
          'lever');
         this.lever.setDepth(1);  
        
        this.miniun = new Minion(this.scene,
          this.ScreenUtility.CenterX - this.ScreenUtility.CenterX / 2, 
          this.pump.y + 200);

        console.log(this.miniun);
     }

     onClickPumped(event){
      this.pump.OnClick(event);
     }

     createBaloon(){
      this.baloon = this.scene.add.sprite(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'baloon');
     }

     TimesUp(){
      this.TimesUpBar = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'times-up');
      this.TimesUpBar.displayWidth = this.ScreenUtility.GameWidth;
      this.TimesUpBar.displayHeight = this.TimesUpBar.displayWidth * (this.TimesUpBar.height / this.TimesUpBar.width);
      this.TimesUpBar.setDepth(1);
     }
};
