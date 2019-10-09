import ScreenUtility from "../module/screen/screen_utility";
import Image from "../module/objects/image";
import MinionController from "./minion_controller";
import RollerController from "./roller_controller";
import TeleController from "./tele_controller";
import gameplaydata from "../gameplaydata";


export default class BoardController{

    /** @param {Phaser.Scene} scene */
	constructor(scene) {

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.Event = new Phaser.Events.EventEmitter();
        this.EventList = {
            
        }

        this.init();
    }

    /** @return {BoardController} */
    init = () =>{
        this.initData();
        this.initiateBoard();

        return this;
    }

    initData = () =>{
        this.IsEnabled = true;

        this.TargetMinion = undefined;

        this.Teleportations = [];
        this.Rollers = [];
        this.Minions = [];
        this.MaxMinionAlive = 4;

        this.PreviousID = undefined;
        this.SameIDCount = 0;
    }

    initiateBoard = () =>{
        let teleBlue = new TeleController(this.scene, this.ScreenUtility.GameWidth * 0.25, this.ScreenUtility.GameHeight * 0.68, 0)
        //teleBlue.setDisplayWidth(this.ScreenUtility.GameWidth * 0.28, true);
        //teleBlue.setOrigin(0.5, 1);
        this.Teleportations.push(teleBlue);

        let teleRed = new TeleController(this.scene, this.ScreenUtility.GameWidth * 0.75, this.ScreenUtility.GameHeight * 0.68, 1)
        //teleRed.setDisplayWidth(this.ScreenUtility.GameWidth * 0.28, true);
        //teleRed.setOrigin(0.5, 1);
        this.Teleportations.push(teleRed);

        let roller1 = new RollerController(this.scene, this.ScreenUtility.GameWidth * -0.5, this.ScreenUtility.GameHeight * 0.75)
        this.Rollers.push(roller1);

        let roller2 = new RollerController(this.scene, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.75)
        this.Rollers.push(roller2);

        for (let i = 0; i < this.MaxMinionAlive; i++){
            let minion = new MinionController(this.scene, 0, 0, 0);
            minion.unUse();
            this.Minions.push(minion);
        }
    }

    produce = (onMinionReadyEvent)=>{
        let id = Phaser.Math.Between(0,1);

        //same id prevention algorithm
        if(this.PreviousID != undefined){

            if(this.SameIDCount >= gameplaydata.MaxSameTargetID){
                id = (this.PreviousID == 0) ? 1: 0;
            }
    
            if(id == this.PreviousID){
                this.SameIDCount += 1;
            }else{
                this.SameIDCount = 0;
            }
        }
        this.PreviousID = id;

        //produce
        let previousMinion = this.TargetMinion;

        this.TargetMinion = this.getUnusedMinion();
        this.TargetMinion.use(id);
        
        if(previousMinion != undefined){
            previousMinion.playSadAnimation();
        }
            
        this.moveRoller(this.TargetMinion, previousMinion, onMinionReadyEvent);
        this.scene.sound.play("appear");
    }

    /** @return {MinionController} */
    getUnusedMinion = () =>{
        let minion = undefined;
        for (let i = 0; i < this.Minions.length; i++){
            /** @type {MinionController} */
            let minion = this.Minions[i];
            if(!minion.IsUsed){
                return minion;
            }else
                minion = undefined;
        }

        //if there is no minion available
        minion = new MinionController(this.scene, 0, 0, 0);
        this.Minions.push(minion);

        return minion;
    }

    /** 
    * @param {MinionController} minion1 
    * @param {MinionController} minion2 
    */
    moveRoller = (minion1 = undefined, minion2 = undefined, onFinishMove = undefined)=>{
        /** @type {RollerController} */
        let roller1 = this.Rollers[0];
        this.scene.tweens.add({
            targets: roller1,
            x : this.ScreenUtility.GameWidth * 0.5,
            duration: gameplaydata.RollerSpeedDuration,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate : () =>{
                if(minion1 != undefined){
                    minion1.setPosition(roller1.getStandPosition().x, roller1.getStandPosition().y);
                }
            },
            onComplete : ()=>{
                if(minion1 != undefined){
                    //minion1.playShowAnimation();
                }
            },
            onUpdateScope : this,
            onCompleteScope : this
        });	

        /** @type {RollerController} */
        let roller2 = this.Rollers[1];
        this.scene.tweens.add({
            targets: roller2,
            x : this.ScreenUtility.GameWidth * 1.5,
            duration: gameplaydata.RollerSpeedDuration,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate : () =>{
                if(minion2 != undefined){
                    minion2.setPosition(roller2.getStandPosition().x, roller2.getStandPosition().y);
                }
            },
            onComplete : ()=>{
                this.Rollers[1].x = this.ScreenUtility.GameWidth * -0.5;
                this.Rollers.reverse();

                this.dumpMinion(minion2);

                if(onFinishMove != undefined){
                    onFinishMove();
                }
            },
            onUpdateScope : this,
            onCompleteScope : this
        });	
    }

    /** @param {MinionController} minion*/
    dumpMinion = (minion)=>{
        if(minion == undefined)
            return;

        minion.setPosition(this.ScreenUtility.GameWidth * -0.5, this.ScreenUtility.GameHeight * -0.5)
        minion.unUse();
    }

     /** @return {Number}*/
    activeMinionID = () =>{
        return this.TargetMinion.ID;
    }

    sendTargetMinionToTelerpotation = (onSuccessTeleportEvent)=>{
        this.sendMinionToTeleportation(this.TargetMinion, onSuccessTeleportEvent);
        this.TargetMinion.playJumpAnimation();

        this.TargetMinion = undefined;
    }

    /** @param {MinionController} minion*/
    sendMinionToTeleportation = (minion, onSuccessTeleportEvent)=>{
        minion.setDepth(0);

        /** @type {TeleController} */
        let tele = this.Teleportations[minion.ID];

        let minionTargetWidth = tele.Image.displayWidth * 0.9;
        let minionTargetHeight = minionTargetWidth * minion.HeightAspectRatio;

        this.scene.tweens.add({
            targets: minion,
            x : tele.getStandPosition().x,
            y : tele.getStandPosition().y,
            displayWidth : minionTargetWidth,
            displayHeight : minionTargetHeight,
            duration: gameplaydata.RollerSpeedDuration * 0.7,
            ease: Phaser.Math.Easing.Cubic.InOut,
            onComplete : ()=>{
                minion.playTeleportAnimation();
                tele.teleport(()=>{
                    this.dumpMinion(minion);
                });
                onSuccessTeleportEvent();
            },
            onCompleteScope : this,
        });	
    }

    demo = ()=>{
        let previousTarget = this.TargetMinion;
        this.TargetMinion = this.getUnusedMinion();

        this.TargetMinion.setID(Phaser.Math.Between(0,1));
        this.TargetMinion.use();

        if(previousTarget != undefined){
            previousTarget.playSad();
        }
            
        this.moveRoller(this.TargetMinion, previousTarget, this.demo);
    }

    update(timestep, delta){
        
    }

    disable = () =>{

    }
}