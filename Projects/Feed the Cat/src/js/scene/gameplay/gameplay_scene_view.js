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
        this.InitScreen();
        
        return this;
    }
    
    InitScreen(){
		this.background = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'gameplay_background');
      	this.background.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
		
		this.initMinion();
		
		this.InitTopUiScreen();
    }
	
	InitTopUiScreen()
	{
		this.topUiPanel = new Image(this.scene, 0, 0, 'top_ui_panel');
		this.topUiPanel.setOrigin(0, 0);
      	this.topUiPanel.setDisplayWidth(this.ScreenUtility.GameWidth * 1, true);		
		
		this.scoreOrnament = new Image(this.scene, 0, 0, 'score_ui_ornament');
		this.scoreOrnament.setOrigin(0, 0);
      	this.scoreOrnament.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);			
		
		this.scorePanel = new Image(this.scene, this.ScreenUtility.GameWidth * 0.00, this.ScreenUtility.GameHeight * 0.00, 'score_ui');
		this.scorePanel.setOrigin(0, 0);
      	this.scorePanel.setDisplayWidth(this.ScreenUtility.GameWidth * 0.35, true);
		
		this.timerPanel = new Image(this.scene, this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight * 0.00, 'timer_ui');
		this.timerPanel.setOrigin(1, 0);
      	this.timerPanel.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);	
		
		this.scoreOrnament.setPosition(this.scorePanel.x, this.scorePanel.y);
	}
	
	initMinion()
	{
		this.afterMinionResponseEvent = null;
		
		this.initMinionAnimation();

		this.minion = new Sprite(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'minion_player');
		this.minion.setOrigin(0.5, 1);
      	this.minion.setDisplayWidth(this.ScreenUtility.GameWidth, 1);		
		
		this.minion.anims.play("minion_idle");	
		
		this.minion.on("animationcomplete", (anim) => {
			
			if (anim.key != "minion_eat" && anim.key != "minion_idle")
			{
				if (this.afterMinionResponseEvent) this.afterMinionResponseEvent();
			}
			
			this.minion.anims.play("minion_idle");
		}, this);			
	}
	
	setMinionEvents(afterMinionResponseEvent)
	{
		this.afterMinionResponseEvent = afterMinionResponseEvent;
	}
	
	initMinionAnimation()
	{
		this.scene.anims.create({
			key: 'minion_idle',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { start: 0, end: 8}),
			frameRate: 30,
			repeat: -1
		});		
		
		this.scene.anims.create({
			key: 'minion_eat',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: [9,10,11,11,11]}),
			frameRate: 10,
			repeat: 0,
		});
		
		this.scene.anims.create({
			key: 'minion_yummy',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: [12,13,14,14,14]}),
			frameRate: 5,
			repeat: 0,
		});
		
		this.scene.anims.create({
			key: 'minion_yucky',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: [16,17,18,19,20,20,20]}),
			frameRate: 5,
			repeat: 0,
		});		
	}

	setMinionEatAnimation()
	{
		this.minion.anims.play("minion_eat");
	}
	
    update(){
      
    }
};
