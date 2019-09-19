import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
      this.mainMusic = this.scene.sound.add('main-music');
      this.mainMusic.play();
      this.mainMusic.setLoop(true);
      this.blockHitSfx = this.scene.sound.add('block-hit');
      this.ballBounceSfx = this.scene.sound.add('ball-bounce');
      this.hpDownSfx = this.scene.sound.add('hp-down');
      this.hpOutSfx = this.scene.sound.add('hp-out');
      this.lastHitSfx = this.scene.sound.add('block-lasthit');

      this.background = this.scene.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY, 'background');

      this.timerWindow = this.scene.add.image(0, 0, 'timer-window');
      this.timerWindow.setPosition(this.ScreenUtility.GameWidth - this.timerWindow.displayWidth /2, 
        0 + this.timerWindow.displayHeight /2);

      this.textTimer = this.scene.add.text(this.timerWindow.x / 1.25,
        this.timerWindow.y / 2, 
        "90.00", 
        { fontSize: "125px", fill: "#fff" });
      this.textTimer.setDepth(1);

      this.lifeWindow = this.scene.add.image(0, 0, 'life-window');
      this.lifeWindow.setPosition(this.lifeWindow.displayWidth / 2,
        this.lifeWindow.displayHeight / 2);

      this.life1 = this.scene.add.image(this.lifeWindow.x - this.lifeWindow.x / 3,
        this.lifeWindow.y + this.lifeWindow.y / 2.25,
        'life');

      this.life2 = this.scene.add.image(this.life1.x + 100,
        this.life1.y,
        'life');

      this.life3 = this.scene.add.image(this.life2.x + 100,
        this.life1.y,
        'life');

      this.border = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.timerWindow.displayHeight + 10, 
        'top-border')
        .setImmovable();;

      this.paddle = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.5, 
        'paddle')
        .setImmovable();

      // this.blocks = this.scene.physics.add.staticGroup({
      //   key: 'block-aqua', 
      //   frameQuantity: 24,
      //   gridAlign: { width: 6, height: 4, x: 100, y: 200 }
      // });

      // var x = 82;
      // var y = 400;

      // this.blocksChildren = this.blocks.getChildren();
      // this.blocksChildren[0].setPosition(this.ScreenUtility.GameWidth - x, y);

      // for(var i = 1; i < this.blocksChildren.length; i++){
      //   if (i < 6) {
      //     x += 165;
      //   }
      //   else if (i < 12){
      //     if(i == 6) x += 165;
      //     y = 565;
      //     x -= 165;
      //   }
      //   else if (i < 18){
      //     if(i == 12) x -= 165;
      //     y = 730;
      //     x += 165;
      //   }
      //   else if (i < 24){
      //     if(i == 18) x += 165;
      //     y = 895;
      //     x -= 165;
      //   }
      //   this.blocksChildren[i].setPosition(this.ScreenUtility.GameWidth - x, y);
      // }

      // this.blocks.refresh();

      this.yellowBlock = this.scene.physics.add.staticGroup({
        key: 'block-yellow',
        repeat: 5,
        setXY: {
          x: 82,
          y: 400,
          stepX: 165
        }
      });

      this.redBlock = this.scene.physics.add.staticGroup({
        key: 'block-magenta',
        repeat: 5,
        setXY: {
          x: 82,
          y: 565,
          stepX: 165
        }
      });

      this.yellowBlock2 = this.scene.physics.add.staticGroup({
        key: 'block-yellow',
        repeat: 5,
        setXY: {
          x: 82,
          y: 730,
          stepX: 165
        }
      });

      this.blueBlock = this.scene.physics.add.staticGroup({
        key: 'block-aqua',
        repeat: 5,
        setXY: {
          x: 82,
          y: 895,
          stepX: 165
        }
      });

      this.ball = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 3, 
        'ball')
      .setCollideWorldBounds(true)
      .setBounce(1);
      this.ball.setData('onPaddle', true);
     }
}
