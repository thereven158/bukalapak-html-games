import Text from '../../module/objects/text';
import Image from '../../module/objects/image';

export default class ScoreView
{
	constructor(game, totalChar = 5)
	{
		this.game = game;
		this.ScreenUtility = game.ScreenUtility;
		this.totalChar = totalChar;
		
		this.charTexts = [];
		
		this.create();
	}
	
	create()
	{		
		this.createHUD();
		this.resizeHUD(); 
    }
	
	createHUD()
	{
		this.panel = new Image(this.game, this.ScreenUtility.GameWidth * 0.00, this.ScreenUtility.GameHeight * 0.00, 'score_ui');
		this.panel.setOrigin(0, 0);
      	this.panel.setDisplayWidth(this.ScreenUtility.GameWidth * 0.35, true);
		
		for (let i=0;i<this.totalChar;i++)
		{
			this.charTexts.push(new Text(this.game, 0, 0, "0", {fontFamily : "panton_bold", color :"#f9d023", align:"center"}).setFontSizeR(70));
		}		
	}
	
	resizeHUD()
	{
		for (let i=0;i<this.totalChar;i++) 
		{
			this.charTexts[i].setOrigin(0.5, 0.5);
		}
		
		let deltaDistance = 0.125;
		
		for (let i=0;i<this.totalChar;i++) 
		{
			this.charTexts[i].setPosition(this.panel.x + this.panel.displayWidth * (deltaDistance * i), this.panel.y + this.panel.displayHeight * 0.64);
		}
		
		let middleIndex = (this.totalChar+1)/2;
		let prevX = this.charTexts[middleIndex].x;
		this.charTexts[middleIndex].x = this.panel.x + this.panel.displayWidth * 0.65;
		let deltaX = Math.abs(prevX - this.charTexts[middleIndex].x);
		
		for (let i=0;i<this.totalChar;i++) 
		{
			if (i==middleIndex) continue;
			this.charTexts[i].x += deltaX;
		}
	}

	updateScore(value)
	{
		let newText = this.appendText(value);
		
		for (let i=0;i<this.totalChar;i++) 
		{
			this.charTexts[i].text = newText[i];
		}
	}
	
	appendText(value)
	{
		if (value < 0) value = 0;
		
		let valueTxt = Math.floor(value).toString();
		let len = valueTxt.length;
		
		while (valueTxt.length < this.totalChar)
		{
			valueTxt = '0' + valueTxt;
		}		

		return valueTxt;
	}
}