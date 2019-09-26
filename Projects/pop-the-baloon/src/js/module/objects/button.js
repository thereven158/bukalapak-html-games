import Image from './image';

export default class Button extends Phaser.GameObjects.Container{
        /** 
        * @param {Phaser.Scene} scene 
        * @param {Number} x
        * @param {Number} y
        * @param {String} texture
        */

    constructor(scene, x, y, texture){
        super(scene, x, y);

        this.ScreenUtility = scene.ScreenUtility;

        this.scene = scene;
        this.IsEnabled = true;
        this.IsAudioActive = true;

        this.NormalTexture = texture;
        this.DisabledTexture = null;

        this.Image = new Image(this.scene, 0, 0, this.NormalTexture);
        this.Image.setInteractive();
        this.add(this.Image);

        this.IsClicked = false;

        this.Image.on('pointerdown', this.pointerDown, this);
        this.Image.on('pointerout', this.pointerOut, this);
        
        this.scene.add.existing(this);
        
        this.EventList = {
            onClick: "onClick",
			onPointerDown: "onPointerDown",
			onPointerUp: "onPointerUp",
		}
    }

    pointerDown = (pointer) =>{
        if(!this.IsEnabled)
            return;

        if(this.HighlightTexture != null){
            this.Image.texture = this.HighlightTexture;
        }
        
        this.IsClicked = true;
        this.emit(this.EventList.onPointerDown);
    }

    pointerOut = (pointer) =>{
        if(!this.IsEnabled)
            return;

        if(this.HighlightTexture != null){
            this.Image.texture = this.NormalTexture;
        }

        this.emit(this.EventList.onPointerUp);
        
        if(this.IsClicked){
            this.IsClicked = false;

            if(this.IsAudioActive){
                //play audio button
                //this.scene.game.sound.play('click');
            }

            this.emit(this.EventList.onClick);
        }
    }

    setOrigin(x, y = x){
        this.Image.setOrigin(x, y);
    }

    setDisplayWidth(width, matchHeightToAspectRatio = false){
        this.Image.setDisplayWidth(width, matchHeightToAspectRatio);
    }

    setDisplayHeight(height, matchWidthToAspectRatio = false){
        this.Image.setDisplayHeight(height, matchWidthToAspectRatio);
    }

    setAudioActive(isActive = true){
        this.IsAudioActive = isActive;
    }

    SetEnable(active){
        this.IsEnabled = active;
        this.Image.texture = (this.DisabledTexture != null && !active) ? this.DisabledTexture : this.NormalTexture;
    }

    removeOnCLickListener(){
        this.removeListener(this.EventList.onClick);
    }

    onClick(event){
        this.on(this.EventList.onClick, event);
    }

    onceClick(event){
        this.once(this.EventList.onClick, event);
    }

    onPointerDown(event){
        this.on(this.EventList.onPointerDown, event, this);
    }

    onPointerUp(event){
        this.on(this.EventList.onPointerUp, event, this);
    }
}