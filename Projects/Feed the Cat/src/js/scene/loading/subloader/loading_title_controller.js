import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
		 this.scene.load.image('start_button', this.scene.CreatePath('/images/Main Menu/Button.png'));
		 this.scene.load.image('light', this.scene.CreatePath('/images/Main Menu/Light.png'));
		 this.scene.load.image('minion_feed', this.scene.CreatePath('/images/Main Menu/Minion-feed.png'));
		 this.scene.load.image('title_logo', this.scene.CreatePath('/images/Main Menu/Title.png'));
		 this.scene.load.image('title_background', this.scene.CreatePath('/images/Main Menu/title-BG.png'));		 
		 this.scene.load.image('title_table', this.scene.CreatePath('/images/Main Menu/title-table.png'));
     }
}