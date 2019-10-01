import ScreenUtility from "../module/screen/screen_utility";
import Sprite from "../module/objects/sprite";

import { AnimationHelper } from "../helper/animation_helper";
import gameplaydata from "../gameplaydata";
import Image from "../module/objects/image";

var BoxAnimationList = {
    Idle:'BoxIdle',
    OpenTrue:'BoxOpenTrue',
    OpenFalse:'BoxOpenFalse',
    CloseTrue:'BoxCloseTrue',
    CloseFalse:'BoxCloseFalse',
}

var PlatformAnimationList = {
    Idle:'PlatformIdle',
    Moving :'PlatformMoving',
}

export default class PlatformController extends Phaser.GameObjects.Container{

    /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){
        super(scene, x, y);

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();
        this.BoxAnimationList = BoxAnimationList;
        this.PlatformAnimationList = PlatformAnimationList;

        this.EventList = {
            OnSelect : 'OnSelect',
        }
        
        this.init();
    }

    /** @return {BoxController} */
    init = () =>{
        this.initPlatformData();
        this.initPlatform();

        return this;
    }

    initPlatform = () =>{
        this.Platform = new Sprite(this.scene, 0, 0, 'platform', 0);
        this.Platform.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);
        this.Platform.play(this.PlatformAnimationList.Moving);
        this.add(this.Platform);

        this.TouchArea = new Image(this.scene, 0, 0, 'bg_black', 0).setInteractive();

        this.Box = new Sprite(this.scene, 0, 0, 'box').setInteractive();
        this.Box.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);
        this.Box.setOrigin(0.5,0.82);
        //this.Box.on('pointerdown', this.Select, this);
        this.add(this.Box);
    
        this.TouchArea.setDisplayWidth(this.Box.displayWidth * 0.5, true);
        this.TouchArea.setAlpha(0.001)
        this.TouchArea.setOrigin(0.5,1.2);
        this.TouchArea.on('pointerdown', this.Select, this);
        this.add(this.TouchArea);

        this.scene.add.existing(this);
    }

    initPlatformData = () =>{
        this.IsEnabled = true;
        this.IsMoving = false;
        this.IsOpened = false;
        this.MoveSpeed = this.GetMoveSpeed(0.5);
    
        this.Idx = 0;
        this.IsTrueBox = false;
    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        AnimationHelper.AddFrames(scene, BoxAnimationList.Idle, 'box', [0], 20, true);
        AnimationHelper.AddSequence(scene, BoxAnimationList.OpenTrue, 'box', 10, 14, 30, false);
        AnimationHelper.AddSequence(scene, BoxAnimationList.OpenFalse, 'box', 0, 4, 30, false);
        AnimationHelper.AddSequence(scene, BoxAnimationList.CloseTrue, 'box', 15, 19, 30, false);
        AnimationHelper.AddSequence(scene, BoxAnimationList.CloseFalse, 'box', 5, 9, 30, false);

        AnimationHelper.AddFrames(scene, PlatformAnimationList.Idle, 'platform', [0], 15, true);
        AnimationHelper.AddSequence(scene, PlatformAnimationList.Moving, 'platform', 0, 4, 15, true);
    }

    Update(time, delta){
        
    }

    /** @return {PlatformController} */
    SetIdx = (idx) =>{
        let depth = (idx > 1 || this.Idx > 1) ? 0.1 : 0;
        this.setDepth(depth);
        this.Idx = idx;

        return this;
    }

    /** @return {PlatformController} */
    SetAsTrueBox = (isTrue = true) =>{
        this.IsTrueBox = isTrue;
        return this;
    }

    Move = (idx, x, y, speedAlpha, onceAtLocation) =>{
        this.SetIdx(idx);
        this.IsMoving = true;
        this.MoveSpeed = this.GetMoveSpeed(speedAlpha);;

        this.scene.tweens.add({
            targets:  this,
            x : x,
            y : y,
            duration: this.MoveSpeed,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete : ()=>{
                this.AtLocationEvent();
                onceAtLocation();
            },
            onCompleteScope : this
        });	
    }

    AtLocationEvent = () =>{
        this.IsMoving = false;

    }

    /** 
    * @param {Number} alpha 
    * @return {Number} 
    */
    GetMoveSpeed = (alpha) =>{
        let tempSpeed = 0;
        let difference = Phaser.Math.Difference(gameplaydata.SlowMoveDuration, gameplaydata.FastMoveDuration);
        tempSpeed = gameplaydata.SlowMoveDuration - (difference * alpha)

        return tempSpeed;
    }

    Open = () =>{
        if(this.IsOpened)
            return;

        this.IsOpened = true;
        this.Box.play((this.IsTrueBox) ? this.BoxAnimationList.OpenTrue:this.BoxAnimationList.OpenFalse)
        this.scene.sound.play('box');
    }

    Close = () =>{
        if(!this.IsOpened)
            return;

        this.IsOpened = false;

        this.Box.play((this.IsTrueBox) ? this.BoxAnimationList.CloseTrue:this.BoxAnimationList.CloseFalse)
        this.scene.sound.play('box');
    }

    Select = () =>{
        if(!this.IsEnabled)
            return;

        this.emit(this.EventList.OnSelect, this);
    }

    OnSelect = (event) =>{
        this.on(this.EventList.OnSelect, event, this);
    }

    Disable = () =>{
        this.IsEnabled = false;
    }
}