import Sprite from "../module/objects/sprite";
import { AnimationHelper } from "../helper/animation_helper";

var BlueMinionAnimationList = {
    stand : 'blue_stand',
    Idle : 'blue_idle',
    Sad : 'blue_sad',
    Happy : 'blue_happy',
    Jump : 'blue_jump',
    teleport : 'blue_teleport',
    show : 'blue_show',
};

var RedMinionAnimationList = {
    stand : 'red_stand',
    Idle : 'red_idle',
    Sad : 'red_sad',
    Happy : 'red_happy',
    Jump : 'red_jump',
    teleport : 'red_teleport',
    show : 'red_show',
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
        this.IsUsed = false;

    }

    initSprite = ()=>{
        this.setDepth(1);
        this.setOrigin(0.5, 1);
        this.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        for(let i = 0; i < Minions.length; i++){
            
            let minion = Minions[i];
            AnimationHelper.AddFrames(scene, minion.animations.stand, minion.texture, [6], 24, true);
            AnimationHelper.AddSequence(scene, minion.animations.Idle, minion.texture, 6, 17, 24, true);
            AnimationHelper.AddSequence(scene, minion.animations.Sad, minion.texture, 0, 5, 24, true);
            AnimationHelper.AddSequence(scene, minion.animations.Jump, minion.texture, 18, 29, 19, false);
            AnimationHelper.AddSequence(scene, minion.animations.teleport, minion.texture, 30, 40, 24, false);
        }
    }

    preUpdate(timestep, delta){
        super.preUpdate(timestep, delta);

    }

    use = (id = undefined) =>{
        if(id != undefined){
            this.setID(id);
        }

        this.IsUsed = true;
        this.setVisible(true);
        this.play(this.CurrentMinion.animations.Idle);
    }

    unUse = ()=>{
        this.IsUsed = false;
        this.setVisible(false);

        this.reset();
    }

    playTeleportAnimation = ()=>{
        this.play(this.CurrentMinion.animations.teleport);
    }

    playJumpAnimation = ()=>{
        this.play(this.CurrentMinion.animations.Jump);
    }

    playSadAnimation = ()=>{
        this.play(this.CurrentMinion.animations.Sad);
    }

    teleport = ()=>{

    }

    reset = ()=>{
        this.initSprite();
    }

    disable = () =>{

    }
}