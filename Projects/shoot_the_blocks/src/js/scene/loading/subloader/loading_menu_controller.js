import LoadingSceneController from "../loading_scene_controller";

export default class LoadingMenuController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('btn_play', this.scene.CreatePath('/images/mainmenu/Button.png'));
        this.scene.load.image('title_light', this.scene.CreatePath('/images/mainmenu/Light.png'));        
        this.scene.load.image('main_picture', this.scene.CreatePath('/images/mainmenu/Main-Picture.png'));        
        this.scene.load.image('logo_game', this.scene.CreatePath('/images/mainmenu/Title.png'));        
        this.scene.load.image('background_menu', this.scene.CreatePath('/images/mainmenu/BackgroundMenu.png'));        
     }
}