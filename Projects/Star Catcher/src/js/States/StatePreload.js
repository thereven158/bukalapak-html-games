var StatePreload = function()
{

}

StatePreload.prototype =
{
    preload:function()
    {
        GlobalFunction.SetGAEvent('stc start loading');
    },

    create:function()
    {
        this.Bg = GlobalObject.Game.add.sprite(0,0,"bgload");

        this.CharLoad = GlobalObject.Game.add.sprite(GlobalObject.Game.width*0.5, GlobalObject.Game.height*0.5,"charload");
        this.CharLoad.anchor.set(0.5);

        this.LoadBarEmpty = GlobalObject.Game.add.sprite(GlobalObject.Game.width*0.5,this.CharLoad.y+this.CharLoad.height*0.5,"loadbarempty");
        this.LoadBarEmpty.anchor.set(0.5,0);

        this.LoadBarFill = GlobalObject.Game.add.sprite(GlobalObject.Game.width*0.5,this.CharLoad.y+this.CharLoad.height*0.5,"loadbarfill");
        this.LoadBarFill.anchor.set(0.5,0);       
         
        this.LoadProgress = 0;
        this.LoadProgressReal = 0;
        this.LoadMinTime = 1;
        this.IsLoadProgressRealDone = false;

        GlobalObject.BgmTitle = GlobalObject.Game.add.audio('bgmtitle');
        GlobalObject.BgmTitle.loopFull(1);

        this.ScaleAll();        

        this.LoadResource();

        this.game.load.onLoadStart.add(this.LoadStart, this);
        this.game.load.onFileComplete.add(this.FileComplete, this);
        this.game.load.onLoadComplete.add(this.LoadComplete, this);
        this.game.load.start();
    },

    update:function()
    {
        // if(this.MaskPreloader != null)
        // {
        //     this.MaskPreloader.clear();
        //     this.MaskPreloader.drawRoundedRect(0, 0, this.LoadBarFill.width*this.LoadProgress/this.LoadMinTime, this.LoadBarFill.height, 0);
        // }
        // this.LoadProgress += GlobalObject.Game.time.elapsed;

        // if(this.LoadProgress >= this.LoadProgressReal)
        // {
        //     this.LoadProgress = this.LoadProgressReal;
        // }

        // if(this.LoadProgress >= this.LoadMinTime)
        // {
        //     if(this.IsLoadProgressRealDone)
        //     {
        //         this.GoToGamePlay();
        //     }
        // }
    },

    shutdown : function ()  
    {
        this.game.load.onLoadStart.remove(this.LoadStart, this);
        this.game.load.onFileComplete.remove(this.FileComplete, this);
        this.game.load.onLoadComplete.remove(this.LoadComplete, this);

        this.game.cache.removeImage("bgload", true);
        this.game.cache.removeImage("charload", true);
        this.game.cache.removeImage("loadbarempty", true);
        this.game.cache.removeImage("loadbarfill", true);
    },

    LoadResource: function()
    {
        this.game.load.image("transparent", 'Assets/Images/transparent.png');
        this.game.load.image("texttitle", 'Assets/Images/Game_Title.png');
        
        this.game.load.image("resultpanel", 'Assets/Images/UI/Result.png');
        this.game.load.image("scorepanel", 'Assets/Images/UI/Skor.png');

        this.game.load.image('chardie', 'Assets/Images/Character/CharacterFail.png');
        this.game.load.spritesheet("chargethit", 'Assets/Images/Character/Get_Hit.png',330,476);
        this.game.load.spritesheet("chargetstar", 'Assets/Images/Character/Get_Star.png',330,476);
        this.game.load.spritesheet("charidle", 'Assets/Images/Character/Idle.png',330,476);

        this.game.load.spritesheet("starparticle", 'Assets/Images/Get_Star_Particle.png',429,190);

        this.game.load.image("bglight", 'Assets/Images/Background/Light.png');
        // this.game.load.image("bgparalax1", 'Assets/Images/Background/Background_Layer_2-1.png');
        // this.game.load.image("bgparalax2", 'Assets/Images/Background/Background_Layer_2-2.png');

        this.game.load.atlas('atlas1', 'Assets/Images/textureatlas1.png', 'Assets/Images/textureatlas1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        // this.game.load.spine(
        //     'char',                        //The key used for Phaser's cache
        //     'Assets/Images/Spine/Char/skeleton.json'    //The location of the spine's json file
        //     );

        //sound
        this.game.load.audio('bgmgame', 'Assets/Sounds/bgm_InGame1.mp3');        
        this.game.load.audio('sfxhighscore', 'Assets/Sounds/ingame_beat highscore.mp3');
        this.game.load.audio('sfxcombo', 'Assets/Sounds/ingame_combo.mp3');
        this.game.load.audio('sfxgameover', 'Assets/Sounds/ingame_game_over.mp3');
        this.game.load.audio('sfxgetstar', 'Assets/Sounds/ingame_get star.mp3');
        this.game.load.audio('sfxgetmeteor', 'Assets/Sounds/ingame_kena obstacle.mp3');
        this.game.load.audio('sfxswipe', 'Assets/Sounds/ingame_swipe.mp3');
        this.game.load.audio('sfxscore', 'Assets/Sounds/result_rolling score.mp3');
        this.game.load.audio('sfxbtncancel', 'Assets/Sounds/ui_button_cancel.mp3');
        this.game.load.audio('sfxbtntap', 'Assets/Sounds/ui_button_tap.mp3');
        this.game.load.audio('sfxchangescene', 'Assets/Sounds/ui_ganti_scene.mp3');
    },

    LoadStart : function()
    {

    },

    FileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles)
    {
        //this.LoadProgressReal = progress*this.LoadMinTime/10;
        if(this.MaskPreloader != null)
        {
            this.MaskPreloader.clear();
            this.MaskPreloader.drawRoundedRect(0, 0, this.LoadBarFill.width*progress/100, this.LoadBarFill.height, 0);       
        }
    },

    LoadComplete : function()
    {        
        GlobalFunction.SetGAEvent('stc finish loading');

        this.IsLoadProgressRealDone = true;
        this.GoToGamePlay();
    },

    GoToGamePlay:function()
    {       
        //var enabled = this.game.renderer.setTexturePriority(['atlas1','bglight', 'starparticle', 'charidle', 'chargetstar', 'chargethit', 'chardie']);

        this.game.state.start('gameplay');
        //this.game.state.start('titlescreen');
        //this.game.state.start('loading');
        //this.game.state.start('achievement');
    },

    ScaleAll : function()
    {
        ScaleScreen.ScaleFit(this.Bg);
        ScaleScreen.ScaleObject(this.CharLoad,683,672);
        ScaleScreen.ScaleObject(this.LoadBarEmpty,843,86);
        ScaleScreen.ScaleObject(this.LoadBarFill,843,86);

        this.LoadBarEmpty.y = this.CharLoad.y+this.CharLoad.height*0.5;
        this.LoadBarFill.y = this.LoadBarEmpty.y;

        this.MaskPreloader = GlobalObject.Game.add.graphics(this.LoadBarFill.x-this.LoadBarFill.width*0.5, this.LoadBarFill.y);
        this.MaskPreloader.beginFill(0xb9dcf3); 
        //this.MaskPreloader.drawEllipse(25, this.LoadBarFill.height*0.5, 50, this.LoadBarFill.height*0.45);
        //this.MaskPreloader.drawCircle(this.LoadBarFill.height*0.5, this.LoadBarFill.height*0.5, this.LoadBarFill.height);
        this.MaskPreloader.drawRect(0, 0, 0, this.LoadBarFill.height, 0);

        this.LoadBarFill.mask = this.MaskPreloader;
    }
}