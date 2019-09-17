import ScreenUtility from '../../module/screen/screen_utility';
import gameplaydata from '../../gameplaydata';

import GameplaySceneView from './gameplay_scene_view';
import BoardController from '../../subcontrollers/board/board_controller';
import TargetObjectController from '../../gameobjects/target_object_controller';


export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});

    }

    init(){
        console.log('game screen')
    }

    InitGameData(){
        this.TotalHit = 0;
        this.Score = 0;
        this.Timer = gameplaydata.GameTime;
        this.IsGameStarted = false;
        this.VoucherShowed = false;
        this.HasVoucher = false;

        this.CheckTimer = 0;
        this.NextCheckTime = 0;

        this.CurrentPhaseIdx = 0;
        this.CurrentPhase = gameplaydata.Phases[this.CurrentPhaseIdx];
    }

    preload(){
        this.InitGameData();

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

        this.Board.update();
        this.view.update();
    }

    GameUpdate(timestep, dt){
        this.Timer -= (1 * dt) / 1000;
        this.CheckTimer += (1 * dt) / 1000;

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
        console.log(this.CurrentPhaseIdx);
        let checkTimeInterval = Phaser.Math.Between(this.CurrentPhase.MinCheckTime, this.CurrentPhase.MaxCheckTime);

        if(this.CheckTimer >= this.NextCheckTime){
            this.Check();
            this.NextCheckTime = this.CheckTimer + checkTimeInterval;
        }

        //Isgameover
        if(this.Timer <= 0){
            this.Timer = 0;

            this.GameOver();
        }
    }

    Check(){
        let targetsData = this.Board.GetTargetsData();

        let chance = Phaser.Math.Between(0, 100);
        let isSuccess = chance <= this.CurrentPhase.ShowChance;

        if(targetsData.totalActive < this.CurrentPhase.MaxEnemy && isSuccess){
            let randomTargetIdx = Phaser.Math.Between(0, targetsData.totalInactive - 1)
            /** @type {TargetObjectController}  */
            let target = targetsData.inactiveTargets[randomTargetIdx];
            target.Show();

        }
    }

    OnTargetHit = ()=>{ 
        if(!this.IsGameStarted)
            return;

        this.TotalHit += 1;
        this.Score += gameplaydata.HitPoint;
    }

    GameOver(){
        this.IsGameStarted = false;
        this.Board.Disable();
        
    }

    Restart(){
        this.Reset();
        this.InitGameData();
        this.InitiateGame();
    }

    Reset(){
        this.Board.Reset();
    }

}