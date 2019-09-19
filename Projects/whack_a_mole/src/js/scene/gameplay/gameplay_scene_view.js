import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
         this.InitScreen();

     }

     InitScreen(){
        this.Background = this.scene.add.image(this.ScreenUtility.CenterX, 0, 'bg_gameplay');
        this.Background.displayWidth =this.ScreenUtility.GameWidth;
        this.Background.displayHeight = this.Background.displayWidth * (this.Background.height / this.Background.width);
        this.Background.setOrigin(0.5,0);

        this.Planet = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_land');

    
        let planetMaxHeight = this.ScreenUtility.GameWidth * (this.Planet.height / this.Planet.width);
        let planetHeight = (this.ScreenUtility.GameHeight < (planetMaxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.9: planetMaxHeight;

        this.Planet.displayWidth = this.ScreenUtility.GameWidth;
        this.Planet.displayHeight = planetHeight;
        this.Planet.setOrigin(0.5,1);

        this.Scorebar = this.scene.add.image(0, 0, 'ui_scorebar');
        this.Scorebar.setOrigin(0);
        this.Scorebar.displayWidth = this.ScreenUtility.GameWidth;
        this.Scorebar.displayHeight = this.Scorebar.displayWidth * (this.Scorebar.height / this.Scorebar.width);

        this.ScoreTxt = this.scene.add.text(this.Scorebar.displayWidth * 0.18, this.Scorebar.displayHeight * 0.725, this.scene.Score)
            .setFontSize(56)
            .setColor('#eeca83')
            .setAlign('center')
            .setFontFamily('panton_bold');
        this.ScoreTxt.setScale(this.ScreenUtility.ScalePercentage);
        this.ScoreTxt.setOrigin(0.5,0.5);

        this.TimerTxt = this.scene.add.text(this.Scorebar.displayWidth * 0.865, this.Scorebar.displayHeight * 0.365, this.scene.Timer)
            .setFontSize(56)
            .setColor('#eeca83')
            .setAlign('center')
            .setFontFamily('panton_bold');
        this.TimerTxt.setScale(this.ScreenUtility.ScalePercentage);
        this.TimerTxt.setOrigin(0.5,0.5);
     }

     update(){
        this.TimerTxt.setText(Phaser.Math.FloorTo(this.scene.Timer));
        this.ScoreTxt.setText(this.scene.Score);
     }

     TimesUp(){
        this.TimesUpBar = this.scene.add.image(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'ui_timesup');
        this.TimesUpBar.displayWidth = this.ScreenUtility.GameWidth;
        this.TimesUpBar.displayHeight = this.TimesUpBar.displayWidth * (this.TimesUpBar.height / this.TimesUpBar.width);
     }
};
