var IS_SHOW_CONSOLE_ON = false; // for status only

var DEFAULT_GAME_RATIO = 1.77777777777777;

var gameScaleRatio = window.devicePixelRatio / 3;
var gameRatio = 1;

var isStartLandScape = window.innerWidth >= window.innerHeight;

// ref screen size: 720 x 1280
var DEFAULT_SCREEN_SIZE = 1280;
var PrevWinWidth = 0;

var REF_GAME_WIDTH = 1080;
var REF_GAME_HEIGHT = 1920;

var REF_GAME_RATIO = REF_GAME_WIDTH/REF_GAME_HEIGHT;

var defaultGameScreenHeight = DEFAULT_SCREEN_SIZE;
var defaultGameScreenWidth = defaultGameScreenHeight;

var State_After_Preloader = "";

var IsIOS = false;
var IsPreloaded = false;

if(!isStartLandScape)
{
	gameRatio = window.innerWidth/window.innerHeight;
	defaultGameScreenWidth *= gameRatio;
}
else
{
	gameRatio = window.innerHeight/window.innerWidth;
	defaultGameScreenHeight *= gameRatio; 
}

if (IS_DEBUG)
{
	console.log(gameRatio);
}

// if (!IS_BUNDLED) 
// {
// 	AssetUrl = "";
// }

PrevWinWidth = window.innerWidth;

//console.log(window.innerWidth);
//console.log(window.innerHeight);

var gameScaleX = defaultGameScreenWidth/ window.innerWidth;
var gameScaleY = defaultGameScreenHeight / window.innerHeight;

var Game;

//console.log(isStartLandScape);

if (isStartLandScape)
{
	Game = new Phaser.Game(window.innerHeight * REF_GAME_RATIO, window.innerHeight, Phaser.CANVAS, "game", { preload: preload, create: create, update: update, render: render});	
}
else
{
	Game = new Phaser.Game(defaultGameScreenWidth, defaultGameScreenHeight, Phaser.CANVAS, "game", { preload: preload, create: create, update: update, render: render});
}

//console.log(Game.width, Game.height);

var Global = new Global(Game);

var isGameDesktop;

var curGameWidth;
var curGameHeight;

//gameAPI.getFixedQueries();

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

	game.stage.smoothed = true;
	game.scale.refresh();
}

function scaleScreenDesktop(game)
{    
	game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

	game.scale.parentIsWindow = false;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVeritcally = true;
	game.scale.setScreenSize = true;
}

function scaleScreenNonDesktop(game)
{	
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	game.scale.parentIsWindow = false;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVeritcally = true;
	game.scale.setScreenSize = true;
}

function preload () {
	scaleScreen(Game);
}

function create () 
{    
	Game.stage.backgroundColor= "#222222";

	Game.state.add("TokenCheck", StateTokenCheck);
	Game.state.add("Preloader", StatePreloader);
	Game.state.add("Title", StateTitle);
	Game.state.add("Gameplay", StateGameplay);
	Game.state.add("Result", StateResult);
	Game.state.add("HighScore", StateHighScore);
	Game.state.add("Test", StateTest);

	Game.stage.backgroundColor = '#191922';
	Game.input.maxPointers = 1;
	
	let userAgent = navigator.userAgent;

	if ( userAgent.match(/BLIos|blios/i) || userAgent.match(/BLAndroid|blandroid/i) || IS_404_BYPASS)
	{
		Game.state.start("Preloader");
	}
	else
	{
		Game.state.start("TokenCheck");
	}
	
	userAgent = "";
	
	//Game.stage.disableVisibilityChange = true;

	State_After_Preloader = "Title";

	if (IS_DEBUG)
	{
		State_After_Preloader = "Title";
	}
}

function update() {

}

function render() {

}