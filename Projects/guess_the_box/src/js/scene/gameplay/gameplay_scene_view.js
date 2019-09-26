import GameplaySceneController from "./gameplay_scene_controller";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

    /** @return {GameplaySceneView} */
     create(){
        this.InitScreen();
        
        return this;
     }

     InitScreen(){
        this.Background = new Image(this.scene, this.ScreenUtility.CenterX, 0, 'bg_gameplay');
        this.Background.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Background.setOrigin(0.5,0);

        this.Scorebar = new Image(this.scene, 0, 0, 'ui_scorebar');
        this.Scorebar.setOrigin(0);
        this.Scorebar.setDisplayWidth(this.ScreenUtility.GameWidth, true);

        this.ScoreTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.18, this.Scorebar.displayHeight * 0.725, this.scene.Score
            ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(56);

        this.TimerTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.865, this.Scorebar.displayHeight * 0.365, this.scene.Timer
            ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(56);
     }

     update(){
        this.TimerTxt.setText(Phaser.Math.FloorTo(this.scene.Timer));
        this.ScoreTxt.setText(this.scene.Score);
     }

    TimesOut(){
        this.TimesOutRibbon = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'ui_timesup');
        this.TimesOutRibbon.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        this.TimesOutRibbon.setDepth(1);
    }
};
