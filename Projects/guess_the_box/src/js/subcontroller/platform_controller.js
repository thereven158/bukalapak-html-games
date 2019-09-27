import ScreenUtility from "../module/screen/screen_utility";
import Sprite from "../module/objects/sprite";

import { AnimationHelper } from "../helper/animation_helper";
import gameplaydata from "../gameplaydata";

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
        
        this.Init();
    }

    /** @return {BoxController} */
    Init(){
        this.InitPlatformData();
        this.InitPlatform();

        return this;
    }

    InitPlatform(){
        this.Platform = new Sprite(this.scene, 0, 0, 'platform', 0);
        this.Platform.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);
        this.Platform.play(this.PlatformAnimationList.Moving);
        this.add(this.Platform);

        this.Box = new Sprite(this.scene, 0, 0, 'box').setInteractive();
        this.Box.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);
        this.Box.setOrigin(0.5,0.82);
        this.Box.on('pointerdown', this.Select, this);
        this.add(this.Box);

        this.scene.add.existing(this);
    }

    InitPlatformData(){
        this.IsEnabled = true;
        this.IsMoving = false;
        this.IsOpened = false;
        this.MoveSpeed = this.GetMoveSpeed(0.5);
    
        this.Idx = 0;
        this.IsTrueBox = false;
    }

    //to be initiated once by the current scene class
    static InitAnimationData(scene){
        AnimationHelper.AddFrames(scene, BoxAnimationList.Idle, 'box', [0], 20, true);
        AnimationHelper.AddSequence(scene, BoxAnimationList.OpenTrue, 'box', 10, 14, 30, false);
        AnimationHelper.AddSequence(scene, BoxAnimationList.OpenFalse, 'box', 0, 4, 30, false);
        AnimationHelper.AddSequence(scene, BoxAnimationList.CloseTrue, 'box', 15, 19, 30, false);
        AnimationHelper.AddSequence(scene, BoxAnimationList.CloseFalse, 'box', 5, 9, 30, false);

        AnimationHelper.AddFrames(scene, PlatformAnimationList.Idle, 'platform', [0], 30, true);
        AnimationHelper.AddSequence(scene, PlatformAnimationList.Moving, 'platform', 0, 4, 30, true);
    }

    Update(time, delta){

    }

    /** @return {PlatformController} */
    SetIdx(idx){
        this.Idx = idx;
        return this;
    }

    /** @return {PlatformController} */
    SetAsTrueBox(isTrue = true){
        this.IsTrueBox = isTrue;
        return this;
    }

    Move(idx, x, y, speedAlpha, onceAtLocation){
        this.Idx = idx;
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

    AtLocationEvent(){
        this.IsMoving = false;

    }

    /** 
    * @param {Number} alpha 
    * @return {Number} 
    */
    GetMoveSpeed(alpha){
        let tempSpeed = 0;
        let difference = Phaser.Math.Difference(gameplaydata.SlowMoveDuration, gameplaydata.FastMoveDuration);
        tempSpeed = gameplaydata.SlowMoveDuration - (difference * alpha)

        return tempSpeed;
    }

    Open(){
        if(this.IsOpened)
            return;

        this.IsOpened = true;
        this.Box.play((this.IsTrueBox) ? this.BoxAnimationList.OpenTrue:this.BoxAnimationList.OpenFalse)
    }

    Close(){
        if(!this.IsOpened)
            return;

        this.IsOpened = false;

        this.Box.play((this.IsTrueBox) ? this.BoxAnimationList.CloseTrue:this.BoxAnimationList.CloseFalse)
    }

    Select(){
        if(!this.IsEnabled || this.IsMoving)
            return;

        this.emit(this.EventList.OnSelect, this);
    }

    OnSelect(event){
        this.on(this.EventList.OnSelect, event, this);
    }

    Disable(){
        this.IsEnabled = false;
    }
}