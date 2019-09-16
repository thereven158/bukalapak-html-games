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
        this.view.onClickPumped(this.onClickPumped);

        this.score = 0;
        this.pumpedCount = 0;
    }

    update(){
        this.countDown = 90 - this.timerEvent.getElapsedSeconds();
        this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));
    }

    onEvent = () => {
        console.log("onEvent called");
        this.timerEvent.remove();
        console.log("timer removed");
    }

    onClickPumped = ()=>{
        this.pumpedCount +=1;

        if(this.pumpedCount == 6){
            this.score +=1;
            this.view.scoreText.setText('' + this.score);
            this.pumpedCount = 0;
            this.destroyCreateObject();
        }
        else{
            this.view.baloon.displayWidth += 100;
            this.view.baloon.displayHeight += 100;
        }
        
        console.log(this.pumpedCount);
    }

    destroyCreateObject = () =>{
        console.log("called destroy")
        this.view.baloon.destroy();
        this.view.createBaloon();
    }
}