import GameplaySceneController from "./gameplay_scene_controller";
import Image from "../../module/objects/image";
import Button from "../../module/objects/button";
import Text from "../../module/objects/text";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
      
    }

    /** @return {GameplaySceneView} */
    create(){
        this.initScreen();
        
        return this;
    }
    
    initScreen = ()=>{
       

        this.Background = new Image(this.scene, this.ScreenUtility.CenterX, 0, 'bg_ingame');
        this.Background.setMinPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Background.setOrigin(0.5,0);

        let table = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.GameHeight * 0.75, 'bg_ingame_table');
        table.setOrigin(0.5,0);
        table.setMinPreferredDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight * 0.25);
        table.setDepth(1)

        this.Btn_blue = new Button(this.scene, this.ScreenUtility.GameWidth * 0.3, table.y + (table.displayHeight * 0.5), 'btn_blue', 0);
        this.Btn_blue.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
        this.Btn_blue.setPressedTexture('btn_blue', 1);
        this.Btn_blue.setDepth(1)

        this.Btn_red = new Button(this.scene, this.ScreenUtility.GameWidth * 0.7, table.y + (table.displayHeight * 0.5), 'btn_red', 0);
        this.Btn_red.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
        this.Btn_red.setPressedTexture('btn_red', 1);
        this.Btn_red.setDepth(1)

        this.Scorebar = new Image(this.scene, 0, 0, 'ui_scorebar');
        this.Scorebar.setOrigin(0);
        this.Scorebar.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        this.Scorebar.setDepth(1)

        this.ScoreTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.21, this.Scorebar.displayHeight * 0.555, this.scene.Score
            ,{align:'center', fontFamily: 'panton_bold', color: '#eeca83'}).setFontSizeR(70);          
        this.ScoreTxt.setDepth(1)


        this.TimerTxt = new Text(this.scene, this.Scorebar.displayWidth * 0.825, this.Scorebar.displayHeight * 0.37, this.scene.Timer
            ,{align:'center', fontFamily: 'panton_bold', color: '#ffffff'}).setFontSizeR(110);
        this.TimerTxt.setDepth(1)

        this.Status = new Image(this.scene, this.Scorebar.displayWidth * 0.506, this.Scorebar.displayHeight * 0.6, 'status', 0);
        this.Status.setDisplayWidth(this.Scorebar.displayWidth * 0.105, true);
        this.Status.setDepth(1)
    }

    update = ()=>{
        this.TimerTxt.setText(Phaser.Math.FloorTo(this.scene.Timer));
        this.ScoreTxt.setText(this.scene.Score);
    }

    timesout = ()=>{
        this.TimesOutRibbon = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'ui_timesout');
        this.TimesOutRibbon.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        this.TimesOutRibbon.setDepth(1);
    }

    onClickBlueButton = (event) =>{
        this.Btn_blue.onPointerDown(event);
    }

    onClickRedButton = (event) =>{
        this.Btn_red.onPointerDown(event);
    }

    setStatus = (stateID)=>{
        this.Status.setFrame(stateID);
    }
};
