var Planet = function(isLeft)
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0, 0,'atlas1', 'Planet1');
    this.anchor.x = 0.5;

    this.OtherPlanet;

    this.isLeft = isLeft;
    if(this.isLeft)
    {
        this.InitY = -GlobalObject.Game.height*0.1;
    }
    else
    {
        this.InitY = -GlobalObject.Game.height*0.7;
    } 

    this.Show();

    this.MoveSpeed = 3*ScaleScreen.ScalePrecentage;
}

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function()
{
    this.y += this.MoveSpeed*GlobalConst.SpeedMultiplier;
    if(this.y >= GlobalObject.Game.height)
    {
        this.Show();

        if(Math.abs(this.y-this.OtherPlanet.y) < 200)
        {
            this.y -= 500;
        }
    }
}

Planet.prototype.Show = function()
{
    var index = GlobalFunction.GetRandomBetween(0,3);
    switch(index)
    {
        case 0:
        this.frameName = 'Planet1';
        ScaleScreen.ScaleObject(this,294,294);
        break;
        case 1:
        this.frameName = 'Planet2';
        ScaleScreen.ScaleObject(this,492,500);
        break;
        case 2:
        this.frameName = 'Planet3';
        ScaleScreen.ScaleObject(this,149,149);
        break;
        case 3:
        this.frameName = 'Planet4';
        ScaleScreen.ScaleObject(this,495,312);
        break;
    }    

    this.MoveSpeed = 3*ScaleScreen.ScalePrecentage;

    var minPosX = 0;
    var maxPosX = GlobalObject.Game.width*0.1;
    if(!this.isLeft)
    {
        minPosX = GlobalObject.Game.width*0.9;
        maxPosX = GlobalObject.Game.width;
    }

    this.x = GlobalFunction.GetRandomBetween(minPosX,maxPosX);       
    this.y = this.InitY;

    this.InitY = -GlobalObject.Game.height*0.7;
}