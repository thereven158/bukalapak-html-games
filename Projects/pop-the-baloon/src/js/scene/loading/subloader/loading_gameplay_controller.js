import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;
     }

     loadResource(){
        this.scene.load.image('lever',this.scene.CreatePath('/images/ui-game/Tuas.png'));
        this.scene.load.image('pump',this.scene.CreatePath('/images/ui-game/Pompa.png'));
        this.scene.load.image('background',this.scene.CreatePath('/images/ui-game/Background.png'));
        this.scene.load.image('ui-score',this.scene.CreatePath('/images/ui-game/Skor-UI.png'));
        this.scene.load.image('ui-timer',this.scene.CreatePath('/images/ui-game/Timer-UI.png'));
        this.scene.load.image('times-up',this.scene.CreatePath('/images/ui-times-up.png'));
        this.scene.load.image('bg_black',this.scene.CreatePath('/images/Bg_black.png'));

        this.scene.load.spritesheet('idle', this.scene.CreatePath('/images/idle.png'), {frameWidth:1751/5, frameHeight:1241/5});
        this.scene.load.spritesheet('happy', this.scene.CreatePath('/images/Happy.png'), {frameWidth:1898/7, frameHeight:799/3});
        this.scene.load.spritesheet('explode', this.scene.CreatePath('/images/Explode.png'), {frameWidth:4076/5, frameHeight:2791/3});

        // this.scene.load.audio('transition', this.scene.CreatePath('/audio/ui_slide.mp3'));
     }
}
