import 'phaser';

export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});
    }

    init(){
        console.log('boot screen');
    }

    preload(){
        
    }
    
    create(){   
        this.scene.start('LoadingScene');   
    }
};