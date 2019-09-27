import gameplaydata from '../../gameplaydata';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import BoardController from '../../subcontroller/board_controller';
import PlatformController from '../../subcontroller/platform_controller';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init(){
        console.log('game screen')
        this.InitAnimatonData();

        this.InitGame();
        this.InitGameData();
        this.InitAudio();
    }

    InitGame(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitGameData(){
        this.IsGameStarted = false;

        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
        this.IsGameWin = false;
        this.MoveCount = 0;
        this.CorrectMoveChainCount = 0;
        
        this.CurrentPhaseIdx = 0;
        this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
    }

    InitAudio(){

    }

    InitAnimatonData(){
        //BoxController.InitAnimationData(this);
        PlatformController.InitAnimationData(this);
    }

    create(){
        this.view = new GameplaySceneView(this).create();

        this.Board = new BoardController(this);

        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;

        this.Board.ShowCorrectBox();
        this.Delay(3000, ()=>{
            this.Board.CloseAllBox();
            this.Check();
        });
    }

    Check = ()=>{ 
        this.PhaseValidation();
        this.Delay(1000, this.StartBoardRotationPhase)
        //this.StartBoardRotationPhase();
    }

    StartBoardRotationPhase = ()=>{
        this.MoveCount += 1;

        
        this.Board.StartRotationPhase(this.CurrentPhase.MaxRotation, this.CurrentPhase.SpeedAlpha, this.PhaseFinishEvent)
    }

    PhaseFinishEvent = ()=>{
        this.Board.OnceWaitingForAnswer(this.AnswerEvent);
    }

    AnswerEvent = (isCorrect)=>{
        if(isCorrect){
            this.CorrectMoveCount += 1;
            this.CorrectMoveChainCount += 1;
            this.Score += this.CurrentPhase.ScorePoint;
            this.Delay(gameplaydata.waitDurationPerMove, ()=>{
                this.Board.CloseAllBox();
                this.Check();
            });
        }else{
            this.CorrectMoveChainCount -= 1;
            this.CorrectMoveChainCount = Phaser.Math.Clamp(this.CorrectMoveChainCount, 0, Infinity);
            this.Delay(gameplaydata.waitDurationPerMove, ()=>{
                this.Board.ShowCorrectBox();
                this.Delay(gameplaydata.waitDurationPerMove, ()=>{
                    this.Board.CloseAllBox();
                    this.Check();
                });
            });
        }


    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

        this.Board.update(timestep, delta);
        this.view.update();
    }

    gameUpdate(timestep, delta){
        this.Timer -= (1 * delta) / 1000;

        //Isgameover
        if(this.Timer <= 0){       
            this.Timer = 0;
            this.Timesout();
        }else if(this.Score >= gameplaydata.TargetPoint){
            this.Win();
        }
    }

    PhaseValidation(){
        //validate phase
        if(this.CurrentPhaseIdx < gameplaydata.Phases.length - 1){
            let newPhaseIdx = this.CurrentPhaseIdx;
            
            if(this.CorrectMoveChainCount >= this.CurrentPhase.ChainMoveTarget){
                newPhaseIdx += 1;
            }

            //reducer
            if(this.CurrentPhaseIdx > 0){
                let prevMoveTarget = gameplaydata.Phases[this.CurrentPhaseIdx-1].ChainMoveTarget;
                if(this.CorrectMoveChainCount < prevMoveTarget){
                    newPhaseIdx = this.CurrentPhaseIdx - 1;
                }
            }

            if(this.CurrentPhaseIdx != newPhaseIdx){
                this.CurrentPhaseIdx = newPhaseIdx;
                this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
            }
        }
    }

    Timesout(){
        this.view.TimesOut();
        this.Endgame();

        this.Delay(3000, this.ShowResult);
    }

    Win(){
        this.IsGameWin = true;

        this.Endgame();
        this.ShowResult();
    }

    Endgame(){
        this.IsGameStarted = false;
        this.Board.Disable();
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
        this.VoucherView.OnClickClose(this.BackToTitle);
        
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

    /** 
    * @param {number} duration
    * @param {any} event 
    * @param {Boolean} isLooping
    * @return {Phaser.Time.TimerEvent} 
    */
    Delay(duration, event, isLooping = false){
        let delay = this.time.addEvent({ 
            delay: duration, 
            callback: event, 
            callbackScope: this, 
            loop: isLooping 
        });

        return delay;
    }
}