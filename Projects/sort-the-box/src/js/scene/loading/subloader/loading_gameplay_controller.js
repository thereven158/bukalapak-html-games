import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('bg_ingame', this.scene.CreatePath('/images/bg_ingame.png'));

        this.scene.load.image('bg_ingame_table', this.scene.CreatePath('/images/bg_ingame_table.png'));

        this.scene.load.image('tele_blue', this.scene.CreatePath('/images/tele_blue.png'));
        this.scene.load.image('tele_red', this.scene.CreatePath('/images/tele_red.png'));
        this.scene.load.image('roller', this.scene.CreatePath('/images/ingame_roller.png'));

        this.scene.load.spritesheet('minion_blue', this.scene.CreatePath('/images/minion_blue.png'), {frameWidth:3850/8, frameHeight:1400/3});
        this.scene.load.spritesheet('minion_red', this.scene.CreatePath('/images/minion_red.png'), {frameWidth:3730/8, frameHeight:468});

        this.scene.load.spritesheet('btn_blue', this.scene.CreatePath('/images/buttons/button_blue.png'), {frameWidth:884/2, frameHeight:298});
        this.scene.load.spritesheet('btn_red', this.scene.CreatePath('/images/buttons/button_red.png'), {frameWidth:884/2, frameHeight:298});

        this.scene.load.image('ui_scorebar', this.scene.CreatePath('/images/ui/UI_ScoreBar.png'));
     }
}