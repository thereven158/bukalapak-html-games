import Sprite from "../module/objects/sprite";

var BlueMinionAnimationList = {
    Idle : 'blue_idle',

};

var RedMinionAnimationList = {
    Idle : 'red_idle',
};

var Minions = [
    {
        texture : 'minion_blue',
        animations : BlueMinionAnimationList
    }, 
    {
        texture : 'minion_red',
        animations : RedMinionAnimationList
    }
];

export default class MinionController extends Sprite{

    /** @param {Phaser.Scene} scene */
	constructor(scene, x, y, id) {
        super(scene, x, y, 'minion_blue', 0);

        this.setID(id);
        this.EventList = {
            
        }
        
        this.init();
    }

    /** @param {Number} id */
    setID = (id) =>{
        this.ID = id;
        this.CurrentMinion = Minions[this.ID];

        this.setTexture(this.CurrentMinion.texture);
    }

    /** @return {MinionController} */
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
        this.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        // AnimationHelper.AddFrames(scene, BoxAnimationList.Idle, 'box', [0], 20, true);
        // AnimationHelper.AddSequence(scene, BoxAnimationList.IdleTrue, 'box', 20,24, 15, true);
    }

    preUpdate(timestep, delta){
        super.preUpdate(timestep, delta);

    }

    reset = ()=>{
        this.initSprite();
    }

    setEnabled = (isEnabled = true)=>{
        this.IsEnabled = isEnabled;
        this.setVisible(this.IsEnabled);
    }

    disable = () =>{

    }
}