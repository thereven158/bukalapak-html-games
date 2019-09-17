
var mainMenu = function (){};

mainMenu.prototype = {
    create(){
        console.log(game.state.current);
        this.menuItems = [];
        this.panels = [];

        let bg = game.add.sprite(0,0, 'bgImg');
        let starBg = game.add.sprite(0,0, 'starBgImg');
        let redLight = game.add.sprite(0,0, 'redLight');
        let btmImg = game.add.sprite(0,game.height, 'btmImg');
        let panel1 = game.add.sprite(0,game.height+ topDistance, 'panel1');
        let panel2 = game.add.sprite(game.width,game.height+ topDistance, 'panel2');
        panel1.anchor.setTo(0,1);
        panel2.anchor.setTo(1,1);
        btmImg.anchor.setTo(0,1);
        starBg.alpha = 0.15;
        scalingObject(panel1,340, 131);
        scalingObject(panel2,340, 200);
        scalingObject(btmImg,1080, 128);
        fittingObject(bg);
        fittingObject(redLight);
        fittingObject(starBg);
        fittingObject(bg);

        panel1.y += panel1.height;
        panel1.x -= panel1.width;
        panel2.y += panel2.height;
        panel2.x += panel2.width;

        // this.sfxTitle   = game.add.audio('bgmTitle');
        this.sfxBtnPlay = game.add.audio('btnPlay');
        this.sfxBtnTap  = game.add.audio('btnTap');
        
        this.light = game.add.sprite(game.width / 2.1 - (game.width * 2), game.height/2,'lightMenu');
        scalingObject(this.light,1200,1200);
        this.light.anchor .setTo(0.5);

        let char = game.add.sprite(game.width / 2.1 - (game.width * 2), game.height/2,'charMenu');
        scalingObject(char,1100,1100);
        char.anchor .setTo(0.5);
        
        let titleText = game.add.sprite(game.width / 2 - (game.width * 2), char.y - (char.height/2),'title');
        scalingObject(titleText,890,494);
        titleText.anchor .setTo(0.5);
        
        let btn = game.add.sprite(game.width/2 - (game.width * 2), char.y + (char.height / 2.2),'btn');
        btn.anchor.setTo(0.5);
        scalingObject(btn, 584, 173);
        btn.inputEnabled = true;
        btn.events.onInputDown.add(()=>this.tap(btn, bg, btnP, titleText, panel1, panel2, char));
        
        let btnP = game.add.sprite(game.width / 2 - (game.width * 2), btn.y + (btn.height),'btnPoin');
		btnP.visible = false;
        btnP.anchor.setTo(0.5);
        scalingObject(btnP, 408,141);
        btnP.inputEnabled = true;
        btnP.events.onInputDown.add(()=>this.toScore(btnP));
        
        this.panels.push(panel1);
        this.panels.push(panel2);

        this.menuItems.push(char);
        this.menuItems.push(this.light);
        this.menuItems.push(titleText);
        this.menuItems.push(btn);
        this.menuItems.push(btnP);

        let tween;
        for(var i = 0; i < this.menuItems.length; i++){
            tween = game.add.tween(this.menuItems[i]).to({
                x : this.menuItems[i].x + (game.width * 2)
            }, 500, Phaser.Easing.Linear.In, true);
        }
        tween.onComplete.add(()=>{
            playSound(sfxTitle, true);
        });

        for(var i = 0; i < this.panels.length; i++){
            var toX;
            if(i == 0){
                toX = - this.panels[i].width;
            }else{
                toX = this.panels[i].width;
            }
            game.add.tween(this.panels[i]).to({
                x : this.panels[i].x - toX,
                y : this.panels[i].y - this.panels[i].height
            }, 500, Phaser.Easing.Linear.Out, true);
        }
        
    },
    render(){
        if(isDevelop)
        game.debug.soundInfo(sfxTitle,game.world.centerX/6,game.world.centerY/2);
    },
    toScore(btn){
        this.sfxBtnTap.play();
        setTimeout(()=>{

            for(var i = 0; i < this.panels.length; i++){
                var toX;
                if(i == 0){
                    toX = - this.panels[i].width;
                }else{
                    toX = this.panels[i].width;
                }
                game.add.tween(this.panels[i]).to({
                    x : this.panels[i].x + toX,
                    y : this.panels[i].y + this.panels[i].height
                }, 500, Phaser.Easing.Linear.Out, true);
            }
            let tween;
            for(var i = 0; i < this.menuItems.length; i++){
                tween = game.add.tween(this.menuItems[i]).to({
                    x : this.menuItems[i].x - (game.width * 2)
                }, 500, Phaser.Easing.Linear.Out, true);
            }
            tween.onComplete.add(()=>{
                game.state.start('highestScore');
            });
        },0);
    },
    tap(btn, bg, btnP, titleText, panel1, panel2, char){
        trackEvent('event','mtc start playing','mtc start playing');
        playSound(sfxTitle, false);
        this.sfxBtnPlay.play();

        let tween = game.add.tween(btn).to({
            alpha : 0
        }, 500, Phaser.Easing.Linear.Out, true);
        game.add.tween(bg).to({
            alpha : 0
        }, 500, Phaser.Easing.Linear.Out, true);  
        game.add.tween(this.light).to({
            alpha : 0
        }, 250, Phaser.Easing.Linear.Out, true); 
        game.add.tween(char).to({
            alpha : 0
        }, 500, Phaser.Easing.Linear.Out, true);
        game.add.tween(btnP).to({
            alpha : 0
        }, 500, Phaser.Easing.Linear.Out, true);
        game.add.tween(titleText).to({
            alpha : 0
        }, 500, Phaser.Easing.Linear.Out, true);

        tween.onComplete.add(()=>{
            this.startTheGame();
        }, this);
    },
    update(){
        let deltaTime = game.time.elapsed/1000;
        this.light.angle = this.light.angle+(20 * deltaTime);
    },
    startTheGame(){
        setTimeout(()=>{
            game.state.start('gameplay');
        },250);
    }
}