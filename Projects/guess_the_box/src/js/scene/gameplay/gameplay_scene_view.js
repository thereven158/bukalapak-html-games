import GameplaySceneController from "./gameplay_scene_controller";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";
import ClawAController from "../../subcontroller/claw_a_controller";
import ClawBController from "../../subcontroller/claw_b_controller";

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
        let wall = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.38, 'bg_wall');
        if((this.ScreenUtility.GameHeight * 0.38) * wall.WidthAspectRatio < this.ScreenUtility.GameWidth){
            wall.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        }else{
            wall.setDisplayHeight(this.ScreenUtility.GameHeight * 0.38, true);
        }
        wall.setOrigin(0.5,1);

        let clawA = new ClawAController(this.scene, this.ScreenUtility.GameWidth * -0.2, this.ScreenUtility.GameHeight * 0.35);
        clawA.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);
        clawA.setOrigin(0,1);

        let clawB = new ClawBController(this.scene, this.ScreenUtility.GameWidth * 1.1, this.ScreenUtility.GameHeight * 0.35);
        clawB.setDisplayWidth(this.ScreenUtility.GameWidth * 0.3, true);
        clawB.setOrigin(1,1);

        let floor = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.25, 'bg_floor');
        floor.setOrigin(0.5,0);
        if((this.ScreenUtility.GameHeight * 0.75) * floor.WidthAspectRatio < this.ScreenUtility.GameWidth){
            floor.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        }else{
            floor.setDisplayHeight(this.ScreenUtility.GameHeight * 0.75, true);
        }
    
        let joystick = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight, 'bg_joystick');
        joystick.setDisplayWidth(this.ScreenUtility.GameWidth , true);
        joystick.setOrigin(0.5,1);

        this.Scorebar = new Image(this.scene, 0, 0, 'ui_scorebar');
        this.Scorebar.setOrigin(0);
        this.Scorebar.setDisplayWidth(this.ScreenUtility.GameWidth, true);

        this.ScoreTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.168, this.Scorebar.displayHeight * 0.44, this.scene.Score
            ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(56);

        this.TimerTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.865, this.Scorebar.displayHeight * 0.294, this.scene.Timer
            ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(56);

        this.StatusTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.51, this.Scorebar.displayHeight * 0.69, "wait"
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

    setStatus = (status) =>{
        this.StatusTxt.setText(status);
    }
};
