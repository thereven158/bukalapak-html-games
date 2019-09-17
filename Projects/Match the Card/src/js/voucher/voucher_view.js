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
		
		this.createHeader();
		this.createFooter();
		this.createMain();
		
		this.hudGroup.add(this.headerGroup);
		this.hudGroup.add(this.footerGroup);
		this.hudGroup.add(this.mainGroup);
	},
	
	resizeHUD()
	{
		this.darkScreen.width = this.game.width;
		this.darkScreen.height = this.game.height;
		this.darkScreen.alpha = 0.75;
		
		this.resizeHeader();
		this.resizeFooter();
		this.resizeMain();
	},
	
	createHeader()
	{
		this.headerGroup = this.game.add.group();
		
		this.closeButton = this.game.add.button(0, 0, "btn_close");
		
		this.headerGroup.add(this.closeButton);
		
	},
	
	resizeHeader()
	{
		this.screenUtility.proportionalScale(this.closeButton, "x", this.game, 0.15);
        this.closeButton.position.set(this.game.width * 0.0, this.game.height * 0.0);
	},
	
	createFooter()
	{
		this.footerGroup = this.game.add.group();	
	},
	
	resizeFooter()
	{
		
	},
	
	createMain()
	{
		this.mainGroup = this.game.add.group();
		
		this.whitePanel = this.game.add.image(0, 0, "box_white");
		
		this.minionPanelWin = this.game.add.image(0, 0, "header_card1");
		this.minionPanelLose = this.game.add.image(0, 0, "header_card2");
		this.minionPanelLose.visible = false;
		
		this.titlePanel = this.game.add.image(0, 0, "box_voucher");
		this.titleText = this.game.add.text(0, 0, "Voucher", {font: `20px`, fill: "#000000", align: "center"});
		
		this.descText = this.game.add.text(0, 0, "Yuk, pakai vouchernya!", {font: `20px`, fill: "#000000", align: "center", wordWrap:true})
		
		this.subDescText = this.game.add.text(0, 0, "Kamu dapat voucher gratis ongkir sampai Rp 20.000 buat belanja di aplikasi Bukalapak!", {font: `20px`, fill: "#000000", align: "center", wordWrap:true})
						
		this.downloadButton = this.game.add.button(0, 0, "btn_download");
		this.playAgainButton= this.game.add.button(0, 0, "btn_main");		
		
		this.copyButton = this.game.add.button(0, 0, "btn_copy");
		this.copyText = this.game.add.text(0, 0, "CODE", {font: `20px`, fill: "#000000", align: "left"});
		
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
	
	resizeMain()
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
		this.copyText.fontSize = this.screenUtility.correctSize(this.game, 48);
		this.copyText.position.set(this.copyButton.x - this.copyButton.width * 0.45, this.copyButton.y - this.copyButton.height * 0.51);	
	}
}