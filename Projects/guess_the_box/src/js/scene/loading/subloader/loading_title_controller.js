import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
        this.scene = scene;
			
        
     }

     loadResource(){
        this.scene.load.image('bg_title', this.scene.CreatePath('/images/bg_title.jpg'));
        this.scene.load.image('logo_title', this.scene.CreatePath('/images/logo_title.png'));
     }
}