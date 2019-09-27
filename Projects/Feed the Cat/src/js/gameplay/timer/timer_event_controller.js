export default class TimerEventController
{  
	constructor(scene)
	{
		this.game = game;
		
		this.time = 0;
		this.timeLoop = 0;
		this.timeOutEvent = null;
		
		this.isPaused = true;
		this.isLoop = false;
		
		this.timeSubMultiplier = 1;
		
		this.view = null;
	}
	
	createView()
	{
		this.view = new TimerEventView(this.game);
	}
	
	activateTimer(time, ev, isLoop = false)
	{
		this.isPaused = false;
		
		this.time = time;
		this.timeOutEvent = ev;
		this.isLoop = isLoop;
		
		if (isLoop)
		{
			this.timeLoop = time;
		}
	}
	
	pause(isPaused=true)
	{
		this.isPaused = isPaused;
	}
	
	stop()
	{
		this.isPaused = false;
		this.time = 0;
		this.isLoop = false;
	}
	
	changeTime(time)
	{
		this.time = time;
	}
	
	changeTimeMultiplier(n=1)
	{
		this.timeSubMultiplier = n;
	}
	
	update(frame=15)
	{
		if (this.isPaused) return;
		
		if (this.time > 0)
		{
			this.time -= (frame * this.timeSubMultiplier);
			
			if (this.time <= 0)
			{
				this.time = 0;
				
				if (this.timeOutEvent != null)
				{					
					this.timeOutEvent();
				}
				
				if (this.isLoop)
				{
					this.time = this.timeLoop;
				}
			}
		}
		
		if (this.view)
		{
			this.view.updateTimer(this.time);
		}
	}
}