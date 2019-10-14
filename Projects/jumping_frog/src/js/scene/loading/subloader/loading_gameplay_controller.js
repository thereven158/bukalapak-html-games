import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
     
		 this.scene.load.image('gameplay_background', this.scene.CreatePath('/images/gameplay/BG1.png'));
		 
		 this.scene.load.image('land_start', this.scene.CreatePath('/images/gameplay/land.png'));
		 this.scene.load.spritesheet('player_sprite', this.scene.CreatePath('/images/gameplay/sprite.png'), {frameWidth: 3150/7, frameHeight: 1800/4});
		 
		 this.scene.load.image('asteroid_1', this.scene.CreatePath('/images/gameplay/asteroid1.png'));
		 this.scene.load.image('asteroid_2', this.scene.CreatePath('/images/gameplay/asteroid2.png'));		 
		 this.scene.load.image('asteroid_3', this.scene.CreatePath('/images/gameplay/asteroid3.png'));		 
		 
		 this.loadTopUiGraphics();
     }
	
	loadTopUiGraphics()
	{
		this.scene.load.image('life1', this.scene.CreatePath('/images/gameplay/top_hud/life1.png'));
		this.scene.load.image('life2', this.scene.CreatePath('/images/gameplay/top_hud/life2.png'));
		this.scene.load.image('life-frame', this.scene.CreatePath('/images/gameplay/top_hud/life-frame.png'));
		this.scene.load.image('score_ui', this.scene.CreatePath('/images/gameplay/top_hud/Score-UI.png'));
		this.scene.load.image('score_ui_ornament', this.scene.CreatePath('/images/gameplay/top_hud/Score-UI-Behind-ornament.png'));
		this.scene.load.image('timer_ui', this.scene.CreatePath('/images/gameplay/top_hud/Timer-UI.png'));
		this.scene.load.image('top_ui_panel', this.scene.CreatePath('/images/gameplay/top_hud/Top-UI.png'));
	}	
}