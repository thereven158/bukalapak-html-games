import { AnimationHelper } from "../helper/animation_helper";
import ScreenUtility from "../module/screen/screen_utility";

var Animations = {
    Jump:'jump',
    Falling:'Falling',
    FallingHurt:'FallingHurt',
}

export default class Minion extends Phaser.GameObjects.Sprite{
        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y){
        super(scene, x, y, 'minion',0);
        
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.InitImage();
        this.InitData();
    
        this.scene.add.existing(this);
    }

    InitImage(){
        this.setOrigin(0.5, 1);
        this.setInteractive();

        this.on('pointerdown', this.Hit, this);

        this.displayWidth = this.ScreenUtility.GameWidth * 0.2;
        this.displayHeight = this.displayWidth * (this.height / this.width);

        this.setVisible(false);
    }

    InitData(){
        this.IsEnabled = true;
        this.IsJumping = false;
        this.IsFalling = false;
        this.IsHurt = false;

        this.JumpSpeed = 0;
        
        this.EventList = {
            OnHit: "OnHit",
            OnJumpFinish: "OnJumpFinish"
        }

    }

    //to be initiated once by the current scene class
    static InitAnimationData(scene){
        AnimationHelper.AddFrames(scene, Animations.Jump, 'minion', [0], 20, true);
        AnimationHelper.AddSequence(scene, Animations.Falling, 'minion', 6, 9, 15, true);
        AnimationHelper.AddSequence(scene, Animations.FallingHurt, 'minion', 11, 20, 15, true);
    }

    GetGravity(){
        return this.displayHeight * (this.IsHurt ?  0.003: 0.0018);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.IsJumping){
            this.y -= this.JumpSpeed;
            this.JumpSpeed -= this.GetGravity();

            if(!this.IsFalling  && this.JumpSpeed <= 0){
                this.IsFalling = true;

                if(!this.IsHurt){
                    this.anims.play(Animations.Falling);
                }
            }

            if(this.y >= this.TargetPosY && this.IsFalling){
                this.JumpFinish();
            }
        }
    }

    Jump(x, targetPosY){
        this.TargetPosY = targetPosY + (this.displayHeight);

        this.x = x - 5;
        this.y = this.TargetPosY;

        this.IsJumping = true;
        this.IsFalling = false;
        this.IsHurt = false;

        this.JumpSpeed = this.displayHeight * 0.07;

        this.anims.play(Animations.Jump,false,0);
        this.anims.resume();
        
        
        this.setVisible(true);
    }

    JumpFinish(){
        this.IsJumping = false;

        this.emit(this.EventList.OnJumpFinish);
        this.removeListener(this.EventList.OnHit);

        this.setVisible(false);
    }

    Hit(){
        if(this.IsHurt && this.IsEnabled && this.IsJumping)
            return;

        this.IsHurt = true;
        this.play(Animations.FallingHurt);

        this.emit(this.EventList.OnHit);
    }

    OnceHit(event){
        this.once(this.EventList.OnHit, event);
    }

    OnceJumpFinish(event){
        this.once(this.EventList.OnJumpFinish, event);
    }

    Disable(){
        this.IsEnabled = false;
    }
}