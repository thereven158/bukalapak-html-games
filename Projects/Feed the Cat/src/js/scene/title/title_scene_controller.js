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
		MusicPlayer.getInstance().PlayMusic('title_bgm');
    }

    create(){
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.ClickPlay);

		this.view.buttonPlay.onClick(() => {
			this.sound.play("ui_button_click_sfx", {volume:1});
			this.ClickPlay();
		});
    }

    update(){

    }

    ClickPlay = () =>{
        this.scene.start('GameScene');
    }
}