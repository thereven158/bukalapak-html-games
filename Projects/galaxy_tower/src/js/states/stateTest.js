var StateTest = function(game)
{
    
}

StateTest.prototype = {
	create: function()
	{
		var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
		logo.anchor.setTo(0.5, 0.5);
	},
	
	update: function()
	{
		 
	}
}