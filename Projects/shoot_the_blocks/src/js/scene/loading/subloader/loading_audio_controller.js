import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;
     }

     loadResource(){
        this.scene.load.audio('main-music', this.scene.CreatePath('/sounds/Bukalapak - Shoot the Block.mp3'));
        this.scene.load.audio('menu-music', this.scene.CreatePath('/sounds/Bukalapak - Shoot the Block menu.mp3'));
        this.scene.load.audio('block-hit', this.scene.CreatePath('/sounds/block_hit.mp3'));
        this.scene.load.audio('ball-bounce', this.scene.CreatePath('/sounds/ball_bounce.mp3'));
        this.scene.load.audio('hp-down', this.scene.CreatePath('/sounds/hp_down.mp3'));
        this.scene.load.audio('hp-out', this.scene.CreatePath('/sounds/hp_out.mp3'));
        this.scene.load.audio('block-lasthit', this.scene.CreatePath('/sounds/block_lasthit.mp3'));
        this.scene.load.audio('button-click', this.scene.CreatePath('/sounds/button_click.mp3'));
        this.scene.load.audio('time-out', this.scene.CreatePath('/sounds/ingame_timeout.mp3'));
        this.scene.load.audio('fail', this.scene.CreatePath('/sounds/ingame_fail.mp3'));

        // this.scene.load.audio('transition', this.scene.CreatePath('/audio/ui_slide.mp3'));
     }
}
