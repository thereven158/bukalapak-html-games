import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        this.Bgm = null;
    }

    init(data){
        //console.log('title screen')

        this.InitTitle();
        this.InitAudio();
    }

    InitTitle(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitAudio(){
        if(this.Bgm == null){
            this.Bgm = this.sound.add('bgm_title',{
                loop:-1,
                volume: 1
            });
        }

        this.Bgm.play();
    }

    create(){
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.clickPlay);
    }

    clickPlay = ()=>{
        this.Bgm.stop();
        this.game.sound.play('click_start');

        this.scene.start('GameScene')
        this.scene.stop();
    }
}