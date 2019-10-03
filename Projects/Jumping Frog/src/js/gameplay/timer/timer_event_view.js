import Text from '../../module/objects/text';
import Image from '../../module/objects/image';

export default class TimerEventView
{
	constructor(game)
	{
		this.game = game;
		this.ScreenUtility = game.ScreenUtility;
		
		this.create();
	}
	
	create()
	{		
		this.createHUD();
		this.resizeHUD(); 
    }
	
	createHUD()
	{
		this.timerPanel = new Image(this.game, this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight * 0.00, 'timer_ui');
		this.timerPanel.setOrigin(1, 0);
      	this.timerPanel.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);				
		
		this.timer1stDigitText = new Text(this.game, 0,0, "0", {fontFamily : "panton", color :"#ffffff", align:"center"}).setFontSizeR(120);
		this.timer2ndDigitText = new Text(this.game, 0,0, "0", {fontFamily : "panton", color :"#ffffff", align:"center"}).setFontSizeR(120);
		this.timerPeriodText = new Text(this.game, 0,0, ".", {fontFamily : "panton", color :"#ffffff", align:"center"}).setFontSizeR(120);
		this.timer3rdDigitText = new Text(this.game, 0,0, "0", {fontFamily : "panton", color :"#ffffff", align:"center"}).setFontSizeR(120);
		this.timer4thDigitText = new Text(this.game, 0,0, "0", {fontFamily : "panton", color :"#ffffff", align:"center"}).setFontSizeR(120);
	}
	
	resizeHUD()
	{
		//this.timerText.anchor.set(0.5, 0.5);
		//this.timerText.fontSize = Global.screenUtility.correctSize(this.game, 60);
		
		this.timer1stDigitText.setOrigin(0.5, 0.5);
		this.timer2ndDigitText.setOrigin(0.5, 0.5);
		this.timerPeriodText.setOrigin(0.5, 0.5);
		this.timer3rdDigitText.setOrigin(0.5, 0.5);
		this.timer4thDigitText.setOrigin(0.5, 0.5);
		
		this.timer1stDigitText.setPosition(this.timerPanel.x - this.timerPanel.displayWidth * 0.705, this.timerPanel.y + this.timerPanel.displayHeight * 0.44);
		this.timer2ndDigitText.setPosition(this.timerPanel.x - this.timerPanel.displayWidth * 0.555, this.timerPanel.y + this.timerPanel.displayHeight * 0.44);
		this.timerPeriodText.setPosition(this.timerPanel.x - this.timerPanel.displayWidth * 0.450, this.timerPanel.y + this.timerPanel.displayHeight * 0.44);
		this.timer3rdDigitText.setPosition(this.timerPanel.x - this.timerPanel.displayWidth * 0.335, this.timerPanel.y + this.timerPanel.displayHeight * 0.44);
		this.timer4thDigitText.setPosition(this.timerPanel.x - this.timerPanel.displayWidth * 0.185, this.timerPanel.y + this.timerPanel.displayHeight * 0.44);		
		
		//this.timer1stDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		//this.timer2ndDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		//this.timerPeriodText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		//this.timer3rdDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
		//this.timer4thDigitText.fontSize = Global.screenUtility.correctSize(this.game, 80);
	}

	updateTimer(time)
	{
		let timerTxt = this.appendTimer(time);
		
		this.timer1stDigitText.text = timerTxt[0];
		this.timer2ndDigitText.text = timerTxt[1];
		this.timer3rdDigitText.text = timerTxt[3];
		this.timer4thDigitText.text = timerTxt[4];
	}
	
	appendTimer(time)
	{
		if (time < 0) time = 0;
		
		let timerText = Math.floor(time).toString();
		timerText = timerText.substr(0, timerText.length-1);
		
		if (timerText=="") timerText = "0";
		
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