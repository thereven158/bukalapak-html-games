import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import GameplayData from '../../gameplaydata';
import Image from '../../module/objects/image';

import ScoreController from '../../gameplay/score/score_controller';
import TimerEventController from '../../gameplay/timer/timer_event_controller';
import LifeController from '../../gameplay/life/life_controller';

import MusicPlayer from '../../module/music_player/music_player';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init(){
        console.log('game screen');
		
        this.InitGame();
        this.InitGameData();
        this.InitAudio();
		
		this.initInput();
    }

    InitGame(){ 
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitGameData(){
        this.IsGameStarted = false;
        this.IsGameWin = true;	
		this.itemType = -1;
		this.isGameOver = false;
		
		this.targetGoal = GameplayData.TargetGoal;
		this.progressGoal = 0;
		
		this.initEdible();
    }

	initInput()
	{
		this.input.on('pointerdown', (pointer) => {
			if (this.isGameOver) return;
			
			if (this.minion.anims.getCurrentKey() == "minion_idle")
			{
				this.sound.play("master_sfx");
				this.eatSomething();
			}
    	}, this);
	}
	
	eatSomething()
	{
		this.view.setMinionEatAnimation();
	}
	
	updateEating()
	{
		if (this.minion.anims.getCurrentKey() == "minion_eat")
		{
			if (this.minion.anims.currentFrame.textureFrame == "Artboard 17.png") {
				this.checkItemDistance();
			}
		}
	}
	
	checkItemDistance()
	{
		if (!this.droppingItem) return;
		
		let distance = (this.minion.y-this.minion.displayHeight * 0.2) - this.droppingItem.y;
		
		if (distance >= 0 && distance <= 200)
		{
			this.itemReachMinionEv();
		}
	}
	
	itemReachMinionEv()
	{
		this.resetBody(this.droppingItem);
		
		if (this.itemType == 0)
		{
			this.yummyEv();
		}
		else if (this.itemType == 1)
		{
			this.yuckEv();
		}
		
	}	
	
	yummyEv()
	{
		this.sound.play("ingame_upak_munch_sfx", {volume:1});
		
		this.progressGoal++;
		this.scoreObj.addScore(GameplayData.BaseScore);
		this.minion.anims.play("minion_yummy");
		
		if (this.progressGoal >= this.targetGoal)
		{
			this.prepareWinGame();
		}
	}
	
	yuckEv()
	{
		this.sound.play("ingame_upak_hit_sfx", {volume:1});
		
		this.lifeObj.reduceLife(1);
		this.minion.anims.play("minion_yucky");
		
		if (this.lifeObj.curLife == 0)
		{
			this.prepareGameOver();
		}		
	}	
	
	initEdible()
	{
		this.resetItems();
		
		this.spawnTimer = new TimerEventController(this);
		
		this.maxTotalItem = GameplayData.TotalItem;
		this.maxInedible = GameplayData.TotalItem - GameplayData.MaxEdible;
		this.maxEdible = GameplayData.MaxEdible;
		
		this.edibleChance = GameplayData.ChanceEdibleOccurance;
		
		this.edibleImage = new Image(this, this.ScreenUtility.GameWidth * 0.5, 0, 'ball');
		this.edibleImage.setOrigin(0.5, 1);
      	this.edibleImage.setDisplayWidth(this.ScreenUtility.GameWidth * 0.25, true);		
		
		this.inedibleImage = new Image(this, this.ScreenUtility.GameWidth * 0.5, 0, 'wrench');
		this.inedibleImage.setOrigin(0.5, 1);
      	this.inedibleImage.setDisplayWidth(this.ScreenUtility.GameWidth * 0.45, true);
		
		this.droppingItem = null;
		
		this.droppingItemGroup = this.physics.add.group();
	}
	
	dropItem(index)
	{
		if (index == 0)
		{
			this.droppingItem = this.edibleImage;
		}
		else
		{
			this.droppingItem = this.inedibleImage;
		}
		
		this.itemType = index;
	
		this.setBody(this.droppingItem);
	}
	
	updateDroppingItem()
	{
		if (this.droppingItem) 
		{
			let members = this.droppingItemGroup.getChildren();
		
			members.forEach(item => 
			{
				let endY = this.ScreenUtility.GameHeight * 1.1 + this.droppingItem.height;
				
				this.physics.moveTo(item, this.ScreenUtility.GameWidth * 0.5, endY, 1000, 1000);	
				
				if (item.y >= endY)
				{
					this.resetBody(item);
					this.prepareSpawnItem();
				}
			});	
			
			
		}
	}
	
	setBody(sprite)
	{
		this.droppingItemGroup.add(sprite);
		sprite.body.enable = true;
		sprite.visible = true;
		sprite.setDepth(100);
	}
	
	resetBody(sprite)
	{
		sprite.body.reset(0,0);
		sprite.body.enable = false;		
		sprite.visible = false;
		sprite.setPosition(this.ScreenUtility.GameWidth * 0.5, -100);		
		
		this.droppingItemGroup.remove(sprite);
		
		this.droppingItem = null;
	}
	
	resetItems()
	{
		this.totalItemSpawned = 0;
		this.nEdibleSpawned = 0;
		this.nInEdibleSpawned = 0;		
	}
	
	prepareSpawnItem()
	{
		this.spawnTimer.activateTimer(GameplayData.SpawnTime, () => {
			this.spawnItem();
		}, false);				
	}
	
	spawnItem()
	{
		let itemCode = this.spawnItemCode();
		
		this.dropItem(itemCode);		
	}
	
	spawnItemCode()
	{		
		let outputType = -1;
		
		if (this.nEdibleSpawned < this.maxEdible && this.nInEdibleSpawned < this.maxInedible)
		{
			let isSpawnEdible = this.edibleChance > 1 - Math.random();

			if (isSpawnEdible) 
			{
				this.nEdibleSpawned++;
				outputType = 0;
			}
			else
			{
				this.nInEdibleSpawned++;
				outputType = 1;
			}
		}
		else if (this.nEdibleSpawned >= this.maxEdible && this.nInEdibleSpawned < this.maxInedible)
		{
			this.nInEdibleSpawned++;
			outputType = 1;			
		}
		else if (this.nInEdibleSpawned >= this.maxInedible && this.nEdibleSpawned < this.maxEdible)
		{
			this.nEdibleSpawned++;
			outputType = 0;
		}
		
		this.totalItemSpawned++;

		if (this.totalItemSpawned == this.maxTotalItem)
		{
			this.resetItems();
		}
		
		return outputType;
	}

	prepareGameOver()
	{
		this.gameTimer.pause();
		this.spawnTimer.pause();	
		if (this.droppingItem) this.resetBody(this.droppingItem);
	}
	
	prepareWinGame()
	{
		this.gameTimer.pause();
		this.spawnTimer.pause();
		if (this.droppingItem) this.resetBody(this.droppingItem);		
	}
	
    InitAudio(){
		MusicPlayer.getInstance().PlayMusic('ingame_bgm');	
    }
	
	createTimer()
	{
		this.gameTimer = new TimerEventController(this);		
		this.gameTimer.createView();
		this.gameTimerView = this.gameTimer.view;	
	}
	
	createLife()
	{
        this.lifeObj = new LifeController(this);
		this.lifeObj.createView();		
	}
	
	createScore()
	{
        this.scoreObj = new ScoreController(this);
		this.scoreObj.createView();				
	}

    create(){
        this.view = new GameplaySceneView(this).create();
		this.createTimer();
						
		this.minion = this.view.minion;
		this.view.setMinionEvents(() => {
			this.prepareSpawnItem();
		}, () => {
			if (this.progressGoal < this.targetGoal)
			{
				return false;
			}
			else
			{
				this.WinGame();
				return true;
			}			
		}, () => {
			if (this.lifeObj.checkIfLifeZero())
			{
				this.GameOver();
				return true;
			}
			else
			{
				return false;
			}
				
		});
				
		this.createScore();
		this.createLife();
		
        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
		
		this.gameTimer.activateTimer(GameplayData.GameTime, () => {
			this.sound.play("ingame_timeout_sfx");
			this.prepareGameOver();
			window.setTimeout(() => {
				this.GameOver();
			}, 1000);		
		}, false);
		
		this.prepareSpawnItem();
		
        //this.GameOver();
    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

    }

    gameUpdate(timestep, delta){
		if (this.gameTimer) this.gameTimer.update(delta);
		if (this.spawnTimer) this.spawnTimer.update(delta);
		if (this.droppingItem) this.updateDroppingItem();
		
		this.updateEating();
    }

	WinGame(){		
		this.IsGameWin = true;
        this.IsGameStarted = false;
		this.isGameOver = true;
		
        this.ShowResult();		
	}
	
    GameOver(){
		this.IsGameWin = false;
        this.IsGameStarted = false;
		this.isGameOver = true;

		this.gameTimer.pause();
		this.spawnTimer.pause();
		if (this.droppingItem) this.resetBody(this.droppingItem);
		
        this.ShowResult();
    }

    Restart = ()=>{
        this.scene.restart();
    }

    BackToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    ShowResult = ()=>{
        this.VoucherView = new VoucherView(this);
        this.VoucherView.OnClickMainLagi(this.Restart);
        this.VoucherView.OnClickClose(this.BackToTitle);
        
        let voucherData = VoucherData.Vouchers[CONFIG.VOUCHER_TYPE];

        if(this.IsGameWin){
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
        }
		else if (this.gameTimer.time <= 0){
			this.sound.play("ingame_fail_sfx", {volume:1});
            this.VoucherView.DisableVoucherCode()
            this.VoucherView.SetDescription('voucher_headertimeout', 
                "Timeout", 
                VoucherData.VoucherTimeout.Title, 
                VoucherData.VoucherTimeout.Description
            );
        }
		else{
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