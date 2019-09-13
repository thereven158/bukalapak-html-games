var Highscore = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, GlobalObject.Game.width*0.5, GlobalObject.Game.height*0.45, 'scorepanel');
    this.anchor.set(0.5);

    this.OnHideExit = ()=>{};
    
    this.BtnExit = GlobalObject.Game.make.sprite(0,this.height*0.55,'atlas1','Keluar_Button');
    this.BtnExit.anchor.set(0.5);

    this.Scores = [];    
    this.MaxScore = 4;
    for(var i=0; i<this.MaxScore; i++)
    {
        this.Scores[i] = 0;
    }

    var data = localStorage.getItem("scores");
    if(data != null)
    {
        this.Scores = JSON.parse(data);
    }

    this.BestScoreText = GlobalObject.Game.make.text(0, -this.height*0.015, this.Scores[0], 
    { 
        font: "190px Panton-Bold", fill: "#ffff00", align: "center"
    });
    this.BestScoreText.anchor.set(0.5);
    this.BestScoreText.setShadow(0, 0, "rgba(255, 255, 255, 0.8)", 15);
    this.BestScoreText.stroke = "rgba(255, 255, 204, 0.08)";
    this.BestScoreText.strokeThickness  = 25;

    this.LastScoreText1 = GlobalObject.Game.make.text(0, this.height*0.22, this.Scores[1], 
    { 
        font: "150px Panton-Bold", fill: "#ffffff", align: "center"
    });
    this.LastScoreText1.anchor.set(0.5);
    this.LastScoreText1.setShadow(0, 0, "rgba(255, 255, 255, 0.8)", 15);
    this.LastScoreText1.stroke = "rgba(255, 255, 204, 0.08)";
    this.LastScoreText1.strokeThickness  = 25;

    this.LastScoreText2 = GlobalObject.Game.make.text(0, this.height*0.33, '', 
    { 
        font: "100px Panton-Bold", fill: "#ffffff", align: "center"
    });
    this.LastScoreText2.anchor.set(0.5);
    this.LastScoreText2.setShadow(0, 0, "rgba(255, 255, 255, 0.8)", 15);
    this.LastScoreText2.stroke = "rgba(255, 255, 204, 0.08)";
    this.LastScoreText2.strokeThickness  = 25;

    this.addChild(this.BtnExit);
    this.addChild(this.BestScoreText);
    this.addChild(this.LastScoreText1);
    this.addChild(this.LastScoreText2);

    this.alpha = 0;
}

Highscore.prototype = Object.create(Phaser.Sprite.prototype);
Highscore.prototype.constructor = Highscore;

Highscore.prototype.RegisterEvent = function()
{
    this.BtnExit.events.onInputDown.add(this.OnExitClick, this);
}

Highscore.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,849,1175);
}

Highscore.prototype.AddScore = function(score)
{
    GlobalConst.IsHighscore = score > this.Scores[0];

    for(var i=0; i<this.MaxScore; i++)
    {
        if(score > this.Scores[i])
        {
            var prevScore = this.Scores[i];
            this.Scores[i] = score;
            
            for(var j=i+1; j<this.MaxScore; j++)
            {
                if(j+1 < this.MaxScore)
                {
                    this.Scores[j] = prevScore;
                    prevScore = this.Scores[j+1];
                }                
            }
            break;
        }
    }

    this.Scores[1] = score;

    this.BestScoreText.text = this.Scores[0];
    this.LastScoreText1.text = score;
    this.LastScoreText2.text = '';

    localStorage.setItem("scores", JSON.stringify(this.Scores));
}

Highscore.prototype.Show = function()
{
    this.alpha = 0;
    
    var initWidth = this.width;
    var initHeight = this.height;

    this.width *= 2;
    this.height *= 2;
    var tween = GlobalObject.Game.add.tween(this).to( {alpha:1, width: initWidth, height:initHeight }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        this.BtnExit.inputEnabled = true;
    },this);   
}

Highscore.prototype.Hide = function()
{    
    this.BtnExit.inputEnabled = false;

    var initWidth = this.width;
    var initHeight = this.height;

    var targetWidth = this.width*2;
    var targetHeight = this.height*2;

    var tween = GlobalObject.Game.add.tween(this).to( {alpha:0, width: targetWidth, height:targetHeight }, 500, Phaser.Easing.Quadratic.Out, true); 
    tween.onComplete.add(()=>
    {
        this.width = initWidth;
        this.height = initHeight;
        this.OnHideExit();
    },this);   
}

Highscore.prototype.OnExitClick = function()
{
    this.Hide();
    GlobalObject.SoundManager.PlaySfx(GlobalConst.SfxBtnCancel);
}