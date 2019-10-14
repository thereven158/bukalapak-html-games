import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
		 this.scene.load.audio('title_bgm', this.scene.CreatePath('/audios/bgm/bgm_title.mp3'));
		 this.scene.load.audio('ingame_bgm', this.scene.CreatePath('/audios/bgm/bgm_ingame.mp3'));	
		 
		 this.scene.load.audio('ingame_fail_sfx', this.scene.CreatePath('/audios/sfx/ingame_fail.mp3'));
		 this.scene.load.audio('ingame_success_sfx', this.scene.CreatePath('/audios/sfx/ingame_success.mp3'));	
		 this.scene.load.audio('ingame_timeout_sfx', this.scene.CreatePath('/audios/sfx/ingame_timeout.mp3'));
		 this.scene.load.audio('ingame_upak_hit_sfx', this.scene.CreatePath('/audios/sfx/ingame_upak_hit.mp3'));			 		 
		 this.scene.load.audio('ingame_upak_munch_sfx', this.scene.CreatePath('/audios/sfx/ingame_upak_munch.mp3'));
		 this.scene.load.audio('master_sfx', this.scene.CreatePath('/audios/sfx/master.mp3'));
		 this.scene.load.audio('ui_button_click_sfx', this.scene.CreatePath('/audios/sfx/ui_button_click.mp3'));
     }
}