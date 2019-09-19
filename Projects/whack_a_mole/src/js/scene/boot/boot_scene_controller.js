import LoaderController from '../../module/loader/loader_controller'

export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});

        this.IsAudioOn = false;
    }

    init(){
        console.log('boot screen');

        this.initAudio();
    }

    preload(){
        Promise.all([
            LoaderController.getInstance().init(),
            LoaderController.getInstance()
				.loadFonts([
					{
						key: "panton",
						path: CONFIG.BASE_ASSET_URL + "/fonts/Panton-Regular.otf"
                    },
                    {
						key: "panton_bold",
						path: CONFIG.BASE_ASSET_URL + "/fonts/Panton-Bold.otf"
					}
				])        
        ]).then(() =>{
            this.scene.start('LoadingScene');    
        }).catch((err) =>{
            console.log(err);
        })
    }

    initAudio(){
        this.sound.mute = !this.IsAudioOn;

        this.game.events.on('hidden', () =>{
            this.sound.mute = true;
            console.log("test")
        },this)

        this.game.events.on('visible', () =>{
            if(this.IsAudioOn)
                this.sound.mute = false;
        },this)
    }

    SetAudioOn(on){
        this.IsAudioOn = on;
        this.sound.mute = !on;
    }
};