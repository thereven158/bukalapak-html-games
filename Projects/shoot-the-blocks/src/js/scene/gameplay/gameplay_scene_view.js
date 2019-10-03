import GameplaySceneController from "./gameplay_scene_controller";
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
      this.background = new Image (this.scene, 
        this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY, 
        'background');
      this.background.setDisplaySize(this.ScreenUtility.GameWidth,
        this.ScreenUtility.GameHeight);

      this.timerWindow = new Image(this.scene, 0, 0, 'timer-window');
      this.timerWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
      this.timerWindow.setPosition(this.ScreenUtility.GameWidth - this.timerWindow.displayWidth /2, 
        0 + this.timerWindow.displayHeight / 2);

      this.textTimer = new Text(this.scene,
        this.timerWindow.x / 0.97,
        this.timerWindow.y / 1.15, 
        "90.00", 
        { align:'center', fontFamily: 'panton', color: '#f9d023' })
        .setFontSizeRS(100);
      this.textTimer.setDepth(1);

      this.lifeWindow = new Image(this.scene, 0, 0, 'life-window');
      this.lifeWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.4, true);
      this.lifeWindow.setPosition(this.lifeWindow.displayWidth / 2,
        this.lifeWindow.displayHeight / 2);

      this.life1 = new Image (this.scene, this.lifeWindow.x - this.lifeWindow.x * 0.45,
        this.lifeWindow.y + this.lifeWindow.y / 2.25,
        'life');
      this.life1.setDisplayWidth(this.ScreenUtility.GameWidth * 0.075, true);

      this.life2 = new Image (this.scene, 
        this.life1.x + this.life1.displayWidth * 1.35,
        this.life1.y,
        'life');
      this.life2.setDisplayWidth(this.ScreenUtility.GameWidth * 0.075, true);

      this.life3 = new Image (this.scene, this.life2.x + this.life2.displayWidth  * 1.35,
        this.life1.y,
        'life');
      this.life3.setDisplayWidth(this.ScreenUtility.GameWidth * 0.075, true);

      this.border = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.timerWindow.displayHeight + this.timerWindow.displayHeight * 0.2, 
        'top-border')
        .setImmovable();
      this.border.displayWidth = this.ScreenUtility.GameWidth * 1.2;
      this.border.displayHeight = this.border.displayWidth * (this.border.height / this.border.width);

      this.paddle = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.5, 
        'paddle')
        .setImmovable();
      this.paddle.displayWidth = this.ScreenUtility.GameWidth * 0.33;
      this.paddle.displayHeight = this.paddle.displayWidth * (this.paddle.height / this.paddle.width);

      this.ball = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight * 0.6 * 0.55, 
        'ball')
      .setCollideWorldBounds(true)
      .setBounce(1);
      this.ball.displayWidth = this.ScreenUtility.GameWidth * 0.085;
      this.ball.displayHeight = this.ball.displayWidth * (this.ball.height / this.ball.width);
      this.ball.setData('onPaddle', true);

      this.CreateBlocks();
     }

     CreateBlocks(){
      this.yellowBlock = this.scene.physics.add.staticGroup({
        key: 'block-yellow',
        repeat: 5,
        setXY: {
          x: 82,
          y: this.timerWindow.displayHeight + this.timerWindow.displayHeight * 0.9,
        }
      });

      this.yellowBlockChild = this.yellowBlock.getChildren();
      this.setChildrenDisplay(this.yellowBlock, this.yellowBlockChild);

      this.yellowBlock.refresh();

      this.redBlock = this.scene.physics.add.staticGroup({
        key: 'block-magenta',
        repeat: 5,
        setXY: {
          x: this.yellowBlockChild[0].x,
          y: this.yellowBlockChild[0].y + this.yellowBlockChild[0].displayHeight,
        }
      });

      this.redBlockChild = this.redBlock.getChildren();
      this.setChildrenDisplay(this.redBlock, this.redBlockChild);

      this.redBlock.refresh();
      
      this.yellowBlock2 = this.scene.physics.add.staticGroup({
        key: 'block-yellow',
        repeat: 5,
        setXY: {
          x: this.redBlockChild[0].x,
          y: this.redBlockChild[0].y + this.redBlockChild[0].displayHeight
        }
      });

      this.yellowBlock2Child = this.yellowBlock2.getChildren();
      this.setChildrenDisplay(this.yellowBlock2, this.yellowBlock2Child);

      this.yellowBlock2.refresh();

      this.blueBlock = this.scene.physics.add.staticGroup({
        key: 'block-aqua',
        repeat: 5,
        setXY: {
          x: this.yellowBlock2Child[0].x,
          y: this.yellowBlock2Child[0].y + this.yellowBlock2Child[0].displayHeight
        }
      });

      this.blueBlockChild = this.blueBlock.getChildren();
      this.setChildrenDisplay(this.blueBlock, this.blueBlockChild);

      this.blueBlock.refresh();
      
     }

     setChildrenDisplay(group, children){
      for(var i = 0; i < children.length; i++){
        let width = this.ScreenUtility.GameWidth * 0.1675;
        let height = width * (children[i].height / children[i].width);
        children[i].setDisplaySize(width, height);
        children[i].body.setSize(width, height);

        // children[i].displayWidth = this.ScreenUtility.GameWidth * 0.1675;
        // children[i].displayHeight = children[i].displayWidth * (children[i].height / children[i].width);
        if (i == 0)
          children[i].setPosition(0 + children[i].displayWidth/2, children[i].y);
        else{
          children[i].setPosition(children[i-1].x + children[i-1].displayWidth, children[i-1].y);
        }
      }
      group.refresh();
     }

     CreateBanner(){
        this.banner = new Image (this.scene, 
          this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'times-up');
        this.banner.setDisplayWidth(this.ScreenUtility.GameWidth, true);
        this.banner.setDepth(8);
     }

     CreateBannerText(){
      this.bannerText = new Text(this.scene,
        this.banner.x,
        this.banner.y, 
        "Banner", 
        { align:'center', fontFamily: 'panton', color: '#f9d023' })
        .setFontSizeRS(120);
      this.bannerText.setDepth(9);
     }

     TimesUpBanner(){
      this.CreateBanner();

      this.CreateBannerText();
      this.bannerText.setText("Time's Up");
     }

     WinBanner(){
      this.CreateBanner();

      this.CreateBannerText();
      this.bannerText.setText("Task Complete");
     }

     LoseBanner(){
      this.CreateBanner();

      this.CreateBannerText();
      this.bannerText.setText("Game Over");
     }

}
