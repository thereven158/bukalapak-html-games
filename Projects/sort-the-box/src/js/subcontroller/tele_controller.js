import Image from "../module/objects/image";
import { AnimationHelper } from "../helper/animation_helper";
import Sprite from "../module/objects/sprite";
import ScreenUtility from "../module/screen/screen_utility";

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

        this.TeleportEffect = new Sprite(this.scene, 0, this.Image.displayHeight * -0.235, 'teleport_effect', 6);
        this.TeleportEffect.setDisplaySize(this.Image.displayWidth, this.Image.displayHeight * 0.365);
        this.TeleportEffect.setOrigin(0.5,1);
        this.TeleportEffect.setDepth(0.5);
        this.TeleportEffect.setVisible(false);
        this.add(this.TeleportEffect);
    }

    //to be initiated once by the current scene class
    static initAnimationData = (scene) =>{
        let teleAnim = AnimationHelper.AddSequence(scene, teleAnimationList.tele, 'teleport_effect', 0, 19, 30, false)
        teleAnim.hideOnComplete = true;
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
        });	

        this.TeleportEffect.setVisible(true);
        this.TeleportEffect.setActive(true);
        this.TeleportEffect.play(this.TeleportEffectAnimationList.tele).on('animationupdate', (anim)=>{
            if(this.TeleportEffect.anims.currentFrame.index >= 11 && onTeleEvent != undefined){
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