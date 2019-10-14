var StateBoot = function()
{

}

StateBoot.prototype =
{
    preload:function()
    {
        ScaleScreen.SetScalePercentage();

        GlobalConst.SetPosX();
        GlobalFunction.SetupGA();

        this.game.clearBeforeRender = false;
        this.game.input.maxPointers = 1;

        this.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        // this.game.time.desiredFps = 60;

        this.game.load.image('bgload', 'Assets/Images/Loader/Background.png');
        this.game.load.image('charload', 'Assets/Images/Loader/Character.png');
        this.game.load.image('loadbarempty', 'Assets/Images/Loader/Loading-Bar-Empty.png');
        this.game.load.image('loadbarfill', 'Assets/Images/Loader/Loading-Bar-Full.png');
		this.game.load.image('bg_polos',  'Assets/Images/Background_Polos.png');
		
        this.game.load.audio('bgmtitle', 'Assets/Sounds/bgm_title.mp3');

        //plugin
        //this.game.plugins.add(Phaser.Plugin.AdvancedTiming, {mode: 'domText'});
        //this.game.add.plugin(PhaserSpine.SpinePlugin);
    },

    create:function()
    {
        this.cacheFont1 = this.game.add.text(0, 0, "", {font: 'Panton-Regular', fill: '#ffffff', fontSize: 24});
        this.cacheFont2 = this.game.add.text(0, 0, "", {font: 'Panton-Bold', fill: '#ffffff', fontSize: 24});

        var userAgent = navigator.userAgent.toLowerCase();
		this.game.state.start('preload');
		/*
        if (!this.game.device.desktop)
        {
            if(userAgent.includes("blios") || userAgent.includes("blandroid"))
            {
                this.game.state.start('preload');
            }
            else
            {
                var caution = this.game.add.text (
                    this.game.world.centerX, this.game.world.centerY,
                    "You need to open this game on bukalapak aps!",
                    { font: '60px', fill: '#ffffff', wordWrap: true, wordWrapWidth: this.game.width * 0.9, align: 'center' }
                );
                caution.anchor.set (0.5);

                document.body.style.background = '#000000';
            }
        }
        else
        {
            var caution = this.game.add.text (
                this.game.world.centerX, this.game.world.centerY,
                "You need to open this game on bukalapak aps!",
                { font: '60px', fill: '#ffffff', wordWrap: true, wordWrapWidth: this.game.width * 0.9, align: 'center' }
            );
            caution.anchor.set (0.5);

            document.body.style.background = '#000000';
        }
		*/
		
        //this.game.state.start('preload');
    },
    
}