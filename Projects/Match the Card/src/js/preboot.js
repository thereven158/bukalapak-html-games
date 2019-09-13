var preboot = function(){}; // preboot
preboot.prototype = {
    preload(){
        game.load.audio('bgmTitle',AssetUrl+'sound/media.io_bgm_title.mp3');
    },
    create(){
        console.log("preboot");
        game.state.start("boot");
    }
}