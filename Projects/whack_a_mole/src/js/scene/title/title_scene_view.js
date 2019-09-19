import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;

     }

     create(){
        this.InitScreen();



      
     }

     InitScreen(){
        
        this.Background = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_title');
        this.Background.displayWidth = this.ScreenUtility.GameWidth;
        this.Background.displayHeight =this.ScreenUtility.GameHeight;
        


        this.GameLogo = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.3, 'logo_game');
        this.GameLogo.displayWidth = this.ScreenUtility.GameWidth * 0.8;
        this.GameLogo.displayHeight = this.GameLogo.displayWidth * (this.GameLogo.height/this.GameLogo.width);

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.75, 'btn_play');

        //this.Background.displayHeight = this.Background.displayWidth * (this.Background.height/this.Background.width) ;

     }

     onClickPlay(event){
        this.ButtonPlay.OnClick(event);
     }
     
};
