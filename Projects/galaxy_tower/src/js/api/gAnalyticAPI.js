var GA_ID_ANDROID = "U";
var GA_ID_IPHONE = "U";
var GA_DEBUG = "UA-x-x";
var IS_GA_DEBUG = false;
var IS_TRACKER_ON = true;

var GoogleAnalyticApi = function()
{

}

GoogleAnalyticApi.prototype = 
{
	createGA:function(isAndroid, isIos)
	{
		if (!IS_TRACKER_ON){ 
			return;
		}
		
		if (IS_GA_DEBUG)
		{
			ga('create', GA_DEBUG, 'auto');
			ga('send', 'pageview');	
			return;
		}
		
		if (isAndroid)
		{
			ga('create', GA_ID_ANDROID, 'auto');
		}
		else if (isIos)
		{
			ga('create', GA_ID_IPHONE, 'auto');
		}
		
		ga('send', 'pageview');
	},
	
	trackOpenGameEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'open gt', 'open gt', 'open gt');
		console.log("send Succesfull");
	},
	
	trackStartPlayingEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt start playing', 'gt start playing', 'gt start playing');
		console.log("send Succesfull");
	},
	
	trackFinishPlayingEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt finish playing', 'gt finish playing', 'gt finish playing');
		console.log("send Succesfull");
	},
	
	trackClickMainLagiEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt click main lagi', 'gt click main lagi', 'gt click main lagi');
		console.log("send Succesfull");
	},
	
	trackGoToMainMenuEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt to main menu', 'gt to main menu', 'gt to main menu');
		console.log("send Succesfull");
	},	
	
	trackAccessScore:function(score)
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt score', 'gt score', 'gt score');
		console.log("send Succesfull");
	},		
	
	trackStartLoadingEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt start loading', 'gt start loading', 'gt start loading');
		console.log("send Succesfull");
	},	
	
	trackFinishLoadingEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt finish loading', 'gt finish loading', 'gt finish loading');
		console.log("send Succesfull");
	},
	
	trackErrorEv:function()
	{
		if (!IS_TRACKER_ON){return;}
		ga('send', 'event', 'gt error', 'gt error', 'gt error');
		console.log("send Succesfull");
	}	
}

var GaAPI = new GoogleAnalyticApi();