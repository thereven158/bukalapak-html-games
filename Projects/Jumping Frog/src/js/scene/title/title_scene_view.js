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
    create = ()=>{
        this.initScreen();
        
        return this;
    }

    initScreen = ()=>{
		this.background = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'title_background');
      	this.background.setDisplayWidth(this.ScreenUtility.GameWidth, true);
		if (this.background.height < this.ScreenUtility.GameHeight) this.background.setDisplayHeight(this.ScreenUtility.GameHeight, true);
		
		this.minionLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.65, 'title_minion');
		this.minionLogo.setOrigin(0.5, 0.5);	
      	this.minionLogo.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.8, this.ScreenUtility.GameHeight * 0.45);	
		
		this.titleLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.09, 'title_logo');
		this.titleLogo.setOrigin(0.5, 0);	
      	this.titleLogo.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.9, this.ScreenUtility.GameHeight * 0.3);		
		
		this.buttonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.88, 'start_button');
		this.buttonPlay.setOrigin(0.5, 1);	
      	this.buttonPlay.Image.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.6, this.ScreenUtility.GameHeight * 0.1);	
    }

    OnClickPlay = (event) =>{
        //this.logo.onClick(event);
    }
};
