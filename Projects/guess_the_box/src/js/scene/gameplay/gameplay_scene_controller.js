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


        //Isgameover
        if(this.Timer <= 0){
            this.Timer = 0;

            this.GameOver();
        }
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