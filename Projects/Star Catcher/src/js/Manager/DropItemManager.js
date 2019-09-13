var DropItemManager = function()
{
    this.MinStarSpawnRate = GlobalConst.StarSpawnChance;

    this.CheckCounter = 0;
    this.MaxCheckCounter = 1;
    this.ChanceForDoubleShow = -1;

    this.Star = new Star();  
    this.Meteor = new Meteor();
}

DropItemManager.prototype.constructor = DropItemManager;

DropItemManager.prototype.Init = function()
{
    this.CheckCounter = 0;
    this.MaxCheckCounter = 1;
    this.ChanceForDoubleShow = -1;
    this.MinStarSpawnRate = GlobalConst.StarSpawnChance;
}

DropItemManager.prototype.ShowDropItem = function()
{
    var random = GlobalFunction.GetRandomBetween(0,100);
    if(random <= this.MinStarSpawnRate)
    {
        this.Star.Show();
    }    
    else
    {
        this.Meteor.Show();
    }

    this.MaxCheckCounter = 1;
}

DropItemManager.prototype.ShowStarAndMeteor = function()
{
    this.Star.Show();
    this.Meteor.Show();

    var index = GlobalFunction.GetRandomBetween(0,2);

    switch(index)
    {
        case 0:
            this.Star.x = GlobalConst.PosLeftX;
            break;
        case 1:
            this.Star.x = GlobalConst.PosMidX;
            break;
        case 2:
            this.Star.x = GlobalConst.PosRightX;
            break;
    }

    var index2 = GlobalFunction.GetRandomBetween(0,2);
    while(index2 == index )
    {
        index2 = GlobalFunction.GetRandomBetween(0,2);
    }

    switch(index2)
    {
        case 0:
            this.Meteor.x = GlobalConst.PosLeftX;
            break;
        case 1:
            this.Meteor.x = GlobalConst.PosMidX;
            break;
        case 2:
            this.Meteor.x = GlobalConst.PosRightX;
            break;
    }

    this.MaxCheckCounter = 2;
}

DropItemManager.prototype.CheckForNewSpawn = function()
{
    if(GlobalConst.LivesManager.IndexLives >= 0)
    {
        this.CheckCounter++;
        if(this.CheckCounter == this.MaxCheckCounter)
        {
            this.CheckCounter = 0;
    
            var random = GlobalFunction.GetRandomBetween(0,100);

            if(random <= this.ChanceForDoubleShow)
            {
                this.ShowStarAndMeteor();
            }
            else
            {
                this.ShowDropItem();
            }        
        }
    }
}

DropItemManager.prototype.IncreaseSpawn = function()
{
    this.ChanceForDoubleShow = GlobalConst.ChanceDoubleSpawn;
}

DropItemManager.prototype.DecreaseStarSpawn = function(score)
{
    if(score >= 18000)
    {
        this.MinStarSpawnRate = GlobalConst.StarSpawnChanceUpdate1;
    }
    else if(score >= 15000)
    {
        this.MinStarSpawnRate = GlobalConst.StarSpawnChanceUpdate2;
    }
}

