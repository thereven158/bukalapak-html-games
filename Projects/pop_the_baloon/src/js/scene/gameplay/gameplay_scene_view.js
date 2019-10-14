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
       this.temp = 0;
     }

     create(){
        this.background = new Image(this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'background');
        this.background.setDisplaySize(this.ScreenUtility.GameWidth, 
          this.ScreenUtility.GameHeight);

        this.timerWindow = new Image(this.scene, 0, 0, 'ui-timer');
        this.timerWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
        this.timerWindow.setPosition(
          this.ScreenUtility.GameWidth - this.timerWindow.displayWidth / 2,
          0 + this.timerWindow.displayHeight / 2);

        this.textTimer = new Text(this.scene,
          this.timerWindow.x / 0.97,
          this.timerWindow.y / 1.15, 
          "90.00", 
          { align:'center', fontFamily: 'panton', color: '#f9d023' })
          .setFontSizeRS(100);
        this.textTimer.setDepth(1);

        this.scoreWindow = new Image(this.scene, 0, 0, 'ui-score');
        this.scoreWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
        this.scoreWindow.setPosition(this.scoreWindow.displayWidth / 2,
          this.scoreWindow.displayHeight / 2);

        this.scoreText = new Text(this.scene,
          this.scoreWindow.x * 1.08,
          this.scoreWindow.y * 1.45, 
          "0", 
          { align:'center', fontFamily: 'panton', color: '#f9d023' })
          .setFontSizeRS(90);
        this.scoreText.setDepth(1);

        this.pump = new Image(this.scene, 0,0,'pump');
        this.pump.setDepth(2);
        this.pump.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
        this.pump.setPosition(
          this.ScreenUtility.CenterX + this.ScreenUtility.CenterX / 2.85, 
          this.ScreenUtility.CenterY + this.ScreenUtility.CenterY / 1.75);
        this.pump.setInteractive();

        this.lever = new Image(this.scene, 0, 0, 'lever');
        this.lever.setDisplayWidth(this.ScreenUtility.GameWidth * 0.15, true);
        this.lever.setDepth(1);  
        this.lever.setPosition(this.pump.x - this.pump.displayWidth * 0.31 * 0.31,
          this.pump.y - this.pump.displayHeight * 0.4 * 0.5);

        this.createBaloon();
        
        this.miniun = new Minion(this.scene, 0, 0);
        this.miniun.setDisplayWidth(this.ScreenUtility.GameWidth * 0.3, true);
        this.miniun.setPosition(
          this.ScreenUtility.CenterX - this.ScreenUtility.CenterX / 2, 
          this.ScreenUtility.CenterY + this.ScreenUtility.CenterY / 1.4);
        
        this.miniun.Idle();

        this.leverTween = this.scene.tweens.add({
          targets:  this.lever,
          y: this.pump.y - 30,
          yoyo: true,
          duration: 250,
          ease: 'Power1',
          repeat: 0,
        });

        this.leverTween.pause();
     }

     createBaloon(){
      this.baloon = new Baloon(this.scene, 0, 0);
      this.baloon.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);

      this.baloon.setPosition(
        this.pump.x - this.pump.displayWidth / 2.25 , 
        this.pump.y - this.pump.displayHeight / 1.45);
      
      this.baloon.setDepth(3);
     }

     TimesUpBanner(){
      this.TimesUpBar = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'times-up');
      this.TimesUpBar.displayWidth = this.ScreenUtility.GameWidth;
      this.TimesUpBar.displayHeight = this.TimesUpBar.displayWidth * (this.TimesUpBar.height / this.TimesUpBar.width);
      this.TimesUpBar.setDepth(8);

      this.timesUpText = new Text(this.scene,
        this.TimesUpBar.x,
        this.TimesUpBar.y, 
        "Time's Up", 
        { align:'center', fontFamily: 'panton', color: '#f9d023' })
        .setFontSizeRS(120);
      this.timesUpText.setDepth(9);
     }

     WinBanner(){
      this.TimesUpBar = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'times-up');
      this.TimesUpBar.displayWidth = this.ScreenUtility.GameWidth;
      this.TimesUpBar.displayHeight = this.TimesUpBar.displayWidth * (this.TimesUpBar.height / this.TimesUpBar.width);

      this.TimesUpBar.setDepth(8);

      this.timesUpText = new Text(this.scene,
        this.TimesUpBar.x,
        this.TimesUpBar.y, 
        "Task Complete", 
        { align:'center', fontFamily: 'panton', color: '#f9d023' })
        .setFontSizeRS(120);
      this.timesUpText.setDepth(9);
     }

     LeverTween(){
      this.leverTween.restart();
     }

     BaloonTween(){
      this.temp += 19;

      // if(this.temp >= 115){
      //   this.temp = 115
      //   console.log(this.baloon.x);
      // console.log(this.baloon.y);
      // }
      this.scene.tweens.add({
        targets: this.baloon ,
        scale: this.baloon.scale + 0.06,
        y: this.pump.y - this.pump.displayHeight / 1.45 - this.temp,
        yoyo: false,
        ease: 'Power1',
        duration: 150,
      });

      
     }
};
