import TitleSceneController from "./title_scene_controller";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";
import Button from "../../module/objects/button";

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
        this.Background = new Image(this.scene, this.ScreenUtility.CenterX, 0, 'bg_title');
        this.Background.setMinPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Background.setOrigin(0.5,0);

        let light = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.6, 'title_light');
        light.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.9, this.ScreenUtility.GameHeight * 0.5);
        this.scene.tweens.add({
            targets: light,
            angle: 360,
            duration: 7000,
            ease: Phaser.Math.Easing.Linear.Linear,
            loop: -1,
        });
        
        let gameLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.25, 'logo_title');
        gameLogo.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.7, this.ScreenUtility.GameHeight * 0.4);

        let box = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.6, 'title_box');
        box.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.4, this.ScreenUtility.GameHeight * 0.4);

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.85 , 'btn_main');
        this.ButtonPlay.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
        this.ButtonPlay.setAudioActive(false);

        let joystick = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_joystick');
        joystick.setDisplayWidth(this.ScreenUtility.GameWidth , true);
        joystick.setOrigin(0.5,1);

    }

    OnClickPlay(event){
        this.ButtonPlay.onClick(event);
    }
};
