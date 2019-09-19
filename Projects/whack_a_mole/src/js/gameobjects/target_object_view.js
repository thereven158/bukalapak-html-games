import ScreenUtility from "../module/screen/screen_utility";

export default class TargetObjectView {

        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.InitView();
    }

    InitView(){
        let maskWidth = this.ScreenUtility.GameWidth * 0.3;
        this.MaskShape = this.scene.add.graphics();
        this.MaskShape.fillStyle('0x00C88C', 0.1);
        this.MaskShape.fillCircle(x, y - maskWidth, maskWidth);
        
        let mask = this.MaskShape.createGeometryMask();

        this.Image = this.scene.add.image(x,y, 'logo')
        this.Image.setMask(mask);

        this.Image.on('pointerdown', this.ClickTarget, this);
        this.Image.setInteractive();
    }



    OnClickTarget(event){
        this.Image.on(this.EventList.OnTargetHit, event);
    }
}