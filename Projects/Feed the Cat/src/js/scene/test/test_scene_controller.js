import ScreenUtility from '../../module/screen/screen_utility';

import LifeController from '../../gameplay/life/life_controller';

export default class TestSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TestScene'});
        
    }

    init(data){
        console.log('test screen')

        this.InitTest();
		this.InitAudio();
    }

    InitTest(){
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    InitAudio(){

    }

    create()
	{
        this.lifeObj = new LifeController(this);
		this.lifeObj.createView();
		this.lifeObj.reduceLife(1);
		this.lifeObj.reduceLife(1);
		this.lifeObj.reduceLife(1);
		//this.scoreObj.addScore(5620);
    }

    update(){

    }

}