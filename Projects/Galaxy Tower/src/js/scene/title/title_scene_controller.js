import Phaser from 'phaser';

import TitleSceneView from './title_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';

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

        this.view.onClickPlay(this.onClickPlay);
    }

    update(){

    }

    onClickPlay = ()=>{
        this.scene.start('GameScene')
    }
}