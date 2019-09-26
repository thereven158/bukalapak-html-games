import Phaser from 'phaser';
import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});

        this.Bgm = null;
    }

    init(data){
        console.log('title screen');

        this.IniTitleData();
        this.InitTitle();
        this.IsAfterGame = data.isAfterGame;
        this.IsGameWin = data.isGameWin;
    }

    IniTitleData(){
        this.IsAfterGame = false;
        this.IsGameWin = false;
    }

    InitTitle(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    create(){
        this.view = new TitleSceneView(this);
        this.view.create();

        this.view.onClickPlay(this.OnClickPlay);

        //add voucher script
        if(this.IsAfterGame){
            this.VoucherView = new VoucherView(this);
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
        
            }else{
                this.VoucherView.DisableVoucherCode()
                this.VoucherView.SetDescription('voucher_headertimeout', 
                    "Timeout", 
                    "Coba lagi yuk", 
                    "Masih banyak kesempatan dapetin voucher dan kejutan lainnya di aplikasi Bukalapak.");
            }
            
            this.VoucherView.Open();
    
            this.VoucherView.OnClickClose(()=>{
                
            });
            this.VoucherView.OnClickMainLagi(this.OnClickPlay);

            // this.sound.play('transition');
        }

        if(this.Bgm == null){
            this.Bgm = this.sound.add('menu-music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();
    }

    update(){

    }

    OnClickPlay = ()=>{
        this.Bgm.stop();
        this.game.sound.play('button-click');
        this.scene.start('GameScene');
        this.scene.stop();
    }
}