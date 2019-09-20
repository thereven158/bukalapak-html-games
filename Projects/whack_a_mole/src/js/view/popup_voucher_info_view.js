import Phaser from 'phaser'
import Button from '../module/objects/button';
import ScreenUtility from '../module/screen/screen_utility';

export default class VoucherInfoView extends Phaser.GameObjects.Container{
/** @param {Phaser.scene} scene */
	constructor(scene) {
        super(scene);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = scene.ScreenUtility;

		scene.add.existing(this);  

        this.InitView();
    }

    InitView(){
        this.Blackground = this.scene.add.sprite(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.displayHeight = this.ScreenUtility.GameHeight;
		this.Blackground.displayWidth = this.ScreenUtility.GameWidth;
        this.Blackground.setAlpha(1);
        this.add(this.Blackground);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        let whiteGround = this.scene.add.graphics();
        whiteGround.fillStyle('0xffffff', 1);
        whiteGround.fillRect(0,0, this.ScreenUtility.GameWidth,this.ScreenUtility.GameHeight);
        this.MainGroup.add(whiteGround);

        let headerHeight = 150;
        let contentHeight = this.ScreenUtility.GameHeight - headerHeight;
        function GetContentYPos(percentage){
            return headerHeight + (contentHeight * percentage);
        }

        let headerLine = this.scene.add.graphics();
        headerLine.lineStyle(1.2, "0xe8eaef", 1);
        headerLine.strokeRect(0, headerHeight, this.ScreenUtility.GameWidth, 0);
        this.MainGroup.add(headerLine);

        let headerText = this.scene.add.text(this.ScreenUtility.GameWidth * 0.05, headerHeight * 0.5, "Info Promo")
            .setFontSize(65)
            .setAlign('center')
            .setFontFamily('panton_bold')
            .setColor('#000000');
        headerText.setOrigin(0,0.5);
        headerText.setScale(this.ScreenUtility.ScalePercentage)
        this.MainGroup.add(headerText);

        this.BtnClose = new Button(this.scene, 0,0, 'voucher_btnCloseInfo');
        this.BtnClose.setPosition(this.ScreenUtility.GameWidth * 0.9, headerHeight * 0.5);
        this.BtnClose.OnClick(this.Close);
        this.MainGroup.add(this.BtnClose);

        this.TitleText = this.scene.add.text(this.ScreenUtility.GameWidth * 0.05, GetContentYPos(0.025), "Voucher gratis ongkir untuk pengguna baru")
            .setFontSize(55)
            .setAlign('left')
            .setFontFamily('panton_bold')
            .setColor('#000000');
        this.TitleText.setOrigin(0, 0);
        this.TitleText.setScale(this.ScreenUtility.ScalePercentage)
        this.TitleText.setWordWrapWidth(this.ScreenUtility.GameWidth * 0.95);
        this.MainGroup.add(this.TitleText);

        this.DescriptionText = this.scene.add.text(this.TitleText.x, this.TitleText.y + (55 * 3) , "kamu dapat voucher gratis ongkir sampai Rp20.000 buat belanja di aplikasi buka lapak")
            .setFontSize(40)
            .setAlign('left')
            .setFontFamily('panton')
            .setColor('#000000');
        this.DescriptionText.setOrigin(0,0);
        this.DescriptionText.setWordWrapWidth(this.ScreenUtility.GameWidth * 0.95);
        this.DescriptionText.setScale(this.ScreenUtility.ScalePercentage)
        this.MainGroup.add(this.DescriptionText);

        this.InfoGroup = this.scene.add.container(0,0);
        this.MainGroup.add(this.InfoGroup);

        let infoContentWidth = this.ScreenUtility.GameWidth * 0.9;
        let infoContentHeight = 600;
        let infoHeaderHeight = 130;
        let infoHeaderStartPosY = this.DescriptionText.y + (40 * 4);
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

        let iconInfo = this.scene.add.image(GetInfoContentXPos(0.05), infoHeaderStartPosY + infoHeaderHeight * 0.5, 'voucher_icninfo')
        iconInfo.setOrigin(0,0.5);
        iconInfo.setScale(this.ScreenUtility.ScalePercentage);
        this.InfoGroup.add(iconInfo)

        let infoTitleText = this.scene.add.text(iconInfo.x + (iconInfo.displayWidth * 1.5), infoHeaderStartPosY + infoHeaderHeight * 0.5, "INFO PROMO")
            .setFontSize(60)
            .setAlign('left')
            .setFontFamily('panton_bold')
            .setColor('#ffffff');
        infoTitleText.setOrigin(0, 0.5);
        infoTitleText.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(infoTitleText);

        let headInfoTextSize = 30;
        let InfoTextSize = 35;
        let infoTextHeight = (((headInfoTextSize) + InfoTextSize) * 0.5)
    
        let info1HeadText = this.scene.add.text(GetInfoContentXPos(0.05), GetInfoContentYPos(0.2) - infoTextHeight, "Masa Berlaku")
            .setFontSize(headInfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#9f9f9f');
        info1HeadText.setOrigin(0, 0.5);
        info1HeadText.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(info1HeadText);

        this.Info1Text = this.scene.add.text(GetInfoContentXPos(0.05), info1HeadText.y + (headInfoTextSize * 1.5), "1 - 30 Sep 2019")
            .setFontSize(InfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#000000');
        this.Info1Text.setOrigin(0, 0.5);
        this.Info1Text.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(this.Info1Text);

        let info2HeadText = this.scene.add.text(GetInfoContentXPos(0.05), GetInfoContentYPos(0.4) - infoTextHeight, "Minimum Transaksi")
            .setFontSize(headInfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#9f9f9f');
        info2HeadText.setOrigin(0, 0.5);
        info2HeadText.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(info2HeadText);

        this.Info2Text = this.scene.add.text(GetInfoContentXPos(0.05), info2HeadText.y + (headInfoTextSize * 1.5), "Tanpa minimum transaksi")
            .setFontSize(InfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#000000');
        this.Info2Text.setOrigin(0, 0.5);
        this.Info2Text.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(this.Info2Text);

        let info3HeadText = this.scene.add.text(GetInfoContentXPos(0.05), GetInfoContentYPos(0.6) - infoTextHeight, "Kode Promo")
            .setFontSize(headInfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#9f9f9f');
        info3HeadText.setOrigin(0, 0.5);
        info3HeadText.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(info3HeadText);

        this.Info3Text = this.scene.add.text(GetInfoContentXPos(0.05), info3HeadText.y + (headInfoTextSize * 1.5), "CODE")
            .setFontSize(InfoTextSize * 1.1)
            .setAlign('left')
            .setFontFamily('panton_bold')
            .setAlpha()
            .setColor('#000000');
        this.Info3Text.setOrigin(0, 0.5);
        this.Info3Text.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(this.Info3Text);

        let info4HeadText = this.scene.add.text(GetInfoContentXPos(0.05), GetInfoContentYPos(0.8) - infoTextHeight, "Berlaku di")
            .setFontSize(headInfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#9f9f9f');
        info4HeadText.setOrigin(0, 0.5);
        info4HeadText.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(info4HeadText);

        this.Info4Text = this.scene.add.text(GetInfoContentXPos(0.05), info4HeadText.y + (headInfoTextSize * 1.5), "Android App dan IOS App")
            .setFontSize(InfoTextSize)
            .setAlign('left')
            .setFontFamily('panton')
            .setAlpha()
            .setColor('#000000');
        this.Info4Text.setOrigin(0, 0.5);
        this.Info4Text.setScale(this.ScreenUtility.ScalePercentage)
        this.InfoGroup.add(this.Info4Text);

        this.BtnCopy = this.scene.add.text(GetInfoContentXPos(0.95), info3HeadText.y + (headInfoTextSize * 1.5), "SALIN")
            .setFontSize(InfoTextSize * 1.1)
            .setAlign('right')
            .setFontFamily('panton_bold')
            .setAlpha()
            .setColor('#ea5164');
        this.BtnCopy.setOrigin(1, 0.5);
        this.BtnCopy.setScale(this.ScreenUtility.ScalePercentage)
        this.BtnCopy.setInteractive();
        this.InfoGroup.add(this.BtnCopy);
    }

    SetDescription(voucherCode, titleText, description, expireDate, minTransactionInfo, onlyAppliesInfo){
        this.TitleText.setText(titleText);
        this.DescriptionText.setText(description);

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
    }

    Open(){
        this.setVisible(true);
    }

    Close = ()=>{
        this.setVisible(false);
    }

    OnClickClose(event){
        this.BtnClose.OnClick(event);
    }

    OnClickCopy(event){
        this.BtnCopy.on('pointerdown', event, this);
    }
}