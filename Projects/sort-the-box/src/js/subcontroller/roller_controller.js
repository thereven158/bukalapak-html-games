import Image from "../module/objects/image";

export default class RollerController extends Image{

    /** @param {Phaser.Scene} scene */
	constructor(scene, x, y) {
        super(scene, x, y, 'roller');

        this.EventList = {
            
        }
        
        this.init();
    }

    
    /** @return {RollerController} */
    init = () =>{
        this.initData();
        this.initSprite();
        return this;
    }

    initData = () =>{
        this.IsEnabled = true;
        

    }

    initSprite = ()=>{
        this.setOrigin(0.5, 1);
        this.setDisplayWidth(this.ScreenUtility.GameWidth, true);
    }

    setEnabled = (isEnabled = true)=>{
        this.IsEnabled = isEnabled;
 
    }

    getStandPosition = ()=>{
        let pos = {
            x: this.x,
            y: this.y,
        }
        return pos;
    }

    disable = () =>{

    }
}