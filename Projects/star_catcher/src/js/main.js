GlobalConst.GetParameter();

let gameWidth = 1080;
let gameHeight = 1920; 

var isStartLandScape = window.innerWidth >= window.innerHeight;

let defaultGameWidth	= gameWidth;
let defaultGameHeight	= gameHeight;

var REF_GAME_WIDTH = 1080;
var REF_GAME_HEIGHT = 1920;

var REF_GAME_RATIO = REF_GAME_WIDTH/REF_GAME_HEIGHT;

if(window.innerWidth > window.innerHeight)
{   
	gameWidth *= window.innerHeight/gameHeight;
	gameHeight = window.innerHeight;  
}
else
{
	gameWidth = window.innerWidth;
	gameHeight = window.innerHeight;
}

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
}

function preload (game) 
{
	scaleScreen(game);
}

let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
let actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;	

var game;

if (isStartLandScape)
{
	game = new Phaser.Game(window.innerHeight * REF_GAME_RATIO, window.innerHeight, Phaser.CANVAS, "game", { preload: preload, create:create});	
}
else
{
	game = new Phaser.Game(actualWidth * 1.2, actualHeight * 1.2, Phaser.CANVAS, "game", { preload: preload, create:create});

}	

function create(game)
{
	game.transparent = true;
	game.enableDebug = false;
	game.antialias = true;
	//console.log(game);

	game.state.add('boot', StateBoot);
	game.state.add('preload', StatePreload);
	game.state.add('gameplay', StateGameplay); 
	game.state.add('titlescreen', StateTitleScreen); 

	GlobalObject.Game = game;

	// Call the Boot state
	game.state.start('boot');	
}

