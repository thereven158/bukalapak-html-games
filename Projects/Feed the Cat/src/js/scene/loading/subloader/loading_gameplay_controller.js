import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
		 this.scene.load.image('ball', this.scene.CreatePath('/images/In-game/Ball.png'));
		 this.scene.load.image('gameplay_background', this.scene.CreatePath('/images/In-game/BG.png'));			 
		 this.scene.load.image('wrench', this.scene.CreatePath('/images/In-game/Wrench.png'));
		 
		 //this.scene.load.spritesheet('minion_player', this.scene.CreatePath('/images/In-game/Sprite.png'), {frameWidth:4320/8, frameHeight:2400/3, endFrame: 21});
		 this.scene.load.atlas('minion_player', this.scene.CreatePath('/images/In-game/upak.png'), this.scene.CreatePath('/images/In-game/upak.json'), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		 
		 this.loadTopUiGraphics();
     }
	
	loadTopUiGraphics()
	{
		this.scene.load.image('life1', this.scene.CreatePath('/images/In-game/top_hud/life1.png'));
		this.scene.load.image('life2', this.scene.CreatePath('/images/In-game/top_hud/life2.png'));
		this.scene.load.image('life-frame', this.scene.CreatePath('/images/In-game/top_hud/life-frame.png'));
		this.scene.load.image('score_ui', this.scene.CreatePath('/images/In-game/top_hud/Score-UI.png'));
		this.scene.load.image('score_ui_ornament', this.scene.CreatePath('/images/In-game/top_hud/Score-UI-Behind-ornament.png'));
		this.scene.load.image('timer_ui', this.scene.CreatePath('/images/In-game/top_hud/Timer-UI.png'));
		this.scene.load.image('top_ui_panel', this.scene.CreatePath('/images/In-game/top_hud/Top-UI.png'));
	}
}