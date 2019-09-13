var highestScore = function(){};

highestScore.prototype = {
    create(){
        trackEvent('event','mtc score','mtc score');
        this.hScoreItems = [];
        this.bgItems = [];

        this.sfxBtnTap = game.add.sound('btnTap');

        this.sScale = game.width / defaultGameWidth;
		let scl 	= innerWidth/innerHeight;
		if(scl >= 0.74 && scl < 0.8 && isDevice){
			this.sScale = 1.4;
		}else if(scl >= 0.8){
            this.sScale = 1;
        }
        let bg = game.add.sprite(0,0, 'bgImg');
        let starBg = game.add.sprite(0,0, 'starBgImg');
        let redLight = game.add.sprite(0,0, 'redLight');
        let btmImg = game.add.sprite(0,game.height, 'btmImg');
        btmImg.anchor.setTo(0,1);
        starBg.alpha = 0.15;
        fittingObject(bg);
        fittingObject(redLight);
        fittingObject(starBg);
        scalingObject(btmImg,1080, 128);

        this.bgItems.push(bg);
        this.bgItems.push(redLight);
        this.bgItems.push(btmImg);

        this.scPanel = game.add.sprite(game.width/2 + (game.width * 1.5), game.height/2 - (1/14 * game.height), 'scPanel');
        scalingObject(this.scPanel,849,1175);
        this.scPanel.anchor.setTo(0.5);

        let btnOke = game.add.sprite(game.width/2 + (game.width * 1.5), this.scPanel.y + (this.scPanel.height / 2), 'btnOke');
        btnOke.anchor.setTo(0.5, 0);
        scalingObject(btnOke,408,141);
        btnOke.inputEnabled = true;
        btnOke.events.onInputDown.add(()=>this.toMenu(),this);

        this.hScoreItems.push(this.scPanel);
        this.hScoreItems.push(btnOke);
        for(var i = 0; i < this.hScoreItems.length; i++){
            game.add.tween(this.hScoreItems[i]).to({
                x : this.hScoreItems[i].x - (game.width * 1.5)
            }, 500, Phaser.Easing.Linear.In, true);
        }
        for(var i = 0; i < this.bgItems.length; i++){
            game.add.tween(this.bgItems[i]).to({
                alpha : 0.3
            }, 500, Phaser.Easing.Linear.In, true);
        }
        setTimeout(()=>{
            let title = game.add.text(game.width / 2, this.scPanel.y - (this.scPanel.height/6), 'Skor tertinggi : ', {
                font        : "Panton-Bold",
                fontSize    : 50 * this.sScale,
                fill        : "#ffffff" 
            });
            title.anchor.setTo(0.5);
            let highestScore = 0;
            if(poinArray.length != 0){   
                highestScore = Math.max.apply(null, poinArray);
            }
            let highScoreTxt = game.add.text(game.width / 2, title.y + (title.fontSize * 3), highestScore, {
                font        : "Panton-Bold",
                fontSize    : 170 * this.sScale,
                fill        : "#fff200" 
            });
            highScoreTxt.anchor.setTo(0.5);
            highScoreTxt.setShadow(0, 0, '#ffffff', 25 * this.sScale);

            let subTitle = game.add.text(game.width / 2, this.scPanel.y + (1/5 * this.scPanel.height), 'Skor terakhir : ', {
                font        : "Panton-Bold",
                fontSize    : 50 * this.sScale,
                fill        : "#ffffff" 
            });
            subTitle.anchor.setTo(0.5);

            this.hScoreItems.push(title);
            this.hScoreItems.push(highScoreTxt);
            this.hScoreItems.push(subTitle);

            let index = poinArray.length;
            let posY = subTitle.y + (subTitle.height) + (50 * this.sScale );
            let score = game.add.text(game.width / 2, posY,poinArray[index - 1], {
                font        : "Panton-Bold",
                fontSize    : 130 * this.sScale,
                fill        : "#ffffff" 
            });
            score.setShadow(0, 0, '#ffffff', 25 * this.sScale);
            this.hScoreItems.push(score);
            score.anchor.setTo(0.5);
        },500);

    },

    toMenu(){
        this.sfxBtnTap.play();
        let tween;
        for(var i = 0; i < this.hScoreItems.length; i++){
            tween = game.add.tween(this.hScoreItems[i]).to({
                x : this.hScoreItems[i].x + (game.width * 1.5)
            }, 500, Phaser.Easing.Linear.Out, true);
        }
        for(var i = 0; i < this.bgItems.length; i++){
            game.add.tween(this.bgItems[i]).to({
                alpha : 1
            }, 500, Phaser.Easing.Linear.In, true);
        }
        tween.onComplete.add(()=>{
            game.state.start('mainMenu');
        });
    }
}