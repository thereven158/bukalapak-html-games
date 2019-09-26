import GameplaySceneController from "./gameplay_scene_controller";
import Button from "../../module/objects/button";
import Minion from '../../gameobject/Minion';
import Baloon from '../../gameobject/Baloon';

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
       this.leverTween;
     }

     create(){
        this.background = this.scene.add.image(this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 'background');
        this.background.displayWidth = this.ScreenUtility.GameWidth;
        this.background.displayHeight =this.ScreenUtility.GameHeight;

        this.timerWindow = this.scene.add.image(0, 0, 'ui-timer');
          this.timerWindow.displayWidth = 500;
        this.timerWindow.setPosition(this.ScreenUtility.GameWidth - this.timerWindow.displayWidth /2, 
            0 + this.timerWindow.displayHeight /2);

        this.textTimer = this.scene.add.text(this.timerWindow.x / 0.97,
          this.timerWindow.y / 1.15, 
          "90.00", 
          { fontSize: "110px", fill: "#fff" });
        this.textTimer.setDepth(1);
        this.textTimer.setOrigin(0.5, 0.5);

        this.scoreWindow = this.scene.add.image(0, 0, 'ui-score');
        this.scoreWindow.setPosition(this.scoreWindow.displayWidth / 2,
        this.scoreWindow.displayHeight / 2);

        this.scoreText = this.scene.add.text(this.scoreWindow.x / 1.05,
          this.scoreWindow.y / 0.9, 
          "0", 
          { fontSize: "100px", fill: "#fff" });
        this.scoreText.setDepth(1);

        this.createBaloon();

        // this.pump = new Button(this.scene, 
        //   this.ScreenUtility.CenterX + this.ScreenUtility.CenterX / 2.2, 
        //   this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 4, 
        //   'pump');
        // this.pump.setDepth(2);

        this.pump = this.scene.add.image(0,0,'pump');
        this.pump.setDepth(2);
        this.pump.displayWidth = this.ScreenUtility.GameWidth * 0.6;
        // this.pump.displayHeight = this.pump.width;
        this.pump.setPosition(
          this.ScreenUtility.CenterX + this.ScreenUtility.CenterX / 2, 
          this.ScreenUtility.CenterY + this.ScreenUtility.CenterY / 2);
        this.pump.setInteractive();
        console.log("width: " + this.pump.displayWidth);
        console.log("height: " + this.pump.displayWidth * (this.pump.height / this.pump.width ));

        console.log("game width: " + this.ScreenUtility.GameWidth);
        console.log("game height: " + this.ScreenUtility.GameHeight);

        this.lever = this.scene.add.image(this.pump.x - 55,
          this.pump.y - 170,
          'lever');
         this.lever.setDepth(1);  
        
        this.miniun = new Minion(this.scene,
          this.ScreenUtility.CenterX - this.ScreenUtility.CenterX / 2, 
          this.pump.y + 200);
        
        this.miniun.Idle();

        this.leverTween = this.scene.tweens.add({
          targets:  this.lever,
          y: this.lever.y + 100,
          yoyo: true,
          duration: 250,
          ease: 'Power1',
          repeat: 0,
        });

        this.leverTween.pause();
     }

    //  onClickPumped(event){
    //   this.pump.OnClick(event);
    //  }

     createBaloon(){
      this.baloon = new Baloon(this.scene,
        this.ScreenUtility.CenterX,
        this.ScreenUtility.CenterY);
      this.baloon.displayWidth = this.ScreenUtility.GameWidth * 0.6;
      this.baloon.displayHeight = this.baloon.displayWidth * (this.baloon.height/this.baloon.width);
     }

     TimesUp(){
      this.TimesUpBar = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'times-up');
      this.TimesUpBar.displayWidth = this.ScreenUtility.GameWidth;
      this.TimesUpBar.displayHeight = this.TimesUpBar.displayWidth * (this.TimesUpBar.height / this.TimesUpBar.width);
      this.TimesUpBar.setDepth(1);
     }

     LeverTween(){
      this.leverTween.restart();
     }
};
