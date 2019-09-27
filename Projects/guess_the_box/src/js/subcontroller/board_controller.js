import ScreenUtility from "../module/screen/screen_utility";

import gameplaydata from "../gameplaydata";
import PlatformController from "./platform_controller";
import { maxHeaderSize } from "http";

export default class BoardController{

    /** @param {Phaser.Scene} scene */
	constructor(scene) {

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.Event = new Phaser.Events.EventEmitter();
        this.EventList = {
            OnStartRotation : 'OnStartRotation',
            OnceAllAPlatformAtLocation : 'OnceAllAPlatformAtLocation',
            OnAllPlatformAtLocation : 'OnAllPlatformAtLocation',
            OncePhaseFinish : 'OncePhaseFinish',
            OnceAnswering : 'OnceAnswering',
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
        /** @type {(PlatformController|Array)} */
        this.Platforms = [];
        this.PlatformSpeedAlpha = 1;

        this.IsOnRotationPhase = false;
        this.RotationCount = 0;
        this.MaxRotation = 1;
        this.MaxSameRotation = 1;
        this.PrevRotation = undefined;
        this.SameRotationCount = 0;
    }

    InitiateBoard(){
        this.PosList = [
            {
                x : this.ScreenUtility.GameWidth * 0.2,
                y : this.ScreenUtility.GameHeight * 0.55,
            },
            {
                x : this.ScreenUtility.GameWidth * 0.8,
                y : this.ScreenUtility.GameHeight * 0.55,
            },
            {
                x : this.ScreenUtility.GameWidth * 0.5,
                y : this.ScreenUtility.GameHeight * 0.8,
            },

        ];

        let platform1 = new PlatformController(this.scene, this.PosList[0].x, this.PosList[0].y).SetIdx(0);
        platform1.OnSelect(this.BoxSelectedEvent);
        this.Platforms.push(platform1);

        let platform2 = new PlatformController(this.scene, this.PosList[1].x, this.PosList[1].y).SetIdx(1).SetAsTrueBox();
        platform2.OnSelect(this.BoxSelectedEvent);
        this.Platforms.push(platform2);

        let platform3 = new PlatformController(this.scene, this.PosList[2].x, this.PosList[2].y).SetIdx(2);
        platform3.OnSelect(this.BoxSelectedEvent);
        this.Platforms.push(platform3);
    }

    ShowCorrectBox = ()=>{
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            if(platform.IsTrueBox){
                platform.Open();
            }
        }
    }

    ShowAllBox = ()=>{
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            platform.Open();
        }
    }

    CloseAllBox = ()=>{
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            platform.Close();
        }
    }

    StartRotationPhase(maxRotation, speedAlpha, oncePhaseFinishEvent){
        this.ResetRotationPhase();

        this.IsOnRotationPhase = true;
        this.MaxRotation = maxRotation;
        this.PlatformSpeedAlpha = speedAlpha;
        this.Event.once(this.EventList.OncePhaseFinish, oncePhaseFinishEvent, this);

        this.Rotate();
        this.CheckRotationPhase();
    }

    CheckRotationPhase = ()=>{
        if(!this.IsAllPlatformAtLocation()){
            return;
        }

        this.Event.emit(this.EventList.OnAllPlatformAtLocation);
        
        if(this.RotationCount >= this.MaxRotation){
            this.FinishRotationPhase();
        }else{
            this.Rotate();
        }
    }

    FinishRotationPhase(){
        this.IsOnRotationPhase = false;
        this.Event.emit(this.EventList.OncePhaseFinish);
    }

    ResetRotationPhase(){
        this.RotationCount = 0;

        this.IsOnRotationPhase = false;
        this.SameRotationCount = 0;
        this.PrevRotation = undefined;
    }

    Rotate(){
        //same rotation prevention algorithm
        let isClockwise = (Phaser.Math.Between(0, 1) == 0) ? false : true;
        if(this.PrevRotation != undefined){
            if(this.SameRotationCount >= this.MaxSameRotation)
            {
                isClockwise = !this.PrevRotation;
            }
            this.SameRotationCount = (this.PrevRotation == isClockwise) ? this.SameRotationCount + 1 : 0;
        }
        this.PrevRotation = isClockwise;

        //rotate
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            let newIdx = platform.Idx;

            if(isClockwise){
                newIdx += 1;
                newIdx = (newIdx >= this.Platforms.length) ? 0 : newIdx;
            }else{
                newIdx -= 1;
                newIdx = (newIdx < 0) ? this.Platforms.length - 1 : newIdx;
            }

            platform.Move(newIdx, this.PosList[newIdx].x, this.PosList[newIdx].y, this.PlatformSpeedAlpha,  this.CheckRotationPhase)
        }

        this.Event.emit(this.EventList.OnStartRotate, isClockwise);
        this.RotationCount += 1;
    }

    OnceWaitingForAnswer(event){
        this.IsWaitingForAnswer = true;
        this.Event.once(this.EventList.OnceAnswering, event, this);
    }

    /** @param {PlatformController} box*/
    BoxSelectedEvent = (box) =>{
        if(this.IsWaitingForAnswer){
            this.IsWaitingForAnswer = false;
            this.Event.emit(this.EventList.OnceAnswering, box.IsTrueBox);

            box.Open();
        }
        
    }

    update(timestep, delta){
        this.platformsUpdate(timestep, delta);

    }

    platformsUpdate(timestep, delta)
    {
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            platform.update(timestep, delta);
        }
    }

    /** @return {Boolean} */
    IsAllPlatformAtLocation(){
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            if(platform.IsMoving){
                return false;
            }
        }
        return true;
    }

    Disable(){
        for(let i = 0; i< this.Platforms.length;i++){
            /** @type {PlatformController} */
            let platform = this.Platforms[i];
            platform.Disable();
        }
    }
}