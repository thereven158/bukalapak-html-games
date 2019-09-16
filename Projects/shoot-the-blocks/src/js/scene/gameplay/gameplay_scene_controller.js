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

        this.input.on('pointermove', function (pointer) {

            this.view.paddle.x = Phaser.Math.Clamp(pointer.x, 
              this.ScreenUtility.GameWidth - this.ScreenUtility.GameWidth + 150, 
              this.ScreenUtility.GameWidth - 150);
    
            // if (this.ball.getData('onPaddle'))
            // {
            //     this.ball.x = this.paddle.x;
            // }
    
        }, this);
    }

    update(){

    }
}