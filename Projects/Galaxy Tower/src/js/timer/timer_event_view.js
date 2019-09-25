var TimerEventView = function(game)
{
	this.game = game;
	this.screenUtility = new ScreenUtility(this.game, 1200, 1920, 1200/1920);
	
	this.create();
}

TimerEventView.prototype = 
{    
	create()
	{		
		this.createHUD();
		this.resizeHUD(); 
    },
	
	createHUD()
	{
		//this.timerText = this.game.add.text(0,0, "00.00", {font : "Panton-Bold", fontSize: 20 , fill :"#ff9d00", align:"center"});
		
		this.timer1stDigitText = this.game.add.text(0,0, "0", {font : "Panton-Bold", fontSize: 20 , fill :"#ff9d00", align:"center"});
		this.timer2ndDigitText = this.game.add.text(0,0, "0", {font : "Panton-Bold", fontSize: 20 , fill :"#ff9d00", align:"center"});
		this.timerPeriodText = this.game.add.text(0,0, ".", {font : "Panton-Bold", fontSize: 20 , fill :"#ff9d00", align:"center"});
		this.timer3rdDigitText = this.game.add.text(0,0, "0", {font : "Panton-Bold", fontSize: 20 , fill :"#ff9d00", align:"center"});
		this.timer4thDigitText = this.game.add.text(0,0, "0", {font : "Panton-Bold", fontSize: 20 , fill :"#ff9d00", align:"center"});
	},
	
	resizeHUD()
	{
		//this.timerText.anchor.set(0.5, 0.5);
		//this.timerText.fontSize = Global.screenUtility.correctSize(this.game, 60);
		
		this.timer1stDigitText.anchor.set(0.5, 0.5);
		this.timer2ndDigitText.anchor.set(0.5, 0.5);
		this.timerPeriodText.anchor.set(0.5, 0.5);
		this.timer3rdDigitText.anchor.set(0.5, 0.5);
		this.timer4thDigitText.anchor.set(0.5, 0.5);
		
		this.timer1stDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		this.timer2ndDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		this.timerPeriodText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		this.timer3rdDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		this.timer4thDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
	},

	updateTimer(time)
	{
		let timerTxt = this.appendTimer(time);
		
		this.timer1stDigitText.text = timerTxt[0];
		this.timer2ndDigitText.text = timerTxt[1];
		this.timer3rdDigitText.text = timerTxt[3];
		this.timer4thDigitText.text = timerTxt[4];		
	},
	
	appendTimer(time)
	{
		let timerText = time.toString();
		
		if (time > 10000)
		{
			if (timerText.length > 4)
			{
				timerText = timerText.substr(0, 4);
			}			
		}
		else
		{
			if (timerText.length > 3)
			{
				timerText = timerText.substr(0, 3);
			}			
		}

		if (timerText.length == 1)
		{
			timerText = `00.0${timerText}`;
		}
		else if (timerText.length == 2)
		{
			timerText = `00.${timerText}`;
		}
		else if (timerText.length == 3)
		{
			timerText = `0${timerText.substr(0,1)}.${timerText.substr(1,2)}`;
		}
		else if (timerText.length == 4)
		{
			timerText = `${timerText.substr(0,2)}.${timerText.substr(2,2)}`;
		}	

		return timerText;	
	}
}