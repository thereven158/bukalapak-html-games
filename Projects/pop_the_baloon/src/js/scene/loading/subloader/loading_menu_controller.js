import LoadingSceneController from "../loading_scene_controller";

export default class LoadingMenuController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('btn_play', this.scene.CreatePath('/images/mainmenu/Button.png'));
        this.scene.load.image('title_light', this.scene.CreatePath('/images/mainmenu/Light.png'));        
        this.scene.load.image('title_character', this.scene.CreatePath('/images/mainmenu/Minion-in-Balloon.png'));        
        this.scene.load.image('logo_game', this.scene.CreatePath('/images/mainmenu/Title.png'));        
     }
}