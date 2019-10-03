import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

import gameplaydata from '../../gameplaydata';
import BoardController from '../../subcontroller/board_controller';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init = ()=>{
        console.log('game screen')

        this.initGame();
        this.initGameData();
        this.initAudio();
    }

    initGame = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    initGameData = ()=>{
        this.IsGameStarted = false;
        this.IsGameWin = true;

        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
    }

    initAudio = ()=>{

    }

    create = ()=>{
        this.view = new GameplaySceneView(this).create();

        this.board = new BoardController(this);

        this.startGame();
    }

    startGame = ()=>{
        this.IsGameStarted = true;

        //this.gameOver();
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

        //Isgameover
        if(this.Timer <= 0){       
            this.Timer = 0;
            this.timesout();
        }
    }

    restart = ()=>{
        this.scene.restart();
    }

    backToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    win = ()=>{
        
    }

    timesout = ()=>{
        this.gameOver();
    }

    gameOver = ()=>{
        this.IsGameStarted = false;

        this.showResult();
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
    }
}