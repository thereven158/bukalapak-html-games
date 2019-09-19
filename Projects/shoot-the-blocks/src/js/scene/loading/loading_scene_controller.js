import LoadingSceneView from './loading_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import LoadingVoucherController from './subloader/loading_voucher_controller';

export default class LoadingSceneController extends Phaser.Scene{
    constructor(){
        super('LoadingScene');

        this.VoucherLoader = new LoadingVoucherController(this);
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
        this.VoucherLoader.loadResource();

        this.load.image('logo',this.CreatePath('/images/Logo-BL.png'));
        this.load.image('paddle',this.CreatePath('/images/paddle.png'));
        this.load.image('block',this.CreatePath('/images/block.png'));
        this.load.image('ball',this.CreatePath('/images/ball.png'));
        this.load.image('bg_black',this.CreatePath('/images/Bg_black.png'));
        this.load.image('background',this.CreatePath('/images/Background.png'));
        this.load.image('block-aqua',this.CreatePath('/images/Block-Aqua.png'));
        this.load.image('block-magenta',this.CreatePath('/images/Block-Magenta.png'));
        this.load.image('block-yellow',this.CreatePath('/images/Block-Yellow.png'));
        this.load.image('life',this.CreatePath('/images/Life-UI.png'));
        this.load.image('unlife',this.CreatePath('/images/Life2-UI.png'));
        this.load.image('life-window',this.CreatePath('/images/Life-UI-Window.png'));
        this.load.image('line-fail',this.CreatePath('/images/Line-Fail.png'));
        this.load.image('timer-window',this.CreatePath('/images/Timer-UI-Window.png'));
        this.load.image('top-border',this.CreatePath('/images/Top-Border.png'));

        this.load.audio('main-music', this.CreatePath('/sounds/Bukalapak - Shoot the Block.mp3'));
        this.load.audio('block-hit', this.CreatePath('/sounds/block_hit.mp3'));
        this.load.audio('ball-bounce', this.CreatePath('/sounds/ball_bounce.mp3'));
        this.load.audio('hp-down', this.CreatePath('/sounds/hp_down.mp3'));
        this.load.audio('hp-out', this.CreatePath('/sounds/hp_out.mp3'));
        this.load.audio('block-lasthit', this.CreatePath('/sounds/block_lasthit.mp3'));
    }

    CreatePath(path){
        let basePath = CONFIG.BASE_ASSET_URL + path;

        return  basePath;
    }

}
