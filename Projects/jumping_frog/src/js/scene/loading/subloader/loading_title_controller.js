import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
		 this.scene.load.image('title_background', this.scene.CreatePath('/images/title/BG-title.png'));
		 this.scene.load.image('start_button', this.scene.CreatePath('/images/title/Button.png'));
		 this.scene.load.image('title_logo', this.scene.CreatePath('/images/title/title.png'));
		 this.scene.load.image('title_minion', this.scene.CreatePath('/images/title/upak-title.png'));
     }
}