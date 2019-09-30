import Phaser from 'phaser';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import Minion from '../../gameobject/Minion';
import Baloon from '../../gameobject/Baloon';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';


export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
        this.Bgm = null;
    }

    init(){
        console.log('game screen');
        Minion.InitAnimationData(this);
        Baloon.InitAnimationData(this);
        this.InitGame();
        this.InitAudioGame();
        this.InitGameData();
    }

    InitGameData(){
        this.score = 0;
        this.temp = 0;
        this.pumpedCount = 0;
        this.IsGameWin = false;
        this.baloonActive = true;
        this.IsGameStarted = false;
    }

    InitAudioGame(){
        this.blowSfx = this.sound.add('baloon-blow');
        this.popSfx = this.sound.add('baloon-pop');
        this.timesUpFsx = this.sound.add('ingame-timeout');
        this.winSfx = this.sound.add('ingame-success');
        if(this.Bgm == null){
            this.Bgm = this.sound.add('main-music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();
    }

    InitGame(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitAudio(){

    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.timerEvent = this.time.delayedCall(20000, this.onEvent, [], this);
        
        this.view.pump.on('pointerdown', function() {
            this.onClickPumped();
        }, this);



        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
    }

    update(){
        if(this.IsGameStarted){
            this.countDown = 20 - this.timerEvent.getElapsedSeconds();
            this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));
        }
        if(this.countDown == 0 && this.IsGameStarted){
            this.TimesRanOut();
        }
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
        }else{
            this.VoucherView.DisableVoucherCode()
            this.VoucherView.SetDescription('voucher_headertimeout', 
                "Timeout", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
        
        this.VoucherView.Open();
    }


    Win(){
        this.IsGameStarted = false;
        this.view.WinBanner();
        this.winSfx.play();
        this.IsGameWin = true;
        this.view.miniun.Happy();
        this.DelayCallbackEvent();
    }

    TimesRanOut(){
        this.IsGameStarted = false;
        this.baloonActive = false;
        this.timesUpFsx.play();
        this.view.TimesUpBanner();
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

    BackToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }
    
    Restart = ()=>{
        this.scene.restart();
    }

    onEvent = () => {
        this.timerEvent.remove();
        console.log("timer removed");
    }

    onClickPumped() {
        if(this.baloonActive == true){
            this.pumpedCount +=1;

            this.view.LeverTween();

            if(this.pumpedCount >= 6){
                this.view.temp = 0;
                this.BaloonPop();
            }
            else{
                this.view.BaloonTween();
                this.blowSfx.play();
            }
        }
    }

    BaloonPop(){
        this.view.miniun.Happy();
        this.popSfx.play();
        this.score +=1;
        this.view.scoreText.setText('' + this.score);
        this.pumpedCount = 0;
        this.destroyCreateObject();

        if(this.score == 5){
            this.baloonActive = false;
            this.view.baloon.destroy();
            this.Win();
        }

        this.time.addEvent({ 
            delay: 3000, 
            callback: this.IdleCallback, 
            callbackScope: this, 
            loop: false 
        });
    }

    IdleCallback(){
        this.view.miniun.Idle();
    }

    destroyCreateObject = () =>{
        console.log("called destroy")
        // this.view.baloon.destroy();
        this.view.baloon.Pop();
        this.view.createBaloon();
    }
}