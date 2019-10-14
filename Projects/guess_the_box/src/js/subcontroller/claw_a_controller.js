import ScreenUtility from "../module/screen/screen_utility";
import Sprite from "../module/objects/sprite";

import { AnimationHelper } from "../helper/animation_helper";
import { Helper } from "../helper/helper";

var ClawAnimationList = {
    ab: 'claw_a_ab',
    ac: 'claw_a_ac',
    ba: 'claw_a_ba',
    bc: 'claw_a_bc',
    ca: 'claw_a_ca',
    cb: 'claw_a_cb'
}

export default class ClawAController extends Sprite{

    /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){
        super(scene, x, y, 'claw_a', 0);

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        
        this.init();
    }

    /** @return {BoxController} */
    init = () =>{
        this.initClaw();
        this.initClawData();

        this.start();

        return this;
    }

    initClaw = () =>{

        this.scene.add.existing(this);
    }

    initClawData = () =>{
        this.CurrentAnimationFlow = 0;
        this.ClawAnimationFlow = [
            ClawAnimationList.bc,
            ClawAnimationList.cb,
            ClawAnimationList.ba,
            ClawAnimationList.ab,
        ];
    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        AnimationHelper.AddSequence(scene, ClawAnimationList.ab, 'claw_a', 0, 5, 18, false);
        AnimationHelper.AddSequence(scene, ClawAnimationList.ac, 'claw_a', 0, 9, 12, false);
        AnimationHelper.AddFrames(scene, ClawAnimationList.ba, 'claw_a', [5, 4, 3, 2, 1, 0], 18, false);
        AnimationHelper.AddSequence(scene, ClawAnimationList.bc, 'claw_a', 5 ,9, 18, false);
        AnimationHelper.AddFrames(scene, ClawAnimationList.ca, 'claw_a', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 12, false);
        AnimationHelper.AddFrames(scene, ClawAnimationList.cb, 'claw_a', [9, 8, 7, 6, 5], 18, false);
    }

    start = () =>{
        this.check();
    }

    check = ()=>{
        this.play(this.ClawAnimationFlow[this.CurrentAnimationFlow]).once('animationcomplete', ()=>{
            this.CurrentAnimationFlow += 1;
            if(this.CurrentAnimationFlow >= this.ClawAnimationFlow.length){
                this.CurrentAnimationFlow = 0;
            }
            Helper.delay(this.scene, Phaser.Math.Between(2000, 5000), this.check);
            //this.check();
        }, this);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
    }
}