var GameData = function(game)
{
    this.init(game);
}

GameData.prototype = 
{ 
    init: function(game)
    {
		this.game = game;
		
		this.quizResponseAvaIndex = 0;
		this.score = 0;
		
		this.playerServerScore = 0;
		
		this.isPopupTitleDisplayed = false;
		
		this.highScore = 0;
		
		this.lastScores = [0,0];
	},
	
	addHighScore:function(newScore)
	{
		if (newScore > this.highScore)
		{
			this.highScore = newScore;
			return true;
		}
		
		return false;
	},
	
	addNewLastScore:function(newScore)
	{
		this.lastScores[1] = this.lastScores[0];
		this.lastScores[0] = newScore;
	}
}