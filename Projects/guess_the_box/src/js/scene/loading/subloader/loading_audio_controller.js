import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
        this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.audio('bgm_title', this.scene.CreatePath('/audio/bgm_title.mp3'));
        this.scene.load.audio('bgm_ingame', this.scene.CreatePath('/audio/bgm_ingame.mp3'));

        this.scene.load.audio('click', this.scene.CreatePath('/audio/ui_button_click.mp3'));
        this.scene.load.audio('start', this.scene.CreatePath('/audio/ui_click_start.mp3'));

        this.scene.load.audio('correct', this.scene.CreatePath('/audio/ingame_correct.mp3'));
        this.scene.load.audio('wrong', this.scene.CreatePath('/audio/ingame_wrong.mp3'));
        this.scene.load.audio('box', this.scene.CreatePath('/audio/ingame_box.mp3'));

        this.scene.load.audio('move', this.scene.CreatePath('/audio/ingame_move.mp3'));

        this.scene.load.audio('victory', this.scene.CreatePath('/audio/ingame_victory.mp3'));
        this.scene.load.audio('timeout', this.scene.CreatePath('/audio/ingame_timeout.mp3'));

        this.scene.load.audio('transition', this.scene.CreatePath('/audio/ui_slide.mp3'));
     }
}