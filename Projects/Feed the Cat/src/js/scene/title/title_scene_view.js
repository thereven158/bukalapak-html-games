import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";
import Image from '../../module/objects/image';

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
        //this.logo = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'logo');
		
		this.background = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'title_background');
      	this.background.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
		
		this.lightEffect = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.09, 'light');
		this.lightEffect.setOrigin(0.5, 0.5);
		this.lightEffect.setDisplayWidth(this.ScreenUtility.GameWidth * 1, true);	
      	this.lightEffect.alpha = 0.2;
		var tween = this.scene.tweens.add({
			targets: this.lightEffect,
			angle: 359,
			duration: 3000,
			ease: 'Linear',
			loop: -1
		});
		
		this.minionLogo = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.6, 'minion_feed');
		this.minionLogo.setOrigin(0.5, 0.5);	
      	this.minionLogo.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);	
		
		this.lightEffect.setPosition(this.minionLogo.x, this.minionLogo.y);
		
		this.titleLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.09, 'title_logo');
		this.titleLogo.setOrigin(0.5, 0);	
      	this.titleLogo.setDisplayWidth(this.ScreenUtility.GameWidth * 0.8, true);	
		
		this.buttonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.88, 'start_button');
		this.buttonPlay.setOrigin(0.5, 1);	
      	this.buttonPlay.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);					
    }

    OnClickPlay(event){
        //this.logo.onClick(event);
    }
};
