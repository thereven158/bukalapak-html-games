import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";
import Image from "../../module/objects/image";

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;

     }

     /** @return {TitleSceneView} */
     create(){
        this.InitScreen();

        return this;
     }

     InitScreen(){
        let background = new Image(this.scene, this.ScreenUtility.CenterX, 0, 'bg_title');
        background.setMinPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        background.setOrigin(0.5,0);

        let light = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.55, 'title_light');
        light.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.9, this.ScreenUtility.GameHeight * 0.7);

        let character = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.55, 'title_character');
        character.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.4);

        let moon = new Image(this.scene, this.ScreenUtility.GameWidth, 0, 'bg_moon');
        moon.setOrigin(1,0);

        let land = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_titleland');
        land.setOrigin(0.5,1);


        let gameLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.2, 'logo_game');
        gameLogo.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.8, this.ScreenUtility.GameHeight * 0.4);
        gameLogo.setAlpha(0.5);
        let gameLogoPosY = gameLogo.y;
        let gamelogoScaleX = gameLogo.scaleX;
        gameLogo.scaleX = 0;

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.85, 'btn_play');
        this.ButtonPlay.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
        this.ButtonPlay.setAudioActive(false);

        this.scene.tweens.add({
            targets:  gameLogo,
            y: gameLogoPosY,
            alpha: 1,
            scaleX: gamelogoScaleX,
            duration: 600,
            ease: Phaser.Math.Easing.Back.Out,
        });	
        
        this.scene.tweens.add({
            targets:  light,
            angle: 360,
            duration: 7000,
            ease: Phaser.Math.Easing.Linear.Linear,
            loop: -1,
        });		
     }

     OnClickPlay(event){
        this.ButtonPlay.onClick(event);
     }
     
};
