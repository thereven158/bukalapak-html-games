var ExplodeParticle = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0, 0, 'starparticle');
    this.alpha = 0;

    this.ExplodeAnim = this.animations.add("explode");
    this.ExplodeAnim.onComplete.add(()=>
    {
        this.alpha = 0;
    }, this);
    this.anchor.set(0.5,1);

    this.IsShow = false;

    GlobalObject.ExplodeParticle = this;
}

ExplodeParticle.prototype = Object.create(Phaser.Sprite.prototype);
ExplodeParticle.prototype.constructor = ExplodeParticle;

ExplodeParticle.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,429,190);
}

ExplodeParticle.prototype.Show = function()
{
    this.alpha = 1;
    this.animations.play("explode",50);
}

ExplodeParticle.prototype.FollowBasket = function(basketX, basketY)
{
    this.x = basketX,
    this.y = basketY;
}