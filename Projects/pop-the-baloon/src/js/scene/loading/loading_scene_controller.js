import 'phaser';

import LoadingSceneView from './loading_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import LoadingAudioController from '../loading/subloader/loading_audio_controller';
import LoadingGameplayController from '../loading/subloader/loading_gameplay_controller';
import LoadingVoucherController from './subloader/loading_voucher_controller';
import LoadingMenuController from './subloader/loading_menu_controller';

export default class LoadingSceneController extends Phaser.Scene{
    constructor(){
        super('LoadingScene');

        this.AudioLoader = new LoadingAudioController(this);
        this.GameplayLoader = new LoadingGameplayController(this);
        this.VoucherLoader = new LoadingVoucherController(this);
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

    LoadResouces(){
        this.AudioLoader.loadResource();
        this.GameplayLoader.loadResource();
        this.VoucherLoader.loadResource();
        this.MenuLoader.loadResource();

        this.load.image('logo',this.CreatePath('/images/Logo-BL.png'));
        this.load.image('baloon',this.CreatePath('/images/rectangle.png'));
        this.load.image('pump',this.CreatePath('/images/pump.png'));
    }

    CreatePath(path){
        let basePath = CONFIG.BASE_ASSET_URL + path;

        return  basePath;
    }

}
