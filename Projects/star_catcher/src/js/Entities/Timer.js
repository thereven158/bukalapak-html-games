var Timer = function()
{
    Phaser.Text.call(this,GlobalObject.Game,GlobalObject.Game.width*0.5,GlobalObject.Game.height *0.05,"05:00",
    {
        font: "80px Panton-Regular", fill: "#ffffff", align: "right"
    });
    this.anchor.set(0.5,0.5);

    this.OnTimesUp = ()=>{};

    this.InitWidth = this.width;
    this.InitHeight = this.height;

    this.InitSecond = 0;
    this.InitMinute = 5;

    this.Second = this.InitSecond;
    this.Minute = this.InitMinute;

    this.TimerEvent;
}

Timer.prototype = Object.create(Phaser.Text.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.DoTicking = function()
{
    this.Second--;
    if(this.Second < 0)
    {
        this.Second = 59;
        this.Minute--;   
    }
    else if(this.Second == 0)
    {
        if(this.Minute == 0)
        {
            this.OnTimesUp();
        }  
    }

    if(this.Second < 10)
    {
        this.text = "0"+this.Minute+":0"+this.Second;
    }
    else
    {
        this.text = "0"+this.Minute+":"+this.Second;
    }  
}

Timer.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,this.InitWidth,this.InitHeight);
}

Timer.prototype.Init = function()
{
    this.Second = this.InitSecond;
    this.Minute = this.InitMinute;

    this.text = "05:00";
}

Timer.prototype.StartTicking = function()
{   
    this.TimerEvent = GlobalObject.Game.time.events.loop(Phaser.Timer.SECOND*1, this.DoTicking, this);
}

Timer.prototype.StopTicking = function()
{
    GlobalObject.Game.time.events.remove(this.TimerEvent);
}