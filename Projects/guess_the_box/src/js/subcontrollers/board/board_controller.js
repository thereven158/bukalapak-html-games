import ScreenUtility from "../../module/screen/screen_utility";
import TargetObjectController from "../../gameobjects/target_object_controller";

export default class BoardController  extends Phaser.GameObjects.Container{

    /** @param {Phaser.Scene} scene */
	constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.EventList = {
            OnFinishRotating: "OnFinishRotating",
        }
        
        scene.add.existing(this);  
    }

    create(){
        this.InitiateBoard();
    }

    update(){
       
    }

    InitiateBoard(){
        this.TargetGroup = this.scene.add.container(0,0);
        this.add(this.TargetGroup);

        let objSize = this.ScreenUtility.GameWidth * 0.2;

        let target1 = new TargetObjectController(this.scene, 0,0, 'logo')
        target1.displayWidth = objSize;
        target1.displayHeight = target1.displayWidth * (target1.height / target1.width);
        this.TargetGroup.add(target1);

       
    }

    OnTargetHit(event){
        
    }

    Disable(){

    }

    Reset(){

    }
}