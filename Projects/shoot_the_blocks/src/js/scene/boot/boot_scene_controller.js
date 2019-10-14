import LoaderController from '../../module/loader/loader_controller';
import ScreenUtility from '../../module/screen/screen_utility';
import { DeviceHelper } from '../../helper/device_Helper';
import { CANVAS } from 'phaser';


export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});

        this.IsAudioOn = true;
    }

    init(){
        console.log('boot screen');
        this.InitScreen();
        this.InitAudio();

    }

    InitScreen(){
        ScreenUtility.getInstance().Init(this);
        ScreenUtility.ResetGameScreen();
   
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
        });
    }
    
    InitAudio(){
        this.sound.mute = !this.IsAudioOn;

        this.game.events.on('hidden', () =>{
            this.sound.mute = true;
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