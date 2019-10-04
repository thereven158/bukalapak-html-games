import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button"; 
import Image from '../../module/objects/image';

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;

     }

     create(){
        this.Background = new Image (this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'background_menu');
        this.Background.setDisplaySize(this.ScreenUtility.GameWidth, 
          this.ScreenUtility.GameHeight);

        this.Light = new Image (this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'title_light');
        this.Light.setDisplayWidth(this.ScreenUtility.GameWidth * 0.45, true);
        this.Light.setScale(this.ScreenUtility.ScalePercentage);

        this.mainPicture = new Image (this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'main_picture');
        this.mainPicture.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);
        // this.mainPicture.setScale(this.ScreenUtility.ScalePercentage); 

        let gameLogoPosY = this.mainPicture.y - (this.ScreenUtility.CenterY + this.mainPicture.displayHeight * 0.5) * 0.5;
        this.GameLogo = new Image (this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.GameHeight, 
          'logo_game');
        this.GameLogo.setDisplayWidth(this.ScreenUtility.GameWidth * 0.7, true);
        this.GameLogo.setAlpha(0.5);
        let gamelogoScaleX = this.GameLogo.scaleX;
        this.GameLogo.scaleX = 0;

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX,  this.mainPicture.y  + (this.ScreenUtility.CenterY + this.mainPicture.displayHeight * 0.5) * 0.5, 'btn_play');
        this.ButtonPlay.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8)
        // this.ButtonPlay.setAudioActive(false);

        this.scene.tweens.add({
          targets:  this.GameLogo,
          y: gameLogoPosY,
          alpha: 1,
          scaleX: gamelogoScaleX,
          duration: 600,
          ease: Phaser.Math.Easing.Back.Out,
        });	
      
        this.scene.tweens.add({
            targets:  this.Light,
            angle: 360,
            duration: 7000,
            ease: Phaser.Math.Easing.Linear.Linear,
            loop: -1,
        });

     }

     onClickPlay(event){
      this.ButtonPlay.onClick(event);
     }
     
};
