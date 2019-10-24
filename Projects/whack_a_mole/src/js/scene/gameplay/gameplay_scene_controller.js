import ScreenUtility from '../../module/screen/screen_utility';
import gameplaydata from '../../gameplaydata';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

import GameplaySceneView from './gameplay_scene_view';
import BoardController from '../../subcontrollers/board_controller';
import MinionController from '../../subcontrollers/minion_controller';
import TapEffect from '../../view/tap_effect';


export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});

        this.Bgm = null;
    }

    init(){
        //console.log('game screen');
        this.InitGame();
        this.InitGameData();
        this.InitAnimationData();
        this.InitAudio();

    }

    InitGame(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitGameData(){
        this.TotalHit = 0;
        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
        this.IsGameStarted = false;
        this.IsGameWin = false;

        this.ShowTimer = 0;
        this.NextShowTime = 0;

        this.CurrentPhaseIdx = 0;
        this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
    }

    InitAnimationData(){
        MinionController.InitAnimationData(this);
        TapEffect.InitAnimationData(this);
    
    }

    InitAudio(){
        if(this.Bgm == null){
            this.Bgm = this.sound.add('bgm_ingame',{
                loop:-1,
                volume: 1
            });
            
        }

        this.Bgm.play();
    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.Board = new BoardController(this, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.6);

        this.Board.OnTargetHit(this.OnTargetHit);

        this.Tap = new TapEffect(this);
        this.input.on('pointerdown', ()=>{
            if(this.IsGameStarted){
                this.sound.play('tap')
                this.Tap.Show();
            }
        }, this);

        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
    }
    
    update(timestep, delta){
        if(this.IsGameStarted){
            this.GameUpdate(timestep, delta);
        }

        this.Board.update(timestep, delta);
        this.viewUpdate(timestep, delta);
    }

    GameUpdate(timestep, delta){
        this.Timer -= (1 * delta) / 1000;
        this.ShowTimer += (1 * delta) / 1000;

        //validate phase
        if(this.CurrentPhaseIdx < gameplaydata.Phases.length - 1){
            let isEnoughHitToChangePhase = this.TotalHit >= this.CurrentPhase.MaxTotalHit;
            //TODO
            let isTimePassed = (gameplaydata.GameTime - this.Timer) >= this.CurrentPhase.MaxTime;

            if(isEnoughHitToChangePhase || isTimePassed){
                this.CurrentPhaseIdx += 1;
                this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
            }
        }

        let showTimeInterval = Phaser.Math.Between(this.CurrentPhase.MinShowTime, this.CurrentPhase.MaxShowTime);

        let chance = Phaser.Math.Between(0, 100);
        let isShowChanceSuccess = chance <= this.CurrentPhase.ShowChance;
        let isShowTime = this.ShowTimer >= this.NextShowTime;
        let isNotReachMaxShowTargets = this.Board.GetActiveTargets().length < this.CurrentPhase.MaxTarget;

        if(isShowTime && isShowChanceSuccess && isNotReachMaxShowTargets){
            this.Board.Show();
            this.NextShowTime = this.ShowTimer + showTimeInterval;
        }

        //Isgameover
        if(this.Timer <= 0){       
            this.Timer = 0;
            this.timesout();
        }else if(this.TotalHit >= gameplaydata.VoucherWinPoint){
            this.win();
        }
    }

    viewUpdate(timestep, delta){
        this.view.setTimerText(this.Timer);
        this.view.setScoreText(this.Score);
    }

    OnTargetHit = ()=>{ 
        if(!this.IsGameStarted)
            return;

        this.TotalHit += 1;
        this.Score += gameplaydata.ScorePoint;

        this.IsGameWin = this.TotalHit >= gameplaydata.VoucherWinPoint;

    }

    timesout = ()=>{
        this.view.timesout();
        this.endGame();

        this.time.addEvent({ 
            delay: 3000, 
            callback: this.showResult, 
            callbackScope: this, 
            loop: false 
        });

        this.game.sound.play('timeout');
    }

    win = ()=>{
        this.endGame();
        this.showResult();
    }

    endGame = ()=>{
        this.IsGameStarted = false;
        this.Board.Disable();
    }

    restart = ()=>{
        this.scene.restart();
    }
    
    backToTitle = ()=>{
        this.Bgm.stop();

        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    showResult = ()=>{
        this.VoucherView = new VoucherView(this);
        this.VoucherView.OnClickMainLagi(this.restart);
        this.VoucherView.OnClickClose(this.backToTitle);
        
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
        this.sound.play('transition');
    }
}