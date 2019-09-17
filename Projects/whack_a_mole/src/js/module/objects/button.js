import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container{
        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y, texture){
        super(scene, x, y);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = scene.ScreenUtility;

        this.IsEnabled = true;

        this.NormalTexture = texture;
        this.DisabledTexture = null;

        this.Image = this.scene.add.image(0, 0, this.NormalTexture);
        this.Image.setInteractive();
        this.add(this.Image);

        this.IsClicked = false;

        this.Image.on('pointerdown', function(pointer) {
            if(!this.IsEnabled)
                return;

            this.IsClicked = true;
            this.Image.emit(this.EventList.onPointerDown);
        }, this);
        

        this.Image.on('pointerout', function(pointer){
            if(!this.IsEnabled)
                return;

            this.Image.emit(this.EventList.onPointerUp);
            
			if(this.IsClicked){
                this.IsClicked = false;
                this.Image.emit(this.EventList.onClick);
            }
        }, this);
        
        this.scene.add.existing(this);
        this.Image.setScale(this.ScreenUtility.ScalePercentage)

        this.EventList = {
            onClick: "onClick",
			onPointerDown: "onPointerDown",
			onPointerUp: "onPointerUp",
		}
    }

    SetEnable(active){
        this.IsEnabled = active;
        this.Image.texture = (this.DisabledTexture != null && !active) ? this.DisabledTexture : this.NormalTexture;
    }

    RemoveOnCLickListener(){
        this.removeListener(this.EventList.onClick);
    }

    OnClick(event){
        this.Image.on(this.EventList.onClick, event);
    }

    OnceClick(event){
        this.Image.once(this.EventList.onClick, event);
    }

    OnPointerDown(event){
        this.Image.on(this.EventList.onPointerDown, event, this);
    }

    OnPointerUp(event){
        this.Image.on(this.EventList.onPointerUp, event, this);
    }
}