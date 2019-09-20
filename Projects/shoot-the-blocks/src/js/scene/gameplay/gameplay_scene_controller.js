import Phaser from 'phaser';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init(){
        console.log('game screen');
        this.InitAudio();
        this.InitGameData();
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)
    }

    InitAudio(){
        this.blockHitSfx = this.sound.add('block-hit');
        this.ballBounceSfx = this.sound.add('ball-bounce');
        this.hpDownSfx = this.sound.add('hp-down');
        this.hpOutSfx = this.sound.add('hp-out');
        this.lastHitSfx = this.sound.add('block-lasthit');
        this.timesUpFsx = this.sound.add('time-out');
        if(this.Bgm == null){
            this.Bgm = this.sound.add('main-music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();
    }

    InitGameData(){
        this.life = 3;
        this.score = 0;
        this.IsGameOver = false;
        this.isGameWin = false;
    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.timerEvent = this.time.delayedCall(90000, this.onEvent, [], this);

        this.physics.world.setBoundsCollision(true, true, true, false);
        this.view.paddle.setCollideWorldBounds(true);

        // this.physics.add.collider(this.view.ball, this.view.blocks, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.yellowBlock, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.yellowBlock2, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.redBlock, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.blueBlock, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.paddle, this.HitPaddle, null, this);
        this.physics.add.collider(this.view.ball, this.view.border, null, null, this);

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
            this.HpDown();
        }
        this.countDown = 90 - this.timerEvent.getElapsedSeconds();
        this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));
        
        if(this.countDown == 0){
            this.TimesRanOut();
        }
    }

    GameOver(){
        this.TimesRanOut();
        this.IsGameOver = true;
        this.DelayCallbackEvent();
    }

    TimesRanOut(){
        this.timesUpFsx.play();
        this.view.TimesUp();
        this.IsWinning = false;
        this.DelayCallbackEvent();
    }

    Win(){
        this.lastHitSfx.play();
        // this.ResetLevel();
        this.IsWinning = true;
        this.DelayCallbackEvent();
    }

    DelayCallbackEvent(){
        this.time.addEvent({ 
            delay: 3000, 
            callback: this.BackToTitle, 
            callbackScope: this, 
            loop: false 
        });
    }

    BackToTitle(){
        this.Bgm.stop();
        this.scene.launch('TitleScene', {
            isAfterGame: true,
            isGameWin: this.IsWinning,
            isGameOver: this.IsGameOver
        });
        this.scene.stop();
    }

    HitBlocks = (ball, blocks) =>
    {
        this.blockHitSfx.play();
        blocks.disableBody(true, true);
        this.score +=1;

        ball.setVelocityY(700);
        // if (this.view.blocks.countActive() == 0)
        if (this.view.yellowBlock.countActive() == 0 &&
            this.view.yellowBlock2.countActive() == 0 && 
            this.view.redBlock.countActive() == 0 && 
            this.view.blueBlock.countActive() == 0)
        {
            this.Win();
        }
    }

    HitPaddle = (ball, paddle) =>
    {
        this.ballBounceSfx.play();
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

        // this.view.blocks.children.each(function (block) {
        //     block.enableBody(false, 0, 0, true, true);
        // });

        this.view.blueBlock.children.each(function (block) {
            block.enableBody(false, 0, 0, true, true);
        });

        this.view.redBlock.children.each(function (block) {
            block.enableBody(false, 0, 0, true, true);
        });

        this.view.yellowBlock.children.each(function (block) {
            block.enableBody(false, 0, 0, true, true);
        });

        this.view.yellowBlock2.children.each(function (block) {
            block.enableBody(false, 0, 0, true, true);
        });
    }

    ResetBall(){
        this.view.ball.setVelocity(0);
        this.view.ball.setPosition(this.view.paddle.x, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 3);
        this.view.ball.setData('onPaddle', true);
    }

    HpDown(){
        this.life -= 1;
        if(this.life == 0){
            console.log("u lose");
            this.hpOutSfx.play();
            this.view.life1.setTexture('unlife');
            this.GameOver();
            // this.TimesRanOut();
        }
        else if(this.life == 1){
            this.hpDownSfx.play();
            this.view.life2.setTexture('unlife');
        }
        else if(this.life == 2){
            this.hpDownSfx.play();
            this.view.life3.setTexture('unlife');
        }

        if(this.life > 0)
            this.ResetBall();   
    }
}