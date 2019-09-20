import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;
     }

     loadResource(){
        this.scene.load.image('paddle',this.scene.CreatePath('/images/paddle.png'));
        this.scene.load.image('block',this.scene.CreatePath('/images/block.png'));
        this.scene.load.image('ball',this.scene.CreatePath('/images/ball.png'));
        this.scene.load.image('bg_black',this.scene.CreatePath('/images/Bg_black.png'));
        this.scene.load.image('background',this.scene.CreatePath('/images/Background.png'));
        this.scene.load.image('block-aqua',this.scene.CreatePath('/images/Block-Aqua.png'));
        this.scene.load.image('block-magenta',this.scene.CreatePath('/images/Block-Magenta.png'));
        this.scene.load.image('block-yellow',this.scene.CreatePath('/images/Block-Yellow.png'));
        this.scene.load.image('life',this.scene.CreatePath('/images/Life-UI.png'));
        this.scene.load.image('unlife',this.scene.CreatePath('/images/Life2-UI.png'));
        this.scene.load.image('life-window',this.scene.CreatePath('/images/Life-UI-Window.png'));
        this.scene.load.image('line-fail',this.scene.CreatePath('/images/Line-Fail.png'));
        this.scene.load.image('timer-window',this.scene.CreatePath('/images/Timer-UI-Window.png'));
        this.scene.load.image('top-border',this.scene.CreatePath('/images/Top-Border.png'));
        this.scene.load.image('times-up',this.scene.CreatePath('/images/ui-times-up.png'));

        // this.scene.load.audio('transition', this.scene.CreatePath('/audio/ui_slide.mp3'));
     }
}
