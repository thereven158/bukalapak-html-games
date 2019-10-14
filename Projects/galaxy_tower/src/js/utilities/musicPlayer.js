var MusicPlayer = function(game)
{
    this.init(game);
}

MusicPlayer.prototype = 
{ 
    init: function(game)
    {
		this.curMusic = "";
		this.curMusicObj = null;
		this.game = game;
	},
	
	playMusic: function(newMusicName, isForceRestart=false, isFadeIn=false, secFade=1000)
	{
		//console.log(this.checkCurMusic(newMusicName) && !isForceRestart);
		
		if (this.checkCurMusic(newMusicName) && !isForceRestart)
		{
			return;
		}

		this.stopMusic();
		
		this.curMusic = newMusicName;
		this.curMusicObj = this.game.add.audio(newMusicName);

		//Cur_Music_Obj.volume = 0.35;
		
		if (isFadeIn)
		{
			this.curMusicObj.fadeIn(secFade, true);
		}
		else
		{
			this.curMusicObj.loopFull();
		}
	},
	
	checkCurMusic:function(newMusicName)
	{
		return this.curMusic == newMusicName;
	},
	
	fadeOutMusic:function(secFade=1000)
	{
		if (this.curMusicObj != null)
		{
			this.curMusicObj.fadeOut(secFade);
		}
	},
	
	stopMusic: function()
	{
		if (this.curMusicObj != null)
		{
			this.curMusicObj.stop();
			this.curMusicObj.destroy();	
			this.curMusicObj = null;
		}
	}
}