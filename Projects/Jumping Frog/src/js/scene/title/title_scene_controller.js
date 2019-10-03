import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

import MusicPlayer from '../../module/music_player/music_player';

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
		MusicPlayer.getInstance().PlayMusic('title_bgm');
    }

    create = ()=>{
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.ClickPlay);

		this.view.buttonPlay.onClick(() => {
			this.sound.play("ui_button_click_sfx", {volume:1});
			this.clickPlay();
		});
    }

    update = ()=>{

    }

    clickPlay = ()=>{
        this.scene.start('GameScene')
    }
}