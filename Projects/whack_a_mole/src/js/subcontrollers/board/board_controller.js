import ScreenUtility from "../../module/screen/screen_utility";
import TargetObjectController from "../../gameobjects/target_object_controller";

export default class BoardController  extends Phaser.GameObjects.Container{

    /** @param {Phaser.Scene} scene */
	constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.TotalColumn = 3;
        this.TotalRow = 3;

        this.EventList = {
            OnTargetHit: "OnTargetHit",
        }
        
        scene.add.existing(this);  
    }

    create(){
        this.InitiateBoard();
    }

    update(){
       
    }

    InitiateBoard(){
        this.TargetGroup = this.scene.add.container(0,0);
        this.add(this.TargetGroup);

        let boardWidth = this.ScreenUtility.GameWidth * 0.75;

        let objDistance = boardWidth / this.TotalColumn;
        let offset = objDistance * 0.5;
        let posY = offset + (-boardWidth * 0.5);
        let objSize = objDistance * 0.7;
        
        for(let i = 0; i< this.TotalRow; i++){
            let posX = offset + (-boardWidth * 0.5);

            for(let j = 0; j< this.TotalColumn; j++){
                let obj = new TargetObjectController(this.scene, posX, posY, 'logo');
                obj.displayWidth = objSize;
                obj.displayHeight = obj.displayWidth * (obj.height / obj.width);
                obj.OnClickTarget(()=>{
                    this.emit(this.EventList.OnTargetHit);
                });

                this.TargetGroup.add(obj);
                posX += objDistance;
            }

            posY += objDistance;
        }

        console.log(this.TargetGroup.list)
    }

    OnTargetHit(event){
        this.on(this.EventList.OnTargetHit, event, this);
    }

    Disable(){
        for(let i=0; i<this.TargetGroup.list.length; i++){
            /** @type {TargetObjectController}  */
            let target = this.TargetGroup.list[i];
            
           target.Disable();

        }
    }

    GetTargetsData(){
        /** @type {(TargetObjectController|Array)}  */
        var activeTargets = [];
        /** @type {(TargetObjectController|Array)}  */
        var inactiveTargets = [];

        for(let i=0; i<this.TargetGroup.list.length; i++){

            /** @type {TargetObjectController}  */
            let target = this.TargetGroup.list[i];
            
            if(target.IsShowing){
                activeTargets.push(target);
            }else{
                inactiveTargets.push(target);
            }

        }

        return {
            total : this.TargetGroup.list.length,
            targets : this.TargetGroup.list,
            totalActive :  activeTargets.length,
            activeTargets : activeTargets,
            totalInactive : inactiveTargets.length,
            inactiveTargets : inactiveTargets,
        };
    }

    /** @return {number)}  */
    GetTotalTargets(){
        return this.TargetGroup.list.length;
    }

    /** @return {(TargetObjectController|Array)}  */
    GetAllTargets(){
        return this.TargetGroup.list;
    }
}