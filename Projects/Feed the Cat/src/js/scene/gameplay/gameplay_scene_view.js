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
      	this.background.setDisplayWidth(this.ScreenUtility.GameWidth, true);
		
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

		//this.scoreOrnament.setPosition(this.scorePanel.x, this.scorePanel.y);
	}
	
	initMinion()
	{
		this.bottomTable = new Image(this.scene, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.85, 'bottom_table');
		this.bottomTable.setOrigin(0.5, 0);
      	this.bottomTable.setDisplayWidth(this.ScreenUtility.GameWidth, true);
		//this.bottomTable.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight * 0.2);
		
		this.afterMinionResponseEvent = null;
		this.afterMinionYummyResponseEvent = null;
		this.afterMinionYuckyResponseEvent = null;
		
		this.initMinionAnimation();

		this.minion = new Sprite(this.scene, this.ScreenUtility.CenterX,  this.ScreenUtility.GameHeight * 1.00, 'minion_player');
		this.minion.setOrigin(0.5, 1); // 1.00
		this.minion.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 1, this.ScreenUtility.GameHeight * 0.7);
		
		
		this.minion.anims.play("minion_idle");	
		
		this.minion.on("animationcomplete", (anim) => {
			
			if (anim.key != "minion_eat" && anim.key != "minion_idle")
			{
				if (anim.key == "minion_yummy")
				{
					if (this.afterMinionYummyResponseEvent) 
					{
						let isReturn = this.afterMinionYummyResponseEvent();
						if (isReturn) return;
					}
				}
				else if (anim.key == "minion_yucky")
				{
					if (this.afterMinionYuckyResponseEvent)
					{
						let isReturn = this.afterMinionYuckyResponseEvent();
						if (isReturn) return;
					}
				}
				
				if (this.afterMinionResponseEvent) this.afterMinionResponseEvent();
			}
			
			this.minion.anims.play("minion_idle");
		}, this);			
	}
	
	setMinionEvents(afterMinionResponseEvent, afterMinionYummyResponseEvent=null, afterMinionYuckyResponseEvent=null)
	{
		this.afterMinionResponseEvent = afterMinionResponseEvent;
		this.afterMinionYummyResponseEvent = afterMinionYummyResponseEvent;
		this.afterMinionYuckyResponseEvent = afterMinionYuckyResponseEvent;		
	}
	
	initMinionAnimation()
	{
		this.scene.anims.create({
			key: 'minion_idle',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 28.png","Artboard 29.png","Artboard 30.png","Artboard 31.png","Artboard 32.png","Artboard 33.png","Artboard 34.png","Artboard 35.png"]}),
			frameRate: 20,
			repeat: -1
		});	
		
		this.scene.anims.create({
			key: 'minion_eat',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 38.png","Artboard 39.png","Artboard 40.png","Artboard 40.png","Artboard 40.png"]}),
			frameRate: 10,
			repeat: 0,
		});
		
		this.scene.anims.create({
			key: 'minion_yummy',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 41.png","Artboard 42.png","Artboard 43.png","Artboard 43.png","Artboard 43.png"]}),
			frameRate: 5,
			repeat: 0,
		});
		
		this.scene.anims.create({
			key: 'minion_yucky',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 45.png","Artboard 46.png","Artboard 47.png","Artboard 48.png","Artboard 49.png","Artboard 49.png","Artboard 49.png"]}),
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
