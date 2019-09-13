var boot = function(){}; // preloader
let sfxTitle;

boot.prototype = {
    preload(){
        // game.load.audio('bgmTitle','sound/media.io_bgm_title.mp3');
        this.enableAnalytics();
        trackEvent('event','open mtc','open mtc');
        game.load.image('bgImg', AssetUrl+'img/Ingame Assets/Background.png');
        game.load.image('character',AssetUrl+'img/Pre Load/Character.png');
        game.load.image('barEmpty',AssetUrl+'img/Pre Load/Loading-Bar-Empty.png');
        game.load.image('barFull',AssetUrl+'img/Pre Load/Loading-Bar-Full.png');
        
        
        let sub = game.add.text(0,0, '. . .', {
            fill : '#ffffff',
            font : 'Panton-Regular',
            fontSize : 20 * game.width / defaultGameWidth,
            align : 'center'
        });
        sfxTitle   = game.add.audio('bgmTitle');
        
    },
    create(){      
        playSound(sfxTitle, true);  
        document.querySelector("body").click();
        document.querySelector("canvas").click();
        document.getElementById("matchPic").click();
        let bg = game.add.sprite(0,0,'bgImg');
        this.fittingObject(bg);
        let character = game.add.sprite(game.width/2, game.height * 0.66, 'character');
        character.anchor.setTo(0.5,1);
        this.scalingObject(character, 683, 672);
        
        let barEmpty = game.add.sprite(game.width/2, character.y, 'barEmpty');
        barEmpty.anchor.setTo(0.5,0);
        this.scalingObject(barEmpty, 809, 56);

        this.barFull = game.add.sprite(barEmpty.x - (barEmpty.width / 2) - (18  * game.width / defaultGameWidth), barEmpty.y - (15 * game.width / defaultGameWidth), 'barFull');
        this.barFull.anchor.setTo(0,0);
        this.scalingObject(this.barFull, 0, 86);

        this.titleText = game.add.text(game.width /2,barEmpty.y + (barEmpty.height), 'Loading . .', {
            font : 'Panton-Bold',
            fill : '#f5cd2c',
            fontSize : 45 * game.width / defaultGameWidth,
            align : 'center'
        });
        this.titleText.anchor.setTo(0.5,-0.2);

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);

        trackEvent('event','mtc start loading','mtc start loading');
        this.LoadAllAssets();
    },
    LoadAllAssets(){
        game.load.audio('roolingScore', AssetUrl+'sound/media.io_result_rolling score.mp3');
		game.load.audio('showScore', AssetUrl+'sound/media.io_result_show score.mp3');
        game.load.audio('bgmInGame',AssetUrl+'sound/media.io_bgm_ingame1.mp3');
		game.load.audio('flip',AssetUrl+'sound/media.io_ingame_flip.mp3');
		game.load.audio('wrong',AssetUrl+'sound/media.io_ingame_fail to match.mp3');
        game.load.audio('correct',AssetUrl+'sound/media.io_ingame_match.mp3');
        game.load.audio('timeTicking',AssetUrl+'sound/media.io_ingame_time ticking.mp3');
        game.load.audio('timesUp',AssetUrl+'sound/media.io_ingame_times up.mp3');
        game.load.audio('combo',AssetUrl+'sound/media.io_ingame_combo.mp3');
		
		game.load.image('block', AssetUrl+'img/Card_Back.png');
		game.load.image('timePar', AssetUrl+'img/Ingame Assets/time-par.png');
        
		game.load.image('Card_1', AssetUrl+'img/Card_1.png');
		game.load.image('Card_2', AssetUrl+'img/Card_2.png');
		game.load.image('Card_3', AssetUrl+'img/Card_3.png');
		game.load.image('Card_4', AssetUrl+'img/Card_4.png');
		game.load.image('Card_5', AssetUrl+'img/Card_5.png');
        game.load.image('Card_6', AssetUrl+'img/Card_6.png');
        
        game.load.audio('btnTap', AssetUrl+'sound/ui_button_tap.mp3');
        game.load.audio('btnPlay', AssetUrl+'sound/media.io_ui_button_play.mp3');

        game.load.image('btn',AssetUrl+'img/MainMenu Assets/Button_Main.png');
        game.load.image('btnPoin',AssetUrl+'img/MainMenu Assets/Button_Skor.png');
        game.load.image('charMenu',AssetUrl+'img/MainMenu Assets/Characternolight.png');
        game.load.image('lightMenu',AssetUrl+'img/MainMenu Assets/Light.png');

        game.load.image('title',AssetUrl+'img/MainMenu Assets/Title.png')
        game.load.image('starBgImg', AssetUrl+'img/Ingame Assets/Star-UI.png');
        game.load.image('redLight',AssetUrl+ 'img/Ingame Assets/Red-Light.png');
        game.load.image('btmImg', AssetUrl+'img/Ingame Assets/Planet-Bottom.png');
        game.load.image('scoreUI', AssetUrl+'img/Ingame Assets/Score-UI.png');
        game.load.image('timerUI', AssetUrl+'img/Ingame Assets/Timer-UI.png');
        game.load.image('topUI', AssetUrl+'img/Ingame Assets/Top-UI.png');
        game.load.image('panel1', AssetUrl+'img/Ingame Assets/Panel1.png');
        game.load.image('panel2', AssetUrl+'img/Ingame Assets/Panel2.png');
        game.load.image('comboPar',AssetUrl+'img/Ingame Assets/Combo-UI.png');
        game.load.image('timesUp',AssetUrl+'img/Ingame Assets/Times_UP.png');

        game.load.image('btnOke',AssetUrl+'img/Result & Score/Result_Oke.png');
        game.load.image('btnUlang',AssetUrl+'img/Result & Score/Result_Ulangi.png');
        game.load.image('scScreen',AssetUrl+'img/Result & Score/Result_notext.png');

        game.load.image('scPanel',AssetUrl+'img/Result & Score/Skor_notext.png');

        game.load.start();
    },
    loadStart(){
        this.titleText.setText('Loading . .');
    },
    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        playSound(sfxTitle, true);  
        // game.sound.play('bgmTitle');
        this.titleText.setText("Loading . . .");
        this.barFull.width = 843 * progress / 100 * game.width / defaultGameWidth;
    },

    loadComplete() {
        trackEvent('event','mtc finish loading','mtc finish loading');
        this.titleText.setText("Loading Complete");
        if(game.state.current == 'boot'){
            game.state.start('mainMenu');
                setTimeout(()=>{
            },1000);
        }
    },
	scalingObject(obj, myWidth, myHeight){
		obj.width = myWidth * game.width / defaultGameWidth;
		obj.height = myHeight * game.width / defaultGameWidth;
	},
	fittingObject(obj){
		obj.width = game.width;
        obj.height = game.height;  
	},
    enableAnalytics(){
        if (!enableAnalytics) return;
        if(!game.device.iOS)
            ga ('create', androidTrackingId, 'auto');
        else
            ga('create', iosTrackingId, 'auto');
    }
}