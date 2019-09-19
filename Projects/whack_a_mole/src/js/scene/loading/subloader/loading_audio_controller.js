import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.audio('bgm_title', this.scene.CreatePath('/audio/bgm_title.mp3'));
        this.scene.load.audio('bgm_ingame', this.scene.CreatePath('/audio/bgm_ingame.mp3'));
        this.scene.load.audio('click_start', this.scene.CreatePath('/audio/ui_button_play.mp3'));
        this.scene.load.audio('timeout', this.scene.CreatePath('/audio/ingame_timeout.mp3'));
        this.scene.load.audio('click', this.scene.CreatePath('/audio/ui_button_click.mp3'));

        this.scene.load.audio('show', this.scene.CreatePath('/audio/ingame_upak_mole.mp3'));
        this.scene.load.audio('hit', this.scene.CreatePath('/audio/ingame_whack.mp3'));

        this.scene.load.audio('transition', this.scene.CreatePath('/audio/ui_slide.mp3'));
     }
}