import ScreenUtility from "../module/screen/screen_utility";
import Hole from "./hole_controller";
import Minion from "./minion_controller";
import gameplaydata from "../gameplaydata";

export default class BoardController  extends Phaser.GameObjects.Container{

    /** @param {Phaser.Scene} scene */
	constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.Event = new Phaser.Events.EventEmitter();
        this.EventList = {
            OnTargetHit: "OnTargetHit",
        }

        this.init();

        scene.add.existing(this);  
    }

    init = ()=>{
        this.initData();
        this.InitiateBoard();
    }

    initData = ()=>{
        /** @type {(Hole|Array)}  */
        this.Holes = [];
        /** @type {(Minion|Array)}  */
        this.Minions = [];

    }

    InitiateBoard(){
        this.TargetGroup = this.scene.add.container(0,0);
        this.add(this.TargetGroup);

        let hole1 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.2, this.ScreenUtility.GameHeight * 0.45, 'hole2', 0);
        this.Holes.push(hole1)

        let hole2 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.45, 'hole1', 0);
        this.Holes.push(hole2)

        let hole3 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.82, this.ScreenUtility.GameHeight * 0.45, 'hole3', 0);
        this.Holes.push(hole3)

        let hole4 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.18, this.ScreenUtility.GameHeight * 0.6, 'hole2', 0.1);
        this.Holes.push(hole4)

        let hole5 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.48, this.ScreenUtility.GameHeight * 0.6, 'hole1', 0.1);
        this.Holes.push(hole5)

        let hole6 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.77, this.ScreenUtility.GameHeight * 0.6, 'hole3', 0.1);
        this.Holes.push(hole6)

        let hole7 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.2, this.ScreenUtility.GameHeight * 0.76, 'hole3', 0.2);
        this.Holes.push(hole7)

        let hole8 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.76, 'hole2', 0.2);
        this.Holes.push(hole8)

        let hole9 = new Hole(this.scene, this.ScreenUtility.GameWidth * 0.8, this.ScreenUtility.GameHeight * 0.76, 'hole1', 0.2);
        this.Holes.push(hole9)


        for(let i = 0; i < gameplaydata.MaxTargetPooled; i++){
            let minion = new Minion(this.scene, 0, 0);
            this.Minions.push(minion);
        }
        
    }

    OnTargetHit(event){
        this.Event.on(this.EventList.OnTargetHit, event, this);
    }

    Disable(){
        for(let i=0; i < this.Minions.length; i++){

            /** @type {Minion}  */
            let minion = this.Minions[i];
            minion.Disable();
        }
    }

    Show(){
        /** @type {(Minion|Array)}  */
        let inactiveTargets = this.GetInactiveTargets();
        /** @type {(Hole|Array)}  */
        let unusedHoles = [];

        for(let i = 0; i < this.Holes.length; i++){
            let hole = this.Holes[i];
            if(!hole.IsUsed){
                unusedHoles.push(hole);
            }
        }

        if(inactiveTargets.length <= 0 || unusedHoles <= 0)
            return;
        
        let randomHoleIdx = Phaser.Math.Between(0, unusedHoles.length - 1)
        let unusedHole = unusedHoles[randomHoleIdx];
        let minion = inactiveTargets[0];

        minion.OnceHit(this.TargetHit);

        unusedHole.SetTarget(minion);

        minion.Jump(unusedHole.x, unusedHole.y)
    
    }

    TargetHit = ()=>{
        this.Event.emit(this.EventList.OnTargetHit);
    }

    /** @return {(Minion|Array)}  */
    GetActiveTargets(){
        /** @type {(Minion|Array)}  */
        var activeTargets = [];

        for(let i=0; i < this.Minions.length; i++){

            /** @type {Minion}  */
            let minion = this.Minions[i];
            
            if(minion.IsJumping){
                activeTargets.push(minion);
            }
        }

        return activeTargets;
    }

    /** @return {(Minion|Array)}  */
    GetInactiveTargets(){
        /** @type {(Minion|Array)}  */
        var inactiveTargets = [];

        for(let i=0; i < this.Minions.length; i++){

            /** @type {Minion}  */
            let minion = this.Minions[i];
            
            if(!minion.IsJumping){
                
                inactiveTargets.push(minion);
            }
        }

        return inactiveTargets;
    }
}