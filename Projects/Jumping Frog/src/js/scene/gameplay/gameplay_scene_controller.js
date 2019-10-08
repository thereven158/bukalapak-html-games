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
        this.IsGameStarted = false;
        this.IsGameWin = true;
		this.isGameOver = false;
		
		this.isMoving = false;
		this.stepped = 0;
		
		this.goalTarget = GameplayData.TargetGoal;
		this.goalProgress = 0;
    }

    initAudio = ()=>{
		MusicPlayer.getInstance().PlayMusic('ingame_bgm');	
    }
	
	initInput()
	{
		this.input.on('pointerdown', (pointer) => {
			if (this.isGameOver) return;
			
			this.moveMinion();
    	}, this);
	}	

    create = ()=>{
        this.view = new GameplaySceneView(this).create();
		this.player = this.view.player;
		this.player.setDepth(10);
		
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
				this.gameOver();
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
		if (this.gameTimer) this.gameTimer.update(delta);
    }

	initAsteroids()
	{	
		this.nPosts = 5;
		this.startPoint = this.ScreenUtility.GameHeight * 0.7;
		
		let asteroid = this.view.createAsteroid();
		
		//this.deltaPoint = this.ScreenUtility.GameHeight / this.nPosts;
		this.deltaPoint = asteroid.height * 1.05;
		asteroid.destroy();
		
		this.asteroids = [];
		this.nextAsteroid = null;
		
		for (let i=0;i<this.nPosts;i++)
		{
			asteroid = this.view.createAsteroid();
			//asteroid.visible = false;
			
			this.asteroids.push(asteroid);
		}
		
		for (let i=0;i<this.nPosts;i++)
		{
			let asteroid = this.asteroids[i];
			asteroid.visible = true;
			asteroid.setPosition(this.ScreenUtility.GameWidth * 0.5, this.startPoint - this.deltaPoint * i);
		}
		
		this.nextAsteroid = this.asteroids[0];
	}

	shiftAsteroid()
	{
		let asteroid = this.asteroids.shift();
		asteroid.y = this.startPoint - this.deltaPoint * (this.nPosts - 2);
		
		this.asteroids.push(asteroid);
		
		//console.log(this.asteroids.length);
	}

	moveAsteroids()
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
					
					if (asteroid.y > this.ScreenUtility.GameHeight)
					{
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
		
		this.isMoving = true;
		
		this.player.anims.play("player_jump");
		
		if (this.stepped == 1)
		{
			this.moveAsteroids();
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
						this.player.anims.play("player_idle");
						this.scoreObj.addScore(100);
						this.goalProgress += 1;
						
						console.log(this.goalProgress, this.goalTarget);
						
						if (this.goalProgress >= this.goalTarget)
						{
							this.IsGameWin = true;
							this.showResult();
						}
					}
					else
					{
						//this.player.anims.play("player_idle");
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
						this.player.anims.play("player_idle");
						this.scoreObj.addScore(100);
						this.goalProgress += 1;
					}
					else
					{
						//this.player.anims.play("player_idle");
					}
				}
			});			
		}
	}

	checkLanding()
	{
		return true;
	}

	prepareGameOver()
	{
		
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
                "Timeout", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
        
        this.VoucherView.Open();
    }
	
}