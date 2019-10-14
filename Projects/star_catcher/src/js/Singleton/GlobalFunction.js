var GlobalFunction =
{
    IsHeroku : false,

    GetDeltaTime : function()
    {
        return GlobalObject.Game.time.elapsed;
    },

    GetRandomBetween : function(min, max)
    {
        return GlobalObject.Game.rnd.integerInRange(min, max);
    },    

    GetRandombetwenReal : function(min, max)
    {
        return GlobalObject.Game.rnd.realInRange(min, max);
    },

    SetupGA : function()
    {
        if(!this.IsHeroku)
        {
            GlobalConst.SetGaId();

            ga ('create', GlobalConst.GAId, 'auto');
        }
    },

    SetGAEvent : function(category)
    {
        if(!this.IsHeroku)
        {
            ga('send', 'event', category, category);
        }
    }
}