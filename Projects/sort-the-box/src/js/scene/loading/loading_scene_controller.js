import LoadingSceneView from './loading_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import LoadingVoucherController from './subloader/loading_voucher_controller';
import LoadingTitleController from './subloader/loading_title_controller';
import LoadingGameplayController from './subloader/loading_gameplay_controller';
import LoadingAudioController from './subloader/loading_audio_controller';

export default class LoadingSceneController extends Phaser.Scene{
    constructor(){
        super('LoadingScene');

        this.VoucherLoader = new LoadingVoucherController(this);
        this.TitleLoader = new LoadingTitleController(this);
        this.GameplayLoader = new LoadingGameplayController(this);
        this.AudioLoader = new LoadingAudioController(this);
    }

    init(){
        console.log('loading screen');

        this.initLoading();
    }

    initLoading(){
        this.ScreenUtility = ScreenUtility.getInstance();

        this.view = new LoadingSceneView(this).create();
    }

    preload(){
        this.load.once('complete', this.LoadBootResoucesComplete);  
        this.LoadBootResouces();

    }

    LoadBootResoucesComplete = () =>{
        this.view.initLoading();
        this.load.on('progress', function (value) {
            this.view.setProgressText(value);
        },this);
        this.load.once('complete', this.OnCompleteLoad);  

        this.LoadResouces();
    }

    OnCompleteLoad = () =>{
        this.load.removeAllListeners();

        this.scene.start('TitleScene');
    }

    LoadBootResouces(){
        this.load.image('bg_loading',this.CreatePath('/images/loading/Background.png'));
        this.load.image('loading_character',this.CreatePath('/images/loading/Character.png'));
        this.load.image('loading_emptybar',this.CreatePath('/images/loading/Loading-Bar-Empty.png'));
        this.load.image('loading_fullbar',this.CreatePath('/images/loading/Loading-Bar-Full.png'));

        this.load.start();
    }

    LoadResouces(){
        this.VoucherLoader.loadResource();
        this.TitleLoader.loadResource();
        this.GameplayLoader.loadResource();
        this.AudioLoader.loadResource();
        
        this.load.image('logo',this.CreatePath('/images/Logo-BL.png'));
        this.load.image('bg_black',this.CreatePath('/images/Bg_black.png'));

        this.load.start();

    }

    CreatePath(path){
        let basePath = CONFIG.BASE_ASSET_URL + path;

        return basePath;
    }

}
