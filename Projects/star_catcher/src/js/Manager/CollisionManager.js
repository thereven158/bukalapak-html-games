var CollisionManager = function()
{
    this.OnDropItemEnterBasket = ()=>{};

    this.DropItem;
    this.Basket;

    this.IsCheckingBasket = true;
}

CollisionManager.prototype.constructor = CollisionManager;

CollisionManager.prototype.RestartChecking = function()
{
    this.IsCheckingBasket = true; 
}

CollisionManager.prototype.CheckCollision = function()
{
    if(this.IsCheckingBasket && this.DropItem.IsCanMove)
    {
        var borderTop = this.Basket.y-this.Basket.height*0.5;
        var borderBottom = this.Basket.y+this.Basket.height*0.2;

        var dropItemY = this.DropItem.y+this.DropItem.height;

        var isItemOnBottomBasket = dropItemY >= borderTop && dropItemY <= borderBottom;
        if(isItemOnBottomBasket)
        {
            var borderLeft = this.Basket.x-this.Basket.width*0.5;
            var borderRight = this.Basket.x+this.Basket.width*0.5;
            if(this.DropItem.x >= borderLeft && this.DropItem.x <= borderRight)
            {
                this.IsCheckingBasket = false;  
                this.OnDropItemEnterBasket();
            }
        }
    }
}