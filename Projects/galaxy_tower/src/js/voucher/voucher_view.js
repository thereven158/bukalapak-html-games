var VoucherView = function(game)
{
	this.game = game;
	this.screenUtility = new ScreenUtility(this.game, 1200, 1920, 1200/1920);
	
	this.create();
}

VoucherView.prototype = 
{
    create()
	{
        this.createHUD();
		this.resizeHUD();
    },
	
	createHUD()
	{
		this.darkScreen = this.game.add.graphics(0, 0);
		this.darkScreen.beginFill(0x000000);
		this.darkScreen.drawRect(0,0,1,1);
		
		this.hudGroup = this.game.add.group();
						
		this.createMainHUD();
		this.createFooterHUD();
		this.createHeaderHUD();
		this.createGuideHUD();
				
		this.hudGroup.add(this.mainGroup);		
		this.hudGroup.add(this.headerGroup);
		this.hudGroup.add(this.guideGroup);
		this.hudGroup.add(this.footerGroup);
	},
	
	resizeHUD()
	{
		this.darkScreen.width = this.game.width;
		this.darkScreen.height = this.game.height;
		this.darkScreen.alpha = 0.75;
				
		this.resizeMainHUD();
		this.resizeFooterHUD();		
		this.resizeHeaderHUD();
		this.resizeGuideHUD();
	},
	
	createHeaderHUD()
	{
		this.headerGroup = this.game.add.group();
		
		this.closeButton = this.game.add.button(0, 0, "btn_close");
		this.helpButton = this.game.add.button(0, 0, "btn_info1");
				
		this.headerGroup.add(this.closeButton);
		
	},
	
	resizeHeaderHUD()
	{
		this.screenUtility.proportionalScale(this.closeButton, "x", this.game, 0.15);
        this.closeButton.position.set(this.game.width * 0.0, this.game.height * 0.0);
		
		this.helpButton.anchor.set(1,0);
		this.screenUtility.proportionalScale(this.helpButton, "x", this.game, 0.1);
        this.helpButton.position.set(this.minionPanelWin.x + this.minionPanelWin.width * 0.5, this.minionPanelWin.y + this.minionPanelWin.height * 1.025);		
	},
	
	createFooterHUD()
	{
		this.footerGroup = this.game.add.group();
		this.footerGroup.visible = false;
		
		var copyNotifPanelGraphics = this.game.add.graphics(0, 0);
		copyNotifPanelGraphics.beginFill(0x1FC48F);
		copyNotifPanelGraphics.drawRect(0,0,this.game.width,this.game.height * 0.1);	
		
		this.copyNotifPanel = this.game.add.sprite(0, 0, copyNotifPanelGraphics.generateTexture());
		copyNotifPanelGraphics.destroy();
		
		this.copyNotifText = this.game.add.text(0, 0, "Berhasil disalin! Tinggal pakai vouchernya pas pembayaran.", {font: "Panton-Bold", fill: "#ffffff", align: "left"});				
		this.footerGroup.add(this.copyNotifPanel);
		this.footerGroup.add(this.copyNotifText);
	},
	
	resizeFooterHUD()
	{
		this.copyNotifPanel.anchor.set(0.5, 1);
		//this.screenUtility.proportionalScale(this.copyNotifPanel, "x", this.game, 1, -1, false);
        this.copyNotifPanel.position.set(this.game.width * 0.5, this.game.height * 1);
						
		this.copyNotifText.anchor.set(0, 0.5);
		this.copyNotifText.wordWrapWidth = this.copyNotifPanel.width * 0.9;
		this.copyNotifText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.copyNotifText.position.set(this.copyNotifPanel.x - this.copyNotifPanel.width * 0.45, this.copyNotifPanel.y - this.copyNotifPanel.height * 0.5);	
	},
	
	createMainHUD()
	{
		this.mainGroup = this.game.add.group();
		
		this.whitePanel = this.game.add.image(0, 0, "box_white");
		
		this.minionPanelWin = this.game.add.image(0, 0, "header_card1");
		this.minionPanelLose = this.game.add.image(0, 0, "header_card2");
		this.minionPanelLose.visible = false;
		
		this.titlePanel = this.game.add.image(0, 0, "box_voucher");
		this.titleText = this.game.add.text(0, 0, "Voucher", {font: "Panton-Bold", fill: "#000000", align: "center"});
		
		this.descText = this.game.add.text(0, 0, "Yuk, pakai vouchernya!", {font: "Panton-Bold", fill: "#000000", align: "center", wordWrap:true})
		
		this.subDescText = this.game.add.text(0, 0, "Kamu dapat voucher gratis ongkir sampai Rp 20.000 buat belanja di aplikasi Bukalapak!", {font: "Panton-Regular", fill: "#000000", align: "center", wordWrap:true})
						
		this.downloadButton = this.game.add.button(0, 0, "btn_download");
		this.playAgainButton = this.game.add.button(0, 0, "btn_main");		
		
		this.copyButton = this.game.add.button(0, 0, "btn_copy");
		this.copyText = this.game.add.text(0, 0, "CODE", {font: "Panton-Bold", fill: "#000000", align: "left"});
		
		this.mainGroup.add(this.whitePanel);
		this.mainGroup.add(this.minionPanelWin);
		this.mainGroup.add(this.minionPanelLose);
		this.mainGroup.add(this.titlePanel);
		this.mainGroup.add(this.titleText);
		this.mainGroup.add(this.descText);
		this.mainGroup.add(this.subDescText);
		this.mainGroup.add(this.downloadButton);
		this.mainGroup.add(this.playAgainButton);
		this.mainGroup.add(this.copyButton);
		this.mainGroup.add(this.copyText);
	},
	
	resizeMainHUD()
	{
		this.whitePanel.anchor.set(0.5, 0.5);
		this.screenUtility.proportionalScaleByBound(this.whitePanel, "x", 0.9, 0.8, 0, this.game.width, 0, this.game.height);
        this.whitePanel.position.set(this.game.width * 0.5, this.game.height * 0.5);	
		
		this.minionPanelWin.anchor.set(0.5, 0);
		this.screenUtility.proportionalScale(this.minionPanelWin, "x", this.whitePanel, 1.005);
        this.minionPanelWin.position.set(this.whitePanel.x, this.whitePanel.y - this.whitePanel.height * 0.5);
		
		this.minionPanelLose.anchor.set(0.5, 0);
		this.screenUtility.proportionalScale(this.minionPanelLose, "x", this.whitePanel, 1.005);
        this.minionPanelLose.position.set(this.whitePanel.x, this.whitePanel.y - this.whitePanel.height * 0.5);			
		
		this.titlePanel.anchor.set(0.5, 0.5);
		this.screenUtility.proportionalScale(this.titlePanel, "x", this.whitePanel, 0.45);
        this.titlePanel.position.set(this.whitePanel.x, this.minionPanelWin.y + this.minionPanelWin.height);			
		
		this.titleText.anchor.set(0.5, 0.5);
		this.titleText.fontSize = this.screenUtility.correctSize(this.game, 48);
		this.titleText.position.set(this.titlePanel.x, this.titlePanel.y);			
				
		this.descText.anchor.set(0.5, 0);
		this.descText.wordWrapWidth = this.whitePanel.width * 0.9;
		this.descText.fontSize = this.screenUtility.correctSize(this.game, 48);
		this.descText.position.set(this.titlePanel.x, this.titlePanel.y + this.titlePanel.height * 0.75);			
				
		this.subDescText.anchor.set(0.5, 0);
		this.subDescText.wordWrapWidth = this.whitePanel.width * 0.8;
		this.subDescText.fontSize = this.screenUtility.correctSize(this.game, 36);
		this.subDescText.position.set(this.titlePanel.x, this.descText.y + this.descText.height * 1.25);			
	
		this.playAgainButton.anchor.set(0.5, 1);
		this.screenUtility.proportionalScale(this.playAgainButton, "x", this.whitePanel, 0.9);
        this.playAgainButton.position.set(this.whitePanel.x, this.whitePanel.y + this.whitePanel.height * 0.465);		
		
		this.downloadButton.anchor.set(0.5, 1);
		this.screenUtility.proportionalScale(this.downloadButton, "x", this.whitePanel, 0.9);
        this.downloadButton.position.set(this.playAgainButton.x, this.playAgainButton.y - this.playAgainButton.height * 1.1);
		
		this.copyButton.anchor.set(0.5, 1);
		this.screenUtility.proportionalScale(this.copyButton, "x", this.whitePanel, 0.9);
        this.copyButton.position.set(this.downloadButton.x, this.downloadButton.y - this.downloadButton.height * 1.125);
		
		this.copyText.anchor.set(0, 0.5);
		this.copyText.fontSize = this.screenUtility.correctSize(this.game, 36);
		this.copyText.position.set(this.copyButton.x - this.copyButton.width * 0.45, this.copyButton.y - this.copyButton.height * 0.48);	
	},
	
	createGuideHUD()
	{
		this.guideGroup = this.game.add.group();
		this.guideGroup.visible = false;
		
		var whiteGuidePanelGraphics = this.game.add.graphics(0, 0);
		whiteGuidePanelGraphics.beginFill(0xffffff);
		whiteGuidePanelGraphics.drawRect(0,0,this.game.width,this.game.height);			
		
		//this.whiteGuidePanel = this.game.add.image(0, 0, "box_white");
		this.whiteGuidePanel = this.game.add.image(0, 0, whiteGuidePanelGraphics.generateTexture());
		whiteGuidePanelGraphics.destroy();
		
		var whiteGuideTopPanelGraphics = this.game.add.graphics(0, 0);
		whiteGuideTopPanelGraphics.beginFill(0xF9FAFC);
		whiteGuideTopPanelGraphics.drawRect(0,0,this.game.width,this.game.height*0.075);					
				
		this.whiteGuideTopPanel = this.game.add.image(0, 0, whiteGuideTopPanelGraphics.generateTexture());
		whiteGuideTopPanelGraphics.destroy();		
		
		this.infoPromoText = this.game.add.text(0, 0, "Info Promo", {font: "Panton-Bold", fill: "#000000", align: "left"});
		
		this.closeGuideButton = this.game.add.button(0, 0, "icn_close");
		
		this.titlePromoText = this.game.add.text(0, 0, CONFIG.TITLE_TEXT, {font: "Panton-Bold", fill: "#000000", align: "left", wordWrap:true});
		
		this.subtitlePromoText = this.game.add.text(0, 0, CONFIG.DESC_TEXT, {font: "Panton-Regular", fill: "#000000", align: "left", wordWrap:true});				
		
		this.guideGroup.add(this.whiteGuidePanel);
		this.guideGroup.add(this.whiteGuideTopPanel);
		this.guideGroup.add(this.infoPromoText);
		this.guideGroup.add(this.closeGuideButton);
		this.guideGroup.add(this.titlePromoText);
		this.guideGroup.add(this.subtitlePromoText);
		
		this.createInfoPanelHUD();
				
		this.sKText = this.game.add.text(0, 0, "S dan K", {font: "Panton-Regular", fill: "#333333", align: "left"});
		this.sKContentText = this.game.add.text(0, 0, "S dan K", {font: "Panton-Regular", fill: "#333333", align: "left", wordWrap:true});
		
		this.guideGroup.add(this.sKText);
		this.guideGroup.add(this.sKContentText);				
	},
	
	resizeGuideHUD()
	{		
		this.whiteGuidePanel.anchor.set(0.5, 0.5);
		//this.screenUtility.proportionalScaleByBound(this.whiteGuidePanel, "x", 0.9, 0.8, 0, this.game.width, 0, this.game.height);
		//this.screenUtility.proportionalScale(this.whiteGuidePanel, "y", this.game, 1.2, -1, false);
        this.whiteGuidePanel.position.set(this.game.width * 0.5, this.game.height * 0.5);	
		
		this.whiteGuideTopPanel.anchor.set(0.5, 0);
        this.whiteGuideTopPanel.position.set(this.game.width * 0.5, this.game.height * 0);			
		
		//this.infoPromoText.anchor.set(0, 0.5);
		this.infoPromoText.fontSize = this.screenUtility.correctSize(this.game, 28);
		//this.infoPromoText.position.set(this.whiteGuidePanel.x - this.whiteGuidePanel.width * 0.45, this.whiteGuideTopPanel.y);
		
		this.closeGuideButton.anchor.set(1, 0.5);
		this.screenUtility.proportionalScale(this.closeGuideButton, "x", this.game, 0.05);
        this.closeGuideButton.position.set(this.whiteGuidePanel.x + this.whiteGuidePanel.width * 0.45, this.whiteGuideTopPanel.y + this.whiteGuideTopPanel.height * 0.5);
						
		this.titlePromoText.anchor.set(0, 0.5);
		this.titlePromoText.wordWrapWidth = this.whitePanel.width * 0.9;
		this.titlePromoText.fontSize = this.screenUtility.correctSize(this.game, 28);
		this.titlePromoText.position.set(this.whiteGuidePanel.x - this.whiteGuidePanel.width * 0.45, this.whiteGuidePanel.y - this.whiteGuidePanel.height * 0.35);				
		
		this.subtitlePromoText.anchor.set(0, 0.5);
		this.subtitlePromoText.wordWrapWidth = this.whitePanel.width * 0.9;
		this.subtitlePromoText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.subtitlePromoText.position.set(this.whiteGuidePanel.x - this.whiteGuidePanel.width * 0.45, this.whiteGuidePanel.y - this.whiteGuidePanel.height * 0.275);
		
		this.resizeInfoPanelHUD();
				
		this.sKText.anchor.set(0, 0.5);
		this.sKText.fontSize = this.screenUtility.correctSize(this.game, 28);
		this.sKText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * 1.1);		
		this.sKText.visible = false;
		
		this.sKContentText.anchor.set(0, 0.5);
		this.sKContentText.wordWrapWidth = this.infoPromoContentPanel.width * 1.05;
		this.sKContentText.fontSize = this.screenUtility.correctSize(this.game, 24);
				
		this.subtitlePromoText.wordWrapWidth = this.infoPromoContentPanel.width * 1.05;
	},
	
	createInfoPanelHUD()
	{
		var infoPromoTitlePanelGraphics = this.game.add.graphics(0, 0);
		infoPromoTitlePanelGraphics.beginFill(0xea5164);
		infoPromoTitlePanelGraphics.drawRect(0,0,this.game.width,this.game.height * 0.075);	
		
		this.infoPromoTitlePanel = this.game.add.sprite(0, 0, infoPromoTitlePanelGraphics.generateTexture());
		infoPromoTitlePanelGraphics.destroy();
		
		var infoPromoContentPanelGraphics = this.game.add.graphics(0, 0);
		infoPromoContentPanelGraphics.beginFill(0xF9FAFC);
		infoPromoContentPanelGraphics.drawRect(0,0,this.game.width,this.game.height * 0.6);	
		
		this.infoPromoContentPanel = this.game.add.sprite(0, 0, infoPromoContentPanelGraphics.generateTexture());
		infoPromoContentPanelGraphics.destroy();
		
		//
		
		this.infoIcon = this.game.add.image(0, 0, "icn_info");		
		this.infoPromoTitleText = this.game.add.text(0, 0, "INFO PROMO", {font: "Panton-Regular", fill: "#ffffff", align: "left"});
		
		this.masaBerlakuTitleText = this.game.add.text(0, 0, "Masa Berlaku", {font: "Panton-Regular", fill: "#333333", align: "left"});
		this.masaBerlakuContentText = this.game.add.text(0, 0, "-", {font: "Panton-Regular", fill: "#000000", align: "left"});
		
		this.minimumTransaksiTitleText = this.game.add.text(0, 0, "Minimum Transaksi", {font: "Panton-Regular", fill: "#333333", align: "left"});
		this.minimumTransaksiContentText = this.game.add.text(0, 0, "-", {font: "Panton-Regular", fill: "#000000", align: "left"});
		
		this.kodePromoTitleText = this.game.add.text(0, 0, "kode Promo", {font: "Panton-Regular", fill: "#333333", align: "left"});
		this.kodePromoContentText = this.game.add.text(0, 0, "-", {font: "Panton-Bold", fill: "#000000", align: "left"});
		this.kodePromoRightText = this.game.add.text(0, 0, "SALIN", {font: "Panton-Regular", fill: "#E95065", align: "right"});
				
		this.berlakuDiTitleText = this.game.add.text(0, 0, "Berlaku di", {font: "Panton-Regular", fill: "#333333", align: "left"});
		this.berlakuDiTitleContentText = this.game.add.text(0, 0, "-", {font: "Panton-Regular", fill: "#000000", align: "left"});
		
		this.guideGroup.add(this.infoPromoTitlePanel);
		this.guideGroup.add(this.infoPromoContentPanel);
		
		this.guideGroup.add(this.infoIcon);
		this.guideGroup.add(this.infoPromoTitleText);
		
		this.guideGroup.add(this.masaBerlakuTitleText);
		this.guideGroup.add(this.masaBerlakuContentText);	
		
		this.guideGroup.add(this.minimumTransaksiTitleText);
		this.guideGroup.add(this.minimumTransaksiContentText);
		
		this.guideGroup.add(this.kodePromoTitleText);
		this.guideGroup.add(this.kodePromoContentText);
		this.guideGroup.add(this.kodePromoRightText);
		
		this.guideGroup.add(this.berlakuDiTitleText);
		this.guideGroup.add(this.berlakuDiTitleContentText);	
	},
	
	resizeInfoPanelHUD()
	{
		this.infoPromoTitlePanel.anchor.set(0.5, 0);
		this.screenUtility.proportionalScale(this.infoPromoTitlePanel, "x", this.whiteGuidePanel, 0.8);
        this.infoPromoTitlePanel.position.set(this.whiteGuidePanel.x, this.whiteGuidePanel.y - this.whiteGuidePanel.height * 0.225);
		
		this.infoPromoContentPanel.anchor.set(0.5, 0);
		this.screenUtility.proportionalScale(this.infoPromoContentPanel, "x", this.whiteGuidePanel, 0.8);
        this.infoPromoContentPanel.position.set(this.infoPromoTitlePanel.x, this.infoPromoTitlePanel.y + this.infoPromoTitlePanel.height);	
		
		//		
		this.infoPromoText.position.set(this.infoPromoTitlePanel.x - this.infoPromoTitlePanel.width * 0.5, this.whiteGuideTopPanel.y + this.whiteGuideTopPanel.height * 0.375);
		this.titlePromoText.position.set(this.infoPromoTitlePanel.x - this.infoPromoTitlePanel.width * 0.5, this.whiteGuidePanel.y - this.whiteGuidePanel.height * 0.35);				
		this.subtitlePromoText.position.set(this.infoPromoTitlePanel.x - this.infoPromoTitlePanel.width * 0.5, this.whiteGuidePanel.y - this.whiteGuidePanel.height * 0.275);
		this.sKContentText.position.set(this.infoPromoTitlePanel.x - this.infoPromoTitlePanel.width * 0.5, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * 1.15);
		//
		
		//
		
		this.infoIcon.anchor.set(0, 0.5);
		this.screenUtility.proportionalScale(this.infoIcon, "y", this.infoPromoTitlePanel, 0.35);
        this.infoIcon.position.set(this.infoPromoTitlePanel.x - this.infoPromoTitlePanel.width * 0.45, this.infoPromoTitlePanel.y + this.infoPromoTitlePanel.height * 0.5);
		
		this.infoPromoTitleText.anchor.set(0, 0.5);
		this.infoPromoTitleText.wordWrapWidth = this.whitePanel.width * 0.9;
		this.infoPromoTitleText.fontSize = this.screenUtility.correctSize(this.game, 36);
		this.infoPromoTitleText.position.set(this.infoIcon.x + this.infoIcon.width + this.infoPromoTitlePanel.width * 0.05, this.infoIcon.y + this.infoIcon.height * 0.125);
		
		//
		
		let delta = 0.05;
		
		this.masaBerlakuTitleText.anchor.set(0, 0.5);
		this.masaBerlakuTitleText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.masaBerlakuTitleText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * 0.1);
		
		this.masaBerlakuContentText.anchor.set(0, 0.5);
		this.masaBerlakuContentText.fontSize = this.screenUtility.correctSize(this.game, 28);
		this.masaBerlakuContentText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * (0.1 + delta));		
		
		
		this.minimumTransaksiTitleText.anchor.set(0, 0.5);
		this.minimumTransaksiTitleText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.minimumTransaksiTitleText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * 0.3);
		
		this.minimumTransaksiContentText.anchor.set(0, 0.5);
		this.minimumTransaksiContentText.fontSize = this.screenUtility.correctSize(this.game, 28);
		this.minimumTransaksiContentText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * (0.3 + delta));
		
		
		this.kodePromoTitleText.anchor.set(0, 0.5);
		this.kodePromoTitleText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.kodePromoTitleText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * 0.5);
		
		this.kodePromoContentText.anchor.set(0, 0.5);
		this.kodePromoContentText.fontSize = this.screenUtility.correctSize(this.game, 28);
		this.kodePromoContentText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * (0.5 + delta));		
				
		this.kodePromoRightText.anchor.set(1, 0.5);
		this.kodePromoRightText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.kodePromoRightText.position.set(this.infoPromoContentPanel.x + this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * (0.5 + delta));
				
		
		this.berlakuDiTitleText.anchor.set(0, 0.5);
		this.berlakuDiTitleText.fontSize = this.screenUtility.correctSize(this.game, 24);
		this.berlakuDiTitleText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * 0.7);
		
		this.berlakuDiTitleContentText.anchor.set(0, 0.5);
		this.berlakuDiTitleContentText.fontSize = this.screenUtility.correctSize(this.game, 28);
		this.berlakuDiTitleContentText.position.set(this.infoPromoContentPanel.x - this.infoPromoContentPanel.width * 0.45, this.infoPromoContentPanel.y + this.infoPromoContentPanel.height * (0.7 + delta));		
		
		
		// this.sKText = this.game.add.text(0, 0, "S dan K", {font: "Panton-Regular", fill: "#333333", align: "left"});
	}
}