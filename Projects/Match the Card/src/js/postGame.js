var postGame = function(){};

let myPoint, intervalPoint;
let txtS;

postGame.prototype = {
    preload(){
    },
    create(){
        trackEvent('event','mtc finish playing','mtc finish playing');

        this.sr 	= game.width / defaultGameWidth;
		let scl 	= innerWidth/innerHeight;
		if(scl >= 0.74 && scl < 0.8 && isDevice){
			this.sr = 1.15;
		}else if(scl >= 0.8 && isDevice){
			this.sr = 1;
		}
        this.postItems  = [];
        this.buttons    = []; 
        this.bgImgs     = [];
        myPoint         = 0;

        this.sfxBtnPlay = game.add.audio('btnPlay');
        this.sfxBtnTap  = game.add.audio('btnTap');
        this.sfxRolling = game.add.audio('roolingScore');
        this.sfxShowScore = game.add.audio('showScore');
        

        let bg = game.add.sprite(0,0, 'bgImg');
        let starBg = game.add.sprite(0,0, 'starBgImg');
        let redLight = game.add.sprite(0,0, 'redLight');
         fittingObject(bg);
         fittingObject(redLight);
         fittingObject(starBg);
        
        this.bgImgs.push(bg);
        // this.bgImgs.push(btmImg);
        this.bgImgs.push(redLight);
        this.bgImgs.push(starBg);
        for(var i = 0; i < this.bgImgs.length; i++){
            this.bgImgs[i].alpha = 0.5;
        }
        starBg.alpha = 0.1;
        
        this.scScreen = game.add.sprite(game.world.centerX,game.world.centerY - (1/15 * game.height) - game.height,'scScreen');
        this.scScreen.anchor.setTo(0.5);
         scalingObject(this.scScreen, 849, 1175);
        
        if(score != 0){
            poinArray.push(score);
        }

        this.postItems.push(this.scScreen);
        this.animateTop();
    },
    animateTop(){
        var dur = 500;
        for(var i = 0; i < this.postItems.length; i++){
            game.add.tween(this.postItems[i]).to({
                y : this.postItems[i].y + game.height
            }, dur, Phaser.Easing.Bounce.Out, true);
        }
        setTimeout(()=>{
            txtS 	= game.add.text(game.world.centerX,this.scScreen.y + (this.scScreen.height * 1/10), 'Skor kamu : ', {
                font: 'Panton-Bold', 
                fontSize : 56 * this.sr,
                fill: "#ffffff", 
                align: "center"
            });
            txtS.anchor.setTo(0.5);
            this.myScoreText = game.add.text(game.world.centerX,txtS.y + (this.scScreen.height * 1/10), myPoint, {
                font: 'Panton-Bold', 
                fontSize : 250 * this.sr,
                fill: "#fff200", 
                align: "center"
            });
            this.myScoreText.anchor.setTo(0.5);
            this.myScoreText.y = txtS.y + (this.myScoreText.height* 2/3);
            let sScore = Math.floor(score / 60);
            this.postItems.push(this.myScoreText);
            this.postItems.push(txtS);
            this.sfxRolling.play();
            intervalPoint = setInterval(()=>this.animatedPoint(sScore), Phaser.Timer.SECOND / 60);
        }, dur);
    },
    animatedPoint(sScore){
        myPoint +=sScore;
        if(myPoint >= 1000 && myPoint < 10000){
            this.myScoreText.fontSize =  200 * this.sr;
        }else if(myPoint >= 10000){
            this.myScoreText.fontSize =  160 * this.sr;
        }
        this.myScoreText.setText(myPoint);
        this.myScoreText.setShadow(0, 0, '#ffffff', 25 * this.sr);
        if(myPoint >= score){
            this.myScoreText.setText(score);
            this.myScoreText.setShadow(0, 0, '#ffffff', 25 * this.sr);
            setTimeout(()=>{
                this.sfxShowScore.play();
                let btnOke = game.add.sprite(game.world.centerX + game.width,this.scScreen.y + (this.scScreen.height / 2), 'btnOke');
                 scalingObject(btnOke,408,141);
                btnOke.anchor.setTo(-0.05, 0);
                btnOke.inputEnabled = true;
                btnOke.events.onInputDown.add(()=>this.backToMenu());
                
                let btnUlang = game.add.sprite(game.world.centerX - game.width,btnOke.y, 'btnUlang');
                 scalingObject(btnUlang,408,141);
                btnUlang.anchor.setTo(1.05, 0);
                btnUlang.inputEnabled = true;
                btnUlang.events.onInputDown.add(()=>this.backToGame());
                
                game.add.tween(btnOke).to({x:game.world.centerX},1000,Phaser.Easing.Linear.Out, true);
                game.add.tween(btnUlang).to({x:game.world.centerX},1050,Phaser.Easing.Linear.Out, true);
                this.buttons.push(btnOke);
                this.buttons.push(btnUlang);
                // console.log('Done');
            }, 500);
            clearInterval(intervalPoint);
        }
    },
    backToMenu(){
        trackEvent('event','mtc to main menu','mtc to main menu');
        this.sfxBtnTap.play();
        let tween;
        for(var i = 0; i < this.postItems.length; i++){
            tween = game.add.tween(this.postItems[i]).to({
                y : this.postItems[i].y - (game.height)
            }, 1500, Phaser.Easing.Elastic.In, true);
        }
        for(var i = 0; i < this.buttons.length; i++){
            var toX;
            if(i != 0){
                toX = - (game.width);
            }else{
                toX = (game.width)
            }
            game.add.tween(this.buttons[i]).to({
                x : this.buttons[i].x + toX
            }, 250, Phaser.Easing.Linear.In, true);
        }
        tween.onComplete.add(()=>{
            game.state.start('mainMenu');
        });
    },
    backToGame(){
        trackEvent('event','mtc play again','mtc play again');
        this.sfxBtnPlay.play();
        let tween;
        for(var i = 0; i < this.postItems.length; i++){
            tween = game.add.tween(this.postItems[i]).to({
                alpha : 0
            }, 1500, Phaser.Easing.Linear.In, true);
        }
        for(var i = 0; i < this.buttons.length; i++){
            game.add.tween(this.buttons[i]).to({
                alpha : 0
            }, 1500, Phaser.Easing.Linear.In, true);
        }
        tween.onComplete.add(()=>{
            this.startTheGame();
            game.state.start('gameplay');
        }, this);
    },
    
    startTheGame(){
        setTimeout(()=>{
            game.state.start('gameplay');
        },250);
    }
}