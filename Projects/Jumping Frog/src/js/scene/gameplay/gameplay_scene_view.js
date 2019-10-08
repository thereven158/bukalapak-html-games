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
        this.initScreen();
        
        return this;
    }
    
    initScreen = ()=>{
		this.background = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'gameplay_background');
      	this.background.setDisplayWidth(this.ScreenUtility.GameWidth, true);
		if (this.background.height < this.ScreenUtility.GameHeight) this.background.setDisplayHeight(this.ScreenUtility.GameHeight, true);
		
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
		
		this.player.anims.play("player_idle");
	}
	
	createAsteroid()
	{
		let asteroid = new Image(this.scene, 0, 0, 'asteroid_1');
		asteroid.setOrigin(0.5, 0.5);
		asteroid.setDisplayWidth(this.ScreenUtility.GameWidth * 0.45, true);
		
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
