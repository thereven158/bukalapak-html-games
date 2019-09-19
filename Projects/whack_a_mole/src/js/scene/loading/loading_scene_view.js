import LoadingSceneController from "./loading_scene_controller";

export default class LoadingSceneView{
   /** @param {LoadingSceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
    
    }

    create(){
        this.loadingScreen = this.scene.add.graphics();
        this.loadingScreen.fillStyle('0x00000', 1);
        this.loadingScreen.fillRect(0,0, this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);


        
    }

    InitLoading(){
      this.Background = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_loading');
      this.Background.displayWidth = this.ScreenUtility.GameWidth;
      this.Background.displayHeight = this.ScreenUtility.GameHeight;

      this.Character = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'loading_character');
      this.Character.displayWidth = this.ScreenUtility.GameWidth * 0.5;
      this.Character.displayHeight = this.Character.displayWidth * (this.Character.height/this.Character.width)

      this.EmptyBar = this.scene.add.image(0, 0, 'loading_emptybar');
      this.EmptyBar.displayWidth = this.ScreenUtility.GameWidth * 0.8;
      this.EmptyBar.displayHeight = this.EmptyBar.displayWidth * (this.EmptyBar.height/this.EmptyBar.width)
      this.EmptyBar.setPosition(this.ScreenUtility.CenterX, this.Character.y + (this.Character.displayHeight *0.5) +  (this.EmptyBar.displayHeight *0.5) )

      this.FullBar = this.scene.add.image(0,0, 'loading_fullbar');
      this.FullBar.displayWidth = this.EmptyBar.displayWidth;
      this.FullBar.displayHeight = this.EmptyBar.displayHeight;
      this.FullBar.setPosition(this.EmptyBar.x - (this.FullBar.displayWidth * 0.5), this.EmptyBar.y)
      this.FullBar.setOrigin(0, 0.5);

      this.FullBarWidth = this.FullBar.displayWidth;

      this.LoadingText = this.scene.add.text(this.ScreenUtility.CenterX, this.FullBar.y + this.FullBar.displayHeight, "Loading...")
        .setFontSize(40).setAlign('center').setFontFamily('panton').setColor('#f9d023');
      this.LoadingText.setOrigin(0.5,0.5);
      this.LoadingText.setScale(this.ScreenUtility.ScalePercentage);

      // this.scene.tweens.add({
      //     targets:  this.LoadingText,
      //     alpha: 0.8,
      //     duration: 1000,
      //     ease: Phaser.Math.Easing.Linear.Linear,
      //     loop:-1,
      //     yoyo:true
      // });	
    }
    
    SetProgressText(value){
        this.FullBar.displayWidth = value * this.FullBarWidth;
    }
};