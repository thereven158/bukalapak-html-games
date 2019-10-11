import GameplaySceneController from "./gameplay_scene_controller";

import Image from '../../module/objects/image';
import Sprite from '../../module/objects/sprite';
import Text from '../../module/objects/text';

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
      
    }

    /** @return {GameplaySceneView} */
    create(){
		this.afterDestroyEv = null;
		let defaultSizeRatio = this.ScreenUtility.GameDefaultWidth/this.ScreenUtility.GameDefaultHeight;		
		let curSizeRatio = this.ScreenUtility.GameWidth/this.ScreenUtility.GameHeight;
		
		this.defaultAndCurSizeRatio = defaultSizeRatio/curSizeRatio;
						
        this.initScreen();
        
        return this;
    }
    
    initScreen = ()=>{
		this.background = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'gameplay_background');
      	this.background.setMinPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
		
		this.landStart = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'land_start');
      	this.landStart.setDisplayWidth(this.ScreenUtility.GameWidth * 1, true);
		this.landStart.setOrigin(0.5, 1);
				
		this.initPlayer();		
		//this.initTopUiScreen();		
    }
	
	initPlayer()
	{
		this.player = new Sprite(this.scene, this.ScreenUtility.CenterX, this.landStart.y - this.landStart.displayHeight * 0.5, 'player_sprite');
      	this.player.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 0.45, this.ScreenUtility.GameHeight * 0.25);
		this.player.setOrigin(0.5, 0.6);
		
		this.scene.anims.create({
			key: 'player_idle',
			frames: this.scene.anims.generateFrameNumbers('player_sprite', { frames: [0,1,2,3,4,5,6]}),
			frameRate: 20,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'player_jump',
			frames: this.scene.anims.generateFrameNumbers('player_sprite', { frames: [12, 13]}),
			frameRate: 20,
			loop: -1
		});
		
		this.scene.anims.create({
			key: 'player_destroy',
			frames: this.scene.anims.generateFrameNumbers('player_sprite', { frames: [14,15,16,17,18,19,20,21,22,23,24,25,26,27]}),
			frameRate: 10,
			loop: 0
		});				
		
		this.player.on("animationcomplete", (anim) => {
			if (anim.key == "player_destroy")
			{
				if (this.afterDestroyEv) 
				{
					let isReturn = this.afterDestroyEv();
					if (isReturn) return;
				}
			}
		}, this);		
		
		this.player.anims.play("player_idle");
	}

	setAfterMinionDestroyEvent(ev)
	{
		this.afterDestroyEv = ev;
	}
	
	createAsteroid()
	{
		let asteroid = new Image(this.scene, 0, 0, 'asteroid_'+Math.floor(1+Math.random()*3));
		asteroid.setOrigin(0.5, 0.5);
		asteroid.oriWidth = asteroid.displayWidth;
		asteroid.setDisplayWidth(this.ScreenUtility.GameWidth * 0.45 * this.defaultAndCurSizeRatio, true);		
		
		return asteroid;
	}

	initTopUiScreen()
	{
		this.topUiPanel = new Image(this.scene, 0, 0, 'top_ui_panel');
		this.topUiPanel.setOrigin(0, 0);
      	this.topUiPanel.setDisplayWidth(this.ScreenUtility.GameWidth * 1, true);		
		
		this.scoreOrnament = new Image(this.scene, 0, 0, 'score_ui_ornament');
		this.scoreOrnament.setOrigin(0, 0);
      	this.scoreOrnament.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);
		
		//this.scoreOrnament.setPosition(this.scorePanel.x, this.scorePanel.y);
	}		

    update = ()=>{
      
    }
};
