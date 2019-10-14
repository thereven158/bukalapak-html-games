import ScreenUtility from '../../module/screen/screen_utility';
import gameplaydata from '../../gameplaydata';

import GameplaySceneView from './gameplay_scene_view';
import BoardController from '../../subcontrollers/board/board_controller';
import Minion from '../../gameobjects/minion';
import TapEffect from '../../view/tap_effect';


export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});

        this.Bgm = null;
    }

    init(){
        //console.log('game screen');
        this.InitGame();
        this.InitGameData();
        this.InitAnimationData();
        this.InitAudio();

    }

    InitGame(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitGameData(){
        this.TotalHit = 0;
        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
        this.IsGameStarted = false;
        this.IsWinning = false;

        this.ShowTimer = 0;
        this.NextShowTime = 0;

        this.CurrentPhaseIdx = 0;
        this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
    }

    InitAnimationData(){
        Minion.InitAnimationData(this);
        TapEffect.InitAnimationData(this);
    
    }

    InitAudio(){
        if(this.Bgm == null){
            this.Bgm = this.sound.add('bgm_ingame',{
                loop:-1,
                volume: 1
            });
            
        }

        this.Bgm.play();
    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.Board = new BoardController(this, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.6);
        this.Board.create();

        this.Board.OnTargetHit(this.OnTargetHit);

        this.Tap = new TapEffect(this);
        this.input.on('pointerdown', ()=>{
            if(this.IsGameStarted){
                this.sound.play('tap')
                this.Tap.Show();
            }
        }, this);

        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
    }
    
    update(timestep, dt){
        if(this.IsGameStarted){
            this.GameUpdate(timestep, dt);
        }

        this.Board.update(timestep, dt);
        this.view.update();
    }

    GameUpdate(timestep, dt){
        this.Timer -= (1 * dt) / 1000;
        this.ShowTimer += (1 * dt) / 1000;

        //validate phase
        if(this.CurrentPhaseIdx < gameplaydata.Phases.length - 1){
            let isEnoughHitToChangePhase = this.TotalHit >= this.CurrentPhase.MaxTotalHit;
            //TODO
            let isTimePassed = (gameplaydata.GameTime - this.Timer) >= this.CurrentPhase.MaxTime;

            if(isEnoughHitToChangePhase || isTimePassed){
                this.CurrentPhaseIdx += 1;
                this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
            }
        }

        let showTimeInterval = Phaser.Math.Between(this.CurrentPhase.MinShowTime, this.CurrentPhase.MaxShowTime);

        let chance = Phaser.Math.Between(0, 100);
        let isShowChanceSuccess = chance <= this.CurrentPhase.ShowChance;
        let isShowTime = this.ShowTimer >= this.NextShowTime;
        let isNotReachMaxShowTargets = this.Board.GetActiveTargets().length < this.CurrentPhase.MaxTarget;

        if(isShowTime && isShowChanceSuccess && isNotReachMaxShowTargets){
            this.Board.Show();
            this.NextShowTime = this.ShowTimer + showTimeInterval;
        }

        //Isgameover
        if(this.Timer <= 0){       
            this.Timer = 0;
            this.Timesout();
        }else if(this.TotalHit >= gameplaydata.VoucherWinPoint){
            this.Win();
        }
    }

    OnTargetHit = ()=>{ 
        if(!this.IsGameStarted)
            return;

        this.TotalHit += 1;
        this.Score += gameplaydata.ScorePoint;

        this.IsWinning = this.TotalHit >= gameplaydata.VoucherWinPoint;

    }

    Timesout(){
        this.view.TimesUp();
        this.EndGame();

        this.time.addEvent({ 
            delay: 3000, 
            callback: this.BackToTitle, 
            callbackScope: this, 
            loop: false 
        });

        this.game.sound.play('timeout');
    }

    Win(){
        this.EndGame();
        this.BackToTitle();
    }

    EndGame(){
        this.IsGameStarted = false;
        this.Board.Disable();
        

        
        //this.BackToTitle();
    }

    Restart(){
        this.Reset();
        this.InitGameData();
        this.InitiateGame();
    }

    Reset(){
        this.Board.Reset();
    }
    
    BackToTitle = ()=>{
        this.Bgm.stop();
        this.scene.launch('TitleScene', {
            isAfterGame: true,
            isGameWin: this.IsWinning

        });

        this.scene.stop();
    }
}