var ScoreGetStar = function()
{
    var fontSize = 80;
    Phaser.Text.call(this,GlobalObject.Game,-100,-100,"0 SCORE",
    {
        font: fontSize+"px Panton-Bold", fill: "#ffffff", align: "center"
    });
    this.anchor.set(0.5,0.5);

    this.HeartIcon = GlobalObject.Game.add.sprite(80,0,'atlas1', 'Life');
    this.HeartIcon.anchor.set(0.5,0.5);

    this.InitWidth = this.width;
    this.InitHeight = this.height;

    this.addChild(this.HeartIcon);
}

ScoreGetStar.prototype = Object.create(Phaser.Text.prototype);
ScoreGetStar.prototype.constructor = ScoreGetStar;

ScoreGetStar.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,this.InitWidth,this.InitHeight);
}

ScoreGetStar.prototype.Show = function(basket)
{
    this.y = basket.y - basket.height*0.5;

    var targetY = this.y - basket.height*0.3;

    var tween = GlobalObject.Game.add.tween(this).to( {alpha:1, y: targetY }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        tween = GlobalObject.Game.add.tween(this).to( {alpha:0}, 500, Phaser.Easing.Quadratic.Out, true);
    },this);
}

ScoreGetStar.prototype.ShowScore = function(basket, txt)
{
    this.text = "+"+txt;
    this.HeartIcon.alpha = 0;

    this.x = basket.x + basket.width*0.1;

    this.Show(basket);
}

ScoreGetStar.prototype.ShowPlusHeart = function(basket)
{
    this.text = "+";
    this.HeartIcon.alpha = 1;
    this.HeartIcon.frameName = 'Life';

    this.x = basket.x - basket.width*0.1;

    this.Show(basket);
}


ScoreGetStar.prototype.ShowMinusHeart = function(basket, txt)
{
    this.text = "-";
    this.HeartIcon.alpha = 1;
    this.HeartIcon.frameName = 'Life_kosong';

    this.x = basket.x - basket.width*0.1;

    this.Show(basket);
}