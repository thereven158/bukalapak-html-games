var StateTokenCheck = function(game)
{
    
}

StateTokenCheck.prototype = {
    preload: function()
    {
        var dummyText = this.add.text(0, 0, "", {font:"20px " +FONT_NAMES.PANTON_REGULAR, fill:"#FFFFFF"});
        dummyText.visible = false;  
		
        var dummyText1 = this.add.text(0, 0, "", {font:"20px " +FONT_NAMES.PANTON_BOLD, fill:"#FFFFFF"});
        dummyText1.visible = false;
    },
	
	init:function()
	{
		
	},
    
	create: function()
	{        
		this.init();
		
		this.createHUD();
		
        this.scale.onOrientationChange.removeAll();
        this.scale.onOrientationChange.add(this.onOrientationChangeEvent.bind(this, false), this);
        
        this.onOrientationChangeEvent(true);
	},
	
	createHUD: function()
	{		
		this.createMainHUD();
	},
	
	scaleHUD: function()
	{	
		this.scaleMainHUD();	
	},
		
	createMainHUD: function()
	{
        this.errorText = this.add.text(0, 0, ERROR_TOKEN_MESSAGE, {fontSize: 20, fill: "#ffffff", align:"center"});
        this.errorText.anchor.setTo(0.5, 0.5);
	},
	
	scaleMainHUD: function()
	{
		this.errorText.fontSize = Global.screenUtility.correctSize(Game, 50);
		this.errorText.position.set(Game.width * 0.5, Game.height * 0.5);
        this.errorText.wordWrapWidth = Game.width * 0.7;
		
		//console.log(Game.width, Game.height);
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
	
	//
	
	displayErrorMessage:function()
	{

	}
}