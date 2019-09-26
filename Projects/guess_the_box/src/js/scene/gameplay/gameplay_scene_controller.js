import gameplaydata from '../../gameplaydata';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import BoardController from '../../subcontroller/board_controller';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init(){
        console.log('game screen')

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
    }

    InitAudio(){

    }

    create(){
        this.view = new GameplaySceneView(this).create();

        this.Board = new BoardController(this);

        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;

        //this.Win();
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
        }
    }

    Timesout(){
        this.view.TimesOut();
        this.Endgame();

        this.time.addEvent({ 
            delay: 3000, 
            callback: this.ShowResult, 
            callbackScope: this, 
            loop: false 
        });
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
}