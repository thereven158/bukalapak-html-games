import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
	constructor(scene){
	this.scene = scene;


	}

	loadResource()
	{
		this.loadBgm();
		this.loadSfx();
	}
	
	loadBgm()
	{
		 this.scene.load.audio('title_bgm', this.scene.CreatePath('/audios/bgm/Music_Jumping Frog Menu.mp3'));
		 this.scene.load.audio('ingame_bgm', this.scene.CreatePath('/audios/bgm/Music_Jumping Frog v2.mp3'));	
	}
	
	loadSfx()
	{
		 this.scene.load.audio('ingame_fail_sfx', this.scene.CreatePath('/audios/sfx/ingame_fail.mp3'));
		 this.scene.load.audio('ingame_success_sfx', this.scene.CreatePath('/audios/sfx/ingame_success.mp3'));	
		 this.scene.load.audio('ingame_timeout_sfx', this.scene.CreatePath('/audios/sfx/ingame_timeout.mp3'));
		 this.scene.load.audio('ui_button_click_sfx', this.scene.CreatePath('/audios/sfx/ui_button_click.mp3'));		
		
		 this.scene.load.audio('ingame_upak_fall_sfx', this.scene.CreatePath('/audios/sfx/ingame_upak_fall.mp3'));			 		 
		 this.scene.load.audio('ingame_upak_jump_sfx', this.scene.CreatePath('/audios/sfx/ingame_upak_jump.mp3'));
		 this.scene.load.audio('ingame_upak_lands_sfx', this.scene.CreatePath('/audios/sfx/ingame_upak_lands.mp3'));		
	}
}