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
      	this.background.setDisplayWidth(this.ScreenUtility.GameWidth, true);
		
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
		
		this.minionLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.6, 'minion_feed');
		this.minionLogo.setOrigin(0.5, 0.5);	
      	this.minionLogo.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.8, this.ScreenUtility.GameHeight * 0.7);	
		
		
		this.lightEffect.setPosition(this.minionLogo.x, this.minionLogo.y);
		
		this.titleLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.09, 'title_logo');
		this.titleLogo.setOrigin(0.5, 0);	
      	this.titleLogo.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.9, this.ScreenUtility.GameHeight * 0.3);	
		
		this.buttonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.88, 'start_button');
		this.buttonPlay.setOrigin(0.5, 1);	
      	this.buttonPlay.Image.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.6, this.ScreenUtility.GameHeight * 0.1);
		
		this.bottomTable = new Image(this.scene, this.buttonPlay.x, this.buttonPlay.y-this.buttonPlay.Image.displayHeight*0.75, 'title_table');
		this.bottomTable.setOrigin(0.5, 0);	
      	this.bottomTable.setDisplayWidth(this.ScreenUtility.GameWidth, true);
		
		this.buttonPlay.setDepth(10);
    }

    OnClickPlay(event){
        //this.logo.onClick(event);
    }
};
