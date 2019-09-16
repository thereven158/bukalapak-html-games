import 'phaser';

import LoadingSceneView from './loading_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';

export default class LoadingSceneController extends Phaser.Scene{
    constructor(){
        super('LoadingScene');
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
        this.load.image('logo',this.CreatePath('/images/Logo-BL.png'));
        this.load.image('paddle',this.CreatePath('/images/paddle.png'));
        this.load.image('block',this.CreatePath('/images/block.png'));
    }

    CreatePath(path){
        let basePath = CONFIG.BASE_ASSET_URL + path;

        return  basePath;
    }

}
