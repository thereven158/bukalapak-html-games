import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;

    }

    /** @return {TitleSceneView} */
    create = ()=>{
        this.initScreen();
        
        return this;
    }

    initScreen = ()=>{
        this.logo = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'logo');
    }

    OnClickPlay = (event) =>{
        this.logo.onClick(event);
    }
};
