import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;
     }

     loadResource(){
        this.scene.load.audio('main-music', this.scene.CreatePath('/sounds/Music_PopTheBaloon.wav'));
        this.scene.load.audio('menu-music', this.scene.CreatePath('/sounds/Music_PopTheBaloonMenu.mp3'));
        this.scene.load.audio('baloon-blow', this.scene.CreatePath('/sounds/baloon_blow.mp3'));
        this.scene.load.audio('baloon-pop', this.scene.CreatePath('/sounds/baloon_pop.mp3'));        
        this.scene.load.audio('ingame-success', this.scene.CreatePath('/sounds/ingame_success.mp3'));
        this.scene.load.audio('ingame-timeout', this.scene.CreatePath('/sounds/ingame_timeout.mp3'));
        this.scene.load.audio('button-click', this.scene.CreatePath('/sounds/button_click.mp3'));

        // this.scene.load.audio('transition', this.scene.CreatePath('/audio/ui_slide.mp3'));
     }
}
