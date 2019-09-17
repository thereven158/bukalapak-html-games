
export default class TargetObjectController extends Phaser.GameObjects.Sprite{

        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        
        this.scene = scene;

        this.InitData();

        this.scene.add.existing(this);

        this.setInteractive();
    }

    InitData(){
        this.IsShowing = false;
        this.setAlpha(0.5);

        this.Duration = 3;
        this.Timer = 0;
    }

    preUpdate(timestep, dt){
        if(this.IsShowing){
            this.Timer += (1 * dt) / 1000;
            if(this.Timer >= this.Duration){
                this.Hide();
            }
        }
    }

    Show(duration){
        this.Timer = 0;
        this.IsShowing = true;

        this.setAlpha(1);
    }

    Hide(){
        this.IsShowing = false;
        this.setAlpha(0.5);

    }

    Disable(){
        
    }

    Reset(){
        this.InitData();
    }

    OnClickTarget(event){
        this.on('pointerdown', (pointer)=>{
            if(!this.IsShowing)
                return;

            event(this);
            this.Hide();
        }, this);
    }
}