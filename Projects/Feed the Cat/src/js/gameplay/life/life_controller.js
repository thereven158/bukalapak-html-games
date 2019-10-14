import LifeView from './life_view';

export default class LifeController
{  
	constructor(game, maxLife=3)
	{
		this.game = game;
		
		this.maxLife = maxLife;
		this.reset();
		
		this.view = null;
	}
	
	createView()
	{
		this.view = new LifeView(this.game, this.maxLife);
	}
	
	reset()
	{
		this.curLife = this.maxLife;
		
		this.updateLifeView();
	}

	reduceLife(value)
	{
		this.curLife -= value;
		
		this.updateLifeView();
	}
	
	checkIfLifeZero()
	{
		return this.curLife == 0;
	}
	
	updateLifeView()
	{
		if (this.view) this.view.updateLife(this.curLife);
	}
}