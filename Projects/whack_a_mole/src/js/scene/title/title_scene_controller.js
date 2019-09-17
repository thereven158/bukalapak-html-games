import Phaser from 'phaser';
import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import VoucherView from '../../view/popup_voucher_view';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        
    }

    init(){
        console.log('title screen')
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)

    }

    create(){
        this.view = new TitleSceneView(this);
        this.view.create();

        this.VoucherView = new VoucherView(this);
        this.VoucherView.ShowVoucherCode("7749vcx")
        this.VoucherView.SetDescription('voucher_headerwin', 
            "Voucher", 
            "Yuk, Pakai Vouchernya!", 
            "kamu dapat voucher gratis ongkir sampai Rp20.000 buat belanja di aplikasi buka lapak");
        
        // this.VoucherView.DisableVoucherCode()
        // this.VoucherView.SetDescription('voucher_headertimeout', 
        //     "Timeout", 
        //     "Coba lagi yuk", 
        //     "Masih banyak kesempatan dapetin voucher dan kejutan lainnya di aplikasi Bukalapak.");
        
        this.VoucherView.Open();

        this.VoucherView.OnClickClose(()=>{
            console.log("test")
        });
        this.VoucherView.OnClickMainLagi(this.OnClickPlay);

        this.view.onClickPlay(this.OnClickPlay);
    }

    update(){

    }

    OnClickPlay = ()=>{
        this.scene.start('GameScene')
    }

    onClick
}