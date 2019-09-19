var TimerManager = function(timer=90000)
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0,0,'timer_ui');
    this.anchor.set(1,0);

    this.x = GlobalObject.Game.width;
    
    var prevX = -this.width*0.01*ScaleScreen.ScalePrecentage;

    GlobalConst.TimerManager = this;   
	
	this.defaultTimer = timer;
	
	this.isInit = false;
}

TimerManager.prototype = Object.create(Phaser.Sprite.prototype);
TimerManager.prototype.constructor = TimerManager;

TimerManager.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,422,218);
}

TimerManager.prototype.Init = function()
{
	this.curTimer = this.defaultTimer;	
	this.CreateHUD();
	this.UpdateTimerDisplay();
	
	this.isInit = true;
}

TimerManager.prototype.UpdateTimer = function(timeElapsed)
{
	if (this.curTimer > 0) this.curTimer -= timeElapsed;
	
	if (this.curTimer <= 0)
	{
		this.curTimer == 0;
	}
	
	this.UpdateTimerDisplay();
	
	if (this.curTimer <= 0)
	{
		this.OnTimeRunOut();
	}
}

TimerManager.prototype.OnTimeRunOut = function()
{
	
}

TimerManager.prototype.CreateHUD = function()
{
	this.timerText = GlobalObject.Game.add.text(0, 0, '00.00', {font : "Panton-Bold",fontSize: 50 , fill :"#ff9d00", align:"center"});
	
	//this.addChild(this.timerText);
}

TimerManager.prototype.AppendTimer = function()
{
	let timerText = this.curTimer.toString();
	
	if (timerText > 4)
	{
		timerText = timerText.substr(0, 4);
	}
	
	if (timerText.length == 1)
	{
		timerText = `00.0 ${timerText}`;
	}
	else if (timerText.length == 2)
	{
		timerText = `00. ${timerText}`;
	}
	else if (timerText.length == 3)
	{
		timerText = `0${timerText.substr(0,1)}. ${timerText.substr(1,2)}`;
	}
	else if (timerText.length == 4)
	{
		timerText = `${timerText.substr(0,2)}. ${timerText.substr(2,2)}`;
	}	
	
	return timerText;
}

TimerManager.prototype.UpdateTimerDisplay = function()
{
	this.timerText.text = this.AppendTimer();
}