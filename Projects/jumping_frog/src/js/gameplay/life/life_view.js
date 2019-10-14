import Image from '../../module/objects/image';
import Sprite from '../../module/objects/sprite';

export default class SlifeView
{
	constructor(game, totalLife = 3)
	{
		this.game = game;
		this.ScreenUtility = game.ScreenUtility;
		this.totalLife = totalLife;
		
		this.lifeIcons = [];
		
		this.create();
	}
	
	create()
	{		
		this.createHUD();
		this.resizeHUD(); 
    }
	
	createHUD()
	{
		//this.scene.load.image('life1', this.scene.CreatePath('/images/In-game/top_hud/life1.png'));
		//this.scene.load.image('life2', this.scene.CreatePath('/images/In-game/top_hud/life2.png'));
		//this.scene.load.image('life-frame', this.scene.CreatePath('/images/In-game/top_hud/life-frame.png'));		
		
		this.panel = new Image(this.game, this.ScreenUtility.GameWidth * 0.35, this.ScreenUtility.GameHeight * 0.0355, 'life-frame');
		this.panel.setOrigin(0, 0);
      	this.panel.setDisplayWidth(this.ScreenUtility.GameWidth * 0.25, true);
		
		for (let i=0;i<this.totalLife;i++)
		{
			this.game.anims.create({
				key: 'life_on',
				frames: [ { key: 'life1' }]
			})
			
			this.game.anims.create({
				key: 'life_off',
				frames: [ { key: 'life2' }]
			})			

			let lifeImage = new Sprite(this.game, this.ScreenUtility.GameWidth * 0.20, this.panel.y, 'life1').play('life_on');
			lifeImage.setDisplayHeight(this.panel.displayHeight * 0.535, true);
			
			this.lifeIcons.push(lifeImage);
		}		
	}
	
	resizeHUD()
	{
		for (let i=0;i<this.totalLife;i++) 
		{
			this.lifeIcons[i].setOrigin(0.5, 0.5);
		}
		
		let deltaDistance = this.lifeIcons[0].displayWidth * 1.05;
		
		for (let i=0;i<this.totalLife;i++) 
		{
			this.lifeIcons[i].setPosition((this.panel.x - this.panel.displayWidth/this.totalLife) + (deltaDistance * i), this.panel.y + this.panel.displayHeight * 0.5);
		}
		
		let middleIndex = (this.totalLife+1)/2-1;
		let prevX = this.lifeIcons[middleIndex].x;
		this.lifeIcons[middleIndex].x = this.panel.x + this.panel.displayWidth * 0.5;
		let deltaX = Math.abs(prevX - this.lifeIcons[middleIndex].x);
		
		for (let i=0;i<this.totalLife;i++) 
		{
			if (i==middleIndex) continue;
			this.lifeIcons[i].x += deltaX;
		}

	}

	updateLife(lifeRemaining)
	{
		let nOff = this.totalLife - lifeRemaining;
		
		for (let i=0;i<nOff;i++)
		{
			this.lifeIcons[this.totalLife-1-i].play('life_off');
		}
	}
}