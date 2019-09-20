import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;

     }

     create(){
        this.InitScreen();
      
     }

     InitScreen(){
        this.Background = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_title');
        this.Background.displayWidth = this.ScreenUtility.GameWidth;
        this.Background.displayHeight =this.ScreenUtility.GameHeight;

        this.Light = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'title_light');
        this.Light.displayWidth = this.ScreenUtility.GameWidth * 0.45;
        this.Light.displayHeight = this.Light.displayWidth * (this.Light.height/this.Light.width);
        this.Light.setScale(this.ScreenUtility.ScalePercentage);

        this.Character = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'title_character');
        this.Character.displayWidth = this.ScreenUtility.GameWidth * 0.6;
        this.Character.displayHeight = this.Character.displayWidth * (this.Character.height/this.Character.width);
        this.Character.setScale(this.ScreenUtility.ScalePercentage);

        this.Moon = this.scene.add.image(this.ScreenUtility.GameWidth, 0, 'bg_moon');
        this.Moon.setScale(this.ScreenUtility.ScalePercentage);
        this.Moon.setOrigin(1,0);

        this.Land = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_titleland');
        this.Land.setScale(this.ScreenUtility.ScalePercentage);
        this.Land.setOrigin(0.5,1);

        let gameLogoPosY = this.Character.y - (this.ScreenUtility.CenterY + this.Character.displayHeight * 0.5) * 0.5;
        this.GameLogo = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.6, 'logo_game');
        this.GameLogo.displayWidth = this.ScreenUtility.GameWidth * 0.6;
        this.GameLogo.displayHeight = this.GameLogo.displayWidth * (this.GameLogo.height/this.GameLogo.width);
        //this.GameLogo.setOrigin(0.5,1);
        this.GameLogo.setAlpha(0.5);
        let gamelogoScaleX = this.GameLogo.scaleX;
        this.GameLogo.scaleX = 0;

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX,  this.Character.y  + (this.ScreenUtility.CenterY + this.Character.displayHeight * 0.5) * 0.5, 'btn_play');
        this.ButtonPlay.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8)
        this.ButtonPlay.setAudioActive(false);

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
        this.ButtonPlay.OnClick(event);
     }
     
};
