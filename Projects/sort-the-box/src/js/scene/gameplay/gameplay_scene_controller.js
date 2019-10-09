import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

import gameplaydata from '../../gameplaydata';
import BoardController from '../../subcontroller/board_controller';
import MinionController from '../../subcontroller/minion_controller';
import TeleController from '../../subcontroller/tele_controller';
import { Helper } from '../../helper/helper';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
        this.Bgm;
    }

    init = ()=>{
        //console.log('game screen')

        this.initGame();
        this.initGameData();
        this.initAudio();
        this.initAnimationData();
    }

    initGame = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    initGameData = ()=>{
        this.IsGameStarted = false;
        this.IsGameWin = false;

        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
        this.IsWaitingForAnswer = false;
        this.AnswerID = undefined;
    }

    initAudio = ()=>{
        if(this.Bgm == undefined){
            this.Bgm = this.sound.add('bgm_ingame', {
                loop:-1,
                volume: 1
            });
        }

        this.Bgm.play();
    }

    initAnimationData = ()=>{
        MinionController.initAnimationData(this);
        TeleController.initAnimationData(this);
    }

    create = ()=>{
        this.view = new GameplaySceneView(this).create();
        this.view.onClickBlueButton(()=>{
            this.onClickAnswerEvent(0);
        });

        this.view.onClickRedButton(()=>{
            this.onClickAnswerEvent(1);
        });

        this.board = new BoardController(this);


        this.startGame();
    }

    startGame = ()=>{
        this.IsGameStarted = true;
        this.core();
        
        //this.gameOver();
    }

    core = ()=>{
        if(this.Score >= gameplaydata.TargetPoint){
            this.win();
            return;
        }

        this.board.produce(this.WaitForAnswerEvent)
    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

        this.board.update(timestep, delta);
        this.view.update();
    }

    gameUpdate(timestep, delta){
        this.Timer -= (1 * delta) / 1000;

        if(this.IsWaitingForAnswer && this.AnswerID != undefined){
            this.answer(this.AnswerID);
        }
        //Isgameover
        if(this.Timer <= 0){       
            this.Timer = 0;
            this.timesout();
        }
    }

    WaitForAnswerEvent = ()=>{
        this.view.setStatus(1);
        this.IsWaitingForAnswer = true;
    }

    onClickAnswerEvent = (id) =>{
        this.AnswerID = id;
    }

    answer = (id)=>{
        if(!this.IsGameStarted)
            return;

        this.IsWaitingForAnswer = false;
        this.AnswerID = undefined;

        if(id == this.board.activeMinionID()){
            //correct
            this.board.sendTargetMinionToTelerpotation(this.successTeleportEvent);
            this.Score += 1;
            this.sound.play('correct');
            this.view.setStatus(2);
        }else{
            //wrong
            this.sound.play('wrong');
            this.view.setStatus(3);
        }

        this.core();
    }

    successTeleportEvent = ()=>{
        
    }

    restart = ()=>{
        this.scene.restart();
    }

    backToTitle = ()=>{
        this.Bgm.stop();

        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    win = ()=>{
        this.IsGameWin = true;
        this.endgame();

        this.sound.play('victory');
        this.showResult();
    }

    timesout = ()=>{
        this.view.timesout();
        this.endgame();

        Helper.delay(this, 300, this.showResult);

        this.sound.play('timeout');
    }

    endgame = ()=>{
        this.IsGameStarted = false;
        
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