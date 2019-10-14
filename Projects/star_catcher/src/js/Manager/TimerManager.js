var TimerManager = function(timer=90000)
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0,0,'timer_ui');
    this.anchor.set(1,0);

    this.x = GlobalObject.Game.width;
    
    var prevX = -this.width*0.01*ScaleScreen.ScalePrecentage;

    GlobalConst.TimerManager = this;   
	
	this.defaultTimer = timer;
	
	this.isInit = false;
	
	this.view = new TimerEventView(GlobalObject.Game);
	this.view.hudGroup.visible = false;
	
	this.isPaused = false;
}

TimerManager.prototype = Object.create(Phaser.Sprite.prototype);
TimerManager.prototype.constructor = TimerManager;

TimerManager.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,422,218);
}

TimerManager.prototype.Pause = function()
{
	this.isPaused = true;
}

TimerManager.prototype.Init = function()
{
	this.curTimer = this.defaultTimer;	
	this.CreateHUD();
	this.UpdateTimerDisplay();
	
	this.isInit = true;
}

TimerManager.prototype.HideTimer = function(isHide)
{
	this.view.hudGroup.visible = !isHide;
}

TimerManager.prototype.UpdateTimer = function(timeElapsed)
{
	if (this.isPaused)
	{
		return;
	}
	
	if (this.curTimer > 0) 
	{
		this.curTimer -= 15;
	}
	else
	{
		return;
	}
		
	
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
	//this.timerText = GlobalObject.Game.add.text(0, 0, '00.00', {font : "Panton-Bold",fontSize: 50 , fill :"#ff9d00", align:"center"});
	
	//this.addChild(this.timerText);
	
	let timePanel = this;
	
	this.view.timer1stDigitText.position.setTo(timePanel.x - timePanel.width * 0.705, timePanel.y + timePanel.height * 0.44);
	this.view.timer2ndDigitText.position.setTo(timePanel.x - timePanel.width * 0.555, timePanel.y + timePanel.height * 0.44);
	this.view.timerPeriodText.position.setTo(timePanel.x - timePanel.width * 0.450, timePanel.y + timePanel.height * 0.44);
	this.view.timer3rdDigitText.position.setTo(timePanel.x - timePanel.width * 0.335, timePanel.y + timePanel.height * 0.44);
	this.view.timer4thDigitText.position.setTo(timePanel.x - timePanel.width * 0.185, timePanel.y + timePanel.height * 0.44);	
}

TimerManager.prototype.UpdateTimerDisplay = function()
{
	//this.timerText.text = this.AppendTimer();
	this.view.updateTimer(this.curTimer);
}