var StateTitle = function(game)
{
    
}

StateTitle.prototype = {
    preloader: function()
    {
        game.load.image("tampilanBG",  AssetUrl + "graphics/Interface tampilan.png");     
    },
    
	init:function()
	{
		this.cobaRemaining = 1;
		
		//ga('send', 'event', 'Button', 'access', 'title', 100);
	},
	
	create: function()
    {
		this.init();		
		this.initAudios();
		
        this.chosenTypes = [];
        		
		Global.musicPlayer.playMusic("title_bgm");

        //
      
		this.createHUD();
		
        this.scale.onOrientationChange.removeAll();
        this.scale.onOrientationChange.add(this.onOrientationChangeEvent.bind(this, false), this);
        
        this.onOrientationChangeEvent(true);
    },
    
    update: function()
    {

    },
    
    startGame: function()
    {		
		this.ingameSwipeSfx.play();
		this.ufoImg.upDownTween.pause();
		
		var tween = this.add.tween(this.ufoImg).to({y:Game.height * -0.1}, 500, 
													  Phaser.Easing.Back.In, 
													  true, 0, 0, false);	
		
		var tween2 = this.add.tween(this.ufoImg.scale).to({x:0.1, y:0.1}, 500, 
													  Phaser.Easing.Back.In, 
													  true, 0, 0, false);			
		
		Global.musicPlayer.fadeOutMusic(500);
		
		tween.onComplete.add(() =>
		{			
			this.time.events.add(Phaser.Timer.SECOND * 0.5, () => 
			{
				this.state.start("Gameplay");
			}, this);			
		}, this);
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
                Game.scale.setGameSize(window.innerHeight * REF_GAME_RATIO, window.innerHeight); 
            }
            else
            {
                Game.scale.setGameSize(DEFAULT_SCREEN_SIZE, DEFAULT_SCREEN_SIZE / ratio);
            }       
        }       

        this.scaleHUD();         
        
        if (isInit)
        {
            //this.hideHUD(true);            
        }		
		
    },
	
	createHUD:function()
	{
        this.bgImage = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "gameplay_bg");
        this.bgImage.anchor.setTo(0.5, 0.5);
         
		this.createMainHUD();
		this.createFooterHUD();
		
	},
	
	scaleHUD:function()
	{
		this.scaleMainHUD();
		this.scaleFooterHUD();	
	},
	
	createMainHUD:function()
	{		
		this.planetLeftTopImg = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "planet_2_decor");
        this.planetLeftTopImg.anchor.setTo(0, 0);		
		
		//this.planetTopRightImg = this.add.sprite(Game.width, 0, "planet_1_decor");
        //this.planetTopRightImg.anchor.setTo(1, 0);		
		
		//this.planetLeftMiddleImg = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "planet_2_decor");
        //this.planetLeftMiddleImg.anchor.setTo(0.375, 0);
		
		this.greenLightDecorImg = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "green_light_decor");
        this.greenLightDecorImg.anchor.setTo(0.5, 1);		
		
		this.planetLeftBottomImg = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "left_hill_decor");
        this.planetLeftBottomImg.anchor.setTo(0, 1);		
		
		this.rightBuildingTowerDecorImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"tower_background_decor");
        this.rightBuildingTowerDecorImg.anchor.setTo(1, 1);
		
		this.rightMiddleDecorImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"sky_background_decor");
        this.rightMiddleDecorImg.anchor.setTo(1, 0);		
		
		this.ufoImg = this.add.sprite(Game.width*0.5, Game.height*0.5, "character_decor");
        this.ufoImg.anchor.setTo(0.5, 0.5);		
		
        this.startGameButton = this.add.button(0, 0, "start_button", null, this, 0, 0 ,1);
        this.startGameButton.anchor.setTo(0.5, 0.5);
		
        this.highscoreButton = this.add.button(0, 0, "score_button", null, this, 0, 0 ,1);
        this.highscoreButton.anchor.setTo(0.5, 0.5);

        this.startGameButton.onInputUp.add(() => 
		{
			this.startGameButton.inputEnabled = false;
			this.highscoreButton.inputEnabled = false;
			
			let tween = this.add.tween(this.startGameButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);		
			tween.onComplete.add(() => {
				this.startGame();
			}, this);
			
			tween = this.add.tween(this.highscoreButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);
			
		}, this);		
		
        this.highscoreButton.onInputUp.add(() => {
			this.startGameButton.inputEnabled = false;
			this.highscoreButton.inputEnabled = false;
			
			//GaAPI.trackAccessScore();
			this.uiButtonTapSfx.play();
			
			let tween = this.add.tween(this.startGameButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);		
			tween.onComplete.add(() => {
				this.state.start("HighScore");
			}, this);
			
			tween = this.add.tween(this.highscoreButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);			
		}, this);		
				
		
		this.titleLogoImg = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "title_logo");
        this.titleLogoImg.anchor.setTo(0.5, 0);		
						
		this.groundImg = this.add.sprite(Game.width * 0.5, Game.height * 0.5, "ground_decor");
        this.groundImg.anchor.setTo(0.5, 1);		
	},
	
	scaleMainHUD:function()
	{
		Global.screenUtility.proportionalScale(this.bgImage, "x", Game, 1, false, true);
        this.bgImage.position.setTo(Game.width * 0.5, Game.height * 0.5);
		
		Global.screenUtility.proportionalScale(this.greenLightDecorImg, "x", Game, 1, false, true);
        this.greenLightDecorImg.position.setTo(Game.width * 0.5, Game.height * 1);		
		
		Global.screenUtility.proportionalScale(this.startGameButton, "x", Game, 0.55);
        this.startGameButton.position.set(Game.width * 0.5, Game.height * 0.77);
				
		Global.screenUtility.proportionalScale(this.highscoreButton, "x", Game, 0.4);
        this.highscoreButton.position.set(Game.width * 0.5, Game.height * 0.87);			
		
		Global.screenUtility.proportionalScale(this.ufoImg, "x", Game, 0.7);
        this.ufoImg.position.set(Game.width * 0.5, Game.height * 0.65);
		
		var tween = this.add.tween(this.ufoImg).to({y:this.ufoImg.y - this.ufoImg.height * 0.1}, 1000, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, Infinity, false);
		tween.yoyo(true, 0);
		this.ufoImg.upDownTween = tween;		
				
		Global.screenUtility.proportionalScale(this.rightMiddleDecorImg, "x", Game, 0.65);
        this.rightMiddleDecorImg.position.set(Game.width, Game.height * 0.2);		
		
		Global.screenUtility.proportionalScale(this.planetLeftTopImg, "x", Game, 0.5);
        this.planetLeftTopImg.position.set(Game.width * -0.16, Game.height * -0.05);		
		
		//Global.screenUtility.proportionalScale(this.planetTopRightImg, "x", Game, 0.3);
        //this.planetTopRightImg.position.set(Game.width, Game.height * 0);
		
		//Global.screenUtility.proportionalScale(this.planetLeftMiddleImg, "x", Game, 0.265);
        //this.planetLeftMiddleImg.position.set(0, Game.height * 0.25);
		
		Global.screenUtility.proportionalScale(this.planetLeftBottomImg, "x", Game, 0.45);
        this.planetLeftBottomImg.position.set(0, Game.height);
		
		Global.screenUtility.proportionalScale(this.titleLogoImg, "x", Game, 0.85);
        this.titleLogoImg.position.set(Game.width * 0.5, Game.height * 0.075);		
		
		Global.screenUtility.proportionalScale(this.groundImg, "x", Game, 1, false);
        this.groundImg.position.set(Game.width * 0.5, Game.height);			
		
		Global.screenUtility.proportionalScale(this.rightBuildingTowerDecorImg, "x", Game, 0.65);
        this.rightBuildingTowerDecorImg.position.set(Game.width * 1.2, this.groundImg.y - this.groundImg.height * 0.42);					
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
		this.ingameSwipeSfx = this.add.audio("ingame_swipe_sfx");
		this.uiButtonTapSfx = this.add.audio("ui_button_tap");
	},		
}