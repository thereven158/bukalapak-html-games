import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('bg_wall', this.scene.CreatePath('/images/bg_wall.png'));
        this.scene.load.image('bg_floor', this.scene.CreatePath('/images/bg_floor.png'));
        this.scene.load.image('bg_joystick', this.scene.CreatePath('/images/bg_joystick.png'));

        this.scene.load.image('title_light', this.scene.CreatePath('/images/title_light.png'));
        this.scene.load.spritesheet('box', this.scene.CreatePath('/images/box_sheet.png'), {frameWidth:4000/5, frameHeight:4000/5});
        this.scene.load.spritesheet('platform', this.scene.CreatePath('/images/flyingSheets.png'), {frameWidth:4000/5, frameHeight:298});
        this.scene.load.spritesheet('claw_a', this.scene.CreatePath('/images/claw_a.png'), {frameWidth:2557/5, frameHeight:934/2});
        this.scene.load.spritesheet('claw_b', this.scene.CreatePath('/images/claw_b.png'), {frameWidth:2557/5, frameHeight:1034/2});
        
        this.scene.load.image('ui_scorebar', this.scene.CreatePath('/images/ui/UI_ScoreBar.png'));
        this.scene.load.image('ui_timesup', this.scene.CreatePath('/images/ui/TimesOut.png'));
     }
}