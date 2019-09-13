var Score = function()
{
    Phaser.Sprite.call(this,GlobalObject.Game,0,0,'atlas1','Score-UI');

    var fontSize = 60
    this.TextScore = GlobalObject.Game.make.text(this.width*0.54, this.height*0.67, "0", 
    { 
        font: fontSize+"px Panton-Regular", fill: "#ffffff", align: "center"
    });
    this.TextScore.anchor.set(0.5);

    this.OnScore3000 = ()=>{};
    this.OnScoreHitReduceStarRate = ()=>{};
    this.OnCombo = ()=>{};
    this.OnComboLost = ()=>{};

    this.IsOnScore3000 = false;
    this.IsFirstReduceStarSpawnRate = false;
    this.IsSecondReduceStarSpawnRate = false;

    this.CurrentScore = 0;
    this.IncreaseScoreRate = 100;
    this.IncreaseScore = 0;
    this.ScoreMultiplier = 0;
    this.TotalCounterIncrease = 0;
    this.TotalCounterIncreaseMultiplier = 0;

    this.InitWidth = this.width;
    this.InitHeight = this.height;

    this.addChild(this.TextScore);
}

Score.prototype = Object.create(Phaser.Sprite.prototype);
Score.prototype.constructor = Score;

Score.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,this.InitWidth,this.InitHeight);

    this.x = 0;
    this.y = 0;
}

Score.prototype.Init = function()
{
    this.CurrentScore = 0;
    this.TextScore.text = "0";
    this.IsOnScore3000 = false;
    this.IsFirstReduceStarSpawnRate = false;
    this.IsSecondReduceStarSpawnRate = false;
}

Score.prototype.AddScore = function()
{
    this.IncreaseScore = this.IncreaseScoreRate + (this.IncreaseScoreRate*this.ScoreMultiplier);
    this.CurrentScore += this.IncreaseScore;    

    if(this.CurrentScore >= GlobalConst.LimitScoreDoubleSpawn && !this.IsOnScore3000)
    {
        this.IsOnScore3000  = true;
        this.OnScore3000();
    }
    else if(this.CurrentScore >= GlobalConst.LimitScoreForDecreaseStarChance1 && !this.IsFirstReduceStarSpawnRate)
    {
        this.IsFirstReduceStarSpawnRate = true;
        this.OnScoreHitReduceStarRate();
    }
    else if(this.CurrentScore >= GlobalConst.LimitScoreForDecreaseStarChance2 && !this.IsSecondReduceStarSpawnRate)
    {
        this.IsSecondReduceStarSpawnRate = true;
        this.OnScoreHitReduceStarRate();
    }

    this.TextScore.text = this.CurrentScore;

    this.TotalCounterIncrease++;
    if(this.TotalCounterIncrease == GlobalConst.LimitStarForSpeedMultiplier)
    {
        this.TotalCounterIncrease = 0;        
        GlobalConst.IncreaseSpeedMultiplier();
    }

    this.TotalCounterIncreaseMultiplier++
    if(this.TotalCounterIncreaseMultiplier == GlobalConst.LimitStarForIncreaseScoreMultiplier)
    {
        this.ScoreMultiplier += GlobalConst.ScoreMultiplier;
        //this.TotalCounterIncreaseMultiplier = 0;        
    }

    if(this.TotalCounterIncreaseMultiplier >= GlobalConst.LimitStarForIncreaseScoreMultiplier)
    {
        this.OnCombo();
    }
}

Score.prototype.ResetScoreMultiplier= function()
{
    this.ScoreMultiplier = 0;
    this.TotalCounterIncreaseMultiplier = 0;
    //this.OnComboLost();
}