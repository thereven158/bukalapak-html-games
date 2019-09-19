import ScreenUtility from '../../module/screen/screen_utility';
import gameplaydata from '../../gameplaydata';

import GameplaySceneView from './gameplay_scene_view';
import BoardController from '../../subcontrollers/board/board_controller';
import TargetObjectController from '../../gameobjects/hole';
import Minion from '../../gameobjects/minion';


export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});

    }

    init(){
        console.log('game screen')

        this.InitGameData();
        this.InitAnimationData();
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
    }

    preload(){
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScreenUtility.Init(this)
    }

    create(){
        this.view = new GameplaySceneView(this);
        this.view.create();

        this.Board = new BoardController(this, this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.6);
        this.Board.create();

        this.Board.OnTargetHit(this.OnTargetHit);

        this.StartGame();
    }

    InitiateGame(){
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

            this.GameOver();
        }
    }

    OnTargetHit = ()=>{ 
        if(!this.IsGameStarted)
            return;

        this.TotalHit += 1;
        this.Score += gameplaydata.ScorePoint;

        this.IsWinning = this.TotalHit >= gameplaydata.VoucherWinPoint;
    }

    GameOver(){
        this.IsGameStarted = false;
        this.Board.Disable();
        
        this.view.TimesUp();

        this.time.addEvent({ 
            delay: 3000, 
            callback: this.BackToTitle, 
            callbackScope: this, 
            loop: false 
        });
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
        this.scene.launch('TitleScene', {
            isAfterGame: true,
            isGameWin: this.IsWinning

        });

        this.scene.stop();
    }
}