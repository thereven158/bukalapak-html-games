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
		this.voucherCode = "CODE";
    },
	
	popUpLose()
	{
		this.view.titleText.text = "Timeout";
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
			
			this.displayGuide(true);
		});
		
		this.view.closeGuideButton.onInputDown.add(() => 
		{
		 	this.view.downloadButton.input.enabled = true;
			this.view.playAgainButton.input.enabled = true;
			this.view.closeButton.input.enabled = true;
			this.view.helpButton.input.enabled = true;
			
			this.displayGuide(false);
		});		
	},
	
	popUpWin(newCode)
	{
		this.view.titleText.text = "Voucher";
		this.view.minionPanelWin.visible = true;
		this.view.minionPanelLose.visible = false;
		
		this.view.copyText.text = newCode;
		
		this.view.copyButton.onInputDown.add(() => 
		{
			this.view.footerGroup.visible = true;
			this.copyVoucherCode(newCode);
		});
	},
	
	copyVoucherCode(code)
	{
		var inputCopy = document.createElement("input");
		//inputCopy.style.display = "none";
		document.body.appendChild(inputCopy);
		
		inputCopy.setAttribute("id", "copyboard");
		document.getElementById("copyboard").value=code;
		inputCopy.select();
		
		document.execCommand("copy");
		document.body.removeChild(inputCopy);
	}, 
	
	displayGuide(isDisplay)
	{
		this.view.helpButton.visible = !isDisplay;
		this.view.guideGroup.visible = isDisplay;
		this.view.closeButton.visible = !isDisplay;
	}
}