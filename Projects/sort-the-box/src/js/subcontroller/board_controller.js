import ScreenUtility from "../module/screen/screen_utility";
import Image from "../module/objects/image";
import MinionController from "./minion_controller";


export default class BoardController{

    /** @param {Phaser.Scene} scene */
	constructor(scene) {

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.Event = new Phaser.Events.EventEmitter();
        this.EventList = {
            onRollerAtLocation : ''
        }

        this.init();
    }

    /** @return {BoardController} */
    init = () =>{
        this.initData();
        this.initiateBoard();
        this.moveRoller();
        return this;
    }

    initData = () =>{
        this.IsEnabled = true;

        this.Rollers = [];
        this.Minions = [];
        this.MaxMinionAlive = 4;

    }

    initiateBoard = () =>{
        this.TeleBlue = new Image(this.scene, this.ScreenUtility.GameWidth * 0.25, this.ScreenUtility.GameHeight * 0.68, 'tele_blue')
        this.TeleBlue.setDisplayWidth(this.ScreenUtility.GameWidth * 0.28, true);
        this.TeleBlue.setOrigin(0.5, 1);

        this.TeleRed = new Image(this.scene, this.ScreenUtility.GameWidth * 0.75, this.ScreenUtility.GameHeight * 0.68, 'tele_red')
        this.TeleRed.setDisplayWidth(this.ScreenUtility.GameWidth * 0.28, true);
        this.TeleRed.setOrigin(0.5, 1);

        let roller1 = new Image(this.scene, this.ScreenUtility.GameWidth * -0.5, this.ScreenUtility.GameHeight * 0.75, 'roller')
        roller1.setOrigin(0.5, 1);
        roller1.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        this.Rollers.push(roller1);

        let roller2 = new Image(this.scene, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.75, 'roller')
        roller2.setOrigin(0.5, 1);
        roller2.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        this.Rollers.push(roller2);

        for (let i = 0; i < this.MaxMinionAlive; i++){
            let minion = new MinionController(this.scene, 0, 0, 1);
            minion.setEnabled(false);
            this.Minions.push(minion);
        }


    }

    attachMinionToRoller = ()=>{

    }

    moveRoller = ()=>{
        this.scene.tweens.add({
            targets: this.Rollers[0],
            x : this.ScreenUtility.GameWidth * 0.5,
            duration: 3000,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete : ()=>{
     
            },
            onCompleteScope : this
        });	

        this.scene.tweens.add({
            targets: this.Rollers[1],
            x : this.ScreenUtility.GameWidth * 1.5,
            duration: 3000,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete : ()=>{
                this.Rollers[1].x = this.ScreenUtility.GameWidth * -0.5;
                this.Rollers.reverse();
                this.moveRoller();
            },
            onCompleteScope : this
        });	
    }

    update(timestep, delta){
        this.Minions[0].setPosition(this.Rollers[0].x, this.Rollers[1].y);
    }


    disable = () =>{

    }
}