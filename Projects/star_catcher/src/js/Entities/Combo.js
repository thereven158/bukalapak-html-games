var Combo = function()
{
    Phaser.Text.call(this,GlobalObject.Game,GlobalObject.Game.width*0.5,GlobalObject.Game.height *0.25,"Combo!",
    {
        font: "100px Panton-Regular", fill: "#ffffff", align: "right"
    });
    this.anchor.set(0.5,0.5);

    this.InitWidth = this.width;
    this.InitHeight = this.height;

    this.TweenYoyo;

    this.alpha = 0;    
}

Combo.prototype = Object.create(Phaser.Text.prototype);
Combo.prototype.constructor = Combo;

Combo.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,this.InitWidth,this.InitHeight);
}

Combo.prototype.Show = function()
{
    this.alpha = 0;

    var targetWidth = this.width;
    var targetHeight = this.height;
    this.width *= 1.5;
    this.height *= 1.5;    
    var tweenShow = GlobalObject.Game.add.tween(this).to( {alpha:1,width:targetWidth, height:targetHeight }, 250, Phaser.Easing.Quadratic.Out, true);
    tweenShow.onComplete.add(()=>
    {
        this.Hide();
        // targetWidth = this.width*1.2;
        // targetHeight = this.height*1.2;
        // this.TweenYoyo = GlobalObject.Game.add.tween(this).to( {width:targetWidth, height:targetHeight}, 500, Phaser.Easing.Linear.None, true,0,-1,true);
    },this);    
}

Combo.prototype.Hide = function()
{ 
    var tween = GlobalObject.Game.add.tween(this).to( {alpha:0}, 250, Phaser.Easing.Quadratic.Out, true);
    // tween.onComplete.add(()=>
    // {
    //     if(this.TweenYoyo != null)
    //     {
    //         this.TweenYoyo.stop();
    //     }
        
    //     ScaleScreen.ScaleObject(this,this.InitWidth,this.InitHeight);
    // },this);
}