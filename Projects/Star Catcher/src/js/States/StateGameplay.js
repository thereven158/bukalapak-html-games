var StateGameplay = function()
{
    this.Bg;
    this.BgLight;

    this.Rocket;

    this.Planet1;
    this.Planet2;  

    this.Basket;
    this.ScoreGetStar;
    this.Combo;

    this.TopUi;
    this.Title;
    this.GameOver;
    this.HighScore;

    this.InputManager;
    this.LivesManager;
    this.DropItemManager;
    this.SoundManager;
}

StateGameplay.prototype =
{
    preload:function()
    {
        //ga ('send', 'screenview', { 'appName': 'Catch Star', 'appVersion': '1.0', 'screenName': 'Main Menu' });
        GlobalFunction.SetGAEvent('open stc');
    },

    create:function()
    {
        // var h = GlobalObject.Game.height;
        // var myBitmap = GlobalObject.Game.add.bitmapData(GlobalObject.Game.width, h);
        // var grd=myBitmap.context.createLinearGradient(0,0,0,h);
        // grd.addColorStop(0,"#180D2C");
        // grd.addColorStop(1,"#211963");
        // myBitmap.context.fillStyle=grd;
        // myBitmap.context.fillRect(0,0,GlobalObject.Game.width, h);
        // this.Bg = this.game.add.sprite(0,0, myBitmap);
        // this.Bg.alpha = 1;

        // this.Bg = GlobalObject.Game.add.graphics(0, 0);
        // this.Bg.beginFill(0x211963,1);
        // this.Bg.drawRect(0, 0, GlobalObject.Game.width, GlobalObject.Game.height);

        this.BgLight = GlobalObject.Game.make.sprite(0,0,"bglight");
        this.BgParallax = new BgParallax();

        this.Planet1 = new Planet(true);
        this.Planet2 = new Planet(false);

        this.Planet1.OtherPlanet = this.Planet2;
        this.Planet2.OtherPlanet = this.Planet1;        

        this.Basket = new Basket();
        this.ExplodeParticle = new ExplodeParticle(this.Basket);
        this.ScoreGetStar = new ScoreGetStar();
        this.Combo = new Combo();

        this.TopUi = new TopUi();
        this.Title = new Title();
        this.GameOver = new GameOver();  
        this.HighScore = new Highscore();

        this.InputManager = new InputManager(); 
        this.DropItemManager = new DropItemManager();
        this.SoundManager = new SoundManager();

        this.Title.OnPlay = ()=>
        {
            this.SoundManager.FadeBmgTitle();
            this.SoundManager.PlaySfx(GlobalConst.SfxChangeScene);

            GlobalFunction.SetGAEvent('stc start playing');
        }

        this.Title.OnTitleDoneHiding = ()=>
        {
            GlobalConst.SpeedMultiplier = 1;

            this.TopUi.Show();  
            this.Basket.Show();

            this.SoundManager.PlayBgm(GlobalConst.BgmGame);

        }   

        this.Title.OnScore = ()=>
        {
            this.HighScore.Show();
        }
        this.Title.RegisterEvent();  

        this.HighScore.OnHideExit = ()=>
        {
            this.Title.ShowAfetrScoreHide();
        }        
        this.HighScore.RegisterEvent();

        this.DropItemManager.Star.OnHitBasket = ()=>
        {
            this.Basket.StartShake();
            this.TopUi.Score.AddScore();
            this.ExplodeParticle.Show();            

            if(!this.DropItemManager.Star.IsStarMode && !this.TopUi.LivesManager.GetIsFullLife())
            {
                this.TopUi.LivesManager.AddLives();
                this.ScoreGetStar.ShowPlusHeart(this.Basket);
            }
            else
            {
                this.ScoreGetStar.ShowScore(this.Basket, this.TopUi.Score.IncreaseScore);
            }

            this.DropItemManager.CheckForNewSpawn();
            this.SoundManager.PlaySfx(GlobalConst.SfxGetStar);
        }

        this.DropItemManager.Star.OnOutScreen = ()=>
        {
            this.TopUi.Score.ResetScoreMultiplier();
            this.DropItemManager.CheckForNewSpawn();
        }

        this.DropItemManager.Meteor.OnHitBasket = ()=>
        {
            this.TopUi.LivesManager.ReduceLives();
            this.TopUi.Score.ResetScoreMultiplier();
            this.ScoreGetStar.ShowMinusHeart(this.Basket);
            if(this.TopUi.LivesManager.IndexLives >= 0)
            {
                this.Basket.StartMeteorEffect();
            }
            
            this.DropItemManager.CheckForNewSpawn();
            this.SoundManager.PlaySfx(GlobalConst.SfxGetMeteor);
        }

        this.DropItemManager.Meteor.OnOutScreen = ()=>
        {
            this.DropItemManager.CheckForNewSpawn();
        }

        this.InputManager.OnLeft = ()=>
        {
            this.Basket.MoveLeft();
            this.SoundManager.PlaySfx(GlobalConst.SfxSwipe);
        };
        this.InputManager.OnRight = ()=>
        {
            this.Basket.MoveRight();
            this.SoundManager.PlaySfx(GlobalConst.SfxSwipe);
        };
        this.InputManager.RegistryKey();

        this.TopUi.OnDoneShow = ()=>
        {
            this.DropItemManager.ShowDropItem();
        }

        this.TopUi.Score.OnScore3000 = ()=>
        {
            this.DropItemManager.IncreaseSpawn();
        }

        this.TopUi.Score.OnScoreHitReduceStarRate = ()=>
        {
            this.DropItemManager.DecreaseStarSpawn(this.TopUi.Score.CurrentScore);
        }

        this.TopUi.Score.OnCombo = ()=>
        {
            this.Combo.Show();
            this.SoundManager.PlaySfx(GlobalConst.SfxCombo);
        }

        this.TopUi.Score.OnComboLost = ()=>
        {
            this.Combo.Hide();
        }

        this.TopUi.LivesManager.OnLivesZero = ()=>
        {
            this.Basket.Die();            
            this.TopUi.Hide();
            this.DropItemManager.Init();
            this.HighScore.AddScore(this.TopUi.Score.CurrentScore);

            this.SoundManager.PlaySfx(GlobalConst.SfxGameover);

            GlobalConst.IsZero = this.TopUi.Score.CurrentScore == 0;
            GlobalFunction.SetGAEvent('stc finish playing');            
        }

        this.Basket.OnOutScreen = ()=>
        {
            this.GameOver.Show(this.TopUi.Score.CurrentScore);
        }

        // this.TopUi.Timer.OnTimesUp = ()=>
        // {
        //     GlobalConst.SpeedMultiplier = 1;

        //     this.Basket.DisableMove();
        //     this.DropItem.OnTimesUp();
        //     this.GameOver.Show(this.Score.CurrentScore);
        //     this.TopUi.Hide();
        // }

        this.GameOver.OnDoneShow = ()=>
        {
            if(this.TopUi.Score.CurrentScore > 0)
            {
                this.SoundManager.PlaySfx(GlobalConst.SfxScoreRolling);
            }
        }

        this.GameOver.OnScoreDoneRolling = ()=>
        {
            if(GlobalConst.IsHighscore)
            {
                this.SoundManager.PlaySfx(GlobalConst.SfxHighscore);
            }
        }

        this.GameOver.OnHideReplay = ()=>
        {
            GlobalConst.SpeedMultiplier = 1;
            GlobalFunction.SetGAEvent('stc click main lagi')

            this.TopUi.Show(); 
            this.Basket.Show();

            this.SoundManager.PlayBgm(GlobalConst.BgmGame);
        }

        this.GameOver.OnHideExit = ()=>
        {
            GlobalConst.SpeedMultiplier = 1;
            GlobalFunction.SetGAEvent('stc to main menu');

            this.Title.Show();
            this.Basket.Hide();

            this.SoundManager.PlayBgm(GlobalConst.BgmTitle);
            this.SoundManager.PlaySfx(GlobalConst.SfxChangeSceneExit);

        }
        this.GameOver.RegisterEvent();

        //GlobalObject.Game.add.existing(this.Bg);
        GlobalObject.Game.add.existing(this.Planet1);
        GlobalObject.Game.add.existing(this.Planet2);
        GlobalObject.Game.add.existing(this.BgParallax);
        GlobalObject.Game.add.existing(this.BgLight);
        GlobalObject.Game.add.existing(this.DropItemManager.Star);
        GlobalObject.Game.add.existing(this.DropItemManager.Meteor);
        GlobalObject.Game.add.existing(this.ExplodeParticle);
        GlobalObject.Game.add.existing(this.Basket);
        GlobalObject.Game.add.existing(this.ScoreGetStar);        
        GlobalObject.Game.add.existing(this.Combo);        
        GlobalObject.Game.add.existing(this.Title);
        GlobalObject.Game.add.existing(this.GameOver);
        GlobalObject.Game.add.existing(this.HighScore);
        GlobalObject.Game.add.existing(this.TopUi);        

        this.ScaleAll();
    },

    update:function()
    {
        this.InputManager.CheckingMouseInput();
    },

    ScaleAll:function()
    {
        //ScaleScreen.ScaleFit(this.Bg);        
        ScaleScreen.ScaleFit(this.BgLight);        

        //this.Rocket.Scale();
        this.Basket.Scale();
        this.DropItemManager.Star.Scale();
        this.DropItemManager.Meteor.Scale();
        this.ScoreGetStar.Scale();   
        this.Combo.Scale();   
        this.TopUi.Scale(); 
        this.Title.Scale();
        this.GameOver.Scale();
        this.HighScore.Scale();
        this.ExplodeParticle.Scale();        
        this.BgParallax.Scale();
    }
}