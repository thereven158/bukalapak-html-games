var Rocket = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0, 0, 'rocket');
    this.anchor.x = 0.5;
    this.anchor.y = 1;

    this.IsHiding = true;

    this.RotateAngle = 0;

    this.MoveSpeed = 150*ScaleScreen.ScalePrecentage;
    this.ShowTimer = 0;
    this.MaxShowTimer = 5;
}

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,63,95);
    this.MoveSpeed = 150*ScaleScreen.ScalePrecentage;
}

Rocket.prototype.update = function()
{
    if(this.IsHiding)
    {
        this.ShowTimer += GlobalFunction.GetDeltaTime();
        if(this.ShowTimer >= this.MaxShowTimer)
        {
            this.IsHiding = false;
            this.ShowTimer = 0;
            this.Show();
        }
    }
    else
    {
        this.y -= this.MoveSpeed*GlobalFunction.GetDeltaTime();
        if(this.y <= -this.height)
        {
            this.IsHiding = true;
        }
    }
}

Rocket.prototype.Show = function()
{
    this.x = GlobalFunction.GetRandomBetween(this.width*0.5, GlobalObject.Game.width-this.width*0.5);
    this.y = GlobalObject.Game.height-this.height;
}