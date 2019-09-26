import { AnimationHelper } from "../helper/animation_helper";
import ScreenUtility from "../module/screen/screen_utility";

var Animations = {
    Explode: 'explode'
  }

export default class Baloon extends Phaser.GameObjects.Sprite{
        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){
        super(scene, x, y, 'explode', 0);
        
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        // this.InitImage();
        // this.InitData();
    
        this.scene.add.existing(this);
    }

    InitImage(){
        this.displayWidth = this.ScreenUtility.GameWidth * 0.2;
        this.displayHeight = this.displayWidth * (this.height / this.width);
    }

    //to be initiated once by the current scene class
    static InitAnimationData(scene){
        AnimationHelper.AddSequence(scene, Animations.Explode, 'explode', 0, 11, 40, true);
      }

    Pop(){
        this.anims.play(Animations.Explode);
        this.anims.setRepeat(0);
    }
}
