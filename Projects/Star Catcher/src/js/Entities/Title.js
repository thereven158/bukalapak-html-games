var Title = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, GlobalObject.Game.width*0.5, GlobalObject.Game.height*0.54, 'atlas1', 'character title');
    this.anchor.set(0.5,0.5);    

    this.OnPlay = ()=>{};
    this.OnTitleDoneHiding = ()=>{};
    this.OnScore = ()=>{};    
    
    this.InitY = this.y;
    this.InitWidth = this.width;
    this.InitHeight = this.height

    //texttitle
    this.TextTitle = GlobalObject.Game.make.sprite(0,-this.height*0.47,'texttitle');
    this.TextTitle.anchor.set(0.5,1);

    this.BtnPlay = GlobalObject.Game.make.sprite(0,this.height*0.55,'atlas1','Button-Main');
    this.BtnPlay.anchor.set(0.5,0.5);
    this.BtnPlay.inputEnabled = true;    

    this.BtnScore = GlobalObject.Game.make.sprite(0,this.BtnPlay.y+this.BtnPlay.height*1.1,'atlas1','Button-Poin');
    this.BtnScore.anchor.set(0.5,0.5);
    this.BtnScore.inputEnabled = true; 
	this.BtnScore.visible = false;

    this.addChild(this.TextTitle);
    this.addChild(this.BtnPlay);
    this.addChild(this.BtnScore);
}

Title.prototype = Object.create(Phaser.Sprite.prototype);
Title.prototype.constructor = Title;

Title.prototype.RegisterEvent = function()
{
    this.BtnPlay.events.onInputDown.add(this.OnPlayClick, this);
    this.BtnScore.events.onInputDown.add(this.OnScoreClick, this);
}

Title.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,873,876);
    this.InitWidth = this.width;
    this.InitHeight = this.height
}

Title.prototype.Show = function()
{
    var targetY = this.InitY;
    var targetWidth = this.InitWidth;
    var targetHeight = this.InitHeight;
    var tweenScale = GlobalObject.Game.add.tween(this).to( {width:targetWidth, height:targetHeight }, 1000, Phaser.Easing.Quadratic.Out, true);
    var tweenY = GlobalObject.Game.add.tween(this).to( {y:targetY}, 1000, Phaser.Easing.Back.Out, true);

    tweenY.onComplete.add(()=>
    {
        var tweenTextTitle = GlobalObject.Game.add.tween(this.TextTitle).to( {alpha:1}, 500, Phaser.Easing.Quadratic.Out, true);
        var tweenBtnPlay = GlobalObject.Game.add.tween(this.BtnPlay).to( {alpha:1}, 500, Phaser.Easing.Quadratic.Out, true);
        var tweenBtnScore = GlobalObject.Game.add.tween(this.BtnScore).to( {alpha:1}, 500, Phaser.Easing.Quadratic.Out, true);
        
        tweenBtnScore.onComplete.add(()=>
        {
            this.BtnPlay.inputEnabled = true;
            this.BtnScore.inputEnabled = true;
        },this)
    
    },this)
}

Title.prototype.ShowAfetrScoreHide = function()
{
    this.alpha = 0;
    
    var initWidth = this.width;
    var initHeight = this.height;

    this.width *= 2;
    this.height *= 2;
    var tween = GlobalObject.Game.add.tween(this).to( {alpha:1, width: initWidth, height:initHeight }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        this.BtnPlay.inputEnabled = true;
        this.BtnScore.inputEnabled = true;    
    },this);
}

Title.prototype.InstantHide = function()
{
	this.TextTitle.visible = false;
	this.BtnPlay.visible = false;
	this.BtnScore.visible = false;
	this.visible = false;
}

Title.prototype.Hide = function()
{
    this.BtnPlay.inputEnabled = false;
    this.BtnScore.inputEnabled = false;    

    var TargetXBtnPlay = this.BtnPlay.x - GlobalObject.Game.width*0.1;
    var TargetXBtnScore = this.BtnScore.x + GlobalObject.Game.width*0.1;
    var tweenTextTitle = GlobalObject.Game.add.tween(this.TextTitle).to( {alpha:0}, 500, Phaser.Easing.Quadratic.Out, true);
    var tweenBtnPlay = GlobalObject.Game.add.tween(this.BtnPlay).to( {alpha:0}, 500, Phaser.Easing.Quadratic.Out, true);
    var tweenBtnScore = GlobalObject.Game.add.tween(this.BtnScore).to( {alpha:0}, 500, Phaser.Easing.Quadratic.Out, true);

    tweenBtnScore.onComplete.add(()=>
    {
        var targetY = GlobalObject.Game.height + this.height;
        var targetWidth = this.InitWidth/2;
        var targetHeight = this.InitHeight/2;
        var tweenScale = GlobalObject.Game.add.tween(this).to( {width:targetWidth, height:targetHeight }, 1000, Phaser.Easing.Quadratic.Out, true);
        var tweenY = GlobalObject.Game.add.tween(this).to( {y:targetY}, 1000, Phaser.Easing.Back.In, true);

        tweenY.onComplete.add(this.OnTitleDoneHiding,this)
    },this)
}

Title.prototype.OnPlayClick = function()
{
    this.Hide();
    this.OnPlay();
    
    GlobalObject.SoundManager.PlaySfx(GlobalConst.SfxBtnTap);
}

Title.prototype.OnScoreClick = function()
{
    this.BtnPlay.inputEnabled = false;
    this.BtnScore.inputEnabled = false;

    var initWidth = this.width;
    var initHeight = this.height;

    var targetWidth = this.width*2;
    var targetHeight = this.height*2;

    var tween = GlobalObject.Game.add.tween(this).to( {alpha:0, width:targetWidth, height:targetHeight }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        this.width = initWidth;
        this.height = initHeight;
        this.OnScore();
    },this);

    GlobalObject.SoundManager.PlaySfx(GlobalConst.SfxBtnTap);
}