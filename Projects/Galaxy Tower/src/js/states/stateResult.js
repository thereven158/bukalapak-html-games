var StateResult = function(game)
{
    
}

StateResult.prototype = {
    preload: function()
    {
        
    },
	
	init:function()
	{
		this.resultStr = "Selamat!";
		this.chosenBgStr = "result_bg_win";
		this.descResultStr = "Kamu mendapatkan poin";
		
		//Global.gameData.score = 100
		
		if (Global.gameData.score == 0)
		{
			this.resultStr = "Yah..."
			this.chosenBgStr = "result_bg_lose";
			this.descResultStr = "Kamu tidak mendapatkan poin";			
		}
	},
    
	create: function()
	{        
		this.init();
		
		this.createHUD();
		
        this.scale.onOrientationChange.removeAll();
        this.scale.onOrientationChange.add(this.onOrientationChangeEvent.bind(this, false), this);
        
        this.onOrientationChangeEvent(true);
	},
	
	update: function()
	{
		 
	},
    
    onOrientationChangeEvent: function(isInit)
    {
       if (isInit)
        {
            if (IsIOS || IsPreloaded)
            {
                Game.scale.setGameSize(Game.width, Game.height);   
            }
            else
            {
                var isLandScape = Game.width >= Game.height;
                var ratio;

                if(isLandScape)
                {
                    ratio = window.outerWidth/window.outerHeight;
                }
                else
                {
                    ratio = window.outerHeight/window.outerWidth;
                }                

                //game.scale.setGameSize(DEFAULT_SCREEN_SIZE, DEFAULT_SCREEN_SIZE / ratio);       

                gameRatio = Game.height / Game.width;
                
                IsPreloaded = true;
            }
        }
        else
        {	
            var isLandScape = window.innerWidth >= window.innerHeight;
            var ratio;
            
            //if (PrevWinWidth == (IsIOS?window.innerWidth:window.outerWidth))          
            //{
                //return;
            //}
            
            if(isLandScape)
            {
                ratio = IsIOS?window.innerHeight/window.innerWidth:window.outerHeight/window.outerWidth;                 
            }
            else
            {
                ratio = IsIOS?window.innerWidth/window.innerHeight:window.outerWidth/window.outerHeight; 
            }
            
            PrevWinWidth  = IsIOS?window.innerWidth:window.outerWidth; 
            
            if (isLandScape)
            {	
                game.scale.setGameSize(window.innerHeight * REF_GAME_RATIO, window.innerHeight); 
            }
            else
            {
                game.scale.setGameSize(DEFAULT_SCREEN_SIZE, DEFAULT_SCREEN_SIZE / ratio);
            }       
        }       

        this.scaleHUD();         
        
        //if (isInit)
        //{
        //    this.hideHUD(true);            
        //}      
	},
	
	// HUD
	
	createHUD: function()
	{		
		this.createMainHUD();
		this.createHeaderHUD();
		this.createFooterHUD();
	},
	
	scaleHUD: function()
	{	
		this.scaleMainHUD();	
		this.scaleHeaderHUD();	
		this.scaleFooterHUD();
	},
		
	createMainHUD: function()
	{
        this.bgImage = this.add.sprite(Game.width*0.5, Game.height*0.5, this.chosenBgStr);
        this.bgImage.anchor.setTo(0.5, 0.5);
	},
	
	scaleMainHUD: function()
	{
		Global.screenUtility.proportionalScale(this.bgImage, "x", Game, 1, false);
		this.bgImage.position.setTo(Game.width * 0.5, Game.height * 0.5);
	},	
	
	createHeaderHUD:function()
	{
		this.headerHUDGroup = this.add.group();
	},
	
	scaleHeaderHUD:function()
	{
		
	},	
	
	createFooterHUD:function()
	{
		this.footerHUDGroup = this.add.group();

	},
	
	scaleFooterHUD:function()
	{

	},	
			

}