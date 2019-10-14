import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('logo_game', this.scene.CreatePath('/images/Logo_Game.png'));
        this.scene.load.image('bg_title', this.scene.CreatePath('/images/bg_Title.png'));
        this.scene.load.image('btn_play', this.scene.CreatePath('/images/buttons/Button_Main.png'));
        this.scene.load.image('title_light', this.scene.CreatePath('/images/main_light.png'));
        this.scene.load.image('title_character', this.scene.CreatePath('/images/main_minion.png'));


        this.scene.load.image('bg_moon', this.scene.CreatePath('/images/bg_titlemoon.png'));
        this.scene.load.image('bg_titleland', this.scene.CreatePath('/images/bg_titleland.png'));
     }
}