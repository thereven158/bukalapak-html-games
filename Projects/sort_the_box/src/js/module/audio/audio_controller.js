export default class AudioController{
    constructor(){
        /**@type {Boolean}*/
        this.IsAudioOn = true;
    }

    /**
    * @returns {AudioController}
    */
	static getInstance = () => {
		if (!AudioController.instance) {
            AudioController.instance = new AudioController();
        }

		return AudioController.instance;
    };

    /**
    * @param {Phaser.Scene} scene 
    * @param {Boolean} isAudioOn 
    * @return {AudioController}
    */
    init = (scene, isAudioOn = true) => {
        this.scene = scene;
        this.IsAudioOn = isAudioOn;

        this.scene.sound.mute = !this.IsAudioOn;

        this.scene.game.events.on('hidden', () =>{
            this.scene.sound.mute = true;
        },this)

        this.scene.game.events.on('visible', () =>{
            if(this.IsAudioOn)
                this.scene.sound.mute = false;
        },this)

        return this;
    }

    /**
    * @param {Boolean} isAudioOn 
    */
    setAudioOn = (isAudioOn) =>{
        this.IsAudioOn = isAudioOn;
        this.scene.sound.mute = !this.IsAudioOn;
    }
    

    
}