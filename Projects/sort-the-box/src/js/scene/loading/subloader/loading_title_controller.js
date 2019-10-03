import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('bg_title', this.scene.CreatePath('/images/bg_title.png'));
        this.scene.load.image('logo_title', this.scene.CreatePath('/images/logo_title.png'));

        this.scene.load.image('title_light', this.scene.CreatePath('/images/title_light.png'));
        this.scene.load.image('title_minion', this.scene.CreatePath('/images/title_minion.png'));
        this.scene.load.image('btn_main', this.scene.CreatePath('/images/buttons/button_Main.png'));

     }
}