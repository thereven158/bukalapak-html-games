import ScoreView from './score_view';

export default class ScoreController
{  
	constructor(game)
	{
		this.game = game;
		
		this.reset();
		
		this.view = null;
	}
	
	createView()
	{
		this.view = new ScoreView(this.game);
	}
	
	reset()
	{
		this.score = 0;
		
		this.updateScoreView();
	}

	addScore(value)
	{
		this.score += value;
		
		this.updateScoreView();
	}
	
	updateScoreView()
	{
		if (this.view) this.view.updateScore(this.score);
	}
}