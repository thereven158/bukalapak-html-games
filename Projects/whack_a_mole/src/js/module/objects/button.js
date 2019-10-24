import Image from './image';

export default class Button extends Phaser.GameObjects.Container{

    /** 
    * @param {Phaser.Scene} scene 
    * @param {Number} x
    * @param {Number} y
    * @param {String} texture
    * @param {Number} frame
    */
    constructor(scene, x, y, texture, frame = 0){
        super(scene, x, y);
        
        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = scene.ScreenUtility;

        this.IsEnabled = true;
        this.IsAudioActive = true;

        this.NormalTexture = {
            texture : texture,
            frame : frame
        };

        this.HighlightTexture = {
            texture : null,
            frame : 0
        };

        this.PressedTexture = {
            texture : null,
            frame : 0
        };

        this.DisabledTexture = {
            texture : null,
            frame : 0
        };

        this.Image = new Image(this.scene, 0, 0, this.NormalTexture.texture, this.NormalTexture.frame );
        this.Image.setInteractive();
        this.add(this.Image);

        this.IsClicked = false;

        this.Image.on('pointerenter', this.pointerEnter, this);
        this.Image.on('pointerdown', this.pointerDown, this);
        this.Image.on('pointerout', this.pointerOut, this);
        
        this.scene.add.existing(this);

        this.EventList = {
            onClick: "onClick",
            onPointerDown: "onPointerEnter",
			onPointerDown: "onPointerDown",
			onPointerUp: "onPointerUp",
		}
    }

    pointerEnter = (pointer) =>{
        if(!this.IsEnabled)
            return;

        if(this.HighlightTexture.texture != null){
            this.Image.setTexture(this.HighlightTexture.texture, this.HighlightTexture.frame);
        }
        
        this.emit(this.EventList.onPointerEnter);
    }

    pointerDown = (pointer) =>{
        if(!this.IsEnabled)
            return;

        if(this.PressedTexture.texture != null){
            this.Image.setTexture(this.PressedTexture.texture, this.PressedTexture.frame);
        }
        
        this.IsClicked = true;
        this.emit(this.EventList.onPointerDown);
    }

    pointerOut = (pointer) =>{
        if(!this.IsEnabled)
            return;

        this.Image.setTexture(this.NormalTexture.texture, this.NormalTexture.frame);

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

    setEnable(active){
        this.IsEnabled = active;
        this.Image.texture = (this.DisabledTexture != null && !active) ? this.DisabledTexture : this.NormalTexture;
    }

    /** 
    * @param {String} texture 
    */
    setHighlightTexture = (texture, frame = 0) =>{
        this.HighlightTexture.texture = texture;
        this.HighlightTexture.frame = frame;
    }

    /** 
    * @param {String} texture 
    */
    setPressedTexture = (texture, frame = 0) =>{
        this.PressedTexture.texture = texture;
        this.PressedTexture.frame = frame;
    }

    /** 
    * @param {String} texture 
    */
    setDisabledTexture = (texture, frame = 0) =>{
        this.DisabledTexture.texture = texture;
        this.DisabledTexture.frame = frame;
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

    onPointerEnter(event){
        this.on(this.EventList.onPointerEnter, event, this);
    }

    onPointerDown(event){
        this.on(this.EventList.onPointerDown, event, this);
    }

    onPointerUp(event){
        this.on(this.EventList.onPointerUp, event, this);
    }
}