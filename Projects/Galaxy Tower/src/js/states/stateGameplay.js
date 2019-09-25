var StateGameplay = function(game)
{

}

StateGameplay.prototype = {
    preload: function()
    {
                 
    },
    
    init: function()
    {
		this.NORMAL_SCORE = 50;
		this.PERFECT_SCORE = 100;
		
		if (gameRatio >= 0.75)
		{
			BLOCK_INIT_SCALE_SIZE = 0.35;			
		}
		
		this.BLOCK_INIT_SIZE = Game.width * BLOCK_INIT_SCALE_SIZE;
		
		this.initCombo();
		this.initBlockSpeedChanger();
		this.initAudios();
		
		this.originalBlockWidth = 0;
		
        this.prevBlock = null;
		this.curBlock = null;
		
		this.curSize = 0;
		this.deltaSizePercent = 1;
		
		this.isGameStarted = false;
		
		this.stackedBlocks = [];
		this.isDroppingBlock = false;
		this.isShiftingBlock = false;
		
		this.nBlock = 1;
				
		this.score = 0;
		this.oriScore = 0;
		this.scoreGameover = 0;
		this.isGameOver = false;
		
		this.isNewHighScore = false;
		
		this.timerHighscore = null;
		
		this.goalProgress = 0;
		
		//this.speed = 500;
		
		this.minimalBlockSize = 0;
		
		this.minimumToTriggerBuildShiftDown = -1;
		
		this.buildingTypeIndex = 0;
		this.TimerInterval = undefined;
		
		this.timerObj = new TimerEventController(this.game);
    },

	create: function()
	{
		//GaAPI.trackStartPlayingEv();
		Global.musicPlayer.playMusic("ingame_bgm", true, 1000);

        this.init();
        		
        this.createHUD();		
        this.scaleHUD();
		
		if (IS_DEBUG)
		{
			this.initDebug();
		}
		
        //this.scale.onOrientationChange.removeAll();
        //this.scale.onOrientationChange.add(this.onOrientationChange.bind(this, false), this);
        
        //this.onOrientationChange(true);
		
		//
		
		this.prepareGame();
		//this.startGame();
		
		this.input.onTap.add(this.onTap, this);
	},
	
	update: function()
	{
		if (IS_DEBUG)
		{
			this.debugUpdate();
		}
		
		if (this.timerObj)
		{
			this.timerObj.update();
		}
		
		this.updateIncrementScore();
	},
    
    onOrientationChange: function(isInit)
    {
        if (isInit)
        {
             this.scale.setGameSize(Game.width, Game.height);   
        }
        else
        {
             this.scale.setGameSize(Game.height, Game.width);
        }
		
		this.scaleHUD();
		
		if (isInit)
		{
			
		}
	},	
	
	// HUD
	
    createHUD: function()
    {
		this.createBackgroundHUD();
		
		this.createHeaderHUD();			
		this.createFooterHUD();		
		
		this.towerGroup = this.add.group();
		this.towerGroup.add(this.groundDecorGroup);
		
		this.createMainHUD();					
		this.createGameOverPopUpHUD();
    },
	
	scaleHUD:function()
	{                
		this.scaleBackgroundHUD();
		
		this.scaleHeaderHUD();		
        this.scaleMainHUD();
		this.scaleFooterHUD();	
		
		this.scaleGameOverPopUpHUD();
	},
	
	//
	
	createMainHUD:function()
	{
		this.mainHUDGroup = this.add.group();
		
		//
		
		this.ufoImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"ufo_gameplay");
		this.ufoImg.animations.add('happy', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
		this.ufoImg.animations.add('idle', [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]);
		this.ufoImg.animations.add('sad', [40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]);
		
		this.ufoImg.animations.play('idle', 30, true);
        this.ufoImg.anchor.setTo(0.5, 0.5);	
		
		this.ufoLightImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"ufo_light");
		this.ufoLightImg.anchor.setTo(0.5, 0);
		this.ufoLightImg.alpha = 0;
		
		/*this.ufoLight2SampleImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"ufo_light_2");
		this.ufoLight2SampleImg.anchor.setTo(0, 0);
		this.ufoLight2SampleImg.visible = false;	
		*/
		
		this.ufoLight2Emitter = this.add.emitter(Game.width * 0.5, -50, 10);
		this.ufoLight2Emitter.makeParticles("ufo_light_2");
		this.ufoLight2Emitter.gravity = 300;	
		
		this.ufoLight2Emitter.setAlpha(1,0,1000);
		this.ufoLight2Emitter.setScale(0.5,0.5,0.5,0.5);
		
		this.comboLabelText = this.add.text(0, 0, "Combo!", {font: "20px " + FONT_NAMES.PANTON_REGULAR, fill: "#eeeeee", align:"center"});
        this.comboLabelText.anchor.setTo(0.5, 0.5);	
		this.comboLabelText.alpha = 0;
		
		this.mainHUDGroup.add(this.ufoLight2Emitter);
		this.mainHUDGroup.add(this.ufoLightImg);
		this.mainHUDGroup.add(this.ufoImg);
		
		//
	},
	
	scaleMainHUD:function()
	{
		Global.screenUtility.proportionalScale(this.ufoImg, "x", Game, 0.4);
		this.ufoImg.position.setTo(Game.width * 0.5, Game.height * 0.35);	
		
		Global.screenUtility.proportionalScale(this.ufoLightImg, "x", Game, 0.6);
		this.ufoLightImg.position.setTo(this.ufoImg.x, this.ufoImg.y + this.ufoImg.height * 0.2);
		
		//Global.screenUtility.proportionalScale(this.ufoLight2SampleImg, "x", this.ufoImg, 0.5);				
		
		this.ufoLight2Emitter.position.setTo(0, this.ufoImg.y + this.ufoImg.height * 0.2);
		//Global.screenUtility.proportionalScale(this.ufoLight2Emitter, "x", this.ufoImg, 1);
		
		//this.ufoLight2Emitter.setScale(this.ufoLight2SampleImg.width/this.ufoImg.width,this.ufoLight2SampleImg.height/this.ufoImg.height,this.ufoLight2SampleImg.width/this.ufoImg.width,this.ufoLight2SampleImg.height/this.ufoImg.height);
		
		//var originalSize = this.ufoLightImg.width
		
		this.comboLabelText.fontSize = Global.screenUtility.correctSize(Game, 56);
		this.comboLabelText.position.set(Math.round(Game.width * 0.5), Math.round(this.ufoImg.y - this.ufoImg.height * 0.9));			
	},
	
	//
	
	createBackgroundHUD:function()
	{
		this.backgroundHUDGroup = this.add.group();
		
        this.bgImage = this.add.sprite(Game.width*0.5, Game.height*0.5,"background_ground");
        this.bgImage.anchor.setTo(0.5, 0.5);
	
		this.backgroundHUDGroup.add(this.bgImage);
		
		this.startBlock  = this.add.sprite(Game.width*0.5, Game.height*0.9,"init_block");
		this.startBlock.anchor.set(0.5, 1);	
		
		//
		
		this.groundDecorGroup = this.add.group();
	
        this.leftHillDecorImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"left_hill_decor");
        this.leftHillDecorImg.anchor.setTo(0, 1);
		
        this.groundDecorImg = this.add.sprite(Game.width*0.5, Game.height*1,"ground_decor");
        this.groundDecorImg.anchor.setTo(0.5, 1);
						
		this.groundDecorGroup.add(this.leftHillDecorImg);
		this.groundDecorGroup.add(this.startBlock);
		this.groundDecorGroup.add(this.groundDecorImg);
	},
	
	scaleBackgroundHUD:function()
	{
		Global.screenUtility.proportionalScale(this.bgImage, "x", Game, 1, -1, false);
		this.bgImage.position.setTo(Game.width * 0.5, Game.height - this.bgImage.height * 0.5);
		
		Global.screenUtility.proportionalScale(this.leftHillDecorImg, "x", Game, 0.4);
		this.leftHillDecorImg.position.setTo(Game.width * 0, Game.height);	
		
		Global.screenUtility.proportionalScale(this.groundDecorImg, "x", Game, 1, -1, false);
		this.groundDecorImg.position.setTo(Game.width * 0.5, Game.height);
		
		if (gameRatio >= 0.75)
		{
			Global.screenUtility.proportionalScale(this.startBlock, "x", Game, 0.45);
			this.startBlock.position.setTo(Game.width * 0.5, this.groundDecorImg.y - this.groundDecorImg.height * 0.43);	
		}
		else
		{
			Global.screenUtility.proportionalScale(this.startBlock, "x", Game, 0.66);
			this.startBlock.position.setTo(Game.width * 0.5, this.groundDecorImg.y - this.groundDecorImg.height * 0.43);
		}

	},
	
	//
	
	createHeaderHUD:function()
	{
		this.headerHUDGroup = this.add.group();
		
		//
		this.topUiImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"top_ui");
		this.topUiImg.anchor.setTo(0.5, 0);	
		
		this.scoreUiBehindImg = this.add.sprite(Game.width*0, Game.height*0,"score_ui_behind_ornament");
		this.scoreUiBehindImg.anchor.setTo(0, 0);				
		
		this.additionalUiImg = this.add.sprite(Game.width, Game.height*0);
		this.additionalUiImg.anchor.setTo(1, 0);
		this.additionalUiImg.visible = false;
		
		this.scoreUiImg = this.add.sprite(Game.width*0, Game.height*0,"score_ui");
		this.scoreUiImg.anchor.setTo(0, 0);				
		
		this.scoreText = this.add.text(0, 0, "00000", {font: "20px " + FONT_NAMES.PANTON_BOLD, fill: "#eeee11", align:"right"});
        this.scoreText.anchor.setTo(0.5, 0.5);
		
		this.timerPanelImg = this.add.image(0,0,"timer_panel");
		this.timerPanelImg.anchor.set(1, 0);
				
		this.timerObj.createView();
		this.timerObj.view.updateTimer(CONFIG.TIME_LIMIT);
				
		this.headerHUDGroup.add(this.topUiImg);
		this.headerHUDGroup.add(this.additionalUiImg);
		this.headerHUDGroup.add(this.scoreUiBehindImg);
		this.headerHUDGroup.add(this.scoreUiImg);		
		this.headerHUDGroup.add(this.scoreText);		
		this.headerHUDGroup.add(this.timerPanelImg);
	},
	
	scaleHeaderHUD:function()
	{
		Global.screenUtility.proportionalScale(this.topUiImg, "x", Game, 1, false);
		this.topUiImg.position.setTo(Game.width * 0.5, Game.height * 0);
				
		Global.screenUtility.proportionalScale(this.additionalUiImg, "x", Game, 0.4);
		this.additionalUiImg.position.setTo(Game.width, Game.height * 0);

		Global.screenUtility.proportionalScale(this.scoreUiBehindImg, "x", Game, 0.6);
		this.scoreUiBehindImg.position.setTo(Game.width * 0, Game.height * 0);		
		
		Global.screenUtility.proportionalScale(this.scoreUiImg, "x", Game, 0.35);
		this.scoreUiImg.position.setTo(Game.width * 0, Game.height * 0);	
		
		this.scoreText.fontSize = Global.screenUtility.correctSize(Game, 56);
		this.scoreText.position.set(Math.round(this.scoreUiImg.x + this.scoreUiImg.width * 0.525), this.scoreUiImg.y + Math.round(this.scoreUiImg.height * 0.675));
		
		Global.screenUtility.proportionalScale(this.timerPanelImg, "x", Game, 0.4);
		this.timerPanelImg.position.setTo(Game.width * 1, Game.height * 0);		
		
		let timerView = this.timerObj.view;
		
		timerView.timer1stDigitText.position.setTo(this.timerPanelImg.x - this.timerPanelImg.width * 0.705, this.timerPanelImg.y + this.timerPanelImg.height * 0.44);
		timerView.timer2ndDigitText.position.setTo(this.timerPanelImg.x - this.timerPanelImg.width * 0.555, this.timerPanelImg.y + this.timerPanelImg.height * 0.44);
		timerView.timerPeriodText.position.setTo(this.timerPanelImg.x - this.timerPanelImg.width * 0.450, this.timerPanelImg.y + this.timerPanelImg.height * 0.44);
		timerView.timer3rdDigitText.position.setTo(this.timerPanelImg.x - this.timerPanelImg.width * 0.335, this.timerPanelImg.y + this.timerPanelImg.height * 0.44);
		timerView.timer4thDigitText.position.setTo(this.timerPanelImg.x - this.timerPanelImg.width * 0.185, this.timerPanelImg.y + this.timerPanelImg.height * 0.44);
	},
    
	createFooterHUD:function()
	{
		this.footerHUDGroup = this.add.group();
	},
	
	scaleFooterHUD:function()
	{
		//this.promoText.fontSize = Global.screenUtility.correctSize(Game, 20);
		//this.promoText.position.set(Math.round(Game.width * 0.5 - (this.promoText.width + this.promoButton.width) * 0.5), Math.round(Game.height * 0.985));
	},
	
	createGameOverPopUpHUD:function()
	{
		this.gameOverDarkBg = this.add.sprite(Game.width*0.5, Game.height*0.5,"dark_bg");
        this.gameOverDarkBg.anchor.setTo(0.5, 0.5);
		this.gameOverDarkBg.alpha = 0.4;
		this.gameOverDarkBg.visible = false;
		
		this.gameOverHUDGroup = this.add.group();
		this.gameOverHUDGroup.visible = false;
		
 		this.gameOverPanelImg = this.add.sprite(Game.width*0.5, Game.height*0.5,"game_over_panel");
        this.gameOverPanelImg.anchor.setTo(0.5, 0.5);
		
		this.resultScoreText = this.add.text(0, 0, "0", {font: "20px " + FONT_NAMES.PANTON_BOLD, fill: "#FFFF00", align:"center"});
        this.resultScoreText.anchor.set(0.5, 0);
		this.resultScoreText.fontWeight = 'bold';		
		
 		this.restartButton = this.add.button(Game.width*0.5, Game.height*0.5,"restart_button");
        this.restartButton.anchor.setTo(0, 1);		
		this.restartButton.visible = false;
		
 		this.exitButton = this.add.button(Game.width*0.5, Game.height*0.5,"exit_button");
        this.exitButton.anchor.setTo(1, 1);	
		
		this.exitButton.onInputUp.add(() => {
			//GaAPI.trackGoToMainMenuEv();
			this.uiButtonTapSfx.play();
			
			if (this.resultRollingScore != null)
			{
				this.resultRollingScore.stop();
			}
			
			this.restartButton.inputEnabled = false;
			this.exitButton.inputEnabled = false;
									
			this.restartButton.anchor.set(0.5,0.5);			
			this.restartButton.position.set(this.restartButton.x+this.restartButton.width*this.restartButton.anchor.x, this.restartButton.y-this.restartButton.height*this.restartButton.anchor.y);
			
			let tween = this.add.tween(this.restartButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);
			
			this.exitButton.anchor.set(0.5,0.5);			
			this.exitButton.position.set(this.exitButton.x-this.exitButton.width*this.exitButton.anchor.x, this.exitButton.y-this.exitButton.height*this.exitButton.anchor.x);
			
			tween = this.add.tween(this.exitButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);	
			
			tween.onComplete.add(() => {
				this.state.start("Title");	
			}, this);	
								
		}, this);		
		this.exitButton.visible = false;
		
		this.restartButton.onInputUp.add(() => 
		{
			if (this.resultRollingScore != null)
			{
				this.resultRollingScore.stop();
			}
			
			this.restartButton.inputEnabled = false;
			this.exitButton.inputEnabled = false;
			
			this.restartButton.anchor.set(0.5,0.5);			
			this.restartButton.position.set(this.restartButton.x+this.restartButton.width*this.restartButton.anchor.x, this.restartButton.y-this.restartButton.height*this.restartButton.anchor.y);
			
			let tween = this.add.tween(this.restartButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);
			
			this.exitButton.anchor.set(0.5,0.5);			
			this.exitButton.position.set(this.exitButton.x-this.exitButton.width*this.exitButton.anchor.x, this.exitButton.y-this.exitButton.height*this.exitButton.anchor.x);
			
			tween = this.add.tween(this.exitButton.scale).to({x:0, y:0}, 250, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);	
			
			tween.onComplete.add(() => {
				this.restartGame();
				this.ingameSwipeSfx.play();
			}, this);			
			
		}, this);		
		
		this.gameOverHUDGroup.add(this.gameOverPanelImg);
		this.gameOverHUDGroup.add(this.restartButton);		
		this.gameOverHUDGroup.add(this.exitButton);
		this.gameOverHUDGroup.add(this.resultScoreText);
	}, 
	
	scaleGameOverPopUpHUD:function()
	{
		Global.screenUtility.proportionalScale(this.gameOverDarkBg, "y", Game, 1, false);
		this.gameOverDarkBg.position.setTo(Game.width * 0.5, Game.height * 0.5);
		
		Global.screenUtility.proportionalScale(this.gameOverPanelImg, "x", Game, 0.8);
		this.gameOverPanelImg.position.setTo(Game.width * 0.5, Game.height * 0.4);
		
		if (gameRatio >= 2)
		{
			Global.screenUtility.proportionalScale(this.restartButton, "x", Game, 0.3);
			this.restartButton.position.setTo(this.gameOverPanelImg.x - this.gameOverPanelImg.width * 0.425, this.gameOverPanelImg.y + this.gameOverPanelImg.height * 0.5 + this.restartButton.height * 0.5 + Game.height * 0.03);		
		}
		else
		{
			Global.screenUtility.proportionalScale(this.restartButton, "x", Game, 0.4);
			this.restartButton.position.setTo(this.gameOverPanelImg.x - this.gameOverPanelImg.width * 0.525, this.gameOverPanelImg.y + this.gameOverPanelImg.height * 0.5 + this.restartButton.height * 0.5 + Game.height * 0.03);		
		}
		
		
		if (gameRatio >= 2)
		{
			Global.screenUtility.proportionalScale(this.exitButton, "x", Game, 0.3);
			this.exitButton.position.setTo(this.gameOverPanelImg.x + this.gameOverPanelImg.width * 0.425, this.gameOverPanelImg.y + this.gameOverPanelImg.height * 0.5 + this.exitButton.height * 0.5 + Game.height * 0.03);
		}
		else
		{
			Global.screenUtility.proportionalScale(this.exitButton, "x", Game, 0.4);
			this.exitButton.position.setTo(this.gameOverPanelImg.x + this.gameOverPanelImg.width * 0.525, this.gameOverPanelImg.y + this.gameOverPanelImg.height * 0.5 + this.exitButton.height * 0.5 + Game.height * 0.03);	
		}
	
		this.resultScoreText.fontSize = Global.screenUtility.correctSize(Game, 140);
		this.resultScoreText.position.set(Math.round(this.gameOverPanelImg.x), Math.round(this.gameOverPanelImg.y + this.gameOverPanelImg.height * 0.09));
				
		//this.promoText.fontSize = Global.screenUtility.correctSize(Game, 20);
		//this.promoText.position.set(Math.round(Game.width * 0.5 - (this.promoText.width + this.promoButton.width) * 0.5), Math.round(Game.height * 0.985));
	},	
	
	// end HUD
    
	// DEBUG
	
	initDebug:function()
	{
		this.kOne = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
	},
	
	debugUpdate:function()
	{
		if (this.kOne.isDown)
        {                 

        } 
	},
	
	// end DEBUG
	
	// MECHANICS
	
	prepareGame:function()
	{			
        this.prevBlock = this.add.sprite(Game.width*0.5, Game.height*0.9,"game_block");
		this.prevBlock.anchor.set(0.5, 1);
		this.prevBlock.alpha = 0;
		
		this.originalBlockWidth = this.prevBlock.width;		
		this.curSize = this.prevBlock.width;
		
		Global.screenUtility.proportionalScale(this.prevBlock, "x", Game, BLOCK_INIT_SCALE_SIZE);
		this.prevBlock.position.setTo(Game.width * 0.5, this.startBlock.y-this.startBlock.height+this.prevBlock.height);		
	
		this.stackedBlocks.push(this.prevBlock);
		
		this.towerGroup.add(this.prevBlock);
		
		//this.nextBlock();
		
		this.minimumToTriggerBuildShiftDown = Math.max(0, Math.floor(Game.height / this.prevBlock.height * 0.25));
		//console.log(this.minimumToTriggerBuildShiftDown);
		
		//
		
		this.ufoImg.y = Game.height * -0.2;
		
		var tween = this.add.tween(this.ufoImg).to({y:Game.height * 0.35}, 1500, 
											  Phaser.Easing.Elastic.Out, 
											  true, 500, 0, false);

		tween.onComplete.add(() => {
			this.startGame();
		});		
	},
	
	nextBlock:function()
	{		
		// console.log("Original Size", this.originalBlockWidth);
		
		this.curBlock = this.add.sprite(0, this.prevBlock.y - this.prevBlock.height, "game_block");
		this.curBlock.anchor.set(0.5, 1);

		this.towerGroup.add(this.curBlock);
		
		//// console.log(Math.abs(this.curBlock.width - this.curSize));
		
		// console.log("CUR SIZE: ", this.curSize, this.deltaSizePercent);
		
		//var rectWidth = this.curBlock.width - Math.abs(this.curBlock.width - this.curSize);
		//var rectHeight = this.curBlock.height;
		//var rectX = (this.curBlock.width - this.curSize) * 0.5;
				
		Global.screenUtility.proportionalScale(this.curBlock, "x", Game, BLOCK_INIT_SCALE_SIZE);
		this.curBlock.position.setTo(this.curBlock.width * 0.5, this.prevBlock.y - this.prevBlock.height);		
	
		var rectWidth = this.curBlock.width / this.curBlock.scale.x * (this.curSize/this.originalBlockWidth);
		var rectHeight = this.curBlock.height / this.curBlock.scale.y;
		var rectX = (this.curBlock.width / this.curBlock.scale.x - rectWidth) * 0.5;		
		
		var cropRect = new Phaser.Rectangle(rectX, 0, rectWidth, rectHeight);
		
		//// console.log(cropRect);
		
		this.curBlock.crop(cropRect);
		this.curBlock.updateCrop();
		
		// console.log(this.curBlock.width);
	},
	
	tweenCurBlock:function()
	{
		var isLeft = 1 == Math.floor(Math.random() * 2);
		
		if (isLeft)
		{
			this.curBlock.x = this.curBlock.width * 0.5;
			var tween = this.add.tween(this.curBlock).to({x:Game.width-this.curBlock.width * 0.5}, this.curBlockSpeedMsec, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, Infinity, false);
		}
		else
		{
			this.curBlock.x = Game.width - this.curBlock.width * 0.5;
			var tween = this.add.tween(this.curBlock).to({x:this.curBlock.width * 0.5}, this.curBlockSpeedMsec, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, Infinity, false);			
		}
		
		tween.yoyo(true, 0);
		
		//var tween2 = this.add.tween(this.curBlock).to({alpha:1}, 1000, 
		//										  Phaser.Easing.Sinusoidal.Linear, 
		//										  true, 0);		
		
		this.curBlock.playingTween = tween;
	},
	
	startGame:function()
	{
		//this.nextBlock.visible = true;
		
		this.isGameStarted = true;
		
		this.timerObj.activateTimer(CONFIG.TIME_LIMIT, () => {
			this.endGame(false, "TIMEOUT");
		}, false);
		
		this.nextBlock();
		this.minimalBlockSize = MINIMUM_BLOCK_TOLERANCE_RATIO * this.curBlock.width;
		
		this.tweenCurBlock();
		
		
		var tween = this.add.tween(this.ufoImg).to({y:this.ufoImg.y - this.ufoImg.height * 0.1}, 1000, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, Infinity, false);
		tween.yoyo(true, 0);		
		
		tween = this.add.tween(this.ufoLightImg).to({y:this.ufoLightImg.y - this.ufoImg.height * 0.1}, 1000, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, Infinity, false);
		tween.yoyo(true, 0);
		
		
		
		tween = this.add.tween(this.ufoLightImg).to({alpha:1}, 1000, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, 0, false);
		tween.onComplete.add(() => 
		{
			this.ufoLight2Emitter.start(false, 2000, 250);
		}, this);
	},
	
	dropBlock:function()
	{		
		this.curBlock.playingTween.stop();
		
		this.activateDroppedBlockEvent();
		
		
		
		/*var tween = this.add.tween(this.curBlock).to({y:this.prevBlock.y - this.prevBlock.height}, 500, 
												  Phaser.Easing.Sinusoidal.In, 
												  true, 0, 0, false);
		tween.onComplete.add(() => {
			this.activateDroppedBlockEvent();
		});*/
	},
	
	shiftBlockDown:function(event)
	{
		//console.log(this.towerGroup.length);
		this.nBlock++;
		
		if (this.nBlock > this.minimumToTriggerBuildShiftDown)
		{
			this.isShiftingBlock = true;
			
			var tween = this.add.tween(this.towerGroup).to({y:this.towerGroup.y+this.prevBlock.height}, 250, 
												  Phaser.Easing.Sinusoidal.In, 
												  true, 0, 0, false);
			
			tween.onComplete.add(() => {
				this.isShiftingBlock = false;
				if (event != null)
				{
					event();
				}		
				
				var tempBlock = this.towerGroup.getChildAt(0);
				
				if (tempBlock.y+this.towerGroup.y > tempBlock.height)
				{
					this.towerGroup.removeChildAt(0);
					tempBlock.destroy(true);
					this.towerGroup.children.shift();
				}
				
			});
			
			this.shiftBackgroundDown();
			
			/*var tween2 = this.add.tween(this.ufoImg).to({y:this.towerGroup.y+this.prevBlock.height}, 500, 
												  Phaser.Easing.Sinusoidal.In, 
												  true, 0, 0, false);
			
			tween2.onComplete.add(() => {
				this.isShiftingBlock = false;
			});		*/	
		}
		else
		{
			if (event != null)
			{
				event();
			}
		}
	},
	
	shiftBackgroundDown:function()
	{
		//console.log(this.backgroundHUDGroup.y, this.bgImage.y - this.bgImage.height * 0.5, this.backgroundHUDGroup.y >= (this.bgImage.y - this.bgImage.height * 0.5));
		
		if (this.backgroundHUDGroup.y >= -(this.bgImage.y - this.bgImage.height))
		{
			return;
		}
		
		var tween = this.add.tween(this.backgroundHUDGroup).to({y:Math.min(this.backgroundHUDGroup.y + this.bgImage.height * 0.005, -(this.bgImage.y-this.bgImage.height * 0.5))}, 250, 
												  Phaser.Easing.Sinusoidal.In, 
												  true, 0, 0, false);
	},
	
	activateDroppedBlockEvent:function()
	{	
		//// console.log(this.stackedBlocks);
		
		//this.stackedBlocks.push(this.curBlock);
						
		if (Math.abs(this.curBlock.x-this.prevBlock.x) <= GAP_TOLERANCE)
		{
			this.curBlock.x = this.prevBlock.x;
			this.addScore(true);
			this.ingameComboSfx.play();
			this.addGoalProgress();
		}
		else if (!this.checkOutOfPrevBlockSize())
		{
			this.cutSize();
			this.ingameNaroBlockSfx.play();
			
			if (this.checkIfLessThanMinimumSize())
			{
				this.prepareGameOver();		
			
				return;
			}
			
			this.addScore(false);	
			
			var isLeft = this.createAttachedBlock();
			this.createFallingBlock(isLeft);	
			
			this.addGoalProgress();
		}
		else
		{			
			this.ingameNaroBlockSfx.play();
			this.prepareGameOver();
			
			return;
		}
		
		this.incrementBuildingIndex();
		
		if (this.isGameOver) {
			return;
		}
		
		this.shiftBlockDown(() =>
		{
			this.prevBlock = this.curBlock;
			this.curBlock = null;

			this.nextBlock();
			this.tweenCurBlock();
			this.isDroppingBlock = false;				
		});
		
		// console.log(this.isDroppingBlock, this.isShiftingBlock);
	},
	
	prepareGameOver:function(isVictory = false)
	{
		this.isGameOver = true;
		this.timerObj.pause(true);
		
		var timeEv = () => {
			this.time.events.add(Phaser.Timer.SECOND * 1, () => 
			{
				this.activateGameOver(isVictory, "FAILED");
			}, this);
		}
		
		if (!isVictory)
		{
			var tween = this.add.tween(this.curBlock).to({y:this.curBlock.y + this.curBlock.height * 3, alpha:0}, 500, 
												  Phaser.Easing.Sinusoidal.Linear, 
												  true, 0, 0, false);	
			
			Global.musicPlayer.fadeOutMusic(1500);

			tween.onComplete.add(() => 
			{
				timeEv();
			}, this);			
		}		
		else
		{
			timeEv();
		}
	},
	
	activateGameOver:function(isVictory = false, reason="")
	{		
		if (!isVictory)
		{
			this.endGame(isVictory, reason);
			this.ingameGameOverSfx.play();
		}
		else
		{
			this.endGame(isVictory, "VOUCHER");
		}
		
		//GaAPI.trackFinishPlayingEv();
		
				
		//this.resultScoreText.text = this.score.toString();
		
		//Global.gameData.addNewLastScore(this.score);
		//this.isNewHighScore = Global.gameData.addHighScore(this.score);
		
		//this.activateIncrementScore();
	},
	
	addGoalProgress:function()
	{
		this.goalProgress++;
		
		if (this.goalProgress == CONFIG.GOAL_TARGET)
		{
			this.prepareGameOver(true);	
		}
	},
	
	incrementScore:function()
	{
		this.resultScoreText.text = Math.round(this.scoreGameover).toString();
	},
	
	endGame(isVictory = false, reason="")
	{
		this.ufoLight2Emitter.destroy();
		this.ufoLightImg.visible = false;		
		this.isGameOver = true;
		
		this.showVoucherGameOver(isVictory, reason);
	},
	showVoucherGameOver(isVictory = false, reason="")
	{
		this.voucherGameOverScreen = new VoucherController(this.game);
		
		this.voucherGameOverScreen.setEvents(() => {
			Global.musicPlayer.stopMusic();
			window.open(CONFIG.URL_DOWNLOAD, '_blank');
			
		}, () => {
			Global.musicPlayer.stopMusic();
			this.game.state.start("Gameplay");
		}, () => {
			Global.musicPlayer.stopMusic();
			this.game.state.start("Gameplay");
		});
		
		this.voucherGameOverScreen.setTitleInfo(reason);
		
		if (isVictory)
		{
			this.voucherGameOverScreen.popUpWin(CONFIG.VOUCHER_CODE);
		}
		else
		{
			this.voucherGameOverScreen.popUpLose();
		}
	},
	
	activateIncrementScore:function()
	{		
		this.time.events.add(Phaser.Timer.SECOND * 1, () => 
		{
			this.oriScore = this.score;
			this.isGameOver = true;
			
			this.resultRollingScore.loopFull();
			
				
			var tweenScore = this.add.tween(this).to({scoreGameover:this.score}, 1000, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);				
			
			tweenScore.onComplete.add(() => 
			{
				this.restartButton.visible = true;
				this.exitButton.visible = true;
				
				if (this.resultRollingScore != null)
				{
					this.resultRollingScore.stop();
					this.resultRollingScore.destroy();
				}
				
				if (this.isNewHighScore)
				{				
					this.ingameBeatHighScoreSfx.play();
					this.ingameBeatHighScoreSfx.fadeOut(2000);
					this.isNewHighScore = false;
				}
				
				this.isGameOver = false;
				//this.scoreGameover=this.oriScore;
				//this.score=0;
				this.resultScoreText.text = Math.round(this.scoreGameover).toString();
				
			}, this);		
			
		}, this);			
	},
	
	updateIncrementScore:function()
	{
		if (this.isGameOver)
		{
			this.incrementScore();
		}
	},
	
	checkOutOfPrevBlockSize:function()
	{
		var delta = this.curBlock.x-this.prevBlock.x;
		
		if (this.curBlock.x < this.prevBlock.x)
		{
			return this.curBlock.x + this.curBlock.width < this.prevBlock.x;
		}
		else
		{
			return this.curBlock.x > this.prevBlock.x + this.prevBlock.width;
		}
	},
	
	checkIfLessThanMinimumSize:function()
	{
		//console.log(this.curSize, "<", this.minimalBlockSize);
		
		return this.curSize < this.minimalBlockSize;
	},
	
	cutSize:function()
	{
		//var delta = (this.curBlock.x - this.prevBlock.x) / ((Game.width * BLOCK_INIT_SCALE_SIZE) / this.originalBlockWidth);
		delta = 0;
		
		if (this.curBlock.x < this.prevBlock.x)
		{
			delta = (this.curBlock.x - this.curBlock.width * 0.5 - (this.prevBlock.x - this.prevBlock.width * 0.5)) / ((Game.width * BLOCK_INIT_SCALE_SIZE) / this.originalBlockWidth);
		}
		else
		{
			delta = (this.curBlock.x + this.curBlock.width * 0.5 - (this.prevBlock.x + this.prevBlock.width * 0.5)) / ((Game.width * BLOCK_INIT_SCALE_SIZE) / this.originalBlockWidth);
		}
		
		//
		
		/*if (delta > 0)
		{
			// console.log("Cut right");
		}
		else
		{
			// console.log("Cut left");
		}
		*/
		
		//this.deltaSize = delta;
		
		//this.deltaSizePercent = 1 - Math.abs(delta/this.originalBlockWidth);
		
		//this.curSize = this.curSize * this.deltaSizePercent;		
		
		// console.log("DELTA: ",Math.abs(delta));
		
		this.curSize = this.curSize - Math.abs(delta);
		this.deltaSize = Math.abs(delta);
	},
	
	createAttachedBlock:function()
	{
		var tempCurBlock = this.curBlock;
		this.towerGroup.remove(tempCurBlock);
		
		this.curBlock = this.add.sprite(0, 0, "game_block");
		this.curBlock.anchor.set(0.5, 1);
		//this.curBlock.alpha = 0.1;

		this.towerGroup.add(this.curBlock);
		
		Global.screenUtility.proportionalScale(this.curBlock, "x", Game, BLOCK_INIT_SCALE_SIZE);
		
		var rectWidth = this.curBlock.width / this.curBlock.scale.x * (this.curSize/this.originalBlockWidth);
		var rectHeight = this.curBlock.height / this.curBlock.scale.y;
		var rectX = (this.curBlock.width / this.curBlock.scale.x - rectWidth) * 0.5;		
		
		var cropRect = new Phaser.Rectangle(0, 0, rectWidth, rectHeight);
		
		this.curBlock.crop(cropRect);
		this.curBlock.updateCrop();
		
		var delta = tempCurBlock.x - tempCurBlock.width * 0.5 - (this.prevBlock.x - this.prevBlock.width * 0.5);
		var isLeft = false;
		
		if (delta < 0)
		{
			this.curBlock.position.setTo(this.prevBlock.x - this.prevBlock.width * 0.5 + this.curBlock.width * 0.5, tempCurBlock.y);
			isLeft = true;
		}
		else
		{
			this.curBlock.position.setTo(this.prevBlock.x + this.prevBlock.width * 0.5 - this.curBlock.width * 0.5, tempCurBlock.y);
			isLeft = false;
		}
		
		tempCurBlock.destroy();
		
		return isLeft;
	},
	
	createFallingBlock:function(isLeft)
	{
		var tempCurBlock = this.curBlock;
		var fallingBlock = null;
		
		fallingBlock = this.add.sprite(0, 0, "game_block");
		fallingBlock.anchor.set(0.5, 1);

		this.towerGroup.add(fallingBlock);
		
		Global.screenUtility.proportionalScale(fallingBlock, "x", Game, BLOCK_INIT_SCALE_SIZE);
		
		//console.log(this.prevBlock.width / this.prevBlock.scale.x, this.curSize+this.deltaSize, this.deltaSize/(this.curSize+this.deltaSize));
		
		var rectWidth = /*fallingBlock.width / fallingBlock.scale.x*/this.deltaSize;
		var rectHeight = fallingBlock.height / fallingBlock.scale.y;
		var rectX = (fallingBlock.width / fallingBlock.scale.x - rectWidth) * 0.5;		
		
		// console.log(tempCurBlock.width/tempCurBlock.scale.x);
		
		var cropRect = new Phaser.Rectangle(0, 0, rectWidth, rectHeight);
		
		fallingBlock.crop(cropRect);
		fallingBlock.updateCrop();
				
		if (isLeft)
		{
			fallingBlock.position.setTo(tempCurBlock.x - tempCurBlock.width * 0.5 - fallingBlock.width * 0.5, this.prevBlock.y - this.prevBlock.height);
			var tweenRotate = this.add.tween(fallingBlock).to({angle:-45}, 500, 
															  Phaser.Easing.Sinusoidal.Linear, 
															  true, 0, 0, false);			
		}
		else
		{
			fallingBlock.position.setTo(tempCurBlock.x + tempCurBlock.width * 0.5 + fallingBlock.width * 0.5, this.prevBlock.y - this.prevBlock.height);
			var tweenRotate = this.add.tween(fallingBlock).to({angle:45}, 500, 
															  Phaser.Easing.Sinusoidal.Linear, 
															  true, 0, 0, false);				
		}
		
		// console.log(cropRect)
		
		var tween = this.add.tween(fallingBlock).to({y:fallingBlock.y + fallingBlock.height * 3, alpha:0}, 500, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, 0, false);		
	},
	
	// BUILD TYPE
	
	incrementBuildingIndex:function()
	{
		this.buildingTypeIndex += 1;
		
		if (this.buildingTypeIndex == 3)
		{
			this.createTowerRoofType();
			this.buildingTypeIndex = 0;
		}
		else
		{
			this.createTowerWallType();			
		}
	},
	
	createTowerType:function(block, blockGroup, spriteName, yScaleSprite, yBaseScale, xWidthScalePosition, xDeltaScale, xBoundScale=0.5, middleSpriteName=null, yScaleMiddleSprite = 1, yMiddlePosScale=0)
	{
		// left
		var i = 0;
		var curX = block.x;
		var yBase = block.y - block.height * yBaseScale;
		var xDelta = -1;
		var leftBoundX = block.x - block.width * xBoundScale;
		var rightBoundX = block.x + block.width * xBoundScale;
		var decorBlock;
		
		// middle
		
		if (middleSpriteName != null)
		{
			decorBlock = this.add.sprite(0, 0, middleSpriteName);
			decorBlock.anchor.set(0.5, 1);		
			
			if (block.width > decorBlock.width)
			{
				Global.screenUtility.proportionalScale(decorBlock, "y", block, yScaleMiddleSprite);
				decorBlock.position.set(block.x, block.y - block.height * yMiddlePosScale);

				blockGroup.add(decorBlock);				
			}
			else
			{
				decorBlock.destroy();
			}

		}
		
		// left
		while (curX > leftBoundX)
		{
			decorBlock = this.add.sprite(0, 0, spriteName);
			decorBlock.anchor.set(0.5, 1);		
			
			Global.screenUtility.proportionalScale(decorBlock, "y", block, yScaleSprite);
			//xDelta = decorBlock;
			
			decorBlock.position.set(curX - decorBlock.width * xWidthScalePosition, yBase);
			
			if (decorBlock.x - decorBlock.width * 0.5 < leftBoundX)
			{
				decorBlock.destroy();
				break;
			}
						
			if (xDelta == -1)
			{
				xDelta = decorBlock.width * xDeltaScale;
			}
			
			blockGroup.add(decorBlock);
			
			curX -= (decorBlock.width + xDelta);
		}
		
		curX = block.x;
		
		// right
		while (curX < rightBoundX)
		{
			decorBlock = this.add.sprite(0, 0, spriteName);
			decorBlock.anchor.set(0.5, 1);		
			
			Global.screenUtility.proportionalScale(decorBlock, "y", block, yScaleSprite);
			//xDelta = decorBlock;
			
			decorBlock.position.set(curX + decorBlock.width * xWidthScalePosition, yBase);
			
			if (decorBlock.x + decorBlock.width * 0.5 > rightBoundX)
			{
				decorBlock.destroy();
				break;
			}
						
			if (xDelta == -1)
			{
				xDelta = decorBlock.width * xDeltaScale;
			}
			
			blockGroup.add(decorBlock);
			
			curX += (decorBlock.width + xDelta);
		}		
	},	
	
	createTowerWallType:function()
	{
		var wallGroup = this.add.group();
		
		var tempCurBlock = this.curBlock;		
		
		var decorBlock = this.add.sprite(0, 0, "tower_5");
		decorBlock.anchor.set(0.5, 1);		
		wallGroup.add(decorBlock);
		
		this.towerGroup.add(wallGroup);
		
		decorBlock.width = tempCurBlock.width;
		decorBlock.height = tempCurBlock.height;
		
		decorBlock.position.set(tempCurBlock.x, tempCurBlock.y);
		
		var rectWidth = tempCurBlock.cropRect.width;
		var rectHeight = tempCurBlock.cropRect.height;
		var rectX = tempCurBlock.x;	
		
		wallGroup.alpha = 0; 
		
		var tween = this.add.tween(wallGroup).to({alpha:1}, 1000, 
												  Phaser.Easing.Sinusoidal.Linear, 
												  true, 0, 0, false);		

		//var cropRect = new Phaser.Rectangle(0, 0, rectWidth, rectHeight);
		
		//decorBlock.crop(cropRect);
		//decorBlock.updateCrop();
		
		// windows
		
		var typeAmounts = 3;
		var chosenWindowDecorIndex = Math.floor(Math.random() * typeAmounts);
		//var chosenWindowDecorIndex = 2; // debug
		
		// (block, blockGroup, spriteName, yScaleSprite, yBaseScale, xWidthScalePosition, xDeltaScale, xBoundScale=0.5, middleSpriteName=null, yScaleMiddleSprite = 1, yMiddlePosScale=0) // window kotak
		
		if (chosenWindowDecorIndex == 0)
		{
			// jendela kotak
			this.createTowerType(decorBlock, wallGroup, "tower_2_enviro", 0.625, 0.075, 0.75, 0.55, 0.5);
		}
		else if (chosenWindowDecorIndex == 1)
		{
			// jendela kotak + tengah
			this.createTowerType(decorBlock, wallGroup, "tower_2_enviro", 0.625, 0.075, 1, 0.325, 0.5, "tower_3_enviro", 0.775, 0);
		}
		else if (chosenWindowDecorIndex == 2)
		{
			// jendela kotak + tengah
			this.createTowerType(decorBlock, wallGroup, "tower_3_enviro", 0.775, 0, 1.75, 0.4, 0.5, "tower_5_enviro", 0.6, 0.1);
			this.addSideWindows(wallGroup, decorBlock);
		}

	},		
	
	createTowerRoofType:function()
	{
		var roofGroup = this.add.group();
		
		var tempCurBlock = this.curBlock;		
		
		var decorBlock = this.add.sprite(0, 0, "tower_4");
		decorBlock.anchor.set(0.5, 1);	
		roofGroup.add(decorBlock);
		
		this.towerGroup.add(roofGroup);
		
		decorBlock.width = tempCurBlock.width;
		decorBlock.height = tempCurBlock.height;
		
		decorBlock.position.set(tempCurBlock.x, tempCurBlock.y);
		
		var rectWidth = tempCurBlock.cropRect.width;
		var rectHeight = tempCurBlock.cropRect.height;
		var rectX = tempCurBlock.x;	
		
		roofGroup.alpha = 0;
		
		var tween = this.add.tween(roofGroup).to({alpha:1}, 1000, 
												  Phaser.Easing.Sinusoidal.Linear, 
												  true, 0, 0, false);
		
		// 
		
		this.addSideWindows(roofGroup, decorBlock);
		
		// function(block, blockGroup, spriteName, yScaleSprite, yBaseScale, xWidthScalePosition, xDeltaScale, xBoundScale=0.5) // window kotak
		
		this.createTowerType(decorBlock, roofGroup, "tower_4_enviro", 0.7, -0.01, 2, 3, 0.5);
		
		//var cropRect = new Phaser.Rectangle(0, 0, rectWidth, rectHeight);
		
		//decorBlock.crop(cropRect);
		//decorBlock.updateCrop();		
	},	
	
	addSideWindows:function(blockGroup, decorBlock)
	{
		var decorLeftBlock = this.add.sprite(0, 0, "tower_5_sideleft");
		decorLeftBlock.anchor.set(1, 0.5);	
		Global.screenUtility.proportionalScale(decorLeftBlock, "x", Game, 0.0225);
		decorLeftBlock.position.set(-decorLeftBlock.width, decorBlock.y - decorBlock.height * 0.35);
		blockGroup.add(decorLeftBlock);
		
		tween = this.add.tween(decorLeftBlock).to({x:decorBlock.x-decorBlock.width * 0.5}, 200, 
												  Phaser.Easing.Sinusoidal.Linear, 
												  true, 0, 0, false);
		
		var decorRightBlock = this.add.sprite(0, 0, "tower_5_sideright");
		decorRightBlock.anchor.set(0, 0.5);	
		Global.screenUtility.proportionalScale(decorRightBlock, "x", Game, 0.0225);
		decorRightBlock.position.set(Game.width+decorLeftBlock.width, decorBlock.y - decorBlock.height * 0.35);
		blockGroup.add(decorRightBlock);		
		
		tween = this.add.tween(decorRightBlock).to({x:decorBlock.x+decorBlock.width * 0.5}, 200, 
												  Phaser.Easing.Sinusoidal.Linear, 
												  true, 0, 0, false);		
	},
	
	//
	
	addScore:function(isPerfect)
	{
		if (isPerfect)
		{
			this.addCombo();
			this.score += this.comboScore;
			
			var anim = this.ufoImg.animations.play('happy', 30);
			
			anim.onComplete.add(() => {
				this.ufoImg.animations.play('idle', 30, true);
				anim.onComplete.removeAll();
			}, this);
		}
		else
		{
			this.resetCombo();
			this.score += this.NORMAL_SCORE;
						
			var anim = this.ufoImg.animations.play('sad', 30);
			
			anim.onComplete.add(() => {
				this.ufoImg.animations.play('idle', 30, true);
				anim.onComplete.removeAll();
			}, this);			
		}
		
		this.changeSpeed();
		
		this.updateScoreText();
		this.createPopUpScore(isPerfect);
	},
	
	appendExtraZero:function(amount, strIntValue)
	{
		var extraZero = "";
		var length = strIntValue.length;
		var extraZeroNeeded = amount-length
		var output = "";
		
		while (extraZero.length < extraZeroNeeded)
		{
			extraZero = extraZero + "0";
		}
		
		output = extraZero + strIntValue;
		
		return output;
	},
	
	createPopUpScore:function(isPerfect)
	{
		var message = "";
		
		if (isPerfect)
		{
			message = "PERFECT! +" + this.comboScore;
		}
		else
		{
			message = "GOOD! +" + this.NORMAL_SCORE;
		}
		
		this.scorePopUpText = this.add.text(0, 0, message, {font: "20px " + FONT_NAMES.PANTON_BOLD, fill: "#eeeeee", align:"center"});
        this.scorePopUpText.anchor.setTo(0.5, 0.5);		
		
		this.scorePopUpText.fontSize = Global.screenUtility.correctSize(Game, 40);
		this.scorePopUpText.position.set(this.curBlock.x, this.curBlock.y -  this.curBlock.height + this.towerGroup.y);
		
		var tween = this.add.tween(this.scorePopUpText).to({y:this.scorePopUpText.y - Game.height * 0.1, alpha:0}, 500, 
													  Phaser.Easing.Sinusoidal.Linear, 
													  true, 0, 0, false);
		
		tween.onComplete.add(() => {
			this.scorePopUpText.destroy();
		});
	},

	updateScoreText:function()
	{
		this.scoreText.text = this.appendExtraZero(5, this.score.toString());
	},
	
	restartGame:function()
	{
		//GaAPI.trackClickMainLagiEv();

		this.gameOverHUDGroup.visible = false;
		this.gameOverDarkBg.visible = false;
		
		var tween = this.add.tween(this.ufoImg).to({y:-Game.height * 0.2}, 500, 
													  Phaser.Easing.Back.In, 
													  true, 0, 0, false);
		
		tween.onComplete.add(() => {
			this.ufoImg.visible = false;
			this.time.events.add(Phaser.Timer.SECOND * 1, () => 
			{
				this.state.start("Gameplay");
			}, this);			
		});		
	},	
	
	// COMBO
	    
	initCombo:function()
	{
		this.PERFECT_COMBO_SCORE = 50;
		
		this.COMBO_FIRST_REQUIREMENT = 2;
		this.COMBO_REQUIREMENT = 10;		
		
		this.resetCombo();
	},
		
	resetCombo:function()
	{
		this.requiredCombo = this.COMBO_FIRST_REQUIREMENT;
				
		this.comboScore = this.PERFECT_SCORE;
	},	
	
	addCombo:function()
	{
		this.requiredCombo--;
		
		if (this.requiredCombo <= 0)
		{			
			this.requiredCombo = this.COMBO_REQUIREMENT;
			
			this.comboScore = this.comboScore + this.PERFECT_COMBO_SCORE;
			
		}
		
		if (this.comboScore > this.PERFECT_SCORE)
		{
			this.comboLabelText.scale.set(1.25, 1.25)
			var tween = this.add.tween(this.comboLabelText.scale).to({x:1, y:1}, 300, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);

			var tween2 = this.add.tween(this.comboLabelText).to({alpha:1}, 300, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  true, 0, 0, false);			
			
			var tween3 = this.add.tween(this.comboLabelText).to({alpha:0}, 500, 
														  Phaser.Easing.Sinusoidal.Linear, 
														  false, 0, 0, false);

			tween.chain(tween3);
		}				
	},
	
	// end COMBO
	
	// SPEED CHANGER

	
	initBlockSpeedChanger:function()
	{
		/*const DELTA_BLOCK_FASTER_SCORE_TRIGGER = 5000;
		const INIT_BLOCK_MOVE_MSEC = 1500;
		const DELTA_BLOCK_MOVE_MSEC = 100;
		const LIMIT_LOWEST_BLOCK_MOVE_MSEC = 500;	
		*/

		this.nextScoreTrigger = DELTA_BLOCK_FASTER_SCORE_TRIGGER;
		this.curBlockSpeedMsec = INIT_BLOCK_MOVE_MSEC; // in sec
	},
	
	changeSpeed:function()
	{
		if (this.score > this.nextScoreTrigger)
		{
			this.nextScoreTrigger += DELTA_BLOCK_FASTER_SCORE_TRIGGER;
			
			if (this.curBlockSpeedMsec > LIMIT_LOWEST_BLOCK_MOVE_MSEC)
			{
				this.curBlockSpeedMsec -= DELTA_BLOCK_MOVE_MSEC;
			}
		}
	},
			
	//
	
	onTap:function(pointer)
	{
        if (pointer.isMouse && !Game.device.desktop)
        {
            return;
        }
		
		if (!this.isGameStarted)
		{
			return;
		}
		
		if (this.isGameOver)
		{
			return;
		}
				
		
		//// console.log(this.isDroppingBlock, this.isShiftingBlock);
		if (!this.isDroppingBlock && !this.isShiftingBlock)
		{
			this.isDroppingBlock = true;
			this.dropBlock();
		}
	},		
	
	// AUDIOS
	
	initAudios:function()
	{
		this.ingameComboSfx = this.add.audio("ingame_combo_sfx");		
		this.ingameBeatHighScoreSfx = this.add.audio("ingame_beat_highscore_sfx");		
		this.ingameGameOverSfx = this.add.audio("ingame_gameover_sfx");    	
		this.ingameNaroBlockSfx = this.add.audio("ingame_naro_blocknya_sfx");
		this.ingameSwipeSfx = this.add.audio("ingame_swipe_sfx");
		this.uiButtonTapSfx = this.add.audio("ui_button_tap");
		
		this.resultRollingScore = this.add.audio("result_rolling_score")		
	},	
	
	
}