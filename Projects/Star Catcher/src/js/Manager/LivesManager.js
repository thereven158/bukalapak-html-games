var LivesManager = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0,0,'atlas1','Life-Frame');
    this.anchor.set(1,0);

    this.x = GlobalObject.Game.width;

    this.OnLivesZero = ()=>{};

    this.Lives = [];
    
    var prevX = -this.width*0.01*ScaleScreen.ScalePrecentage;

    this.MaxLive = 3;
    this.IndexLives = this.MaxLive-1;

    for(var i=0; i<this.MaxLive; i++)
    {
        this.Lives[i] = GlobalObject.Game.make.sprite(0,this.height*0.4,'atlas1','Life');
        this.Lives[i].anchor.set(0.5);

        var w = this.Lives[i].width;
        this.Lives[i].x = prevX-w*1.05;
        prevX = this.Lives[i].x;

        this.addChild(this.Lives[i]);
    }

    GlobalConst.LivesManager = this;    
}

LivesManager.prototype = Object.create(Phaser.Sprite.prototype);
LivesManager.prototype.constructor = LivesManager;

LivesManager.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,422,218);
}

LivesManager.prototype.Init = function()
{
    this.IndexLives = this.MaxLive-1;

    this.Lives[0].frameName = 'Life';
    this.Lives[1].frameName = 'Life';
    this.Lives[2].frameName = 'Life';
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