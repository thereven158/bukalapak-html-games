var THEME_TOTAL = 5;
var LEVEL_TOTAL = 5;

var StatePreloader = function(game)
{
    this.gameContent = null;
}

StatePreloader.prototype = {
    preload: function()
    {
        var dummyText = this.add.text(0, 0, "", {font:"20px " +FONT_NAMES.PANTON_REGULAR, fill:"#FFFFFF"});
        dummyText.visible = false;  
		
        var dummyText1 = this.add.text(0, 0, "", {font:"20px " +FONT_NAMES.PANTON_BOLD, fill:"#FFFFFF"});
        dummyText1.visible = false;

    	this.load.image('title_background', AssetUrl + 'graphics/preloader/Background.png');		
		this.load.image("title_logo_preloader",  AssetUrl + "graphics/preloader/Character.png");
		
		this.load.image("progress_loading_bar", AssetUrl + "graphics/preloader/Loading-Bar-Full.png");
		this.load.image("progress_loading_bar_container", AssetUrl + "graphics/preloader/Loading-Bar-Empty.png");
		
		this.load.audio("title_bgm",  AssetUrl + "audios/bgm/bgm_title.mp3");
    },

    create: function()
    {        
        this.isCompleted = false;

        this.loadResources();		
        this.createHUD();
		
		Global.musicPlayer.playMusic("title_bgm");
		
		/*QuizGameAPI.getPlayerScore((response) => {
			if (response == null)
			{
				Global.gameData.playerServerScore = 0;
			}
			else 
			{
				Global.gameData.playerServerScore = response["score"];
			}			
		});
		*/
		
        this.scale.onOrientationChange.removeAll();
        this.scale.onOrientationChange.add(this.onOrientationChangeEvent.bind(this, false), this);
		
        this.onOrientationChangeEvent(true);

        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.completeProgress, this);        
        this.load.onLoadComplete.add(this.completeLoad, this); 

		this.input.onTap.add(this.onTap, this);
		
        this.load.start();
    },

    update: function()
    {
        if (this.timer > 0)
        {
            this.timer -= this.time.elapsed;

            if(this.timer <= 0)
            {
                this.timer = -1;
           
                this.goToState();
            } 
        }
    },    
    
    createHUD:function()
    {
		this.background = this.add.image(Game.width * 0.5, Game.height * 0.5, "title_background");
		this.background.anchor.set(0.5,0.5);
		this.background.alpha = 0;
		
		var backgroundTween = this.add.tween(this.background).to({alpha: 1}, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
		//backgroundTween.onComplete.add(this.destroyMonster, this);
		
		this.titleLogo = this.add.image(Game.width * 0.5, Game.height * 0.15, "title_logo_preloader");
		this.titleLogo.anchor.set(0.5,0.5);
		
        this.instructionText = this.add.text(0,0, "Tap untuk bermain", {});
		this.instructionText.wordWrap = false;
		this.instructionText.fill = "#eeeeee";
        this.instructionText.anchor.set(0.5, 0);
		this.instructionText.visible = false;
        
		this.loadingBarContainer = this.add.image(Game.width * 0.5, Game.height * 0.85, "progress_loading_bar_container");
		this.loadingBarContainer.anchor.set(0,0.5);
		
		this.loadingBar = this.add.image(Game.width * 0.5, Game.height * 0.85, "progress_loading_bar");
		this.loadingBar.anchor.set(0,0.5);
		
        this.loadingPercentText = this.add.text(0,0, "Loading...", {align:"center", fill:"#eeee22"});
        this.loadingPercentText.anchor.set(0.5, 1);
		
        this.hideHUD(false);
    },

    hideHUD:function(isVisible)
    {
        var alpha = 0;
        
        if (isVisible)
        {
            alpha = 1;
        }
        
		this.loadingBarContainer.alpha = alpha;
		this.loadingBar.alpha = alpha;
    },
    
    scaleHUD:function()
    {
		this.instructionText.position.set(Game.width * 0.5, Game.height * 0.9);
		
		var originalSize = 0;
		
		Global.screenUtility.proportionalScale(this.background, "x", Game, 1, -1, true);
        this.background.position.setTo(Game.width * 0.5, Game.height * 0.5);
		
        this.instructionText.fontSize = Global.screenUtility.correctSize(Game, 20);
		
		Global.screenUtility.proportionalScale(this.titleLogo, "x", Game, 0.65);
		this.titleLogo.position.set(Game.width * 0.5, Game.height * 0.5);		
		
		Global.screenUtility.proportionalScale(this.loadingBarContainer, "x", Game, 0.8);
		this.loadingBarContainer.position.set(Game.width * 0.5 - this.loadingBarContainer.width * 0.5, this.titleLogo.y+this.titleLogo.height*0.5+this.loadingBarContainer.height*0.25);
		
		Global.screenUtility.proportionalScale(this.loadingBar, "x", Game, 0.79);
		this.loadingBar.position.set(Game.width * 0.5 - this.loadingBar.width * 0.5, this.titleLogo.y+this.titleLogo.height*0.5+this.loadingBar.height*0.25);		
		this.loadingBar.defaultScaleX = this.loadingBar.scale.x;
		
		this.loadingPercentText.fontSize = Global.screenUtility.correctSize(Game, 30);
        this.loadingPercentText.position.set(this.loadingBarContainer.x + this.loadingBarContainer.width * 0.5, 
											 this.loadingBarContainer.y + this.loadingBarContainer.height * 1.1);	
				
		//this.loadingBar.scale.x = 0.5;

        if (Game.width >= Game.height)
        {
            //this.loadingTitle.scale.set(0.25);
        }
        else
        {
            //this.loadingTitle.scale.set(0.35);  
        } 
		
        this.maskPreloader = Game.add.graphics(this.loadingBar.x, this.loadingBar.y-this.loadingBar.height*0.5);
        this.maskPreloader.beginFill(0xb9dcf3);
        this.maskPreloader.drawRect(0, 0, 0, this.loadingBar.height, 0);

        this.loadingBar.mask = this.maskPreloader;
		
    },    

    onOrientationChange: function(isInit)
    {
        setTimeout(this.onOrientationChangeEvent.bind(this, isInit), 200);
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
            this.hideHUD(true);            
        }		
		
    },

    completeProgress: function(progress, cacheKey, success, totalLoaded, totalFiles) 
	{
		if (this.loadingBar.defaultScaleX != undefined)
		{
			//this.loadingBar.scale.x = this.loadingBar.defaultScaleX * (progress / 100);
			
			if(this.maskPreloader != null)
			{
				//console.log(this.LoadBarFill.position);

				//this.MaskPreloader.clear();

				this.maskPreloader.drawRoundedRect(0, 0, this.loadingBar.width*progress/100, this.loadingBar.height, 0);    
			}
			
			//this.loadingPercentText.text = (progress) + "%";
		}
		
		
        //this.progressText.setText("Sedang memuat...\n"+progress.toString()+"%");
       //this.loadingBar.scale.x = 0.45 * (progress / 100);
       //console.log(progress);
    },

    loadStart: function() {
        //this.progressText.setText("Sedang memuat...\n0%");
    },

    completeLoad: function(){
    	//this.timerOn();
		//this.instructionText.visible = true;
		
		if(this.maskPreloader != null)
		{
			//console.log(this.LoadBarFill.position);

			//this.MaskPreloader.clear();

			this.maskPreloader.drawRoundedRect(0, 0, this.loadingBar.width, this.loadingBar.height, 0);    
		}


		//GaAPI.trackFinishLoadingEv();
		
		this.loadingBar.visible = false;
		this.loadingBarContainer.visible = false;
		this.loadingPercentText.visible = false;
				
		//console.log(game.cache.getJSON("quiz_data"),game.cache.getJSON("monster_data"));
		
        this.isCompleted = true;
		
		this.goToState();
    },

    timerOn:function(){
        this.timer = 1000;
    },    

	onTap:function()
	{
		if (this.instructionText.visible)
		{
			Global.transitionPlayer.activateScreenTransition(Game, this, () => {
				this.goToState();
			});			
		}
	},	
	
    goToState: function()
    {
        if (this.state.current != "Preloader")
        {
            return;
        }
        
        //activateFullScreen(game); 
        this.state.start(State_After_Preloader);        
    },
    
    loadResources: function()
    {
        this.loadGraphics();
        this.loadAudios();
		this.loadJsons();
    },
    
    loadGraphics: function()
    {		
		this.load.image('dummy_image',  AssetUrl + 'graphics/dummy.png');
		
		//
		
		this.loadTitleGraphics();
		this.loadMainGraphics();
		this.loadBuildingGraphics();
		this.loadResultGraphics();
		this.loadHighscoreGraphics();
		this.loadGameOverGraphics();
		this.loadVouchers();
		
		// TRANSITION
		//this.load.image("screen_transition","graphics/transition.png");		
			
		// end TRANSITION
    },
	
	loadTitleGraphics:function()
	{
		this.load.image("start_button", AssetUrl + "graphics/title/Button_Main.png");		
		this.load.image("score_button", AssetUrl + "graphics/title/Button_Skor.png");
		
		this.load.image("planet_1_decor", AssetUrl + "graphics/title/Planet1.png");
		this.load.image("planet_2_decor", AssetUrl + "graphics/title/Planet2.png");
		
		this.load.image("character_decor", AssetUrl + "graphics/title/Character2.png");
		
		this.load.image("green_light_decor", AssetUrl + "graphics/title/GreenLight.png");
		
		this.load.image("sky_background_decor", AssetUrl + "graphics/title/Sky-Background.png");
		this.load.image("tower_background_decor", AssetUrl + "graphics/title/Tower-Background.png");
		
		this.load.image("title_logo", AssetUrl + "graphics/title/Title.png");
	},
	
	loadMainGraphics:function()
	{
		this.load.image("gameplay_bg", AssetUrl + "graphics/gameplay/Layer3.png");
		
		this.load.image("left_hill_decor", AssetUrl + "graphics/gameplay/Layer2.png");
		this.load.image("ground_decor", AssetUrl + "graphics/gameplay/Layer1.png");
		
		//this.load.spritesheet("ufo_gameplay","graphics/gameplay/skeleton-Idle.png", 3465/4, 3381/5);
		this.load.spritesheet("ufo_gameplay",  AssetUrl + "graphics/gameplay/skeleton-1frame.png", 1970/4, 4159/15);
		this.load.spritesheet("ufo_light",  AssetUrl + "graphics/gameplay/Red_light.png");
		this.load.spritesheet("ufo_light_2",  AssetUrl + "graphics/gameplay/Red_light2.png");
		
		this.load.image("score_ui",  AssetUrl + "graphics/gameplay/top_ui/Score-UI.png");
		this.load.image("score_ui_behind_ornament",  AssetUrl + "graphics/gameplay/top_ui/Score-UI-Behind-ornament.png");
		this.load.image("top_ui",  AssetUrl + "graphics/gameplay/top_ui/Top-UI.png");
		
		this.load.image("background_ground",  AssetUrl + "graphics/gameplay/BackgroundLong.png");
		
		this.load.image("timer_panel", AssetUrl + "graphics/gameplay/top_ui/Timer-UI.png");
	},
	
	loadBuildingGraphics:function()
	{
		this.load.image("game_block", AssetUrl + "graphics/gameplay/Building/Tower2.png");
		
		this.load.image("init_block", AssetUrl + "graphics/gameplay/Building/Tower1.png");
				
		this.load.image("tower_2_enviro", AssetUrl + "graphics/gameplay/Building/Tower2_Enviro.png");
		
		this.load.image("tower_3", AssetUrl + "graphics/gameplay/Building/Tower3.png");
		this.load.image("tower_3_enviro", AssetUrl + "graphics/gameplay/Building/Tower3_Enviro.png");		
		this.load.image("tower_3_sideleft", AssetUrl + "graphics/gameplay/Building/Tower3_Sideleft.png");
		this.load.image("tower_3_sideright", AssetUrl + "graphics/gameplay/Building/Tower3_Sideright.png");
		
		this.load.image("tower_4", AssetUrl + "graphics/gameplay/Building/Tower4.png");
		this.load.image("tower_4_enviro", AssetUrl + "graphics/gameplay/Building/Tower4_Enviro.png");	
		
		this.load.image("tower_5", AssetUrl + "graphics/gameplay/Building/Tower5.png");
		this.load.image("tower_5_enviro", AssetUrl + "graphics/gameplay/Building/Tower5_Enviro.png");		
		this.load.image("tower_5_sideleft", AssetUrl + "graphics/gameplay/Building/Tower5_Sideleft.png");
		this.load.image("tower_5_sideright", AssetUrl + "graphics/gameplay/Building/Tower5_Sideright.png");		
	},
	
	loadGameOverGraphics:function()
	{
		this.load.image("game_over_panel", AssetUrl + "graphics/result/Result.png");
		this.load.image("exit_button", AssetUrl + "graphics/result/Result_Oke.png");
		this.load.image("restart_button", AssetUrl + "graphics/result/Result_Ulangi.png");
		
		this.load.image("dark_bg", AssetUrl + "graphics/result/dark_bg.png");
	},
	
	loadHighscoreGraphics:function()
	{
		this.load.image("highscore_okay_button",  AssetUrl + "graphics/highscore/Skor_Oke.png");
		this.load.image("highscore_panel",  AssetUrl + "graphics/highscore/Skor.png");
	},	
    
	loadResultGraphics:function()
	{
		
	},
	
	loadVouchers: function()
	{
		// VOUCHERS
		
        this.game.load.image('box_voucher',AssetUrl+'graphics/vouchers/box_voucher.png');
		
		this.game.load.image('box_white', AssetUrl+'graphics/vouchers/box_white.png');
		this.game.load.image('btn_close', AssetUrl+'graphics/vouchers/btn_close.png');
		this.game.load.image('btn_copy', AssetUrl+'graphics/vouchers/btn_copy.png');
		this.game.load.image('btn_download', AssetUrl+'graphics/vouchers/btn_download.png');
		
		this.game.load.image('btn_info1', AssetUrl+'graphics/vouchers/btn_info1.png');
		this.game.load.image('btn_info2', AssetUrl+'graphics/vouchers/btn_info2.png');
		
		this.game.load.image('btn_main', AssetUrl+'graphics/vouchers/btn_main.png');
		this.game.load.image('header_card1', AssetUrl+'graphics/vouchers/header_tower1.png');
		this.game.load.image('header_card2', AssetUrl+'graphics/vouchers/header_tower2.png');
		
		this.game.load.image('icn_close', AssetUrl+'graphics/vouchers/icn_close.png');		
		this.game.load.image('icn_info', AssetUrl+'graphics/vouchers/icn_info.png');
		//		
	},
	
    loadAudios: function()
    {
        // BGM  
		//this.loadGameAudio("_bgm", "music.ogg", "bgm");
		       
		this.load.audio("ingame_bgm", AssetUrl + "audios/bgm/bgm_In_Game.mp3");
        
		
        // SFX
		//this.loadGameAudio("_sfx", "sfx.wav", "sfx");
		this.load.audio("ingame_beat_highscore_sfx",  AssetUrl + "audios/sfx/ingame_beat highscore.mp3");
		this.load.audio("ingame_combo_sfx",  AssetUrl + "audios/sfx/ingame_combo.mp3");
		this.load.audio("ingame_gameover_sfx",  AssetUrl + "audios/sfx/ingame_gameover.mp3");
		this.load.audio("ingame_naro_blocknya_sfx",  AssetUrl + "audios/sfx/ingame_naro blocknya.mp3");
		this.load.audio("ingame_sampai_check_point_sfx",  AssetUrl + "audios/sfx/ingame_sampai check point.mp3");
		this.load.audio("ingame_swipe_sfx",  AssetUrl + "audios/sfx/ingame_swipe.mp3");
		this.load.audio("result_rolling_score",  AssetUrl + "audios/sfx/result_rolling score.mp3");
		this.load.audio("ui_button_tap",  AssetUrl + "audios/sfx/ui_button_tap.mp3");
    },
	
	loadGameAudio:function(name, filePath, category)
	{
        var oggPath = "audio/ogg/"+category+"/";
        var m4aPath = "audio/m4a/"+category+"/";
		
		this.load.audio(name, [oggPath+filePath+".ogg", m4aPath+filePath+".m4a"]);		
	},
	
	loadJsons: function()
	{
		
	},	
}

