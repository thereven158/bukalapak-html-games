var GameOver = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, GlobalObject.Game.width*0.5, GlobalObject.Game.height*0.45, 'resultpanel');
    this.anchor.set(0.5);

    this.OnReplay = ()=>{};
    this.OnHideReplay = ()=>{};
    this.OnHideExit = ()=>{};
    this.OnDoneShow = ()=>{};
    this.OnScoreDoneRolling = ()=>{};

    this.IsReplay = false;

    this.InitWidth = this.width;
    this.InitHeight = this.height;

    this.ScoreText = GlobalObject.Game.make.text(0, this.height*0.2, "", 
    { 
        font: "160px Panton-Bold", fill: "#ffff00", align: "center"
    });
    this.ScoreText.anchor.set(0.5);
    this.ScoreText.setShadow(0, 0, "rgba(255, 255, 255, 0.8)", 15);
    this.ScoreText.stroke = "rgba(255, 255, 204, 0.08)";
    this.ScoreText.strokeThickness  = 25;

    this.BtnReplay = GlobalObject.Game.make.sprite(-this.width*0.25,this.height*0.55,'atlas1','Ulangi_Button');
    this.BtnReplay.anchor.set(0.5);   
    this.BtnReplay.alpha = 0; 

    this.BtnExit = GlobalObject.Game.make.sprite(this.width*0.25,this.height*0.55,'atlas1','Keluar_Button');
    this.BtnExit.anchor.set(0.5);
    this.BtnExit.alpha = 0; 
    
    this.addChild(this.ScoreText);
    this.addChild(this.BtnReplay);
    this.addChild(this.BtnExit);

    this.alpha = 0;
}

GameOver.prototype = Object.create(Phaser.Sprite.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,849,1175);
    this.InitWidth = this.width;
    this.InitHeight = this.height;

    //this.Show(20000);
}

GameOver.prototype.RegisterEvent = function()
{
    this.BtnReplay.events.onInputDown.add(this.OnReplayClick, this);
    this.BtnExit.events.onInputDown.add(this.OnExitClick, this);
}

GameOver.prototype.Show = function(score)
{
    this.alpha = 0;
    this.ScoreText.text = 0;
    
    var initWidth = this.InitWidth;
    var initHeight = this.InitHeight;

    if(GlobalConst.IsZero)
    {
        this.BtnReplay.alpha = 1;
        this.BtnExit.alpha = 1;
    }

    this.width = this.InitWidth*2;
    this.height = this.InitHeight*2;
    var tween = GlobalObject.Game.add.tween(this).to( {alpha:1, width: initWidth, height:initHeight }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        if(!GlobalConst.IsZero)
        {
            var scoreValue = 
            {
                value:0
            }
    
            var tweenScore = GlobalObject.Game.add.tween(scoreValue).to( {value:score}, 1000, "Linear", true);
            tweenScore.onUpdateCallback(()=>
            {
                this.ScoreText.text = Math.ceil(scoreValue.value);
            },this)
            
            tweenScore.onComplete.add(()=>
            {
                this.ScoreText.text = score;
    
                var tweenBtn1 = GlobalObject.Game.add.tween(this.BtnReplay).to( {alpha:1}, 500, Phaser.Easing.Quadratic.Out, true);
                var tweenBtn2 = GlobalObject.Game.add.tween(this.BtnExit).to( {alpha:1}, 500, Phaser.Easing.Quadratic.Out, true);
    
                tweenBtn2.onComplete.add(()=>
                {
                    this.BtnReplay.inputEnabled = true;
                    this.BtnExit.inputEnabled = true;
                },this);  
                
                this.OnScoreDoneRolling();
            },this);
        }
        else
        {
            this.BtnReplay.inputEnabled = true;
            this.BtnExit.inputEnabled = true;
        }

        this.OnDoneShow();
    },this);

        
}

GameOver.prototype.Hide = function()
{    
    this.BtnReplay.inputEnabled = false;
    this.BtnExit.inputEnabled = false;

    var targetWidth = this.width*2;
    var targetHeight = this.height*2;

    var tween = GlobalObject.Game.add.tween(this).to( {alpha:0, width: targetWidth, height:targetHeight }, 500, Phaser.Easing.Quadratic.Out, true); 
    tween.onComplete.add(()=>
    {
        if(this.IsReplay)
        {
            this.OnHideReplay();
        }
        else
        {
            this.OnHideExit();
        }
    },this);   
}

GameOver.prototype.OnReplayClick = function()
{
    this.IsReplay = true;
    this.Hide();

    GlobalObject.SoundManager.PlaySfx(GlobalConst.SfxBtnTap);
}

GameOver.prototype.OnExitClick = function()
{
    this.IsReplay = false;
    this.Hide();

    GlobalObject.SoundManager.PlaySfx(GlobalConst.SfxBtnCancel);

}