import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
    constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;

    }

    create(){
        this.logo = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'logo');
    }

    onClickPlay(event){
      this.logo.OnClick(event);
    }

     
};
