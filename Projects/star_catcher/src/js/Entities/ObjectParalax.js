var ObjectParalax = function(posX, posY, keyImage)
{
    Phaser.Sprite.call(this, GlobalObject.Game, posX, posY, 'atlas1', keyImage);

    this.InitWidth = this.width;
    this.InitHeight = this.height;

    this.MoveSpeed = 0;    
}

ObjectParalax.prototype = Object.create(Phaser.Sprite.prototype);
ObjectParalax.prototype.constructor = ObjectParalax;

ObjectParalax.prototype.Scale = function()
{
    ScaleScreen.ScaleNormalObject(this,this.InitWidth,this.InitHeight);

    this.MoveSpeed = 1*GlobalConst.SpeedMultiplier*ScaleScreen.ScalePrecentage;
}

ObjectParalax.prototype.update = function(bottomY)
{
    this.y += this.MoveSpeed*GlobalConst.SpeedMultiplier;
    if(this.y >= bottomY)
    {
        this.y = -this.height;
    }
}