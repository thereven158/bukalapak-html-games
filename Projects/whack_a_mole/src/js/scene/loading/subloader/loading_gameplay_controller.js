import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){

        this.scene.load.image('bg_gameplay', this.scene.CreatePath('/images/bg_GamePlay.png'));
        this.scene.load.image('bg_land', this.scene.CreatePath('/images/bg_Land.png'));
        this.scene.load.image('ui_scorebar', this.scene.CreatePath('/images/ui/UI_ScoreBar.png'));
        this.scene.load.image('ui_timesup', this.scene.CreatePath('/images/ui/TimesUp.png'));

        this.scene.load.image('hole', this.scene.CreatePath('/images/hole.png'));
        this.scene.load.spritesheet('minion', this.scene.CreatePath('/images/minion.png'), {frameWidth:1500/5, frameHeight:1200/4});
     
     }
}