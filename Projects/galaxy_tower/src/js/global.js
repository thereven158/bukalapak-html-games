var GAME_TIMER_DEFAULT = 90000;

var Global = function(game)
{    	
	this.init(game);
}

Global.prototype = {
	init:function(game)
	{	
		this.game = game;
		
		this.mainFontStyleCenter = {font: "30px Cabin", fill: "#42210B", align: "center", wordWrap: true};	
		this.mainFont = "30px Cabin";
		
		this.gameData = new GameData(game);
		this.musicPlayer = new MusicPlayer(game);	
		this.transitionPlayer = new TransitionPlayer(game);
		this.screenUtility = new ScreenUtility(game, REF_GAME_WIDTH, REF_GAME_HEIGHT, REF_GAME_RATIO);
		
		if (IS_DEBUG)
		{
			this.debugGlobal();
		}		
	},
	
    debugGlobal:function()
	{		
		
	}
}

function GetMainFont(size)
{
	return size + "px Cabin";
}

function InitGameplay()
{
   
}

function ActivateFullScreen(game)
{
    IsIOS = game.device.iOS || game.device.iPhone || game.device.mobileSafari;
    
    if (IsIOS)
    {
        return;
    }
	
	if (game.device.desktop)
	{
		return;
	}	
    
	if (game.heigh > game.width)
	{
		return;
	}	
	
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.startFullScreen(false);    

    if (!game.device.macOS)
    {
        screen.orientation.lock("portrait");
    }
}

function HttpGetAsync(theUrl, parameters, callback, method = "POST")
{
    var xmlHttp = new XMLHttpRequest();
    var parameters = parameters;

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlHttp.send(parameters);
}

function HttpResponseEvent(name, event, msg)
{
   if(IS_DEBUG)
	{
		console.log("======================");
		console.log("Mode: "+name+"\n"+"Response: " + msg);
	}

	if (msg != "null" && msg != "")
	{
		var parsedMsg = JSON.parse(msg);
	}

	if (event != null)
	{
		event(parsedMsg);
	}	
}

function GetUrlQueries(url)
{
	var queries = url.substring(1).split('&');
	var len = queries.length;
	var query;
	var parameters = [];

	for (let i=0;i<len;i++)
	{
		query = queries[i].split('=');            
		parameters[query[0]] = query[1];
	}

	return parameters;
}