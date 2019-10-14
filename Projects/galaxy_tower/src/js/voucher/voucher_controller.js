var VoucherController = function(game)
{
	this.game = game;
	
	this.create();
}

VoucherController.prototype = 
{
    create()
	{
        this.view = new VoucherView(this.game);	
		
		let el = document.getElementById("voucher_code");
		
		if (el == null)
		{
			el = document.createElement("input");
			el.setAttribute("id", "voucher_code");
			el.disabled = true;
			el.style.visibility = "hidden";
			el.style.display = "none";
			
			document.body.appendChild(el);
		}
		
		
		this.changeInfoVoucher();
    },
	
	setTitleInfo(reason="")
	{
		this.view.titleText.text = reason;
	},
	
	popUpLose()
	{		
		this.view.minionPanelWin.visible = false;
		this.view.minionPanelLose.visible = true;	
		
		this.view.copyButton.visible = false;
		this.view.copyText.visible = false;		
		this.view.helpButton.visible = false;
		
		this.view.descText.text = "Coba lagi yuk";
		this.view.subDescText.text = "Masih banyak kesempatan dapetin voucher dan kejutan lainnya di aplikasi Bukalapak.";		
	},
	
	setEvents(downloadEvent=null, playAgainEvent=null, closeButtonEvent=null)
	{
		if (downloadEvent)
		{
			this.view.downloadButton.onInputDown.add(() => 
			{
				downloadEvent();
			});	
		}
		
		if (playAgainEvent)
		{
			this.view.playAgainButton.onInputDown.add(() => 
			{
				playAgainEvent();
			});				
		}
		
		if (closeButtonEvent)
		{
			this.view.closeButton.onInputDown.add(() => 
			{
				closeButtonEvent();
			});				
		}
		
		this.view.helpButton.onInputDown.add(() => 
		{
		 	this.view.downloadButton.input.enabled = false;
			this.view.playAgainButton.input.enabled = false;
			this.view.closeButton.input.enabled = false;
			this.view.helpButton.input.enabled = false;
			
			this.view.footerGroup.visible = false;
			
			this.displayGuide(true);
		});

		this.view.closeGuideButton.onInputDown.add(() => 
		{
		 	this.view.downloadButton.input.enabled = true;
			this.view.playAgainButton.input.enabled = true;
			this.view.closeButton.input.enabled = true;
			this.view.helpButton.input.enabled = true;
			
			this.view.footerGroup.visible = false;
			
			this.displayGuide(false);
		});		
	},
	
	popUpWin(newCode)
	{
		this.view.minionPanelWin.visible = true;
		this.view.minionPanelLose.visible = false;
		
		this.view.subDescText.text = CONFIG.DESC_TEXT;
		
		this.view.copyText.text = newCode;
		
		this.view.copyButton.onInputUp.add(() => 
		{
			this.view.footerGroup.visible = true;
			this.copyVoucherCode(newCode);
		});
				
		
		this.view.kodePromoRightText.inputEnabled = true;
		this.view.kodePromoRightText.events.onInputUp.add(() => 
		{
			this.view.footerGroup.visible = true;
		 	this.copyVoucherCode(newCode);
		});
				
	},
	
	copyVoucherCode(code)
	{				
		var el = document.getElementById("voucher_code");
		el.style.visibility = "visible";
		el.style.display = "inline";
		
		el.disabled = false;
		el.contentEditable = true;
    	el.readOnly = false;		
		el.value = code;
		
		el.select();
		el.setSelectionRange(0, 99999);
		
		document.execCommand('copy');	
		
		window.getSelection().removeAllRanges();
		el.blur();
				
		el.disabled = true;
		el.contentEditable = false;
		el.readOnly = true;			
		
		el.style.visibility = "hidden";
		el.style.display = "none";
	}, 
	
	changeInfoVoucher()
	{	
		let voucherInfo = CONFIG.VOUCHER_INFO;
		
		this.view.titlePromoText.text = voucherInfo.TITLE;
		this.view.subtitlePromoText.text = voucherInfo.DESCRIPTION;
		
		this.view.masaBerlakuContentText.text = voucherInfo.MASA_BERLAKU;
		this.view.minimumTransaksiContentText.text = voucherInfo.MINIMUM_BERLAKU;
		this.view.kodePromoContentText.text = CONFIG.VOUCHER_CODE;
		this.view.berlakuDiTitleContentText.text = voucherInfo.BERLAKU_DI;
		this.view.sKContentText.text = voucherInfo.SK;
	},
	
	displayGuide(isDisplay)
	{
		this.view.helpButton.visible = !isDisplay;
		this.view.guideGroup.visible = isDisplay;
		this.view.closeButton.visible = !isDisplay;
	}
}