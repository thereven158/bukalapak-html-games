let poinArray = [];

var game;
var isDevelop = false;
var showConsole = false;
var enableAnalytics = true;

var androidTrackingId = 'UA-x';
var iosTrackingId = 'UA-x';
var appName = 'Match The Card';
var appVersion = '1.0';

let gameWidth = 1080;
let gameHeight = 1920;
var isDevice = false;

var isStartLandScape = window.innerWidth >= window.innerHeight;

let defaultGameWidth	= gameWidth;
let defaultGameHeight	= gameHeight;

var REF_GAME_WIDTH = 1080;
var REF_GAME_HEIGHT = 1920;

var REF_GAME_RATIO = REF_GAME_WIDTH/REF_GAME_HEIGHT;

if(window.innerWidth > window.innerHeight)
{   
	gameWidth *= window.innerHeight / gameHeight ;
	gameHeight = window.innerHeight ; 
	isDevice = false;                   
}
else
{
	isDevice = true;
	gameWidth = window.innerWidth * window.devicePixelRatio;
	gameHeight = window.innerHeight * window.devicePixelRatio;
}

let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
let actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;	

//game = new Phaser.Game(actualWidth, actualHeight, Phaser.CANVAS, 'matchPic');

function scaleScreen(game)
{
	//console.log(game.width, game.height, window.innerWidth, window.innerHeight);

	isGameDesktop = game.device.desktop;

	if(isGameDesktop && window.innerWidth > window.innerHeight)
	{		
		scaleScreenDesktop(game);
	}
	else
	{
		scaleScreenNonDesktop(game);
	}

	game.scale.parentIsWindow = false;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVeritcally = true;		

	game.scale.setScreenSize = true;

	game.stage.smoothed = true;
	game.scale.refresh();
}

function scaleScreenDesktop(game)
{    
	game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
}

function scaleScreenNonDesktop(game)
{	
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	//game.scale.setGameSize(game.width/window.devicePixelRatio, game.height/window.devicePixelRatio);

	//game.scale.
}

function preload (game) {
	scaleScreen(game);
}

function create(game)
{
	console.log(game.width, game.height);

	game.input.maxPointers = 1;
	game.state.add('boot', boot);
	game.state.add('preboot', preboot);
	game.state.add('mainMenu', mainMenu);
	game.state.add('gameplay', gameplay);
	game.state.add('postGame', postGame);
	game.state.add('highestScore', highestScore);
	//if(isDevelop)
	game.state.start('preboot');	
}

if (isStartLandScape)
{
	game = new Phaser.Game(window.innerHeight * REF_GAME_RATIO, window.innerHeight, Phaser.CANVAS, "matchPic", { preload: preload, create:create});	
}
else
{
	game = new Phaser.Game(actualWidth * 1.2, actualHeight * 1.2, Phaser.CANVAS, "matchPic", { preload: preload, create:create});

}	

	/*if (isStartLandScape)
	{
		game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
	}
	else
	{
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	}*/


	/*
	if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
		var strNav = navigator.userAgent.toLocaleLowerCase();
		enableAnalytics = true;
		if(strNav.includes("blios") || strNav.includes("blandroid")){
			game.state.start('preboot');
			console.log("TRUE", strNav);
		}else{
			let t = game.add.text(game.world.centerX, game.world.centerY, 'You need to open this game \non bukalapak apps!', {
				fill:'#ffffff',
				fontSize: 65 * game.width / defaultGameWidth,
				align: 'center'
			});
			t.anchor.setTo(0.5);
			console.log("FALSE", strNav);
		}
	} else {
		enableAnalytics = false;
		let t = game.add.text(game.world.centerX, game.world.centerY, 'You need to open this game \non bukalapak apps!', {
			fill:'#ffffff',
			fontSize: 65 * game.width / defaultGameWidth,
			align: 'center'
		});
		t.anchor.setTo(0.5);
	}*/

function trackEvent (type, category = null, action = null, value = null)
{
	if (!enableAnalytics) return;
	if (isDevelop) return;
	console.log("send");
	if (type == 'screenview'){
		//ga ('send', 'screenview', { 'appName': appName, 'appVersion': appVersion, 'screenName': action });
	}

	else if (type == 'event'){
		//ga ('send', 'event', category, action, value);
	}

	else if (type == 'exception'){
		/*ga ('send', 'exception', {
			'exDescription' : category,
			'exFatal' : false
		});*/
	}
}
let bgSoundTitle = false;

function playSound(sound, setTo){
	if(!bgSoundTitle && setTo){
		sound.loopFull(1);
		bgSoundTitle = true;
	}else if(!setTo){
		game.sound.stopAll();
		bgSoundTitle = false;
	}
}

function scalingObject(obj, myWidth, myHeight, anchorX = null, anchorY = null){
	let is = false;
	let deviceratio = innerWidth / innerHeight;
	if(obj.key == "btmImg" || obj.key == "topUI" || obj.key =="timesUp"){
		is = true;
	}
	if(deviceratio >= 0.74 && deviceratio < 0.8 && !is && isDevice){
		obj.width = myWidth * game.width / defaultGameWidth * (deviceratio);
		obj.height = myHeight * game.width / defaultGameWidth * (deviceratio);
	}else if(deviceratio >= 0.65 && deviceratio < 0.74 && !is && isDevice){
		obj.width = myWidth * game.width / defaultGameWidth * (0.9);
		obj.height = myHeight * game.width / defaultGameWidth * (0.9);
	}else if(deviceratio >= 0.8 && !is && isDevice){
		obj.width = myWidth * game.width / defaultGameWidth * (0.7);
		obj.height = myHeight * game.width / defaultGameWidth * (0.7);
	}else{
		obj.width = myWidth * game.width / defaultGameWidth;
		obj.height = myHeight * game.width / defaultGameWidth;
	}
	if(anchorX != null || anchorY != null) obj.anchor.setTo(anchorX, anchorY);
}
function fittingObject(obj){
	obj.width = game.width;
	obj.height = game.height;  
}