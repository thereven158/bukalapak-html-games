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
	
	proportionalScale(sprite, axis, container, scale, otherAxisLimitScale = -1, isRefAffected = false, isForceFitOnBlackBar = false)
	{	
		let originalSizeWidth = sprite.width;
		let originalSizeHeight = sprite.height;

		if (axis === "x")
		{
			sprite.width = container.width * scale * (isRefAffected?this.refGameRatio * (this.game.height/this.game.width):1);
			sprite.height *= (sprite.width / originalSizeWidth);
			
			if (otherAxisLimitScale > -1)
			{
				if (sprite.height/container.height > otherAxisLimitScale)
				{
					sprite.height = container.width * otherAxisLimitScale * (isRefAffected?this.refGameRatio * (this.game.height/this.game.width):1);
					sprite.width = originalSizeWidth;
					sprite.width *= (sprite.height / originalSizeHeight);
				}
			}
			
		}
		else if (axis === "y")
		{
			sprite.height = container.height * scale * (isRefAffected?this.refGameRatio * (this.game.height/this.game.width):1);
			sprite.width *= (sprite.height / originalSizeHeight);
			
			if (otherAxisLimitScale > -1)
			{
				if (sprite.width/container.width > otherAxisLimitScale)
				{
					sprite.width = container.height * otherAxisLimitScale * (isRefAffected?this.refGameRatio * (this.game.height/this.game.width):1);
					sprite.height = originalSizeWidth;
					sprite.height *= (sprite.width / originalSizeWidth);
				}
			}			
		}
		
		if (isForceFitOnBlackBar)
		{
			//console.log();
			
			if (sprite.height < container.height)
			{
				originalSizeHeight = sprite.height;
				sprite.height = container.height;
				sprite.width *= (sprite.height / originalSizeHeight);
			}
			
			if (sprite.width < container.width)
			{
				originalSizeWidth = sprite.width;
				sprite.width = container.width;
				sprite.height *= (sprite.width / originalSizeWidth);
			}
		}
	},
	
	proportionalScaleByBound(sprite, axis, scale, otherAxisLimitScale= -1, boundXStart=0, boundXEnd=0, boundYStart=0, boundYEnd=0)
	{
		let sizeX = Math.abs(boundXEnd-boundXStart);
		let sizeY = Math.abs(boundYEnd-boundYStart);
		
		let originalSizeWidth = sprite.width;
		let originalSizeHeight = sprite.height;
		
		if (axis == "x")
		{
			if (sizeX > 0)
			{
				sprite.width = sizeX * scale;
				
				sprite.height *= (sprite.width / originalSizeWidth);

				if (otherAxisLimitScale > -1 && sizeY > 0)
				{
					if (sprite.height > sizeY)
					{
						sprite.height = sizeY * otherAxisLimitScale;
						sprite.width = originalSizeWidth;
						sprite.width *= (sprite.height / originalSizeHeight);
					}
				}
			}			
		}
		else 
		{
			if (sizeY > 0)
			{
				sprite.height = sizeY * scale;
				sprite.width *= (sprite.height / originalSizeHeight);

				if (otherAxisLimitScale > -1 && sizeX > 0)
				{
					if (sprite.width > sizeX)
					{
						sprite.width = sizeX * otherAxisLimitScale;
						sprite.height = originalSizeHeight;
						sprite.height *= (sprite.width / originalSizeWidth);
					}
				}
			}			
		}		
	},
	
	correctSize(gameContext, originalSize, initScale = 0.75, ratioScreen = 1)
	{
		const result = Math.round(originalSize / (initScale * (this.refGameHeight / gameContext.height)));
		// console.log(originalSize, result);
		
		/* if (ratioScreen >= 2)
		{
			result *= initScale;
		} */
		
		return result;
	},
	
	changeBarValue(bar, curVal, curValMax, isTriggerEventIfZeroBar=false, zeroBarEvent=null, isTween=true)
	{
		let percent = curVal / curValMax;
		
		if (percent < 0)
		{
			percent = 0;
		}
		
		if (isTween)
		{
			const barTween = this.game.add.tween(bar.scale).to({x: bar.defaultScaleX * percent}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);		

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
	}
}