import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('bg_ingame', this.scene.CreatePath('/images/bg_ingame.png'));

        this.scene.load.image('bg_ingame_table', this.scene.CreatePath('/images/bg_ingame_table.png'));
        this.scene.load.spritesheet('status', this.scene.CreatePath('/images/ui/ingame_status.png'), {frameWidth:500/4, frameHeight:125});

        this.scene.load.image('tele_blue', this.scene.CreatePath('/images/tele_blue.png'));
        this.scene.load.image('tele_red', this.scene.CreatePath('/images/tele_red.png'));
        this.scene.load.image('light_blue', this.scene.CreatePath('/images/tele_light_blue.png'));
        this.scene.load.image('light_red', this.scene.CreatePath('/images/tele_light_red.png'));
        this.scene.load.image('roller', this.scene.CreatePath('/images/ingame_roller.png'));

        this.scene.load.spritesheet('minion_blue', this.scene.CreatePath('/images/minion_blue.png'), {frameWidth:3066/6, frameHeight:3577/7});
        this.scene.load.spritesheet('minion_red', this.scene.CreatePath('/images/minion_red.png'), {frameWidth:3066/6, frameHeight:3577/7});

        this.scene.load.spritesheet('btn_blue', this.scene.CreatePath('/images/buttons/button_blue.png'), {frameWidth:884/2, frameHeight:298});
        this.scene.load.spritesheet('btn_red', this.scene.CreatePath('/images/buttons/button_red.png'), {frameWidth:884/2, frameHeight:298});

        this.scene.load.spritesheet('teleport_effect', this.scene.CreatePath('/images/teleport_effect.png'), {frameWidth:3738/10, frameHeight:1066/2});

        this.scene.load.image('ui_scorebar', this.scene.CreatePath('/images/ui/UI_ScoreBar.png'));
        this.scene.load.image('ui_timesout', this.scene.CreatePath('/images/ui/TimesOut.png'));
     }
}