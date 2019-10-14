import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import GameplayData from '../../gameplaydata';

import ScoreController from '../../gameplay/score/score_controller';
import TimerEventController from '../../gameplay/timer/timer_event_controller';

import MusicPlayer from '../../module/music_player/music_player';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init = ()=>{
        console.log('game screen')

        this.initGame();
        this.initGameData();
        this.initAudio();
		this.initInput();
    }

    initGame = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    initGameData = ()=>{
		let defaultSizeRatio = this.ScreenUtility.GameDefaultWidth/this.ScreenUtility.GameDefaultHeight;		
		let curSizeRatio = this.ScreenUtility.GameWidth/this.ScreenUtility.GameHeight;
		
		this.defaultAndCurSizeRatio = defaultSizeRatio/curSizeRatio;
				
        this.IsGameStarted = false;
        this.IsGameWin = true;
		this.isGameOver = false;
		this.isGameFinished = false;
		
		this.hasShifted = false;
		
		this.isMoving = false;
		this.stepped = 0;
		this.offsetIndex = -1;
		
		this.goalTarget = GameplayData.TargetGoal;
		this.goalProgress = 0;
    }

    initAudio = ()=>{
		MusicPlayer.getInstance().PlayMusic('ingame_bgm');	
    }
	
	initInput()
	{
		this.input.on('pointerdown', (pointer) => {
			
			if (this.isGameOver || this.isGameFinished) return;
			
			this.moveMinion();
    	}, this);
	}	

    create = ()=>{
        this.view = new GameplaySceneView(this).create();
		this.player = this.view.player;
		this.player.setDepth(10);
		this.view.setAfterMinionDestroyEvent(() => {
			if (this.goalProgress >= this.goalTarget)
			{
				this.prepareVictory();
			}
			else 
			{
				this.gameOver();			
			}			
		});
		
		this.initAsteroids();
		this.view.initTopUiScreen();
		this.createTimer();
		this.createScore();
						
        this.startGame();
    }

	createTimer()
	{
		this.gameTimer = new TimerEventController(this);		
		this.gameTimer.createView();
		this.gameTimerView = this.gameTimer.view;	
	}

	createScore()
	{
        this.scoreObj = new ScoreController(this);
		this.scoreObj.createView();				
	}	
	
    startGame = ()=>{
        this.IsGameStarted = true;

		this.gameTimer.activateTimer(GameplayData.GameTime, () => {
			this.sound.play("ingame_timeout_sfx");
			this.prepareGameOver();
			window.setTimeout(() => {
				
			if (this.goalProgress >= this.goalTarget)
			{
				this.prepareVictory();
			}
			else 
			{
				this.gameOver();			
			}
			
			}, 1000);		
		}, false);		
		
        //this.gameOver();
    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

    }

    gameUpdate(timestep, delta){
		if (this.isGameFinished || this.isGameOver) return;
		
		if (this.gameTimer) this.gameTimer.update(delta);
		
		this.updateAsteroids();
		this.moveHorizontalMinion();
    }

	initAsteroids()
	{	
		this.defaultSpeed = GameplayData.BaseSpeed;
		
		this.nPosts = this.goalTarget;
		this.startPoint = this.ScreenUtility.GameHeight * 0.7;
		
		let asteroid = this.view.createAsteroid();
		
		//this.deltaPoint = this.ScreenUtility.GameHeight / this.nPosts;
		this.deltaPoint = asteroid.displayHeight * 1.05;// * 1.1 * this.defaultAndCurSizeRatio;
		asteroid.destroy();
		
		this.asteroids = [];
		this.nextAsteroid = null;
		this.curAsteroid = null;
		
		for (let i=0;i<this.nPosts;i++)
		{
			asteroid = this.view.createAsteroid();
			//asteroid.visible = false;
			
			this.asteroids.push(asteroid);
		}
		
		for (let i=0;i<this.nPosts;i++)
		{
			let asteroid = this.asteroids[i];
			asteroid.setPosition(this.ScreenUtility.GameWidth * 0.5, this.startPoint - this.deltaPoint * i);	
			
			//console.log(asteroid.y);
			
			this.initAsteroidPiece(asteroid, i);			
		}
		
		this.nextAsteroid = this.asteroids[0];
	}

	initAsteroidPiece(asteroid, index)
	{
		let speed = (Math.random()>0.5?this.defaultSpeed:-this.defaultSpeed);
		let speedIncrementScale = GameplayData.SpeedIncrementScale * this.defaultAndCurSizeRatio;
		
		asteroid.xSpeed = speed + (speed * speedIncrementScale * index);
				
		if (asteroid.y < this.ScreenUtility.GameHeight * -0.2)
		{
			//this.shiftAsteroid();
		}
		
		asteroid.x = this.ScreenUtility.GameWidth * Math.random();	
	}


	updateAsteroids()
	{
		for (let i=0;i<this.nPosts;i++)
		{
			let asteroid = this.asteroids[i];
			
			this.moveAsteroid(asteroid);
		}
	}

	moveAsteroid(asteroid)
	{
		let offset = 1;
		
		//console.log(asteroid.displayWidth/asteroid.oriWidth, "ASAAAAAAAAAA");
		
		//console.log(asteroid.displayWidth/asteroid.oriWidth);
		
		let boundPoint = 0.4 / this.defaultAndCurSizeRatio * (asteroid.displayWidth/asteroid.oriWidth);
		
		asteroid.x += asteroid.xSpeed * this.defaultAndCurSizeRatio;		
		
		if (asteroid.x > this.ScreenUtility.GameWidth - asteroid.displayWidth * boundPoint)
		{
			asteroid.x = this.ScreenUtility.GameWidth - asteroid.displayWidth * boundPoint - offset;
			asteroid.xSpeed = -asteroid.xSpeed;
		}
		else if (asteroid.x < asteroid.displayWidth * boundPoint)
		{
			//console.log(asteroid.width, boundPoint, offset, asteroid.width * boundPoint + offset);
			
			asteroid.x = asteroid.displayWidth * boundPoint + offset;
			asteroid.xSpeed = -asteroid.xSpeed;
		}
	}

	shiftAsteroid()
	{
		let asteroid = this.asteroids.shift();
		asteroid.y = this.startPoint - this.deltaPoint * (this.nPosts - 2 - (this.offsetIndex-1));
		
		let speedIncrementScale = GameplayData.SpeedIncrementScale;
		asteroid.xSpeed = Math.abs(this.asteroids[this.asteroids.length-1].xSpeed) + speedIncrementScale * this.defaultSpeed * (Math.random()>0.5?1:-1);		
		
		// speed + (speed * speedIncrementScale * this.goalProgress)
		
		this.asteroids.push(asteroid);
		
		//console.log(this.asteroids.length);
	}

	moveVerticalAsteroids()
	{		
		for (let i=0;i<this.asteroids.length;i++)
		{
			let asteroid = this.asteroids[i];
			
			var tween = this.tweens.add({
				targets: asteroid,
				y: asteroid.y + this.deltaPoint,
				duration: 250,
				ease: 'Linear',
				onComplete: () => {
					this.isMoving = false;
					this.player.anims.play("player_idle");		

					if (asteroid.y >= this.ScreenUtility.GameHeight * -0.2)
					{
						asteroid.visible = true;
					}					
					
					if (asteroid.y > this.ScreenUtility.GameHeight)
					{
						asteroid.visible = false;
						
						if (!this.hasShifted) this.hasShifted = true;
						this.shiftAsteroid();						
					}
				}
			});			
		}	
	}

	moveStartLand()
	{
		let landStart = this.view.landStart;
		
		var tween = this.tweens.add({
			targets: landStart,
			y: landStart.y + this.deltaPoint,
			duration: 250,
			ease: 'Linear',
			onComplete: () => {
				if (landStart.y > this.ScreenUtility.GameHeight)
				{
					landStart.visible = false;
				}
			}
		});			
	}

	moveMinion()
	{
		if (this.isMoving) return;
		
		this.sound.play("ingame_upak_jump_sfx", {volume:1});
		
		this.isMoving = true;
		
		this.player.anims.play("player_jump");
		
		if (this.stepped == 1)
		{
			this.moveVerticalAsteroids();
			this.moveStartLand();
			
			var tween = this.tweens.add({
				targets: this.player,
				y: this.player.y,
				duration: 250,
				ease: 'Linear',
				onComplete: () => {
					this.isMoving = false;
					
					let isLanded = this.checkLanding();
					if (isLanded)
					{
						this.triggerLandedEvent();
					}
					else
					{
						this.triggerFailedLandingEvent();						
					}
				}
			});						
		}
		else
		{
			this.stepped++;
			
			var tween = this.tweens.add({
				targets: this.player,
				y: this.nextAsteroid.y,
				duration: 250,
				ease: 'Linear',
				onComplete: () => {
					this.isMoving = false;
					
					let isLanded = this.checkLanding();
					if (isLanded)
					{
						this.triggerLandedEvent();
					}
					else
					{
						this.triggerFailedLandingEvent();
					}
				}
			});			
		}
	}

	moveHorizontalMinion()
	{
		if (this.curAsteroid && !this.isMoving)
		{
			this.player.x += this.curAsteroid.xSpeed * this.defaultAndCurSizeRatio;
		}
	}

	checkLanding()
	{
		let intolerance = 0.5-GameplayData.CheckCollisionIntolerance; // 
		let leftBound = this.nextAsteroid.x - this.nextAsteroid.displayWidth * this.defaultAndCurSizeRatio * intolerance;
		let rightBound =  this.nextAsteroid.x + this.nextAsteroid.displayWidth  * this.defaultAndCurSizeRatio * intolerance;
		
		let checkWidth = this.player.x >= leftBound && this.player.x <= rightBound;
		
		let output = checkWidth;
					
		return output;
	}

	triggerLandedEvent()
	{
		this.sound.play("ingame_upak_lands_sfx", {volume:1});
		
		this.player.anims.play("player_idle");
		this.scoreObj.addScore(100);
		this.goalProgress += 1;

		//console.log(this.offsetIndex);
		
		if (this.hasShifted)
		{	
			this.nextAsteroid = this.asteroids[this.offsetIndex+1];
			this.curAsteroid = this.asteroids[this.offsetIndex];
			//this.offsetIndex = 0;
		}
		else
		{						
			this.curAsteroid = this.asteroids[this.goalProgress-1];
			this.nextAsteroid = this.asteroids[this.goalProgress];	
			this.offsetIndex++;
		}		
		
		//this.offsetIndex++;
		
		//if (this.stepped == 1)
		//{
				
		//}
		
		//if (this.goalProgress >= this.goalTarget)
		//{
		//	this.prepareVictory();
		//}
		//else 
		//{
			//this.nextAsteroid = this.asteroids[1];		
		//}
	}

	triggerFailedLandingEvent()
	{
		this.sound.play("ingame_upak_fall_sfx", {volume:1});
		this.player.anims.play("player_destroy");
		
		this.prepareGameOver();
	}

	prepareVictory()
	{
		this.IsGameWin = true;
		this.isGameFinished = true;
		
		window.setTimeout(() => {
			this.showResult();
		}, 1000);		
	}

	prepareGameOver()
	{
		this.isGameOver = true;
						
		//console.log("FAILED");		
	}

    gameOver = ()=>{
        this.IsGameStarted = false;
		this.IsGameWin = false;
		this.isGameOver = true;

        this.showResult();
    }

    restart = ()=>{
        this.scene.restart();
    }

    backToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    showResult = ()=>{
        this.VoucherView = new VoucherView(this);
        this.VoucherView.OnClickMainLagi(this.restart);
        this.VoucherView.OnClickClose(this.backToTitle);
        
        let voucherData = VoucherData.Vouchers[CONFIG.VOUCHER_TYPE];

        if(this.IsGameWin) {
			this.sound.play("ingame_success_sfx", {volume:1});
            this.VoucherView.ShowVoucherCode(voucherData.Code, {
                titleInfo :  voucherData.InfoTitle,
                description : voucherData.InfoDescription,
                expireDate : voucherData.ExpireDate,
                minTransactionInfo : voucherData.MinimalTransactionInfo,
                onlyAppliesInfo : voucherData.OnlyAppliesInfo,
                termsandconditions : voucherData.TermsAndConditions,
            });

            this.VoucherView.SetDescription('voucher_headerwin', 
                "Voucher", 
                voucherData.Title, 
                voucherData.Description
            );
        } else if (this.gameTimer.time <= 0) {
			this.sound.play("ingame_fail_sfx", {volume:1});
            this.VoucherView.DisableVoucherCode()
            this.VoucherView.SetDescription('voucher_headertimeout', 
                "Timeout", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
		else {
			this.sound.play("ingame_fail_sfx", {volume:1});
            this.VoucherView.DisableVoucherCode()
            this.VoucherView.SetDescription('voucher_headertimeout', 
                "Failed", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
        
        this.VoucherView.Open();
    }
	
}