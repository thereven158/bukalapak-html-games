import Phaser from 'phaser'
import Button from '../module/objects/button';
import Image from '../module/objects/image';
import Text from '../module/objects/text';
import ScreenUtility from '../module/screen/screen_utility';

export default class VoucherInfoView extends Phaser.GameObjects.Container{
/** @param {Phaser.Scene} scene */
	constructor(scene) {
        super(scene);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = ScreenUtility.getInstance();

		scene.add.existing(this);  

        this.InitView();
    }

    InitView(){
        //background
        this.Blackground = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.setDisplaySize(this.ScreenUtility.GameHeight, this.ScreenUtility.GameWidth);
        this.Blackground.setAlpha(0.8);
        this.add(this.Blackground);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        let whiteGround = this.scene.add.graphics();
        whiteGround.fillStyle('0xffffff', 1);
        whiteGround.fillRect(0,0, this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.MainGroup.add(whiteGround);

        //header
        let headerHeight = this.ScreenUtility.GameHeight * 0.1;
        let contentHeight = this.ScreenUtility.GameHeight - headerHeight;
        function GetContentYPos(percentage){
            return headerHeight + (contentHeight * percentage);
        }

        let headerLine = this.scene.add.graphics();
        headerLine.lineStyle(1.2, "0xe8eaef", 1);
        headerLine.strokeRect(0, headerHeight, this.ScreenUtility.GameWidth, 0);
        this.MainGroup.add(headerLine);

        let headerText = new Text(this.scene, this.ScreenUtility.GameWidth * 0.05, headerHeight * 0.5, "Info Promo"
            ,{align:'center', fontFamily: 'panton_bold', color: '#000000'}).setFontSizeR(55);
        headerText.setOrigin(0,0.5);
        this.MainGroup.add(headerText);

        this.BtnClose = new Button(this.scene, 0,0, 'voucher_btnCloseInfo');
        this.BtnClose.setDisplayWidth(headerHeight * 0.5, true);
        this.BtnClose.setPosition(this.ScreenUtility.GameWidth * 0.9, headerHeight * 0.5);
        this.BtnClose.onClick(this.Close);
        this.MainGroup.add(this.BtnClose);

        //content
        this.TitleText = new Text(this.scene, this.ScreenUtility.GameWidth * 0.05, GetContentYPos(0.025), "Voucher gratis ongkir untuk pengguna baru"
            ,{align:'left', fontFamily: 'panton_bold', color: '#000000'}).setFontSizeR(55);
        this.TitleText.setOrigin(0, 0);
        this.TitleText.setWordWrapWidth(this.ScreenUtility.GameWidth * 0.945);
        this.MainGroup.add(this.TitleText);

        this.DescriptionText = new Text(this.scene, this.TitleText.x, this.TitleText.y + this.TitleText.height * 1.1, "Kamu dapet voucher gratis ongkir sampai Rp20.000 buat belanja di aplikasi Bukalapak!"
            ,{align:'left', fontFamily: 'panton', color: '#000000'}).setFontSizeR(38);
        this.DescriptionText.setOrigin(0,0);
        this.DescriptionText.setWordWrapWidth(this.ScreenUtility.GameWidth * 0.935);
        this.MainGroup.add(this.DescriptionText);

        this.InfoGroup = this.scene.add.container(0,0);
        this.MainGroup.add(this.InfoGroup);

        let infoContentWidth = this.ScreenUtility.GameWidth * 0.9;
        let infoContentHeight = this.ScreenUtility.GameHeight * 0.3;
        let infoHeaderHeight = this.ScreenUtility.GameHeight * 0.07;
        let infoHeaderStartPosY = this.DescriptionText.y + (this.DescriptionText.height * 1.2);
        let infoContentStartPosX = this.ScreenUtility.CenterX  - (infoContentWidth * 0.5);
        let infoContentStartPosY = infoHeaderStartPosY + infoHeaderHeight;
        function GetInfoContentXPos(percentage){
            return infoContentStartPosX + (infoContentWidth * percentage);
        }
        function GetInfoContentYPos(percentage){
            return infoContentStartPosY + (infoContentHeight * percentage);
        }

        let infoContentBox = this.scene.add.graphics();
        infoContentBox.fillStyle('0xf9fafb', 1);
        infoContentBox.lineStyle(1.2, "0xe8eaef", 1);
        infoContentBox.fillRect(infoContentStartPosX, infoContentStartPosY, infoContentWidth, infoContentHeight);
        infoContentBox.strokeRect(infoContentStartPosX+1, infoContentStartPosY-1, infoContentWidth-2, infoContentHeight);
        this.InfoGroup.add(infoContentBox);

        let infoHeader = this.scene.add.graphics();
        infoHeader.fillStyle('0xea5164', 1);
        infoHeader.fillRect(infoContentStartPosX, infoHeaderStartPosY, infoContentWidth, infoHeaderHeight);
        this.InfoGroup.add(infoHeader);

        let iconInfo = new Image(this.scene, GetInfoContentXPos(0.05), infoHeaderStartPosY + infoHeaderHeight * 0.5, 'voucher_icninfo')
        iconInfo.setOrigin(0,0.5);
        iconInfo.setToResponsiveScale(0.8);
        this.InfoGroup.add(iconInfo)

        let infoTitleText = new Text(this.scene, iconInfo.x + (iconInfo.displayWidth * 1.5), infoHeaderStartPosY + infoHeaderHeight * 0.5, "INFO PROMO"
            ,{align:'left', fontFamily: 'panton_bold', color: '#ffffff'}).setFontSizeR(45);
        infoTitleText.setOrigin(0, 0.5);
        this.InfoGroup.add(infoTitleText);

        let headInfoTextSize = 30;
        let InfoTextSize = 35;
        let infoTextHeight = (((headInfoTextSize) + InfoTextSize) * 0.5);
    
        //info1
        let info1HeadText = new Text(this.scene, GetInfoContentXPos(0.05), 0, "Masa Berlaku"
            ,{align:'left', fontFamily: 'panton', color: '#9f9f9f'})
            .setFontSizeR(headInfoTextSize);
        info1HeadText.setOrigin(0, 0.5);
        this.InfoGroup.add(info1HeadText);

        this.Info1Text = new Text(this.scene, GetInfoContentXPos(0.05), 0, "1 - 30 Sep 2019"
            ,{align:'left', fontFamily: 'panton', color: '#000000'}).setFontSizeR(InfoTextSize);
        this.Info1Text.setOrigin(0, 0.5);
        this.InfoGroup.add(this.Info1Text);

        infoTextHeight = ((info1HeadText.height * 1.1) + this.Info1Text.height);
        info1HeadText.y = GetInfoContentYPos(0.2) - infoTextHeight * 0.4;
        this.Info1Text.y = info1HeadText.y + (info1HeadText.height * 1.1);

        //info2
        let info2HeadText = new Text(this.scene, GetInfoContentXPos(0.05), 0, "Minimum Transaksi"
            ,{align:'left', fontFamily: 'panton', color: '#9f9f9f'}).setFontSizeR(headInfoTextSize);
        info2HeadText.setOrigin(0, 0.5);
        this.InfoGroup.add(info2HeadText);

        this.Info2Text = new Text(this.scene, GetInfoContentXPos(0.05), info2HeadText.y + (info2HeadText.height * 1.1), "Tanpa minimum transaksi"
            ,{align:'left', fontFamily: 'panton', color: '#000000'}).setFontSizeR(InfoTextSize);
        this.Info2Text.setOrigin(0, 0.5);
        this.InfoGroup.add(this.Info2Text);

        infoTextHeight = ((info2HeadText.height * 1.1) + this.Info2Text.height);
        info2HeadText.y = GetInfoContentYPos(0.4) - infoTextHeight * 0.4;
        this.Info2Text.y = info2HeadText.y + (info1HeadText.height * 1.1);

        //info3
        let info3HeadText = new Text(this.scene, GetInfoContentXPos(0.05), 0, "Kode Promo"
            ,{align:'left', fontFamily: 'panton', color: '#9f9f9f'}).setFontSizeR(headInfoTextSize);
        info3HeadText.setOrigin(0, 0.5);
        this.InfoGroup.add(info3HeadText);

        this.Info3Text = new Text(this.scene, GetInfoContentXPos(0.05), 0, "CODE"
            ,{align:'left', fontFamily: 'panton_bold', color: '#000000'}).setFontSizeR(InfoTextSize);
        this.Info3Text.setOrigin(0, 0.5);
        this.InfoGroup.add(this.Info3Text);

        infoTextHeight = ((info3HeadText.height * 1.1) + this.Info3Text.height);
        info3HeadText.y = GetInfoContentYPos(0.6) - infoTextHeight * 0.4;
        this.Info3Text.y = info3HeadText.y + (info1HeadText.height * 1.1);

        //info4
        let info4HeadText = new Text(this.scene, GetInfoContentXPos(0.05), GetInfoContentYPos(0.8) - infoTextHeight, "Berlaku di"
            ,{align:'left', fontFamily: 'panton', color: '#9f9f9f'}).setFontSizeR(headInfoTextSize);
        info4HeadText.setOrigin(0, 0.5);
        this.InfoGroup.add(info4HeadText);

        this.Info4Text = new Text(this.scene, GetInfoContentXPos(0.05), info4HeadText.y + (info4HeadText.height * 1.1), "Android App dan IOS App"
            ,{align:'left', fontFamily: 'panton', color: '#000000'}).setFontSizeR(InfoTextSize);
        this.Info4Text.setOrigin(0, 0.5);
        this.InfoGroup.add(this.Info4Text);

        infoTextHeight = ((info4HeadText.height * 1.1) + this.Info4Text.height);
        info4HeadText.y = GetInfoContentYPos(0.8) - infoTextHeight * 0.4;
        this.Info4Text.y = info4HeadText.y + (info1HeadText.height * 1.1);

        this.BtnCopy = new Text(this.scene, GetInfoContentXPos(0.95), info3HeadText.y + (headInfoTextSize * 1.5), "SALIN"
            ,{align:'right', fontFamily: 'panton_bold', color: '#ea5164'}).setFontSizeR(InfoTextSize * 1.1);
        this.BtnCopy.setOrigin(1, 0.5);
        this.BtnCopy.setInteractive();
        this.InfoGroup.add(this.BtnCopy);

        this.SkText = new Text(this.scene, this.ScreenUtility.GameWidth * 0.05, (infoContentStartPosY + infoContentHeight) * 1.025, "*syarat dan ketentuan"
            ,{align:'left', fontFamily: 'panton', color: '#000000'}).setFontSizeR(25);
        this.SkText.setOrigin(0, 0);
        this.SkText.setWordWrapWidth(this.ScreenUtility.GameWidth * 0.925);
        this.InfoGroup.add(this.SkText);
    }

    SetDescription(voucherCode, titleText, description, expireDate, minTransactionInfo, onlyAppliesInfo, termandconditions){
        this.TitleText.runWordWrap(titleText);
        this.DescriptionText.runWordWrap(description);

        this.Info3Text.setText(voucherCode);

        if(expireDate != undefined){
            this.Info1Text.setText(expireDate);
        }
        if(minTransactionInfo != undefined){
            this.Info2Text.setText(minTransactionInfo);
        }

        if(onlyAppliesInfo != undefined){
            this.Info4Text.setText(onlyAppliesInfo);
        }

        if(termandconditions != undefined){
            this.SkText.setText("*" + termandconditions);
        }
    }

    Open(){
        this.setVisible(true);

        ScreenUtility.ResetGameScreen();
    }

    Close = ()=>{
        this.setVisible(false);
    }

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }

    OnClickCopy(event){
        this.BtnCopy.on('pointerup', event, this);
    }
}
