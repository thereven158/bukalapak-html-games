var DropItem = function(keySprite)
{
    Phaser.Sprite.call(this, GlobalObject.Game, -1000, 0,'atlas1', keySprite);
    this.anchor.x = 0.5; 

    this.OnShow = ()=>{};
    this.OnHitBasket = ()=>{};
    this.OnOutScreen = ()=>{};

    this.IsCanMove = true;
    this.IsMoving = false;

    this.InitY = -this.height;
    this.BorderBottom = GlobalObject.Game.height+this.height;
    this.InitMinSpeed = 100*ScaleScreen.ScalePrecentage;
    this.InitMaxSpeed = 150*ScaleScreen.ScalePrecentage;
    this.MoveSpeed = this.InitMoveSpeed;
    this.MoveSpeecAcc = 1;
}

DropItem.prototype = Object.create(Phaser.Sprite.prototype);
DropItem.prototype.constructor = DropItem;

DropItem.prototype.update = function()
{
    if(this.IsMoving)
    {
        this.y += this.MoveSpeed*GlobalConst.SpeedMultiplier;
        this.MoveSpeed *= this.MoveSpeecAcc;

        if(this.y >= this.BorderBottom) 
        {
            this.Hide();
            this.OnOutScreen();
        }        

        var borderTop = GlobalObject.Basket.y-GlobalObject.Basket.height*0.5;
        var borderBottom = GlobalObject.Basket.y+GlobalObject.Basket.height*0.2;

        var dropItemY = this.y+this.height;

        var isItemOnBottomBasket = dropItemY >= borderTop && dropItemY <= borderBottom;
        if(isItemOnBottomBasket)
        {
            var borderLeft = GlobalObject.Basket.x-GlobalObject.Basket.width*0.5;
            var borderRight = GlobalObject.Basket.x+GlobalObject.Basket.width*0.5;
            if(this.x >= borderLeft && this.x <= borderRight)
            {
                this.Hide();
                this.OnHitBasket();
            }
        }
    }
}

DropItem.prototype.Scale = function()
{
    ScaleScreen.ScaleObject(this,150,399);

    this.InitY = -this.height;
    this.BorderBottom = GlobalObject.Game.height+this.height;
    this.InitMinSpeed = 15*ScaleScreen.ScalePrecentage;
    this.InitMaxSpeed = 20*ScaleScreen.ScalePrecentage;
}

DropItem.prototype.Show = function()
{
    if(this.IsCanMove)
    {
        this.IsMoving = true;
    
        this.y = this.InitY;
        this.alpha = 1;
    
        var index = GlobalFunction.GetRandomBetween(0,2);
        
        switch(index)
        {
            case 0:
            this.x = GlobalConst.PosLeftX;
                break;
            case 1:
            this.x = GlobalConst.PosMidX;
                break;
            case 2:
            this.x = GlobalConst.PosRightX;
                break;
        }
        
        this.MoveSpeed = GlobalFunction.GetRandomBetween(this.InitMinSpeed,this.InitMaxSpeed);
    
        this.OnShow();
    }
}

DropItem.prototype.Hide = function()
{
    this.IsMoving = false;
    this.alpha = 0;
}

DropItem.prototype.OnTimesUp = function()
{
    this.IsCanMove = false;
}

DropItem.prototype.Init = function()
{
    this.IsCanMove = true;

    this.alpha = 1;

    this.Show();
}