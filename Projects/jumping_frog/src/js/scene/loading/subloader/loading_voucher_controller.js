import LoadingSceneController from "../loading_scene_controller";

export default class LoadingVoucherController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('voucher_BgWhite', this.scene.CreatePath('/images/voucher/box_white.png'));
        this.scene.load.image('voucher_headerwin', this.scene.CreatePath('/images/voucher/header_voucherwin.png'));
        this.scene.load.image('voucher_headertimeout', this.scene.CreatePath('/images/voucher/header_timeout.png'));
        this.scene.load.image('voucher_titleBox', this.scene.CreatePath('/images/voucher/box_voucher.png'));
        this.scene.load.image('voucher_btnDownload', this.scene.CreatePath('/images/voucher/btn_download.png'));
        this.scene.load.image('voucher_copyBox', this.scene.CreatePath('/images/voucher/box_copyBox.png'));
        this.scene.load.image('voucher_btnCopy', this.scene.CreatePath('/images/voucher/btn_copy.png'));
        this.scene.load.image('voucher_btnMainLagi', this.scene.CreatePath('/images/voucher/btn_main.png'));
        this.scene.load.image('voucher_btninfo', this.scene.CreatePath('/images/voucher/btn_info.png'));
        
        this.scene.load.image('voucher_btnClose', this.scene.CreatePath('/images/voucher/btn_close.png'));
        this.scene.load.image('voucher_btnCloseInfo', this.scene.CreatePath('/images/voucher/btn_closeInfo.png'));
        this.scene.load.image('voucher_icninfo', this.scene.CreatePath('/images/voucher/icn_info.png'));
     }
}