
export class AnimationHelper{

    /** 
     * @param {Phaser.Scene} scene 
     * @param {string} name 
     * @param {string} texture 
     * @param {number} start 
     * @param {number} end 
     * @param {number} framerate
     * @param {boolean} loop 
    */
    static AddSequence(scene, name, texture, start, end, framerate, loop){
        
        let frames = scene.anims.generateFrameNumbers(texture,{prefix: texture + "_" + name, start : start, end:end});

        var anim = scene.anims.create({
            key: name,
            frames: frames,
			frameRate: framerate,
			repeat: (loop) ? -1 : 0
        });

        return anim;
    }

    /** 
     * @param {Phaser.Scene} scene 
     * @param {string} name 
     * @param {string} texture 
     * @param {(number|Array)} frames 
     * @param {number} framerate
     * @param {boolean} loop 
    */
    static AddFrames(scene, name, texture, frames, framerate, loop){
        let frameList = [];
        for(var i = 0; i < frames.length; i++ ){
            frameList.push({
                key: texture,
                frame: frames[i]
            });
        }

        var anim = scene.anims.create({
            key: name,
            frames: frameList,
			frameRate: framerate,
			repeat: (loop) ? -1 : 0
        });

        return anim;
    }
}
