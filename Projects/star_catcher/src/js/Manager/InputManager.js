var InputManager = function()
{
    this.OnLeft = ()=>{};
    this.OnRight = ()=>{};  
    
    this.MouseIsDown = false;
    this.IsDoneSwipe = false;

    this.MouseStartX;
}

InputManager.prototype.constructor = InputManager;

InputManager.prototype.RegistryKey = function()
{
    this.Left = GlobalObject.Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.Left.onDown.add(this.OnLeft , this);

    this.Right = GlobalObject.Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.Right.onDown.add(this.OnRight, this);

    GlobalObject.Game.input.onUp.add(this.MouseUp, this);
    GlobalObject.Game.input.onDown.add(this.MouseDown, this);
}

InputManager.prototype.CheckingMouseInput = function()
{
    if (this.MouseIsDown == true) {

        var distX = Math.abs(GlobalObject.Game.input.x - this.MouseStartX);
        if (distX > 50) {
            this.MouseIsDown = false;
            this.SwipeDone();            
        }
    }
}

InputManager.prototype.MouseUp = function()
{
    this.MouseIsDown = false;
}

InputManager.prototype.MouseDown = function()
{
    this.MouseIsDown = true;
    this.MouseStartX = GlobalObject.Game.input.x;
}

InputManager.prototype.SwipeDone = function()
{
    var endX = GlobalObject.Game.input.x;
    if (endX < this.MouseStartX) 
    {
        //swipe left
        this.OnLeft();
    } 
    else 
    {
        //swipe right
        this.OnRight();

    }
}