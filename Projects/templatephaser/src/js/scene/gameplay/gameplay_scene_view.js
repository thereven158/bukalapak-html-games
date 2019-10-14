import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
      
    }

    /** @return {GameplaySceneView} */
    create(){
        this.initScreen();
        
        return this;
    }
    
    initScreen = ()=>{

    }

    update = ()=>{
      
    }
};
