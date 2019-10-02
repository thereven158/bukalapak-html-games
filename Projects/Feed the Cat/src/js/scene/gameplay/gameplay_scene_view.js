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

		//this.scoreOrnament.setPosition(this.scorePanel.x, this.scorePanel.y);
	}
	
	initMinion()
	{
		this.afterMinionResponseEvent = null;
		this.afterMinionYummyResponseEvent = null;
		this.afterMinionYuckyResponseEvent = null;
		
		this.initMinionAnimation();

		this.minion = new Sprite(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'minion_player');
		this.minion.setOrigin(0.5, 1);
      	this.minion.setDisplayWidth(this.ScreenUtility.GameWidth, 1);		
		
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
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 5.png","Artboard 6.png","Artboard 7.png","Artboard 8.png","Artboard 9.png","Artboard 10.png","Artboard 11.png","Artboard 12.png"]}),
			frameRate: 20,
			repeat: -1
		});	
		
		this.scene.anims.create({
			key: 'minion_eat',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 15.png","Artboard 16.png","Artboard 17.png","Artboard 17.png","Artboard 17.png"]}),
			frameRate: 10,
			repeat: 0,
		});
		
		this.scene.anims.create({
			key: 'minion_yummy',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 18.png","Artboard 19.png","Artboard 20.png","Artboard 20.png","Artboard 20.png"]}),
			frameRate: 5,
			repeat: 0,
		});
		
		this.scene.anims.create({
			key: 'minion_yucky',
			frames: this.scene.anims.generateFrameNumbers('minion_player', { frames: ["Artboard 22.png","Artboard 23.png","Artboard 24.png","Artboard 25.png","Artboard 26.png","Artboard 26.png","Artboard 26.png"]}),
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
