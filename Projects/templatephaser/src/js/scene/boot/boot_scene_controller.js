import LoaderController from '../../module/loader/loader_controller';
import ScreenUtility from '../../module/screen/screen_utility';
import AudioController from '../../module/audio/audio_controller';


export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});

        this.IsAudioOn = true;
    }

    init(){
        //console.log('boot screen');

        ScreenUtility.getInstance().init(this);
        ScreenUtility.ResetGameScreen();

        AudioController.getInstance().init(this, true);


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
}