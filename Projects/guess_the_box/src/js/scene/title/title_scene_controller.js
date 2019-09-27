import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        
    }

    init(data){
        console.log('title screen')

        this.InitTitle();
        this.InitTitleData(data);
        this.InitAudio();
    }

    InitTitle(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitTitleData(data){

    }

    InitAudio(){

    }

    create(){
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.ClickPlay);

    }

    update(){

    }

    ClickPlay = ()=>{
        this.scene.start('GameScene')
    }
}