import Phaser from 'phaser';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';


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
        this.IsWinning = false;
    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.timerEvent = this.time.delayedCall(60000, this.onEvent, [], this);

        this.physics.world.setBoundsCollision(true, true, true, false);
        this.view.paddle.setCollideWorldBounds(true);

        // this.physics.add.collider(this.view.ball, this.view.blocks, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.yellowBlock, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.yellowBlock2, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.redBlock, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.blueBlock, this.HitBlocks, null, this);
        this.physics.add.collider(this.view.ball, this.view.paddle, this.HitPaddle, null, this);
        this.physics.add.collider(this.view.ball, this.view.border, null, null, this);

        this.input.setDraggable(this.view.paddle);

        this.input.on('drag', function (pointer, gameObject, dragX) {

            gameObject.x = dragX;

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

        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
    }

    update(){
        if (this.view.ball.y > this.ScreenUtility.GameHeight)
        {
            this.HpDown();
        }

        if(this.IsGameStarted){
            this.countDown = 60 - this.timerEvent.getElapsedSeconds();
            this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));
        }

        if(this.countDown == 0 && this.IsGameStarted){
            this.TimesRanOut();
        }
    }

    Restart = ()=>{
        this.scene.restart();
    }

    BackToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    ShowResult = ()=>{
        this.VoucherView = new VoucherView(this);
        this.VoucherView.OnClickMainLagi(this.Restart);
        this.VoucherView.OnClickClose(this.Restart);
        
        let voucherData = VoucherData.Vouchers[CONFIG.VOUCHER_TYPE];

        if(this.IsGameWin){
            this.VoucherView.ShowVoucherCode(voucherData.Code, {
                titleInfo :  voucherData.InfoTitle,
                description : voucherData.InfoDescription,
                expireDate : voucherData.ExpireDate,
                minTransactionInfo : voucherData.MinimalTransactionInfo,
                onlyAppliesInfo : voucherData.OnlyAppliesInfo,
                termsandconditions : voucherData.TermsAndConditions,
            });

            this.VoucherView.SetDescription('voucher_headerwin', 
                "Voucher", 
                voucherData.Title, 
                voucherData.Description
            );
        }else if(this.IsGameOver){
            this.VoucherView.DisableVoucherCode()
            this.VoucherView.SetDescription('voucher_headertimeout', 
                "Game Over", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
        else{
            this.VoucherView.DisableVoucherCode()
            this.VoucherView.SetDescription('voucher_headertimeout', 
                "Timeout", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
        
        this.VoucherView.Open();
    }


    TimesRanOut(){
        this.IsGameStarted = false;
        this.IsGameWin = false;
        this.timesUpFsx.play();
        this.view.ball.destroy();
        this.view.TimesUpBanner();
        this.DelayCallbackEvent();
    }

    Win(){
        this.IsGameWin = true;
        this.IsGameStarted = false;
        this.lastHitSfx.play();
        this.view.ball.destroy();
        this.view.WinBanner();
        this.DelayCallbackEvent();
    }

    GameOver(){
        this.IsGameStarted = false;
        this.IsGameWin = false;
        this.IsGameOver = true;
        this.view.LoseBanner();

        this.DelayCallbackEvent();
    }

    DelayCallbackEvent(){
        this.time.addEvent({ 
            delay: 3000, 
            callback: this.ShowResult, 
            callbackScope: this, 
            loop: false 
        });
    }

    HitBlocks = (ball, blocks) =>
    {
        this.blockHitSfx.play();
        blocks.disableBody(true, true);
        this.score +=1;

        ball.setVelocityY(700);
        // if (this.view.blocks.countActive() == 0)
        // if (this.view.yellowBlock.countActive() == 0 &&
        //     this.view.yellowBlock2.countActive() == 0 && 
        //     this.view.redBlock.countActive() == 0 && 
        //     this.view.blueBlock.countActive() == 0)
        if (this.view.blueBlock.countActive() == 0  && this.IsGameStarted)
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
            ball.setVelocityX(-5 * this.diff);
        }
        else if (this.view.ball.x > this.view.paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            this.diff = this.view.ball.x - this.view.paddle.x;
            this.view.ball.setVelocityX(5 * this.diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            this.view.ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    ResetBall(){
        if(this.IsGameStarted){
            this.view.ball.setVelocity(0);
            this.view.ball.setPosition(this.view.paddle.x, 
            this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight * 0.6 * 0.575);
            this.view.ball.setData('onPaddle', true);
        }
        else this.view.ball.destroy();
        
    }

    HpDown(){
        this.life -= 1;
        if(this.life == 0 && this.IsGameStarted){
            this.hpOutSfx.play();
            this.view.life1.setTexture('unlife');
            this.GameOver();
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