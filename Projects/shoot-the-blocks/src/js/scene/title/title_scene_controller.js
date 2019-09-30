import Phaser from 'phaser';
import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        this.Bgm = null;
    }

    init(data){
        console.log('title screen')

        this.IniTitleData();
        this.IsAfterGame = data.isAfterGame;
        this.IsGameWin = data.isGameWin;
        this.IsGameOver = data.isGameOver;
    }

    IniTitleData(){
        this.IsAfterGame = false;
        this.IsGameWin = false;
        this.IsGameOver = false;
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)

    }

    create(){
        this.view = new TitleSceneView(this);
        this.view.create();

        this.view.onClickPlay(this.OnClickPlay);

        if(this.Bgm == null){
            this.Bgm = this.sound.add('menu-music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();

    }

    update(){

    }

    OnClickPlay = ()=>{
        this.Bgm.stop();
        this.game.sound.play('button-click');
        this.scene.start('GameScene');
        this.scene.stop();
    }
}