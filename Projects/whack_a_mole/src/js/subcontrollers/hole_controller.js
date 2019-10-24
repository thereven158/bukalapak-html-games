import ScreenUtility from "../module/screen/screen_utility";
import Minion from "./minion_controller";
import Image from "../module/objects/image";

export default class HoleController {

    /** @param {Phaser.Scene} scene */
    constructor(scene, x, y, texture, depth){
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.x = x;
        this.y = y;
        this.Depth = depth;
        this.HoleTexture = texture;

        this.init();
    }

    init = ()=>{
        this.initData();
        this.initView();
    }

    initData = ()=>{
        this.IsUsed = false;

    }

    initView = ()=>{
        let maskWidth = this.ScreenUtility.GameWidth * 0.3;
        this.MaskShape = this.scene.add.graphics();
        this.MaskShape.fillStyle('0x1aC83C', 0);
        this.MaskShape.fillCircle(this.x, this.y - maskWidth, maskWidth);
        
        this.Mask = this.MaskShape.createGeometryMask();

        this.Hole = new Image(this.scene, this.x, this.y, this.HoleTexture);
        this.Hole.setDisplayWidth(this.ScreenUtility.GameWidth * 0.28, true);
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
}