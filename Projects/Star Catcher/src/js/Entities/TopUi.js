var TopUi = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0, -500, 'transparent');

    this.OnDoneShow = ()=>{};

    this.TopPanel = GlobalObject.Game.make.sprite(GlobalObject.Game.width*0.5,0,'atlas1','Top-UI');
    this.TopPanel.anchor.set(0.5,0);    

    this.Score = new Score();
    //this.Timer = new Timer();
    this.LivesManager = new LivesManager();  

    this.TopPanelFront = GlobalObject.Game.make.sprite(this.LivesManager.x-this.LivesManager.width,0,'atlas1','Score-UI-Behind-ornament');
    this.TopPanelFront.anchor.set(1,0);

    this.addChild(this.TopPanel);
    this.addChild(this.TopPanelFront);
    this.addChild(this.Score);
    //this.addChild(this.Timer);
    this.addChild(this.LivesManager);
}

TopUi.prototype = Object.create(Phaser.Sprite.prototype);
TopUi.prototype.constructor = TopUi;

TopUi.prototype.Scale = function()
{
    this.Score.Scale();
    //this.Timer.Scale();
    this.LivesManager.Scale();
    ScaleScreen.ScaleNormalObject(this.TopPanel,1083,158);
    ScaleScreen.ScaleNormalObject(this.TopPanelFront,661,125);
    this.TopPanelFront.x = this.LivesManager.x-this.LivesManager.width;

    //this.Show();
}

TopUi.prototype.Show = function()
{
    //this.Timer.Init();
    this.LivesManager.Init();
    this.Score.Init();

    var tween = GlobalObject.Game.add.tween(this).to( { y: 0 }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(this.OnDoneShow,this);
}

TopUi.prototype.Hide = function()
{
    //this.Timer.StopTicking();
    this.Score.ResetScoreMultiplier();

    var tween = GlobalObject.Game.add.tween(this).to( { y: -500 }, 500, Phaser.Easing.Quadratic.Out, true);
}

