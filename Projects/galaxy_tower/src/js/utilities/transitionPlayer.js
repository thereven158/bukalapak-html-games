var TransitionPlayer = function(game)
{
    this.init(game);
}

TransitionPlayer.prototype = 
{ 
	init:function(game)
	{
		this.game = game;
		
		this.isTransitionActive = false;
	},
	
	activateScreenTransition:function(game, state, finishEvent, isFadeOut=true)
	{
		var transition = game.add.sprite(game.width * 0.5, game.height * 0.5, "screen_transition");
		transition.anchor.set(0.5,0.5);
		transition.fixedToCamera = true;	

		var transitionTween;

		this.isTransitionActive = true;

		var targetWidth = 10*game.width;
		var targetHeight = transition.height * (targetWidth/transition.width)

		if (isFadeOut)
		{			
			transition.width = 0;
			transition.height = 0;		

			transitionTween = game.add.tween(transition).to({width: targetWidth, height: targetHeight}, 750, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
		}
		else
		{
			transition.width = targetWidth;
			transition.height = targetHeight;

			transitionTween = game.add.tween(transition).to({width: 0, height: 0}, 750, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
		}

		if (finishEvent != null)
		{
			transitionTween.onComplete.add(finishEvent, this);			
		}

		transitionTween.onComplete.add(()=>
		{
			this.isTransitionActive = false;
			transition.destroy();
		}, state);		
	}
}