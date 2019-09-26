import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        
    }

    init(data){
        console.log('title screen')

        this.InitTitle();
        this.InitTitleData(data);
        this.InitAudio();
    }

    InitTitle(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitTitleData(data){

    }

    InitAudio(){

    }

    create(){
        this.view = new TitleSceneView(this);
        this.view.create();

        this.view.onClickPlay(this.OnClickPlay);

        //add voucher script
        this.VoucherView = new VoucherView(this);
        let voucherData = VoucherData.Vouchers[CONFIG.VOUCHER_TYPE];

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
        
        this.VoucherView.OnClickMainLagi(this.OnClickPlay);

        this.VoucherView.Open();
    }

    update(){

    }

    OnClickPlay = ()=>{
        this.scene.start('GameScene')
    }
}