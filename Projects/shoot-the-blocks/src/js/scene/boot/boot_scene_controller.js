import LoaderController from '../../module/loader/loader_controller'

export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});
    }

    init(){
        console.log('boot screen');
    }

    preload(){
        Promise.all([
            LoaderController.getInstance().init(),
            LoaderController.getInstance()
				.loadFonts([
					{
						key: "panton",
						path: CONFIG.BASE_ASSET_URL + "/fonts/Panton-Regular.otf"
                    },
                    {
						key: "panton_bold",
						path: CONFIG.BASE_ASSET_URL + "/fonts/Panton-Bold.otf"
					}
				])        
        ]).then(() =>{
            this.scene.start('LoadingScene');    
        }).catch((err) =>{
            console.log(err);
        });
    }
    
    create(){   
        // this.scene.start('LoadingScene');   
    }
};