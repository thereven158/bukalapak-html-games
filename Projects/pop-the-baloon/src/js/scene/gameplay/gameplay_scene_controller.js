import Phaser from 'phaser';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import Minion from '../../gameobject/Minion';
import Baloon from '../../gameobject/Baloon';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
        this.Bgm = null;
    }

    init(){
        console.log('game screen');
        Minion.InitAnimationData(this);
        Baloon.InitAnimationData(this);
        this.InitAudio();
        this.InitGameData();
    }

    InitGameData(){
        this.score = 0;
        this.temp = 100;
        this.pumpedCount = 0;
        this.IsWinning = false;
        this.baloonActive = true;
    }

    InitAudio(){
        this.blowSfx = this.sound.add('baloon-blow');
        this.popSfx = this.sound.add('baloon-pop');
        this.timesUpFsx = this.sound.add('ingame-timeout');
        this.winSfx = this.sound.add('ingame-success');
        if(this.Bgm == null){
            this.Bgm = this.sound.add('main-music',{
                loop:-1,
                volume: 0.5
            });
            
        }
        this.Bgm.play();
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)
    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.timerEvent = this.time.delayedCall(20000, this.onEvent, [], this);
        
        this.view.pump.on('pointerdown', function() {
            this.onClickPumped();
        }, this);
    }

    update(){
        this.countDown = 20 - this.timerEvent.getElapsedSeconds();
        this.view.textTimer.setText('' + this.countDown.toString().substr(0, 5));

        if(this.countDown == 0){
            this.TimesRanOut();
        }
    }

    Win(){
        this.winSfx.play();
        this.IsWinning = true;
        this.view.miniun.Happy();
        this.DelayCallbackEvent();
    }

    TimesRanOut(){
        this.baloonActive = false;
        this.timesUpFsx.play();
        this.view.TimesUp();
        this.DelayCallbackEvent();
    }

    DelayCallbackEvent(){
        this.time.addEvent({ 
            delay: 3000, 
            callback: this.BackToTitle, 
            callbackScope: this, 
            loop: false 
        });
    }

    BackToTitle(){
        this.Bgm.stop();
        this.scene.launch('TitleScene', {
            isAfterGame: true,
            isGameWin: this.IsWinning,
            isGameOver: this.IsGameOver
        });
        this.scene.stop();
    }

    onEvent = () => {
        this.timerEvent.remove();
        console.log("timer removed");
    }

    onClickPumped() {
        if(this.baloonActive == true){
            this.pumpedCount +=1;
            this.temp += 30;

            this.view.LeverTween();

            this.view.baloon.setPosition(
                this.ScreenUtility.CenterX,
                this.ScreenUtility.CenterY
            );

            if(this.pumpedCount == 6){
                this.BaloonPop();
                this.temp = 100;
            }
            else{
                this.view.baloon.displayWidth += 50;
                this.view.baloon.displayHeight += 50;
                this.blowSfx.play();
            }
        }
    }

    BaloonPop(){
        this.view.miniun.Happy();
        this.popSfx.play();
        this.score +=1;
        this.view.scoreText.setText('' + this.score);
        this.pumpedCount = 0;
        this.destroyCreateObject();

        if(this.score == 5){
            this.baloonActive = false;
            this.view.baloon.destroy();
            this.Win();
            this.view.TimesUp();
        }

        this.time.addEvent({ 
            delay: 3000, 
            callback: this.IdleCallback, 
            callbackScope: this, 
            loop: false 
        });
    }

    IdleCallback(){
        this.view.miniun.Idle();
    }

    destroyCreateObject = () =>{
        console.log("called destroy")
        // this.view.baloon.destroy();
        this.view.baloon.Pop();
        this.view.createBaloon();
    }
}