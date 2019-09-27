import TitleSceneController from "./title_scene_controller";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";
import Button from "../../module/objects/button";

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;

    }
    /** @return {TitleSceneView} */
    create(){
        this.InitScreen();

        return this;
    }

    InitScreen(){
        this.Background = new Image(this.scene, this.ScreenUtility.CenterX, 0, 'bg_title');
        this.Background.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Background.setOrigin(0.5,0);

        this.GameLogo = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.3, 'logo_title');
        this.GameLogo.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);


        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.7, 'logo');
    }

    OnClickPlay(event){
        this.ButtonPlay.onClick(event);
    }
};
