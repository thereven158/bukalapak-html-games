class MusicPlayer
{
	static getInstance = () => {
		if (!MusicPlayer.instance) {
			MusicPlayer.instance = new MusicPlayer();
		}
		return MusicPlayer.instance;
	};

    Init(game)
    {
		this.curMusic = "";
		this.curMusicObj = null;
		this.game = game;
		this.soundManager = this.game.sound;
	}
	
	PlayMusic(newMusicName, isForceRestart=false, isFadeIn=false, secFade=1000)
	{
		if (this.CheckCurMusic(newMusicName) && !isForceRestart)
		{
			return;
		}

		this.StopMusic();
		
		this.curMusic = newMusicName;
		
		this.curMusicObj = this.soundManager.add(newMusicName, {loop:-1, volume:0.5});
		
		if (isFadeIn)
		{
			//this.curMusicObj.fadeIn(secFade, true);
		}
		else
		{
			this.curMusicObj.play();
		}
	}
	
	CheckCurMusic(newMusicName)
	{
		return this.curMusic === newMusicName;
	}
	
	FadeOutMusic(secFade=1000)
	{
		if (this.curMusicObj != null)
		{
			this.curMusicObj.fadeOut(secFade);
		}
	}
	
	StopMusic()
	{
		if (this.curMusicObj != null)
		{
			this.curMusicObj.stop();
			this.curMusicObj.destroy();	
			this.curMusicObj = null;
		}
	}
}

export default MusicPlayer;