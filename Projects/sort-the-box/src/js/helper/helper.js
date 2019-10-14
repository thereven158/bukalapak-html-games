export class Helper {
    /** 
    * @param {Phaser.Scene} scene
    * @param {number} duration
    * @param {any} event 
    * @param {Boolean} isLooping
    * @return {Phaser.Time.TimerEvent} 
    */
   static delay = (scene, duration, event, isLooping = false) =>{
        let delay = scene.time.addEvent({ 
            delay: duration, 
            callback: event, 
            callbackScope: this, 
            loop: isLooping 
        });

        return delay;
    }
}
