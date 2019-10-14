var ScaleScreen = 
{
    DefaultWidth : 1080,
    DefaultHeight : 1920,

    HeightDifference : 0,

    ScalePrecentage : 1,
    InitScalePercentage : 1,

    SetScalePercentage : function()
    {
        this.ScalePrecentage = GlobalObject.Game.width/this.DefaultWidth;
        this.InitScalePercentage = this.ScalePrecentage;

        this.HeightDifference = Math.abs(GlobalObject.Game.height-this.DefaultHeight);

        if(window.innerHeight-window.innerWidth < 500 && window.innerWidth<window.innerHeight)
        {
            this.ScalePrecentage -= 0.2;
        }
    },

    ScaleObject : function(obj, initWidth, initHeight)
    {
        obj.width = initWidth*this.ScalePrecentage;
        obj.height = initHeight*this.ScalePrecentage;
    },

    ScaleNormalObject : function(obj, initWidth, initHeight)
    {
        obj.width = initWidth*this.InitScalePercentage;
        obj.height = initHeight*this.InitScalePercentage;
    },

    ScaleFit : function(obj)
    {
        obj.width = GlobalObject.Game.width;
        obj.height = GlobalObject.Game.height;        
    }
}