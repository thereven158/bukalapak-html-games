var StateHighScore = function(game)
{
    
}

StateHighScore.prototype = {
    preload: function()
    {
        
    },
	
	init:function()
	{

	},
    
	create: function()
	{
		this.init();
		this.initAudios();
		
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
		
		this.createScoreHUD();		
	},
	
	scaleHUD: function()
	{	
		this.scaleMainHUD();	
		this.scaleHeaderHUD();	
		this.scaleFooterHUD();
		
		this.scaleScoreHUD();
	},
		
	createMainHUD: function()
	{
        this.bgImage = this.add.sprite(Game.width*0.5, Game.height*0.5, "gameplay_bg");
        this.bgImage.anchor.setTo(0.5, 0.5);
	},
	
	scaleMainHUD: function()
	{
		Global.screenUtility.proportionalScale(this.bgImage, "x", Game, 1, false, true);
		this.bgImage.position.setTo(Game.width * 0.5, Game.height * 0.5);		
	},	
	
	createHeaderHUD:function()
	{
		this.headerHUDGroup = this.add.group();
	},
	
	scaleHeaderHUD:function()
	{
	
	},	
	
	createScoreHUD:function()
	{
		this.scoreHUDGroup = this.add.group();
		
 		this.scorePanelImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"highscore_panel");
        this.scorePanelImg.anchor.setTo(0.5, 0.5);
		
 		this.exitButton = this.add.button(Game.width*0.5, Game.height*0.5,"highscore_okay_button");
        this.exitButton.anchor.setTo(0.5, 1);	
		this.exitButton.onInputUp.add(() => 
		{
			this.exitButton.inputEnabled = false;
			
			this.uiButtonTapSfx.play();
			this.exitButton.anchor.set(0.5,0.5);
			this.exitButton.position.set(this.exitButton.x, this.exitButton.y-this.exitButton.height*this.exitButton.anchor.y);
			
			let tween = this.add.tween(this.exitButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);	
			tween.onComplete.add(() => {
				this.state.start("Title");
			}, this);
			
		}, this);		
		
		this.highestScoreText = this.add.text(0, 0, Global.gameData.highScore, {font: "20px " + FONT_NAMES.PANTON_BOLD, fill: "#FFFF00", align:"center"});
        this.highestScoreText.anchor.set(0.5, 0);
		this.highestScoreText.fontWeight = 'bold';
				
		this.scoreHUDGroup.add(this.scorePanelImg);
		this.scoreHUDGroup.add(this.exitButton);
		this.scoreHUDGroup.add(this.highestScoreText);
		
		this.lastScoreTexts = [];
		var lastScoreTextsSize = 1;
		var lastScoreText;
		
		var tempLastScores = Global.gameData.lastScores;
		
		for (let i=0;i<lastScoreTextsSize;i++)
		{
			lastScoreText = this.add.text(0, 0, tempLastScores[i], {font: "20px " + FONT_NAMES.PANTON_BOLD, fill: "#eeeeee", align:"center"});
			lastScoreText.anchor.set(0.5, 0);
			lastScoreText.fontWeight = 'bold';
			
			this.lastScoreTexts.push(lastScoreText);
			this.scoreHUDGroup.add(lastScoreText);
		}		
	}, 	
	
	scaleScoreHUD:function()
	{
		Global.screenUtility.proportionalScale(this.scorePanelImg, "x", Game, 0.8);
		this.scorePanelImg.position.setTo(Game.width * 0.5, Game.height * 0.4);
	
		Global.screenUtility.proportionalScale(this.exitButton, "x", this.scorePanelImg, 0.5);
		this.exitButton.position.setTo(this.scorePanelImg.x, this.scorePanelImg.y + this.scorePanelImg.height * 0.5 + this.exitButton.height * 0.5 + Game.height * 0.03);
		
		this.highestScoreText.fontSize = Global.screenUtility.correctSize(Game, 120);
		this.highestScoreText.position.set(Math.round(this.scorePanelImg.x), Math.round(this.scorePanelImg.y - this.scorePanelImg.height * 0.125));
		
		var lastScoreText;
		var yBase = this.scorePanelImg.height * 0.8;
		var lastDeltaHeight = -1;
		
		for (let i=0;i<this.lastScoreTexts.length;i++)
		{
			lastScoreText = this.lastScoreTexts[i];
			
			if (lastDeltaHeight == -1)
			{
				lastDeltaHeight = 80;
			}
			else
			{
				lastDeltaHeight = this.lastScoreTexts[i-1].fontSize;
			}			
			lastScoreText.fontSize = Global.screenUtility.correctSize(Game, 80 - (lastDeltaHeight * i * 0.45));
			
			lastScoreText.position.set(Math.round(this.scorePanelImg.x), Math.round(yBase + lastScoreText.height * i * 1.25));
		}				
	},
	
	createFooterHUD:function()
	{
		this.footerHUDGroup = this.add.group();

	},
	
	scaleFooterHUD:function()
	{

	},	
			
	// AUDIOS
	
	initAudios:function()
	{
		this.uiButtonTapSfx = this.add.audio("ui_button_tap");
	},	
}