import Phaser from 'phaser'
import ScreenUtility from '../module/screen/screen_utility';
import { AnimationHelper } from "../helper/animation_helper";

var AnimationList = {
    Tap : "Tap"
}

export default class TapEffect extends Phaser.GameObjects.Container{
/** @param {Phaser.scene} scene */
	constructor(scene) {
        super(scene, 0, 0);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = ScreenUtility.getInstance();

        scene.add.existing(this);  

        this.InitView();
    }

    //to be initiated once by the current scene class
    static InitAnimationData(scene){
        let hitAnim = AnimationHelper.AddSequence(scene, AnimationList.Tap, 'hit_effect', 0, 7, 30, false);
        //hitAnim.hideOnComplete = true;
    }

    InitView(){
        this.setDepth(5);
        
        this.MainEffect = this.scene.add.sprite(0,0, 'hit_effect', 0);
        this.MainEffect.displayWidth = this.ScreenUtility.GameWidth * 0.15;
        this.MainEffect.displayHeight = this.MainEffect.displayWidth * (this.MainEffect.height / this.MainEffect.width);
        this.add(this.MainEffect);

        this.Hide();
    }

    Hide(){
        this.setVisible(false);
    }

    Show = ()=>{
        let x = this.scene.game.input.activePointer.x;
        let y = this.scene.game.input.activePointer.y;
        this.MainEffect.setPosition(x,y);
        this.MainEffect.anims.play(AnimationList.Tap);

        this.setVisible(true);
    }
}