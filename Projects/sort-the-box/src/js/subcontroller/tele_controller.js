import Image from "../module/objects/image";
import { AnimationHelper } from "../helper/animation_helper";
import Sprite from "../module/objects/sprite";
import ScreenUtility from "../module/screen/screen_utility";
import { ScaleModes } from "phaser";

var teleAnimationList = {
    tele : 'tele'
}

var teleports = [
    {
        teleTexture : 'tele_blue',
        lightTexture : 'light_blue',
    },
    {
        teleTexture : 'tele_red',
        lightTexture : 'light_red',
    },
]

export default class TeleController extends Phaser.GameObjects.Container{
    /** @param {Phaser.Scene} scene */
	constructor(scene, x, y, id) {
        super(scene, x, y);
        this.ID = id;

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();
        this.TeleportEffectAnimationList = teleAnimationList;
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
        this.scene.add.existing(this);

        this.Image = new Image(this.scene, 0,0, teleports[this.ID].teleTexture);
        this.Image.setOrigin(0.5,1);
        this.Image.setDisplayWidth(this.ScreenUtility.GameWidth * 0.3, true);
        this.add(this.Image)

        this.TeleLight = new Image(this.scene, 0, this.Image.displayHeight * -0.61, teleports[this.ID].lightTexture);
        this.TeleLight.setDisplayWidth(this.Image.displayWidth * 0.3, true);
        this.TeleLight.setOrigin(0.5);
        this.add(this.TeleLight)
        this.scene.tweens.add({
            targets: this.TeleLight,
            alpha: 0.6,
            duration: 500,
            ease: Phaser.Math.Easing.Linear.Linear,
            loop: -1,
            yoyo: true
        });		

        this.Effect = new Sprite(this.scene, 0, this.Image.displayHeight * -0.235, 'teleport_beam', 0);
        this.Effect.setDisplaySize(this.Image.displayWidth, this.Image.displayHeight * 0.365);
        this.Effect.setOrigin(0.5, 1);
        this.Effect.setDepth(0.5);
        this.add(this.Effect);

    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        AnimationHelper.AddFrames(scene, 'tele', 'teleport_beam', [0, ,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,0], 24, false)
    }

    setEnabled = (isEnabled = true)=>{
        this.IsEnabled = isEnabled;
 
    }

    teleport = (onTeleEvent)=>{
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.03,
            scaleY: 0.99,
            duration: 100,
            ease: Phaser.Math.Easing.Sine.Out,
            yoyo: true,
            loop : false
        });	

        this.Effect.anims.play('tele').on('animationupdate', ()=>{
            if(this.Effect.anims.currentFrame.index >= 11 && onTeleEvent != undefined){
                onTeleEvent();
                onTeleEvent = undefined;
            }
        }, this);
    }

    getStandPosition = ()=>{
        let pos = {
            x: this.x,
            y: this.y - this.Image.displayHeight * 0.2,
        }
        return pos;
    }

    disable = () =>{

    }
}