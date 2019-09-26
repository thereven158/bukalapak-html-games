import ScreenUtility from "../module/screen/screen_utility";

import gameplaydata from "../gameplaydata";

export default class BoardController{

    /** @param {Phaser.Scene} scene */
	constructor(scene) {

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.Event = new Phaser.Events.EventEmitter();
        this.EventList = {
            
        }

        this.Init();
    }

    /** @return {BoardController} */
    Init(){
        this.InitData();
        this.InitiateBoard();

        return this;
    }

    InitData(){

    }

    InitiateBoard(){
        this.TargetGroup = this.scene.add.container(0,0);
        
    }

    Rotate(){
        
    }

    update(timestep, delta){


    }

    Disable(){

    }
}