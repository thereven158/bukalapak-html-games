import LoadingSceneView from './loading_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import LoadingVoucherController from './subloader/loading_voucher_controller';
import LoadingTitleController from './subloader/loading_title_controller';
import LoadingGameplayController from './subloader/loading_gameplay_controller';

export default class LoadingSceneController extends Phaser.Scene{
    constructor(){
        super('LoadingScene');

        this.VoucherLoader = new LoadingVoucherController(this);
        this.TitleLoader = new LoadingTitleController(this);
        this.GameplayLoader = new LoadingGameplayController(this);
    }

    init(){
        console.log('loading screen');
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)

        this.view = new LoadingSceneView(this);
        this.view.create();

        this.load.on('progress', function (value) {
            this.view.SetProgressText(value);
        },this);
        this.load.once('complete', this.OnCompleteLoad);  

        this.LoadResouces();
        
        

    }

    OnCompleteLoad = () =>{
        this.load.removeAllListeners();

        this.scene.start('GameScene');
    }

    create() {

    }

    update(){

    }

    LoadResouces(){
        this.VoucherLoader.loadResource();
        this.TitleLoader.loadResource();
        this.GameplayLoader.loadResource();
        
        this.load.image('logo',this.CreatePath('/images/Logo-BL.png'));
        this.load.image('bg_black',this.CreatePath('/images/Bg_black.png'));



    }

    CreatePath(path){
        let basePath = CONFIG.BASE_ASSET_URL + path;

        return  basePath;
    }

}
