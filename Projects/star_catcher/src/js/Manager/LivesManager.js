var LivesManager = function(maxLives=3)
{
    //Phaser.Sprite.call(this, GlobalObject.Game, 0,0,'atlas1','Life-Frame');
	Phaser.Sprite.call(this, GlobalObject.Game, 0,0,'life_frame');
    this.anchor.set(1,0);

    this.x = GlobalObject.Game.width * 0.6;
	this.y = GlobalObject.Game.height * 0.039;
	
    this.OnLivesZero = ()=>{};

    this.Lives = [];
    
    var prevX = -this.width*0.01*ScaleScreen.ScalePrecentage;

    this.MaxLive = maxLives;
    this.IndexLives = this.MaxLive-1;

    for(var i=0; i<this.MaxLive; i++)
    {
        this.Lives[i] = GlobalObject.Game.make.sprite(0,this.height*0.4,'atlas1','Life');
        this.Lives[i].anchor.set(0.5);

		this.Lives[i].scale.set(0.65, 0.65);
        var w = this.Lives[i].width;
		
        this.Lives[i].x = prevX-w*1;
		this.Lives[i].y += this.height * 0.1;
		
        prevX = this.Lives[i].x;	

        this.addChild(this.Lives[i]);
    }

    GlobalConst.LivesManager = this;    
}

LivesManager.prototype = Object.create(Phaser.Sprite.prototype);
LivesManager.prototype.constructor = LivesManager;

LivesManager.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,250,114);
}

LivesManager.prototype.Init = function()
{
    this.IndexLives = this.MaxLive-1;

	for (let i=0;i<this.MaxLive;i++)
	{
		this.Lives[i].frameName = 'Life';		
	}

}

LivesManager.prototype.AddLives = function()
{
    if(this.IndexLives < this.MaxLive-1)
    {
        this.IndexLives++;
        this.Lives[this.IndexLives].frameName = 'Life';
    }
}

LivesManager.prototype.ReduceLives = function()
{
    if(this.IndexLives >= 0)
    {
        this.Lives[this.IndexLives].frameName = 'Life_kosong';
        this.IndexLives--;

        if(this.IndexLives < 0)
        {
            this.OnLivesZero();
        }
    }
}

LivesManager.prototype.GetIsFullLife = function()
{
    return this.IndexLives == this.MaxLive-1;
}