
export default class TargetObjectController extends Phaser.GameObjects.Sprite{

        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        
        this.scene = scene;

        this.InitData();

        this.scene.add.existing(this);

        this.setInteractive();
    }

    InitData(){

    }

    preUpdate(timestep, dt){

    }

    Disable(){
        
    }

    Reset(){
        this.InitData();
    }

}