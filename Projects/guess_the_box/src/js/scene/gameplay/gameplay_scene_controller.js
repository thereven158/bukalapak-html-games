import gameplaydata from '../../gameplaydata';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import BoardController from '../../subcontroller/board_controller';
import PlatformController from '../../subcontroller/platform_controller';
import AudioController from '../../module/audio/audio_controller';
import ClawAController from '../../subcontroller/claw_a_controller';
import ClawBController from '../../subcontroller/claw_b_controller';
import { Helper } from '../../helper/helper';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
        this.Bgm;
    }

    init = () =>{
        //console.log('game screen')
        
        this.initAnimatonData();

        this.initGame();
        this.initGameData();
        this.initAudio();
    }

    initGame = () =>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();

    }

    initGameData = () =>{
        this.IsGameStarted = false;

        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
        this.IsGameWin = false;
        this.MoveCount = 0;
        this.CorrectMoveChainCount = 0;
        
        this.CurrentPhaseIdx = 0;
        this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
    }

    initAudio = () =>{
        if(this.Bgm == undefined){
            this.Bgm = this.sound.add('bgm_ingame', {
                loop:-1,
                volume: 1
            });
        }

        this.Bgm.play();
    }

    initAnimatonData = () =>{
        PlatformController.initAnimationData(this);
        ClawAController.initAnimationData(this);
        ClawBController.initAnimationData(this);
    }

    create(){
        this.view = new GameplaySceneView(this).create();

        this.Board = new BoardController(this);

        this.startGame();
    }

    startGame = () =>{
        this.view.setStatus("STANDBY");
        this.IsGameStarted = true;

        this.Board.Prologue(()=>{
            Helper.delay(this, 500, ()=>{
                this.Board.ShowCorrectBox();
                Helper.delay(this, gameplaydata.waitDurationPerMove, ()=>{
                    this.Board.CloseAllBox();
                    this.check();
                });
            })

        })
    }

    check = ()=>{ 
        if(!this.IsGameStarted)
            return;
        
        this.phaseValidation();
        Helper.delay(this, 1000, this.startBoardRotationPhase)
    }

    startBoardRotationPhase = ()=>{
        this.MoveCount += 1;
        
        this.Board.StartRotationPhase(this.CurrentPhase.MaxRotation, this.CurrentPhase.SpeedAlpha, this.phaseFinishEvent)
        this.view.setStatus("SHUFFLING");
    }

    phaseFinishEvent = ()=>{
        this.view.setStatus("CHOOSE!!!");
        this.Board.OnceWaitingForAnswer(this.answerEvent);
    }

    answerEvent = (isCorrect)=>{
        if(isCorrect){
            this.view.setStatus("^_^");
            this.CorrectMoveCount += 1;
            this.CorrectMoveChainCount += 1;
            this.Score += this.CurrentPhase.ScorePoint;
            
            if(this.Score >= gameplaydata.TargetPoint){
                this.win();
            }else{
                Helper.delay(this, gameplaydata.waitDurationPerMove, ()=>{
                    this.Board.CloseAllBox();
                    this.check();
                });
            }
            
            this.sound.play('correct');
        }else{
            this.view.setStatus("*_*");
            this.CorrectMoveChainCount -= 1;
            this.CorrectMoveChainCount = Phaser.Math.Clamp(this.CorrectMoveChainCount, 0, Infinity);
            Helper.delay(this, gameplaydata.waitDurationPerMove, ()=>{
                this.Board.ShowCorrectBox();
                Helper.delay(this, gameplaydata.waitDurationPerMove, ()=>{
                    this.Board.CloseAllBox();
                    this.check();
                });
            });

            this.sound.play('wrong');
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
            this.timesout();
        }
    }

    phaseValidation = () =>{
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

    timesout = () =>{
        this.view.setStatus("TIMEOUT");
        this.sound.play('timeout');

        this.view.TimesOut();
        this.endgame();

        Helper.delay(this, 3000, this.showResult);
    }

    win = () =>{
        this.view.setStatus("WIN");
        this.IsGameWin = true;

        this.endgame();
        this.showResult();
        this.sound.play('victory');
    }

    endgame = () =>{
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