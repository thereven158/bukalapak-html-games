import ScreenUtility from "../module/screen/screen_utility";
import Sprite from "../module/objects/sprite";

import { AnimationHelper } from "../helper/animation_helper";
import { Helper } from "../helper/helper";

var ClawAnimationList = {
    ab: 'claw_b_ab',
    ac: 'claw_b_ac',
    ba: 'claw_b_ba',
    bc: 'claw_b_bc',
    ca: 'claw_b_ca',
    cb: 'claw_b_cb'
}

export default class ClawBController extends Sprite{

    /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){
        super(scene, x, y, 'claw_b', 0);

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
            ClawAnimationList.ab,
            ClawAnimationList.bc,
            ClawAnimationList.ca,
            ClawAnimationList.ac,
            ClawAnimationList.cb,
        ];
    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        AnimationHelper.AddSequence(scene, ClawAnimationList.ab, 'claw_b', 0, 5, 20, false);
        AnimationHelper.AddSequence(scene, ClawAnimationList.ac, 'claw_b', 0, 9, 15, false);
        AnimationHelper.AddFrames(scene, ClawAnimationList.ba, 'claw_b', [5, 4, 3, 2, 1, 0], 20, false);
        AnimationHelper.AddSequence(scene, ClawAnimationList.bc, 'claw_b', 5 ,9, 20, false);
        AnimationHelper.AddFrames(scene, ClawAnimationList.ca, 'claw_b', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 15, false);
        AnimationHelper.AddFrames(scene, ClawAnimationList.cb, 'claw_b', [9, 8, 7, 6, 5], 20, false);

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
            Helper.delay(this.scene, Phaser.Math.Between(1000, 3000), this.check);
            //this.check();
        }, this);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
    }
}