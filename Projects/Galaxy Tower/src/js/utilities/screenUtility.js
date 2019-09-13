var ScreenUtility = function(game, refGameWidth, refGameHeight, refGameRatio)
{
    this.init(game, refGameWidth, refGameHeight, refGameRatio);
}

ScreenUtility.prototype = 
{ 
    init: function(game, refGameWidth, refGameHeight, refGameRatio)
    {
		this.game = game;
		this.refGameWidth = refGameWidth;
		this.refGameHeight = refGameHeight;
		this.refGameRatio = refGameRatio;
	},
	
	proportionalScale(sprite, axis, container, scale, isRefAffected = true, isForceFitOnBlackBar = false)
	{	
		var originalSize;

		if (axis == "x")
		{
			originalSize = sprite.width;
			sprite.width = container.width * scale * (isRefAffected?this.refGameRatio * (this.game.height/this.game.width):1);
			sprite.height = sprite.height * (sprite.width / originalSize);
		}
		else if (axis == "y")
		{
			originalSize = sprite.height;
			sprite.height = container.height * scale * (isRefAffected?this.refGameRatio * (this.game.height/this.game.width):1);
			sprite.width = sprite.width * (sprite.height / originalSize);
		}
		
		if (isForceFitOnBlackBar)
		{
			if (sprite.height < container.height)
			{
				originalSize = sprite.height;
				sprite.height = container.height;
				sprite.width = sprite.width * (sprite.height / originalSize);
			}
			else if (sprite.width < container.width)
			{
				originalSize = sprite.width;
				sprite.width = container.width;
				sprite.height = sprite.height * (sprite.width / originalSize);
			}	
		}
	},

	correctSize:function(gameContext, originalSize, initScale = 0.75, ratioScreen = 1)
	{
		var result = Math.round(originalSize / (initScale * (this.refGameHeight / gameContext.height)));
		//console.log(originalSize, result);
		
		/*if (ratioScreen >= 2)
		{
			result *= initScale;
		}*/
		
		return result;
	},
	
	changeBarValue: function(bar, curVal, curValMax, isTriggerEventIfZeroBar=false, zeroBarEvent=null, isTween=true)
	{
		var percent = curVal / curValMax;
		
		if (percent < 0)
		{
			percent = 0;
		}
		
		if (isTween)
		{
			var barTween = this.game.add.tween(bar.scale).to({x: bar.defaultScaleX * percent}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);		

			if (isTriggerEventIfZeroBar)
			{
				if (zeroBarEvent!=null)
				{
					barTween.onComplete.add(zeroBarEvent, this);
				}
			}
		}
		else
		{
			bar.scale.x = bar.defaultScaleX * percent;
		}
	},	
}