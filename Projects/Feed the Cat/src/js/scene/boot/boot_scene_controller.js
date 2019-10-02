import LoaderController from '../../module/loader/loader_controller';
import ScreenUtility from '../../module/screen/screen_utility';
import MusicPlayer from '../../module/music_player/music_player';
import { DeviceHelper } from '../../helper/device_Helper';
import { CANVAS } from 'phaser';


export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});

        this.IsAudioOn = true;
    }

    init(){
        //console.log('boot screen');

        this.InitGame();
        this.InitScreen();
        this.InitAudio();
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

    InitGame(){

    }
    InitScreen(){
        ScreenUtility.getInstance().Init(this);
        ScreenUtility.ResetGameScreen();
   
    }
    
    InitAudio(){
		MusicPlayer.getInstance().Init(this);
		
        this.sound.mute = !this.IsAudioOn;

        this.game.events.on('hidden', () =>{
            this.sound.mute = true;
            console.log("test");
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
}