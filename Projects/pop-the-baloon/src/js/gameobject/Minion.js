import { AnimationHelper } from "../helper/animation_helper";
import ScreenUtility from "../module/screen/screen_utility";

var Animations = {
    Idle: 'idle',
    Happy: 'happy'
  }

export default class Minion extends Phaser.GameObjects.Sprite{
        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){
        super(scene, x, y, 'idle', 0);
        
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        // this.InitImage();
        this.InitData();
    
        this.scene.add.existing(this);
    }

    InitImage(){

        this.displayWidth = this.ScreenUtility.GameWidth * 0.2;
        this.displayHeight = this.displayWidth * (this.height / this.width);
    }

    InitData(){
        this.IsIdling = true;
        this.IsHappy = false;
    }

    //to be initiated once by the current scene class
    static InitAnimationData(scene){
        // AnimationHelper.AddSequence(scene, Animations.Explode, 'explode', 0, 11, 20, true);
        AnimationHelper.AddSequence(scene, Animations.Idle, 'idle', 0, 20, 15, true);
        AnimationHelper.AddSequence(scene, Animations.Happy, 'happy', 0, 21, 15, true);
      }

    Happy(){
        this.anims.play(Animations.Happy);
        this.anims.resume();
    }

    Idle(){
        this.anims.play(Animations.Idle);
        this.anims.resume();
    }
}
