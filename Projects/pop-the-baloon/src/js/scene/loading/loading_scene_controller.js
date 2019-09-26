import LoadingSceneView from './loading_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import LoadingVoucherController from './subloader/loading_voucher_controller';
import LoadingAudioController from './subloader/loading_audio_controller';
import LoadingGameplayController from './subloader/loading_gameplay_controller';
import LoadingMenuController from './subloader/loading_menu_controller';

export default class LoadingSceneController extends Phaser.Scene{
    constructor(){
        super('LoadingScene');

        this.VoucherLoader = new LoadingVoucherController(this);
        this.AudioLoader = new LoadingAudioController(this);
        this.GameplayLoader = new LoadingGameplayController(this);
        this.MenuLoader = new LoadingMenuController(this);
    }

    init(){
        console.log('loading screen');
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)

        this.view = new LoadingSceneView(this);
        this.view.create();

        this.load.once('complete', this.LoadBootResoucesComplete);
        
        this.LoadBootResouces();
    }

    LoadBootResoucesComplete = () =>{
        this.view.InitLoading();
        this.load.on('progress', function (value) {
            this.view.SetProgressText(value);
        },this);
        this.load.once('complete', this.OnCompleteLoad);  

        this.LoadResouces();
    }

    OnCompleteLoad = () =>{
        this.load.removeAllListeners();

        this.scene.start('TitleScene');
    }

    create() {

    }

    update(){

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
        this.AudioLoader.loadResource();
        this.GameplayLoader.loadResource();
        this.MenuLoader.loadResource();

        this.load.image('logo',this.CreatePath('/images/Logo-BL.png'));
       
        this.load.start();
    }

    CreatePath(path){
        let basePath = CONFIG.BASE_ASSET_URL + path;

        return  basePath;
    }

}
