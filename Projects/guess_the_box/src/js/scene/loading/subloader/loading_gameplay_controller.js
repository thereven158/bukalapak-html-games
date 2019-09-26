import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('bg_gameplay', this.scene.CreatePath('/images/bg_Gameplay.jpg'));
        this.scene.load.spritesheet('box', this.scene.CreatePath('/images/box_sheet.png'), {frameWidth:2500/5, frameHeight:480});

        this.scene.load.image('ui_scorebar', this.scene.CreatePath('/images/ui/UI_ScoreBar.png'));
        this.scene.load.image('ui_timesup', this.scene.CreatePath('/images/ui/TimesOut.png'));
     }
}