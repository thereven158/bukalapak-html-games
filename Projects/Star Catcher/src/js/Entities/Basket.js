var Basket = function()
{
    Phaser.Sprite.call(this, GlobalObject.Game, 0, 0, 'charidle');

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.OnOutScreen = ()=>{};

    var indexFrames = [];
    for(var i=0; i<23; i++)
    {
        indexFrames[i] = i;
    }
    this.animations.add('idle', indexFrames);
    this.animations.add('die', [0]);
    var animGetHit = this.animations.add('gethit', indexFrames);
    animGetHit.onComplete.add(()=>
    {
        this.loadTexture('charidle');
        this.animations.play('idle', 20, true);
    }, this);

    indexFrames = [];
    for(var i=0; i<15; i++)
    {
        indexFrames[i] = i;
    }
    var animGetStar = this.animations.add('getstar', indexFrames);
    animGetStar.onComplete.add(()=>
    {
        this.loadTexture('charidle');
        this.animations.play('idle', 20, true);
    }, this);

    this.animations.play('idle', 20, true);

    this.EasingType = Phaser.Easing.Back.Out;

    this.IsCanMove = false;
    this.IsMoving = false;
    this.IsShaking = false;
    this.IsDie = false;

    this.MoveTime = 500;
    this.ShakeTimer = 0;
    this.ShakeCounter = 0;
    this.InitMoveDieSpeed = 1;
    this.MoveDieSpeed = this.InitMoveDieSpeed*ScaleScreen.ScalePrecentage;
    this.Gravity = 0.5;

    this.y = GlobalObject.Game.height+this.height*0.7;
    this.OffsetX = -this.width*0.03;
    this.x = GlobalObject.Game.width*0.5+this.OffsetX;

    this.Places =
    {
        Left : 0,
        Middle : 1,
        Right : 2
    }
    this.Place = this.Places.Middle;

    this.TweenMove;

    GlobalObject.Basket = this;
}

Basket.prototype = Object.create(Phaser.Sprite.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.update = function()
{
    GlobalObject.ExplodeParticle.FollowBasket(this.x,this.y-this.height*0.4);

    if(this.IsShaking)
    {
        this.ShakeTimer += GlobalFunction.GetDeltaTime();
        if(this.ShakeTimer >= 0.05)
        {
            this.ShakeTimer = 0;
            this.ShakeCounter++;
            if(this.ShakeCounter % 2 == 0)
            {
                this.angle = 3;
            }
            else
            {
                this.angle = -3;
            }

            if(this.ShakeCounter == 6)
            {
                this.IsShaking = false;
                this.angle = 0;
            }
        }
    }

    if(this.IsDie)
    {
        this.angle += this.InitMoveDieSpeed;
        this.y += this.MoveDieSpeed;

        this.MoveDieSpeed += this.Gravity;

        if(this.y >= GlobalObject.Game.height+this.height)
        {
            this.IsDie = false;
            this.OnOutScreen();
        }
    }
}

Basket.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,338,489);
    this.OffsetX = -this.width*0.03;
}

Basket.prototype.Init = function()
{
    this.x = GlobalObject.Game.width*0.5+this.OffsetX;
}

Basket.prototype.Show = function()
{
    this.IsDie = false;

    this.angle = 0;
    this.x = GlobalObject.Game.width*0.5+this.OffsetX;

    this.loadTexture('charidle');
    this.animations.play('idle', 20, true);

    this.Place = this.Places.Middle;
    
    var tween = GlobalObject.Game.add.tween(this).to( { y: GlobalObject.Game.height-this.height*0.7 }, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        this.IsCanMove = true;
    },this);
}

Basket.prototype.Hide = function()
{
    var tween = GlobalObject.Game.add.tween(this).to( { y: GlobalObject.Game.height+this.height}, 500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(this.Init,this);

    this.DisableMove();    
}

Basket.prototype.Die = function()
{
    this.IsDie = true;

    this.MoveDieSpeed = this.InitMoveDieSpeed*ScaleScreen.ScalePrecentage;  
    
    this.loadTexture('chardie');
    this.animations.play('die');

    this.DisableMove();
    if(this.TweenMove != null)
    {
        this.TweenMove.stop();
    }
}

Basket.prototype.DisableMove = function()
{
    this.IsCanMove = false;
}

Basket.prototype.MoveLeft = function()
{
    if(this.IsCanMove)
    {
        var targetX = 0;
        switch(this.Place)
        {
            case this.Places.Middle:
            targetX = GlobalConst.PosLeftX+this.OffsetX;
            this.Place = this.Places.Left;

            break;
            case this.Places.Right:
            targetX = GlobalConst.PosMidX+this.OffsetX;
            this.Place = this.Places.Middle;

            break;
        }
    
        if(targetX != 0)
        {
            this.TweenMove = GlobalObject.Game.add.tween(this).to( { x: targetX }, this.MoveTime, this.EasingType, true);
        }
    }
}

Basket.prototype.MoveRight = function()
{
    if(this.IsCanMove)
    {
        var targetX = 0;
        switch(this.Place)
        {
            case this.Places.Middle:
            targetX = GlobalConst.PosRightX+this.OffsetX;
            this.Place = this.Places.Right;
            break;
            case this.Places.Left:
            targetX = GlobalConst.PosMidX+this.OffsetX;
            this.Place = this.Places.Middle;
            break;
        }


        if(targetX != 0)
        {
            this.TweenMove = GlobalObject.Game.add.tween(this).to( { x: targetX }, this.MoveTime, this.EasingType, true);
        }
    }
}

Basket.prototype.StartShake = function()
{
    this.IsShaking = true;

    this.ShakeCounter = 0;

    this.loadTexture('chargetstar');
    this.animations.play('getstar', 20, false);
}

Basket.prototype.StartMeteorEffect = function()
{
    this.loadTexture('chargethit');
    this.animations.play('gethit', 20, false);
}
