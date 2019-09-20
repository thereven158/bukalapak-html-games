var gameplay = function(){};

let itemKey 	= [];
let gridWidth 	= 3;
let gridHeight 	= 4; 
let grid 		= [];
let offset, gridSize, prevClickItem, curClickItem, scrText, timeText,lifeTime, timeComma, timeCommaShow, isInit, txtCommaClone, timeTextClone, inGameTime;
let score, isGameOver, comboLength, itemMatched, round, txt, timerTick, canClick, txtComma, curState, miliSecond, deltaTime, scaleRole, itemScale, longestCombo;
let topDistance	= 0;
let baseScore 	 = 100; // base score
let extraScore 	= 50; // extra score per 1 combo
let baseBonusTime 	= 2;
let extraBonusTime 	= 1; 	
let placePosX 	= [];
let placePosY 	= [];
let scaleRad	= 1; // scoreUI

gameplay.prototype = {
	create(){
		this.screenUtility = new ScreenUtility(this.game, 1200, 1920, 1200/1920);
		
		this.voucherGameOverScreen = null;
		
		itemKey 		= ['Card_1','Card_2','Card_3','Card_4','Card_5','Card_6'];
		this.panels 	= [];
		this.uiTop 		= [];
		this.bgUi 		= [];

		isInit 		= true;
		miliSecond 	= 100;
		curState 	= false;
		itemScale  	= 1;
		inGameTime	= 0;
		longestCombo = 0;
		scaleRole 	= game.width / defaultGameWidth;
		let scl 	= innerWidth/innerHeight;
		if(scl >= 0.74 && scl < 0.8 && isDevice){
			scaleRole = 1.1;
		}else if(scl > 0.8 && isDevice){
			scaleRole = 1;
		}
		itemScale   *= scaleRole; 

		let bg = game.add.sprite(0,0+ topDistance, 'bgImg');
		let topUI = game.add.sprite(0,0+ topDistance, 'topUI');
        let starBg = game.add.sprite(0,0+ topDistance, 'starBgImg');
		let btmImg = game.add.sprite(0,game.height+ topDistance, 'btmImg');
        let panel1 = game.add.sprite(0,game.height+ topDistance, 'panel1');
        let panel2 = game.add.sprite(game.width,game.height+ topDistance, 'panel2');
		let redLight = game.add.sprite(0,0+ topDistance, 'redLight');
		this.scoreUI = game.add.sprite(0,0+ topDistance, 'scoreUI');
		this.timerUI = game.add.sprite(game.width,0+ topDistance, 'timerUI');
        starBg.alpha = 0.15;
        fittingObject(bg);
        fittingObject(redLight);
		fittingObject(starBg);
		
        scalingObject(panel1,340, 131, 0, 1);
        scalingObject(panel2,340, 200, 1,1);
        scalingObject(btmImg,1080, 128, 0, 1);
        scalingObject(this.scoreUI,479*scaleRad, 281*scaleRad);
        scalingObject(this.timerUI,536, 290,1,0);
		scalingObject(topUI,1080, 182,0,0);

		this.bgUi.push(bg);
		this.bgUi.push(starBg);
		this.bgUi.push(btmImg);
		this.bgUi.push(redLight);

		this.uiTop.push(topUI);
		this.uiTop.push(this.scoreUI);
		this.uiTop.push(this.timerUI);

		this.panels.push(panel1);
		this.panels.push(panel2);

		let tween = game.add.tween(bg).to({
			alpha : 1
		}, 500, Phaser.Easing.Linear.Out, true);
		tween.onComplete.add(()=>{
			setTimeout(()=>this.initGame(), 250);
		},this);
	},
	initGame(){
		try{
			// maen = why * z;
			placePosX.length = 0;
			placePosX.push(1/5 * game.width);
			placePosX.push(2.5/5 * game.width);
			placePosX.push(4/5 * game.width);
			
			placePosY.length = 0;
			placePosY.push((2/7 * game.height)+ topDistance);
			placePosY.push((3.25/7 * game.height)+ topDistance);
			placePosY.push((4.5/7 * game.height)+ topDistance);
			placePosY.push((5.75/7 * game.height)+ topDistance);
			
			timeCommaShow 	= 0;
			round 			= 0;
			prevClickItem 	= null;
			curClickItem 	= null;
			comboLength 	= 0;
			lifeTime 		= CONFIG.TIME_LIMIT;
			isGameOver 		= false;
			score 			= 0;
			
			this.sfxBgSound	= game.add.audio('bgmInGame');
			this.sfxFlip 	= game.add.audio('flip');
			this.sfxWrong 	= game.add.audio('wrong');
			this.sfxCorrect = game.add.audio('correct');
			this.sfxTimesUp = game.add.audio('timesUp');
			this.sfxCombo 	= game.add.audio('combo');
			this.sfxTick	= game.add.audio('timeTicking'); 
			
			offset 		= (game.width / gridWidth); 
			
			
			let scrPosX = (this.scoreUI.position.x + this.scoreUI.width *1/3) + (1.05/5 * (this.scoreUI.position.x + this.scoreUI.width)) ;
			let scrPosY = (this.scoreUI.position.y + this.scoreUI.height * 3/4) - ((this.scoreUI.position.y + this.scoreUI.height)*1/2.5);
			txt 	= game.add.text(scrPosX, scrPosY, '' , { 
				font: "Panton-Regular", 
				fontSize:30 * scaleRole, 
				fill: "#000000", 
				align: "center" 
			});
			txt.anchor.setTo(0.5);
			this.uiTop.push(txt);
			
			this.drawGrid(gridHeight, gridWidth);
			canClick = false;

			setTimeout(()=>{
				let scrPosX = (this.scoreUI.position.x + this.scoreUI.width *1/3) + (1.05/5 * (this.scoreUI.position.x + this.scoreUI.width)) ;
				let scrPosY = (this.scoreUI.position.y + this.scoreUI.height * 3/4) - ((this.scoreUI.position.y + this.scoreUI.height)*1/30);
				scrText 	= game.add.text(scrPosX, scrPosY, '000000', { 
					font: "Panton-Regular", 
					fontSize:this.screenUtility.correctSize(this.game, 60), 
					fill: "#f5cd2c", 
					align: "center" 
				});
				scrText.anchor.setTo(0.5);
				
				this.comboPar = game.add.sprite(placePosX[1], ((this.timerUI.y + this.timerUI.height) + placePosY[0])/1.9, 'comboPar');
				this.comboPar.alpha = 0;
				scalingObject(this.comboPar,328, 179, 0.5, 1);
				
				
				timeTextClone 	= game.add.text(this.timerUI.x - (0.6 * this.timerUI.width),  this.timerUI.y + (0.7 * this.timerUI.height), '', {
					font : "Panton-Bold",fontSize: this.screenUtility.correctSize(this.game, 108), fill :"#ff9d00", align:"center" 
				});
				timeTextClone.anchor.setTo(0.5,1);

				timeText 	= game.add.text(timeTextClone.x, timeTextClone.y, lifeTime+'.', {
					font : "Panton-Bold",fontSize: this.screenUtility.correctSize(this.game, 108), fill :"#ffffff", align:"center" 
				});
				timeText.anchor.setTo(0.5,1);
				
				txtCommaClone 	= game.add.text(timeText.x + (0.52 *timeText.width), this.timerUI.y + (0.675 * this.timerUI.height), '', {
					font : "Panton-Bold",fontSize: this.screenUtility.correctSize(this.game, 68), fill :"#ff9d00", align:"center" 
				});
				txtCommaClone.anchor.setTo(0,1);
				
				txtComma 	= game.add.text(txtCommaClone.x, txtCommaClone.y, timeCommaShow, {
					font : "Panton-Bold",fontSize: this.screenUtility.correctSize(this.game, 68), fill :"#ffffff", align:"center" 
				});
				txtComma.anchor.setTo(0,1);

				lifeTime -= 1;
				timeCommaShow = miliSecond - 1;
				
				
				this.enabledClick();
				
				this.uiTop.push(scrText);
				this.uiTop.push(timeText);
				this.uiTop.push(txtComma);
				this.uiTop.push(timeTextClone);
				this.uiTop.push(txtCommaClone);

				this.sfxBgSound.loopFull(0.6);

				isInit = false;
			}, 250);
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	timerRunOutAnim(isFade, isPlaying){
		try{

			let tween, alphaSet;	
			if(isPlaying){
				if(isFade) alphaSet = 0;	
				else alphaSet = 1;
				
				tween = game.add.tween(timeText).to({alpha : alphaSet}, 500, Phaser.Easing.Linear.In, this);
				game.add.tween(txtComma).to({alpha : alphaSet}, 500, Phaser.Easing.Linear.In, this);
				
				tween.onComplete.add(()=>{
					this.timerRunOutAnim(!isFade, curState);
				});
			}
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	drawGrid(gWidth, gHeight){
		try{
			this.itemInGrid = [];
			itemMatched 	= 0;
			let tempArray 	= [0,0,1,1,2,2,3,3,4,4,5,5];
			
			for(var row = 0; row < gWidth; row++){
				grid[row] = [];
				for(var col = 0; col < gHeight; col++){
					let rndIndex 	= game.rnd.integerInRange(0, tempArray.length - 1);
					let gKey 		= tempArray[rndIndex];
					tempArray.splice(rndIndex,1);
					let iKey 		= itemKey[gKey];
					
					let pos 		= this.place(row,col);
					let item 		= game.add.sprite(pos.x, pos.y, 'block');
					item.inputEnabled = true;
					item.events.onInputDown.add(()=>this.clicked(item), this);
					item.myKey 		= iKey;
					item.row 		= row;
					item.col 		= col;
					scalingObject(item, 250,250, 0.5, 0.5);
					this.closeItem(item, false);
					
					
					grid[row][col] 	= item;
					this.itemInGrid.push(item);
				}
			}
			round ++;
			/*
			switch(true){
				case (round <= 3):
					baseBonusTime = 4;
					break;
				case (round >= 4 && round <= 6):
					baseBonusTime = 3;
					break;
				case (round >= 7):
					baseBonusTime = 2;
			}*/
			
			if (round > CONFIG.ROUND_TO_WIN)
			{
				this.endGame(true);
			}
			
			txt.setText('ROUND ' + round);
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	
	update(){
		
		if(!isGameOver && !isInit && CONFIG.IS_INSTANT_WIN)
		{
			this.endGame(true);
		}
			
		if(!isGameOver){
			if(lifeTime <= 0 && timeCommaShow <= 0){
				this.endGame();
			}
			if(isInit == false){
				deltaTime = game.time.elapsed/1000;
				timeCommaShow -= deltaTime * miliSecond;

				if(lifeTime < 10){
					timeText.setText('0'+lifeTime+'.');
					if(lifeTime <= 0){
						lifeTime = 0;
						if(timeCommaShow <= 0) timeCommaShow = 0;
					}
					if(curState == false){
						curState = true;
						this.timerRunOutAnim(true, curState);
					}
				}else{
					timeText.setText(lifeTime+'.');
					curState = false;
					timeText.alpha = 1;
					txtComma.alpha = 1;
				}
				
				if(timeCommaShow <= 0 && lifeTime > 0){
					lifeTime -= 1;
					inGameTime +=1;
					timeCommaShow = miliSecond;
					if(lifeTime < 10){
						this.sfxTick.play();
					}
				}
				if(timeCommaShow < 10) {
					txtComma.setText('0'+Math.floor(timeCommaShow));
				}
				else {
					if(timeCommaShow == 100){
						timeCommaShow = 99;
					}
					txtComma.setText(Math.floor(timeCommaShow));
				}
				txtCommaClone.setText(txtComma.text);
				timeTextClone.setText(timeText.text);
			}
		}
	},
	place: function (row, col) {
		let pos = {
			x : placePosX[col],
			y : placePosY[row]
		}
		return pos;
	},
	clicked(item){
		try{
			if(!isGameOver && canClick){  
				if(prevClickItem == null){
					prevClickItem = item;
					this.flipItem(item);
				}else{
					if(!(item.row == prevClickItem.row && item.col == prevClickItem.col)){
						canClick = false;
						curClickItem =  item;
						this.flipItem(item);
						if(curClickItem.myKey == prevClickItem.myKey){
							this.doAction(true);
						}else{
							this.doAction(false);
						}
					}
				}
			}
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	flipItem(item){
		try{
			this.sfxFlip.play();
			var backFlip = this.game.add.tween(item.scale);
			var flipping = this.game.add.tween(item.scale).to({
				x:0
			},90,Phaser.Easing.Linear.None);
			flipping.onComplete.addOnce(function(){
				item.loadTexture(item.myKey, 0);
				backFlip.start();
			},this);
			flipping.start();
			backFlip.to({
				x:1 * itemScale
			},90,Phaser.Easing.Linear.None);
			backFlip.onComplete.add(()=>{
				scalingObject(item, 270, 265);
			});
			
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	closeItem(item, playAudio = true){
		try{
			var backFlip = this.game.add.tween(item.scale);
			var flipping = this.game.add.tween(item.scale).to({
				x:0
			},90,Phaser.Easing.Linear.None);
			flipping.onComplete.addOnce(function(){
				item.loadTexture('block', 0);
				backFlip.start();
			},this);
			flipping.start();
			backFlip.to({
				x:1 * itemScale
			},90,Phaser.Easing.Linear.None);
			backFlip.onComplete.add(()=>{
				scalingObject(item, 270, 265);
			});
			if(playAudio) this.sfxWrong.play();
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	doAction(result){
		try{

			let iOne = grid[prevClickItem.row][prevClickItem.col];
			let iTwo = grid[curClickItem.row][curClickItem.col];
			
			if(iOne && iTwo && result){
				setTimeout(()=>this.destroyItem(iOne), 500);
				setTimeout(()=>this.destroyItem(iTwo), 500);
				setTimeout(()=>this.enabledClick(score), 700); 
				grid[prevClickItem.row][prevClickItem.col] = null;
				grid[curClickItem.row][curClickItem.col] = null;
				comboLength += 1;
				if(comboLength > longestCombo) longestCombo = comboLength;
				itemMatched +=1;
				
				let pos1 = prevClickItem.position;
				let pos2 = curClickItem.position;
				setTimeout(()=>this.playAnimation(pos1, pos2), 500);
				this.updateScore();
				
			}else{
				setTimeout(()=>this.closeItem(iOne), 500);
				setTimeout(()=>this.closeItem(iTwo), 500);
				setTimeout(()=>this.enabledClick(), 700);
				comboLength = 0;
			}
			prevClickItem 	= null;
			curClickItem 	= null;
		}catch(err){
			trackEvent('exception', err.message);
		}
	},
	playComboAnim(){
		this.sfxCombo.play();
		this.comboPar.alpha = 1;
		game.add.tween(this.comboPar).to({
			alpha : 0
		}, 1500, Phaser.Easing.Bounce.Out, true);
	},
	playAnimation(pos1, pos2){
		try{

			this.par = [];
			this.sfxCorrect.play();
			let bnT, bnS;
			if(comboLength > 2){
				bnS 	= baseScore + ((round - 1) * 10) + (extraScore * (comboLength - 1));
				bnT 	= baseBonusTime + ((comboLength - 2) * extraBonusTime);
				this.playComboAnim();
			}else{
				bnS 	= baseScore + ((round - 1) * 10);
				bnT 	= baseBonusTime;
			}
			this.par.push(game.add.sprite(pos1.x - (50*scaleRole), pos1.y, 'timePar'));
			this.par.push(game.add.text(pos1.x + (50* scaleRole), pos1.y, '+' + bnT, {font: "Panton-Regular",fontSize:this.screenUtility.correctSize(this.game, 60), fill:"#ffffff"}));
			this.par[1].anchor.setTo(0.5);
			scalingObject(this.par[0], 80,80,0.5, 0.5);
			for(var i=0;i<this.par.length;i++){
				game.add.tween(this.par[i]).to({
					y : pos1.y - (100 * scaleRole),
					alpha : 0
				},1000, Phaser.Easing.Linear.Out, true);
			}
			let plsTextS = game.add.text(pos2.x, pos2.y, '+' + bnS, {font: "Panton-Regular",fontSize:this.screenUtility.correctSize(this.game, 60),fill:"#f5cd2c"});
			plsTextS.anchor.setTo(0.5);
			let tween2 = game.add.tween(plsTextS).to({
				y : pos2.y - (100 * scaleRole),
				alpha : 0
			},1000, Phaser.Easing.Linear.Out, true);
			tween2.onComplete.add(()=>{
				this.destroyItem(this.par[0]);
				this.destroyItem(this.par[1]);
				this.destroyItem(plsTextS);
			});
		}catch(err){
			trackEvent('exception', err.message);
		}

	},
	updateScore(){
		let timeoutDelay = 0;
		if(lifeTime < 2){
			timeoutDelay = 5;
		}else{
			timeoutDelay = 1000;
		}
		
		if(comboLength > 2){
			score 	+= baseScore + ((round - 1) * 10) + (extraScore * (comboLength - 1));
			this.updateLifeTime(baseBonusTime + (extraBonusTime * (comboLength - 2)), timeoutDelay)
		}else{
			score 	+= baseScore + ((round - 1) * 10);
			this.updateLifeTime(baseBonusTime, timeoutDelay);
		}
		setTimeout(()=>this.setScoreText(score), 1000); 
		if(itemMatched == 6){
			setTimeout(()=>this.drawGrid(gridHeight, gridWidth), 1000);
		}
	},
	updateLifeTime(timeAmount, delay){
		setTimeout(()=>{
			lifeTime += timeAmount;
			timeCommaShow = 50;
			txtComma.fill = '#00ff66';
			timeText.fill = '#00ff66';
			setTimeout(()=>{
				txtComma.fill = '#ffffff';
				timeText.fill = '#ffffff';
			},500);
		}, delay); 
	},
	setScoreText(scr){
		var string = numeral(scr).format('000000');
		scrText.setText(string);
	},
	destroyItem(item){
		item.destroy();
	},
	enabledClick(){
		canClick = true;
	},
	toPostGame(){
		let tween;
		for(var i = 0; i < this.uiTop.length; i++){
			game.add.tween(this.uiTop[i]).to({
				y : this.uiTop[i].y - game.height
			}, 1000, Phaser.Easing.Linear.In, true);
		}
		for(var i = 0; i < this.bgUi.length; i++){
			tween = game.add.tween(this.bgUi[i]).to({
				alpha : 0
			}, 1500, Phaser.Easing.Linear.In, true);
		}
		for(var i = 0; i < this.panels.length; i++){
			var toX;
            if(i == 0) toX = - this.panels[i].width;
            else toX = this.panels[i].width;

            game.add.tween(this.panels[i]).to({
				x : this.panels[i].x + toX,
                y : this.panels[i].y + this.panels[i].height
            }, 1000, Phaser.Easing.Linear.Out, true);
		}

		for(var i = 0; i < this.itemInGrid.length; i++){
			game.add.tween(this.itemInGrid[i]).to({
				y : this.itemInGrid[i].y + game.height,
				angle : game.rnd.integerInRange(-360,360)
			}, game.rnd.integerInRange(500,1500), Phaser.Easing.Linear.In, true);
		}

		tween.onComplete.add(()=>{
			game.state.start('postGame');

		});
	},
	endGame(isVictory = false)
	{
		isGameOver = true;
		
		this.showVoucherGameOver(isVictory);
		
		/*
		let timesUp = game.add.sprite(game.width, game.height/2, 'timesUp');
		scalingObject(timesUp, 1080,266, 0, 0);
		console.log("Game IS Over");

		this.sfxBgSound.stop();
		this.sfxTimesUp.play();

		let tween1 = game.add.tween(timesUp.position).to({x : 0},100, Phaser.Easing.Linear.Out, this);
		tween1.onComplete.add(()=>{
			setTimeout(()=>{
				let tween = game.add.tween(timesUp.position).to({
					x : 0 - timesUp.width
				},100, Phaser.Easing.Linear.Out, this);
				tween.onComplete.add(()=>{
					setTimeout(()=>this.toPostGame(), 500);
				});
			}, 1500);
		});		
		*/
	},
	showVoucherGameOver(isVictory = false)
	{
		this.voucherGameOverScreen = new VoucherController(this.game);
		
		this.voucherGameOverScreen.setEvents(() => {
			this.sfxBgSound.stop();
			window.open(CONFIG.URL_DOWNLOAD, '_blank');
			
		}, () => {
			this.sfxBgSound.stop();
			this.game.state.start('gameplay');
		}, () => {
			this.sfxBgSound.stop();
			this.game.state.start('gameplay');
		})	
		
		if (isVictory)
		{
			this.voucherGameOverScreen.popUpWin(CONFIG.VOUCHER_CODE);
		}
		else
		{
			this.voucherGameOverScreen.popUpLose();
		}
	}
}