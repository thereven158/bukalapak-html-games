import ScreenUtility from "../module/screen/screen_utility";
import { AnimationHelper } from "../helper/animation_helper";
import Minion from "./minion";

export default class Hole {

    /** @param {Phaser.Scene} scene */
    constructor(scene, x, y, depth){
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.x = x;
        this.y = y;
        this.Depth = depth;

        this.InitData();
        this.InitView();
    }

    InitData(){
        this.IsUsed = false;

    }

    InitView(){
        let maskWidth = this.ScreenUtility.GameWidth * 0.3;
        this.MaskShape = this.scene.add.graphics();
        this.MaskShape.fillStyle('0x1aC83C', 0);
        this.MaskShape.fillCircle(this.x, this.y - maskWidth, maskWidth);
        
        this.Mask = this.MaskShape.createGeometryMask();

        this.Hole = this.scene.add.image(this.x, this.y, 'hole');
        this.Hole.displayWidth = this.ScreenUtility.GameWidth * 0.28;
        this.Hole.displayHeight = this.Hole.displayWidth * (this.Hole.height / this.Hole.width)
    }

    /** @param {Minion} target */
    SetTarget(target){
        this.IsUsed = true;
        target.setDepth(this.Depth);
        target.setMask(this.Mask);
        target.OnceJumpFinish(this.JumpFinish)
    }

    JumpFinish = ()=>{
        this.IsUsed = false;
    }

    Disable(){
        
    }

    Reset(){
       
    }
}