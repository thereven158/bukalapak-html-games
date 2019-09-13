var SoundManager = function()
{
    this.BgmGame = GlobalObject.Game.add.audio('bgmgame');
    this.BgmTitle = GlobalObject.BgmTitle;
    this.SfxHighscore = GlobalObject.Game.add.audio('sfxhighscore');
    this.SfxCombo = GlobalObject.Game.add.audio('sfxcombo');
    this.SfxGameover = GlobalObject.Game.add.audio('sfxgameover');
    this.SfxGetStar = GlobalObject.Game.add.audio('sfxgetstar');
    this.SfxGetMeteor = GlobalObject.Game.add.audio('sfxgetmeteor');
    this.SfxSwipe = GlobalObject.Game.add.audio('sfxswipe');
    this.SfxScoreRolling = GlobalObject.Game.add.audio('sfxscore');
    this.SfxBtnCancel = GlobalObject.Game.add.audio('sfxbtncancel');
    this.SfxBtnTap = GlobalObject.Game.add.audio('sfxbtntap');
    this.SfxChangeScene = GlobalObject.Game.add.audio('sfxchangescene');

    GlobalObject.SoundManager = this;
}

SoundManager.prototype.constructor = SoundManager;

SoundManager.prototype.FadeBmgTitle = function()
{
    var tween = GlobalObject.Game.add.tween(this.BgmTitle).to({volume:0}, 1500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        this.BgmTitle.stop();
        this.BgmTitle.volume = 1;
    }, this)
}

SoundManager.prototype.FadeBmgGame = function()
{
    var tween = GlobalObject.Game.add.tween(this.BgmGame).to({volume:0}, 1500, Phaser.Easing.Quadratic.Out, true);
    tween.onComplete.add(()=>
    {
        this.BgmGame.stop();
        this.BgmGame.volume = 1;
    }, this)
}

SoundManager.prototype.PlayBgm = function(bgm)
{
    switch(bgm)
    {
        case GlobalConst.BgmTitle:
        this.BgmTitle.loopFull(1);
        break;
        case GlobalConst.BgmGame:
        this.BgmGame.loopFull(1);
        break;
    }
}

SoundManager.prototype.PlaySfx = function(sfx)
{
    switch(sfx)
    {
        case GlobalConst.SfxHighscore:
        this.SfxHighscore.play();
        break;

        case GlobalConst.SfxCombo:
        this.SfxCombo.play();
        break;

        case GlobalConst.SfxGameover:
        this.FadeBmgGame();
        this.SfxGameover.play();
        break;
        
        case GlobalConst.SfxGetStar:
        this.SfxGetStar.play();
        break;

        case GlobalConst.SfxGetMeteor:
        this.SfxGetMeteor.play();
        break;

        case GlobalConst.SfxSwipe:
        this.SfxSwipe.play();
        break;

        case GlobalConst.SfxScoreRolling:
        this.SfxScoreRolling.play();
        break;

        case GlobalConst.SfxBtnCancel:
        this.SfxBtnCancel.play();
        break;

        case GlobalConst.SfxBtnTap:
        this.SfxBtnTap.play();
        break;

        case GlobalConst.SfxChangeScene:
        var sfxDelay = GlobalObject.Game.time.events.add(Phaser.Timer.SECOND * 0.8, ()=>
        {
            this.SfxChangeScene.play();
            GlobalObject.Game.time.events.remove(sfxDelay);
        }, this);
        break;

        case GlobalConst.SfxChangeSceneExit:
        this.SfxChangeScene.play();
        break;        
    }
}