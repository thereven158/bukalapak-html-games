import Phaser from 'phaser'
import Button from '../module/objects/button';
import Image from '../module/objects/image';
import Text from '../module/objects/text';
import ScreenUtility from '../module/screen/screen_utility';
import VoucherInfoView from './popup_voucher_info_view';
import VoucherData from '../voucherdata';

export default class VoucherView extends Phaser.GameObjects.Container{
/** @param {Phaser.scene} scene */
	constructor(scene) {
        super(scene);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = scene.ScreenUtility;
        this.IsMessageActive = false;
        this.IsVoucherCodeEnabled = false;
        this.VoucherCode = '';

		scene.add.existing(this);  

        this.InitView();
        this.InitVoucherInfoView();
    }

    InitView(){
        let voucherData = VoucherData.Vouchers[CONFIG.VOUCHER_TYPE];

        this.setDepth(10);
        this.Blackground = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Blackground.setAlpha(0.8);
        this.add(this.Blackground);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.Background = new Image(this.scene, this.ScreenUtility.CenterX , this.ScreenUtility.CenterY, 'voucher_BgWhite')

        let contentWidth = (this.ScreenUtility.GameWidth * 0.9);
        let maxHeight = contentWidth * (this.Background.height / this.Background.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.8 : maxHeight *0.8;

        this.Background.displayWidth = contentWidth;
        this.Background.displayHeight = contentHeight;
        this.MainGroup.add(this.Background);

        this.Header = new Image(this.scene, this.Background.x , this.Background.y - (this.Background.displayHeight * 0.5) - 10, 'voucher_headertimeout')
        this.Header.setOrigin(0.5,0);
        this.Header.setDisplayWidth(this.Background.displayWidth, true);
        this.MainGroup.add(this.Header);

        this.TitleBox = new Image(this.scene, this.ScreenUtility.CenterX , this.Header.y + this.Header.displayHeight, 'voucher_titleBox')
        this.TitleBox.setDisplayWidth(this.Background.displayWidth * 0.375, true);
        this.MainGroup.add(this.TitleBox);
        
        this.TitleText = new Text(this.scene, this.TitleBox.x, this.TitleBox.y, "Voucher", 
            {align:'center', fontFamily: 'panton', color: '#000000'}).setFontSizeR(45);
        this.MainGroup.add(this.TitleText);

        let innerContentStartPosY = this.TitleBox.y;
        let innerContentHeight = (this.Background.y + this.Background.displayHeight * 0.5) - innerContentStartPosY;

        this.BtnInfo = new Button(this.scene, this.TitleBox.x + (contentWidth * 0.495), innerContentStartPosY + (innerContentHeight * 0.01), 'voucher_btninfo');
        this.BtnInfo.setDisplayWidth(this.Background.displayWidth * 0.1, true);
        this.BtnInfo.setOrigin(1,0);
        this.BtnInfo.onClick(this.ClickInfo);
        this.MainGroup.add(this.BtnInfo);
        
        this.HeadText = new Text(this.scene, this.TitleBox.x, innerContentStartPosY + (innerContentHeight * 0.175), "Yuk, Pakai Vouchernya!"
            ,{align:'center', fontFamily: 'panton_bold', color: '#000000'}).setFontSizeR(50);
        this.MainGroup.add(this.HeadText);

        this.DescriptionText = new Text(this.scene, this.TitleBox.x, innerContentStartPosY + (innerContentHeight * 0.3), 
        voucherData.Description + ""
            ,{align:'center', fontFamily: 'panton', color: '#000000'}).setFontSizeR(30);
        this.DescriptionText.setWordWrapWidth(this.Background.displayWidth * (0.8));
        this.MainGroup.add(this.DescriptionText);

        this.VoucherCodeGroup = this.scene.add.container(0,0);
        this.MainGroup.add(this.VoucherCodeGroup);
        
        this.VoucherBox = new Image(this.scene, this.ScreenUtility.CenterX, innerContentStartPosY + (innerContentHeight * 0.5), 'voucher_copyBox');
        this.VoucherBox.setDisplayWidth(this.Background.displayWidth * 0.725, true);
        this.VoucherCodeGroup.add(this.VoucherBox);
        
        this.BtnCopy = new Button(this.scene, this.ScreenUtility.CenterX + (this.VoucherBox.displayWidth * 0.3), innerContentStartPosY + (innerContentHeight * 0.5), 'voucher_btnCopy');
        this.BtnCopy.setDisplayWidth(this.VoucherBox.displayWidth * 0.2, true);
        this.BtnCopy.onClick(this.ClickCopy);
        this.VoucherCodeGroup.add(this.BtnCopy);

        let el = document.getElementById("vouchercode");
        if(el == undefined){
            el = document.createElement('input');
            el.id = "vouchercode";
            el.name = "vouchercode";
            el.value = 'CODE';
            el.type = 'text';
            el.disabled = true;

            el.style = `
                font-size: 40px;
                color: black;
                font-family: 'panton_bold';
                text-align:center;
                border: none; 
                box-shadow: none;
                background: none;
                color: rgba(0, 0, 0, 1);
            `;
            document.body.appendChild(el);
        }

        this.DomElement = this.scene.add.dom(this.ScreenUtility.CenterX - (this.VoucherBox.displayWidth * 0.1), innerContentStartPosY + (innerContentHeight * 0.5), el);
        this.DomElement.setScale(this.ScreenUtility.ScalePercentage)
        this.VoucherCodeGroup.add(this.DomElement);

        this.TextElement = document.getElementById("vouchercode");

        this.BtnDownload = new Button(this.scene, this.ScreenUtility.CenterX, innerContentStartPosY + (innerContentHeight * 0.725), 'voucher_btnDownload');
        this.BtnDownload.setDisplayWidth(this.Background.displayWidth * 0.625, true);
        this.BtnDownload.onClick(this.ClickDownload);
        this.MainGroup.add(this.BtnDownload);

        this.BtnMainLagi = new Button(this.scene, this.ScreenUtility.CenterX, innerContentStartPosY + (innerContentHeight * 0.9), 'voucher_btnMainLagi');
        this.BtnMainLagi.setDisplayWidth(this.Background.displayWidth * 0.7, true);
        this.MainGroup.add(this.BtnMainLagi);
        
        this.BtnClose = new Button(this.scene, 0,0, 'voucher_btnClose');
        this.BtnClose.setPosition(this.ScreenUtility.CenterX - (this.Background.displayWidth * 0.5) + (this.BtnClose.Image.displayWidth * 0.4), this.Header.y - (this.BtnClose.Image.displayHeight * 0.5));
        this.BtnClose.onClick(this.Close);
        this.MainGroup.add(this.BtnClose);
        
        this.MessageGroup = this.scene.add.container(0,0);
        this.MessageGroup.setDepth(11);

        this.MessageBoxHeight = this.ScreenUtility.GameHeight * 0.08;
        
        this.MessageBox = this.scene.add.graphics();
        this.MessageBox.fillStyle('0x00C88C', 1);
        this.MessageBox.fillRect(this.ScreenUtility.CenterX - (this.ScreenUtility.GameWidth * 0.5), this.ScreenUtility.GameHeight - this.MessageBoxHeight, this.ScreenUtility.GameWidth,this.MessageBoxHeight);
        this.MessageGroup.add(this.MessageBox);
        
        this.MessageText = new Text(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight - (this.MessageBoxHeight * 0.5), "Berhasil disalin tinggal pakai vouchernya pas pembayaran"
            ,{align:'center', fontFamily: 'panton', color: '#ffffff'}).setFontSizeR(30);
        this.MessageText.setWordWrapWidth(this.MessageBox.displayWidth * 0.8);
        this.MessageGroup.add(this.MessageText);

        this.MessageGroup.y = this.MessageBoxHeight;
    }

    InitVoucherInfoView(){
        this.VoucherInfoView = new VoucherInfoView(this.scene);
        this.VoucherInfoView.Close();

        this.VoucherInfoView.OnClickCopy(this.ClickCopy);
        this.VoucherInfoView.OnClickClose(this.CloseInfo);

        this.add(this.VoucherInfoView);
    }

    SetDescription(texture, titleText, headText, description){
         this.Header.setTexture(texture);
        
         this.TitleText.setText(titleText);
         this.HeadText.setText(headText);
         this.DescriptionText.setText(description);
    }

    ShowVoucherCode(code, {titleInfo, description, expireDate, minTransactionInfo, onlyAppliesInfo, termsandconditions}){
        this.BtnInfo.setVisible(true);

        this.IsVoucherCodeEnabled = true;
        this.VoucherCodeGroup.setVisible(true);

        var el = document.getElementById("vouchercode");
        el.value = code;

        this.VoucherCode = code;
        this.VoucherInfoView.SetDescription(code, titleInfo, description, expireDate , minTransactionInfo , onlyAppliesInfo, termsandconditions);
    }

    DisableVoucherCode(){
        this.BtnInfo.setVisible(false);

        this.IsVoucherCodeEnabled = false;
        this.VoucherCodeGroup.setVisible(false);

    }

    Open(){
        this.setVisible(true);
        this.MainGroup.y = this.ScreenUtility.GameHeight
        this.MainGroup.alpha = 0;
        this.scene.tweens.add({
            targets:  this.MainGroup,
            y: 0,
            alpha: 1,
            duration: 600,
            ease: Phaser.Math.Easing.Back.Out,
		});	
    }

    Close = ()=>{
        this.VoucherCodeGroup.setVisible(false);
        this.setVisible(false);
    }

    CloseInfo = () =>{
        if(this.IsVoucherCodeEnabled){
            this.TextElement.style.color = "rgba(0, 0, 1)";
        }
    }

    ClickInfo = ()=>{
        this.TextElement.style.color = "rgba(0, 0, 0 ,0)";

        this.VoucherInfoView.Open();
    }

    ClickCopy = ()=>{
        let success = false;
        try {
            // 1) Copy text
            navigator.clipboard.writeText(this.VoucherCode);
            success = true;
            
            // 2) Catch errors
          } catch (err) {
            success = false;
        }
        
        if(!success){
            this.TextElement.disabled = false;
            document.body.focus();
            this.TextElement.focus();
            this.TextElement.select();
            this.TextElement.setSelectionRange(0, 99999); /*For mobile devices*/
    
            success = document.execCommand('copy');
            this.TextElement.disabled = true
        }

        if ( document.selection ) {
            document.selection.empty();
            
        } else  {
            window.getSelection().removeAllRanges();
        }
        
        //window.focus();

        if(success){
            this.ShowMessage();
        }
    }

    ClickDownload = ()=>{
        window.location.replace(window.DOWNLOAD_LINK);
    }
    
    OnClickClose(event){
        this.BtnClose.onClick(event);
    }

    OnClickDownload(event){
        this.BtnDownload.onClick(event);
    }

    OnClickMainLagi(event){
        this.BtnMainLagi.onClick(event);
    }

    ShowMessage(){
        if(this.IsMessageActive)
            return;

        this.scene.tweens.add({
            targets:  this.MessageGroup,
			y:0,
            duration: 500,
            ease: Phaser.Math.Easing.Back.Out,
            onComplete: ()=>{ 
                this.scene.time.addEvent({ 
                    delay: 5000, 
                    callback: this.CloseMessage, 
                    callbackScope: this
                });
            },
            onCompleteScope: this
		});	
    }

    CloseMessage = ()=>{
        this.scene.tweens.add({
            targets:  this.MessageGroup,
			y: this.MessageBoxHeight,
            duration: 500,
            ease: Phaser.Math.Easing.Back.Out,
            onComplete: ()=>{
                this.IsMessageActive = false;
            },
            onCompleteScope: this
		});	
    }
}
