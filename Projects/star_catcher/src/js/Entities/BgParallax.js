var BgParallax = function()
{
    Phaser.Group.call(this, GlobalObject.Game); 

    //this.BgParallax2 = GlobalObject.Game.make.sprite(0,0,"bgparalax1");
    //this.BgParallax1 = GlobalObject.Game.make.sprite(0,-GlobalObject.Game.height,"bgparalax2"); 
    // this.BgParallax1 = GlobalObject.Game.make.sprite(0,0,"");   
    // this.BgParallax1.width = 1080;
    // this.BgParallax1.height = 1920;

    this.ObjectParalax = [];

    var totalWidth = 32;
    var totalHeight = 60;

    var gridWidth = 32*ScaleScreen.InitScalePercentage;
    var gridHeight = 32*ScaleScreen.InitScalePercentage;

    var counterI = 0;
    this.TotalStarParalax = 0;

    var x = 0;
    var y = 0;

    var diff = 0;
    if(ScaleScreen.DefaultHeight < GlobalObject.Game.height)
    {
        gridHeight = GlobalObject.Game.height/totalHeight;
    }
    diff = 0;
    
    this.BottomY = 0;
    this.IndexStar = 0;
    for(var i=0; i<GlobalConst.BgGrid.length; i++)
    {
        x = counterI*gridWidth;
        var posX = x;
        var posY = y + diff;

        if(GlobalConst.BgGrid[i] == 1)
        {
            var littleStar = new ObjectParalax(posX,posY,"Bintang1");
            this.ObjectParalax[this.TotalStarParalax] = littleStar;
            
            this.addChild(littleStar);
            this.TotalStarParalax++;

            this.SetBottomY(littleStar.y);
        }
        else if(GlobalConst.BgGrid[i] == 2)
        {
            var littleStar= new ObjectParalax(posX,posY,"Bintang2");
            this.ObjectParalax[this.TotalStarParalax] = littleStar;
            
            this.addChild(littleStar);
            this.TotalStarParalax++;

            this.SetBottomY(littleStar.y);
        }

        if(counterI == totalWidth-1)
        {
            counterI = 0;
            y += gridHeight;
        }

        counterI++;
    }

    this.BottomY += 40*ScaleScreen.InitScalePercentage;

    this.IsBgParalax1Move = false;

    this.MoveSpeed = 1*ScaleScreen.ScalePrecentage;    
    
    this.ObjectParalaxBig1 = new ObjectParalax(0,GlobalObject.Game.height*0.25,'Bintang3');
    this.ObjectParalaxBig2 = new ObjectParalax(0,GlobalObject.Game.height*0.75,'Bintang4');

    this.addChild(this.ObjectParalaxBig1);
    this.addChild(this.ObjectParalaxBig2);
}

BgParallax.prototype = Object.create(Phaser.Group.prototype);
BgParallax.prototype.constructor = BgParallax;

BgParallax.prototype.update = function()
{
    // if(this.IsBgParalax1Move)
    // {
    //     this.BgParallax1.y += this.MoveSpeed*GlobalConst.SpeedMultiplier;
    //     this.BgParallax2.y = this.BgParallax1.y-this.BgParallax1.height;

    //     if(this.BgParallax1.y >= GlobalObject.Game.height)
    //     {
    //         this.IsBgParalax1Move = false;
    //     }
    // }
    // else
    // {
    //     this.BgParallax2.y += this.MoveSpeed*GlobalConst.SpeedMultiplier;
    //     this.BgParallax1.y = this.BgParallax2.y-this.BgParallax2.height;

    //     if(this.BgParallax2.y >= GlobalObject.Game.height)
    //     {
    //         this.IsBgParalax1Move = true;
    //     }
    // }

    for(this.IndexStar=0; this.IndexStar<this.TotalStarParalax; this.IndexStar++)
    {
        this.ObjectParalax[this.IndexStar].update(this.BottomY);
    }

    this.ObjectParalaxBig1.update();
    this.ObjectParalaxBig2.update();
}

BgParallax.prototype.Scale = function()
{
    for(var i=0; i<this.TotalStarParalax; i++)
    {
        this.ObjectParalax[i].Scale();     
    }
    
    this.ObjectParalaxBig1.Scale();
    this.ObjectParalaxBig2.Scale();
}

BgParallax.prototype.SetBottomY = function(posY)
{
    if(posY > this.BottomY)
    {
        this.BottomY = posY;
    }
}
