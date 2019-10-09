import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import AudioController from '../../module/audio/audio_controller';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});

        this.Bgm;
    }

    init(data){
        //console.log('title screen')

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
        if(this.Bgm == undefined){
            this.Bgm = this.sound.add('bgm_title', {
                loop:-1,
                volume: 1
            });
        }

        this.Bgm.play();
    }

    create(){
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.ClickPlay);

    }

    update(){

    }

    ClickPlay = ()=>{
        this.Bgm.stop();
        this.sound.play('start');

        this.scene.start('GameScene')
    }
}