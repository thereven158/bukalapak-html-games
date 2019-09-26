import Phaser from 'phaser';

import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
    }

    init(){
        console.log('game screen')

        this.InitGame();
        this.InitGameData();
        this.InitAudio();
    }

    InitGame(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitGameData(){
        this.IsGameStarted = false;
    }

    InitAudio(){

    }

    create(){
        this.view = new GameplaySceneView(this).create();


        this.StartGame();
    }

    StartGame(){
        this.IsGameStarted = true;
    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

    }

    gameUpdate(timestep, delta){

    }
}