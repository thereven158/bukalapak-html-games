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

        this.Moon = this.scene.add.image(this.ScreenUtility.GameWidth, 0, 'bg_moon');
        this.Moon.setScale(this.ScreenUtility.ScalePercentage);
        this.Moon.setOrigin(1,0);

        this.Land = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_titleland');
        this.Land.setScale(this.ScreenUtility.ScalePercentage);
        this.Land.setOrigin(0.5,1);

        this.GameLogo = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.6, 'logo_game');
        this.GameLogo.displayWidth = this.ScreenUtility.GameWidth * 0.8;
        this.GameLogo.displayHeight = this.GameLogo.displayWidth * (this.GameLogo.height/this.GameLogo.width);
        this.GameLogo.setOrigin(0.5,1);
        this.GameLogo.setAlpha(0.5);
        this.GameLogo.scaleX = 0;

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight  - this.Land.displayHeight * 0.7, 'btn_play');
        this.ButtonPlay.setAudioActive(false);

        this.scene.tweens.add({
            targets:  this.GameLogo,
            y: this.ScreenUtility.GameHeight * 0.45,
            alpha: 1,
            scaleX: 1,
            duration: 600,
            ease: Phaser.Math.Easing.Back.Out,
		});	

     }

     onClickPlay(event){
        this.ButtonPlay.OnClick(event);
     }
     
};
