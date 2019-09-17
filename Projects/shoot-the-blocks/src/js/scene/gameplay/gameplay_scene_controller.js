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

        this.live = 3;

        this.timerEvent = this.time.delayedCall(90000, this.onEvent, [], this);
        this.score = 0;

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.physics.add.collider(this.view.ball, this.view.blocks, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.paddle, this.HitPaddle, null, this);

        this.input.on('pointermove', function (pointer) {

            this.view.paddle.x = Phaser.Math.Clamp(pointer.x, 
              this.ScreenUtility.GameWidth - this.ScreenUtility.GameWidth + 150, 
              this.ScreenUtility.GameWidth - 150);
    
            if (this.view.ball.getData('onPaddle'))
            {
                this.view.ball.x = this.view.paddle.x;
            }
    
        }, this);

        this.input.on('pointerup', function (pointer) {

            if (this.view.ball.getData('onPaddle'))
            {
                this.view.ball.setVelocity(0, -600);
                this.view.ball.setData('onPaddle', false);
            }

        }, this);
    }

    update(){
        if (this.view.ball.y > this.ScreenUtility.GameHeight)
        {
            this.ResetBall();
        }
        this.countDown = 90 - this.timerEvent.getElapsedSeconds();
        this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));

    }

    HitBlocks = (ball, blocks) =>
    {
        blocks.disableBody(true, true);
        this.score +=1;
        this.view.scoreText.setText('' + this.score);

        ball.setVelocityY(700);
        if (this.view.blocks.countActive() == 0)
        {
            this.ResetLevel();
        }
    }

    HitPaddle = (ball, paddle) =>
    {
        var diff = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            this.diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * this.diff);
        }
        else if (this.view.ball.x > this.view.paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            this.diff = this.view.ball.x - this.view.paddle.x;
            this.view.ball.setVelocityX(10 * this.diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            this.view.ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    ResetLevel(){
        this.ResetBall();

        this.view.blocks.children.each(function (block) {
            block.enableBody(false, 0, 0, true, true);
        });
    }

    ResetBall(){
        this.view.ball.setVelocity(0);
        this.view.ball.setPosition(this.view.paddle.x, 
            this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.9);
        this.view.ball.setData('onPaddle', true);

        this.live -= 1;
        if(this.live == 0){
            console.log("u lose");
        }
    }
}