import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import VoucherView from '../../view/popup_voucher_view';
import VoucherData from '../../voucherdata';
import GameplayData from '../../gameplaydata';
import Image from '../../module/objects/image';

import TimerEventController from '../../gameplay/timer/timer_event_controller';

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
		
		this.initEdible();
    }

	createTimer()
	{
		this.gameTimer = new TimerEventController(this);		
		this.gameTimer.createView();
		this.gameTimerView = this.gameTimer.view;
		
		this.panelTimer = this.view.timerPanel;
		
		this.gameTimerView.timer1stDigitText.setPosition(this.panelTimer.x - this.panelTimer.displayWidth * 0.705, this.panelTimer.y + this.panelTimer.displayHeight * 0.44);
		this.gameTimerView.timer2ndDigitText.setPosition(this.panelTimer.x - this.panelTimer.displayWidth * 0.555, this.panelTimer.y + this.panelTimer.displayHeight * 0.44);
		this.gameTimerView.timerPeriodText.setPosition(this.panelTimer.x - this.panelTimer.displayWidth * 0.450, this.panelTimer.y + this.panelTimer.displayHeight * 0.44);
		this.gameTimerView.timer3rdDigitText.setPosition(this.panelTimer.x - this.panelTimer.displayWidth * 0.335, this.panelTimer.y + this.panelTimer.displayHeight * 0.44);
		this.gameTimerView.timer4thDigitText.setPosition(this.panelTimer.x - this.panelTimer.displayWidth * 0.185, this.panelTimer.y + this.panelTimer.displayHeight * 0.44);		
	}
	
	initInput()
	{
		this.input.on('pointerdown', (pointer) => {
			if (this.isGameOver) return;
			
			if (this.minion.anims.getCurrentKey() == "minion_idle")
			{
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
			if (this.minion.anims.currentFrame.textureFrame == 11) {
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
		this.minion.anims.play("minion_yummy");
	}
	
	yuckEv()
	{
		this.minion.anims.play("minion_yucky");
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
				
				this.physics.moveTo(item, this.ScreenUtility.GameWidth * 0.5, endY, 1000);	
				
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

	
    InitAudio(){

    }

    create(){
        this.view = new GameplaySceneView(this).create();
		this.createTimer();
		
		this.minion = this.view.minion;
		this.view.setMinionEvents(() => {
			this.prepareSpawnItem();
		});
		
        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
		
		this.gameTimer.activateTimer(GameplayData.GameTime, () => {
			this.GameOver();
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
        }else{
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