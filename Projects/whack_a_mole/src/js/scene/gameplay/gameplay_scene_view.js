import GameplaySceneController from "./gameplay_scene_controller";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";

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
        let background = new Image(this.scene, this.ScreenUtility.CenterX, 0, 'bg_gameplay');
        background.setMinPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        background.setOrigin(0.5,0);

        let planet = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_land');
        planet.setMaxPreferredDisplaySize(this.ScreenUtility.GameWidth * 1.6, this.ScreenUtility.GameHeight * 1);
        planet.setOrigin(0.5,1);

        let scorebar = new Image(this.scene, 0, 0, 'ui_scorebar');
        scorebar.setOrigin(0);
        scorebar.setDisplayWidth(this.ScreenUtility.GameWidth, true);

        this.ScoreTxt = new Text(this.scene, scorebar.displayWidth * 0.18, scorebar.displayHeight * 0.725, this.scene.Score
         ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(56);

        this.TimerTxt = new Text(this.scene, scorebar.displayWidth * 0.865, scorebar.displayHeight * 0.365, this.scene.Timer
            ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(56);

     }

     timesout(){
        this.TimesUpBar = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'ui_timesup');
        this.TimesUpBar.displayWidth = this.ScreenUtility.GameWidth;
        this.TimesUpBar.displayHeight = this.TimesUpBar.displayWidth * (this.TimesUpBar.height / this.TimesUpBar.width);
        this.TimesUpBar.setDepth(1);
     }

      setTimerText = (timer) =>{
        this.TimerTxt.setText(Phaser.Math.FloorTo(timer));
      }

      setScoreText = (score)=>{
         this.ScoreTxt.setText(score);
      }
};
