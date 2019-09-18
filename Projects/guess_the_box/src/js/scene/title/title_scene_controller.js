import Phaser from 'phaser';
import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        
    }

    init(){
        console.log('title screen')
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)

    }

    create(){
        this.view = new TitleSceneView(this);
        this.view.create();
        
        this.view.onClickPlay(this.OnClickPlay);



    }

    update(){

    }

    OnClickPlay = ()=>{
        this.scene.start('GameScene')
    }

    
}