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

        this.initTitle();
        this.initTitleData(data);
        this.initAudio();
    }

    initTitle = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    initTitleData(data){

    }

    initAudio = ()=>{

    }

    create = ()=>{
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.clickPlay);

    }

    update = ()=>{

    }

    clickPlay = ()=>{
        this.scene.start('GameScene')
    }
}