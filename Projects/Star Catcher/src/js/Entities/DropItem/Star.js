var Star = function()
{
    DropItem.call(this,'Star_Wtrail'); 
    
    this.StarSpawnRate = 90;
    this.IsStarMode = true;
}

Star.prototype = Object.create(DropItem.prototype);
Star.prototype.constructor = Star;

Star.prototype.Show = function()
{
    DropItem.prototype.Show.call(this);

    var random = GlobalFunction.GetRandomBetween(0,100);
    if(random <= this.StarSpawnRate)
    {
        this.IsStarMode = true;
        this.frameName = 'Star_Wtrail';
    }
    else
    {
        this.IsStarMode = false;
        this.frameName = 'Life_Wtrail';
    }
}