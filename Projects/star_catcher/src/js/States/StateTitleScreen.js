var StateTitleScreen = function()
{

}

StateTitleScreen.prototype =
{
    preload:function()
    {
        
    },

    create:function()
    {
        this.Bg = GlobalObject.Game.add.sprite(0,0,"bg");
        

        GlobalObject.Game.add.existing(this.Bg);
        this.ScaleAll();
    },

    ScaleAll:function()
    {
        ScaleScreen.ScaleFit(this.Bg); 
        
        //ScaleScreen.ScaleObject(this,1080,1920);
    }
}