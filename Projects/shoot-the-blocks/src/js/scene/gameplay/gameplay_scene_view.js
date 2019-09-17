import GameplaySceneController from "./gameplay_scene_controller";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
     constructor(scene){
       this.scene = scene;
       this.ScreenUtility = scene.ScreenUtility;
       
     }

     create(){
      this.textTimer = this.scene.add.text(this.ScreenUtility.GameWidth / 1.5,
        this.ScreenUtility.CenterY - this.ScreenUtility.GameHeight / 2, 
        "90.00", 
        { fontSize: "100px", fill: "#fff" });
      this.textTimer.setDepth(1);

      this.scoreText = this.scene.add.text(this.ScreenUtility.CenterX - this.ScreenUtility.GameWidth / 3.25,
        this.ScreenUtility.CenterY - this.ScreenUtility.GameHeight / 2, 
        "0", 
        { fontSize: "100px", fill: "#fff" });
      this.scoreText.setDepth(1);

      this.paddle = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.5, 
        'paddle')
        .setImmovable();

      this.blocks = this.scene.physics.add.staticGroup({
        key: 'block', 
        frameQuantity: 24,
        gridAlign: { width: 6, height: 4, cellWidth: 165, cellHeight: 150, x: 100, y: 200 }
      });

      var x = 115;
      var y = 200;

      this.blocksChildren = this.blocks.getChildren();
      this.blocksChildren[0].setPosition(this.ScreenUtility.GameWidth - x, y);

      for(var i = 1; i < this.blocksChildren.length; i++){
        if (i < 6) {
          x += 150;
        }
        else if (i < 12){
          if(i == 6) x += 150;
          y = 350;
          x -= 150;
        }
        else if (i < 18){
          if(i == 12) x -= 150;
          y = 500;
          x += 150;
        }
        else if (i < 24){
          if(i == 18) x += 150;
          y = 650;
          x -= 150;
        }
        this.blocksChildren[i].setPosition(this.ScreenUtility.GameWidth - x, y);
      }

      this.blocks.refresh();

      this.ball = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.9, 
        'ball')
      .setCollideWorldBounds(true)
      .setBounce(1);
      this.ball.setData('onPaddle', true);

     }
}
