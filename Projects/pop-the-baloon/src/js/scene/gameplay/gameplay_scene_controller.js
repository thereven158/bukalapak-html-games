import Phaser from 'phaser';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init(){
        console.log('game screen')
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)

    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.timerEvent = this.time.delayedCall(90000, this.onEvent, [], this);
        
    }

    update(){
        this.countDown = 90 - this.timerEvent.getElapsedSeconds();
        console.log(this.countDown);
        this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));
    }

    onEvent = () => {
        console.log("onEvent called");
        this.timerEvent.remove();
        console.log("timer removed");
    }
}