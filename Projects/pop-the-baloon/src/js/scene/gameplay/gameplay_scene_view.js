import GameplaySceneController from "./gameplay_scene_controller";
import Button from "../../module/objects/button";
import Minion from '../../gameobject/Minion';
import Baloon from '../../gameobject/Baloon';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';


export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
       this.leverTween;
     }

     create(){
        this.background = new Image(this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'background');
        this.background.setDisplaySize(this.ScreenUtility.GameWidth, 
          this.ScreenUtility.GameHeight);

        this.timerWindow = new Image(this.scene, 0, 0, 'ui-timer');
        this.timerWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
        this.timerWindow.setPosition(
          this.ScreenUtility.GameWidth - this.timerWindow.displayWidth / 2,
          0 + this.timerWindow.displayHeight / 2);

        this.textTimer = new Text(this.scene,
          this.timerWindow.x / 0.97,
          this.timerWindow.y / 1.15, 
          "90.00", 
          { align:'center', fontFamily: 'panton', color: '#f9d023' })
          .setFontSizeR(130);
        this.textTimer.setDepth(1);
        this.textTimer.setOrigin(0.5, 0.5);

        this.scoreWindow = new Image(this.scene, 0, 0, 'ui-score');
        this.scoreWindow.setPosition(this.scoreWindow.displayWidth / 2,
        this.scoreWindow.displayHeight / 2);
        this.scoreWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);

        this.scoreText = new Text(this.scene,
          this.scoreWindow.x / 1.05,
          this.scoreWindow.y / 0.9, 
          "0", 
          { align:'center', fontFamily: 'panton', color: '#f9d023' })
          .setFontSizeR(100);
        this.scoreText.setDepth(1);

        this.createBaloon();

        this.pump = new Image(this.scene, 0,0,'pump');
        this.pump.setDepth(2);
        this.pump.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
        this.pump.setPosition(
          this.ScreenUtility.CenterX + this.ScreenUtility.CenterX / 2.5, 
          this.ScreenUtility.CenterY + this.ScreenUtility.CenterY / 2);
        this.pump.setInteractive();

        this.lever = this.scene.add.image(this.pump.x - 55,
          this.pump.y - 170,
          'lever');

        this.lever.displayWidth = this.ScreenUtility.GameWidth * 0.2;
        this.lever.displayHeight = this.lever.displayWidth * (this.lever.height/this.lever.width);
        this.lever.setDepth(1);  

        console.log(this.lever.width);
        console.log(this.lever.height);
        
        this.miniun = new Minion(this.scene,
          this.ScreenUtility.CenterX - this.ScreenUtility.CenterX / 2, 
          this.pump.y + 200);
        this.miniun.displayWidth = this.ScreenUtility.GameWidth * 0.5;
        this.miniun.displayHeight = this.miniun.displayWidth * (this.miniun.height/this.miniun.width);
        
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

     createBaloon(){
      this.baloon = new Baloon(this.scene,
        this.ScreenUtility.CenterX,
        this.ScreenUtility.CenterY);
      this.baloon.displayWidth = this.ScreenUtility.GameWidth * 0.5;
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

     BaloonTween(){
      this.scene.tweens.add({
        targets: this.baloon ,
        scale: this.baloon.scale + 0.1,
        ease: 'Linear',
        duration: 150,
      });
     }
};
