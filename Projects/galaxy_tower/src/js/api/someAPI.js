const API_URL = "";
const DELAY_TIME = 1000;

var GameApi = function()
{
	this.accessToken = "";
	
	this.token = "";
	this.getToken();
	
	this.questionNumber = 2;
	this.questionId = 2;
	
	this.id = "";
	this.username = "";
	this.email = "";
	this.phoneNumber = "";
	this.firstName = "";
	this.lastName = "";
	this.age = "";
	this.gender = "";
	this.currentSeason = "";
	
	this.isDelay = false;
	this.eventAfterDelay = null;
}

GameApi.prototype = {
	register:function(event)
	{
		var parameters = "&mode=register"
		+ "&token=" + this.token;		
		
		if (IS_DEBUG)
		{
			console.log(parameters);
		}
		
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, parameters, (msg) => 
			{
				if (IS_DEBUG)
				{
					console.log(msg);
				}

				HttpResponseEvent("Register", event, msg)
			}, "POST");					   
		});
	},	
	
	login:function(event)
	{
		var parameters = "&mode=login"
		+ "&token=" + this.token;
		
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, parameters, (msg) => 
			{
				if (IS_DEBUG)
				{
					console.log(msg);
				}

				if (msg != null && msg !=undefined)
				{
					var parsed = JSON.parse(msg);

					this.accessToken = parsed["access_token"];				
				}

				HttpResponseEvent("Login", event, msg)
			}, "POST");
		});
	},
	
	getProfile:function(event)
	{
		var parameters = "&mode=profile"
		+ "&version=" + 1
		+ "&access_token=" + this.accessToken
		+ "&token=" + this.token;
		
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, parameters, (msg) => 
			{
				if (IS_DEBUG)
				{
					console.log(msg);
				}

				if (msg != null && msg !=undefined)
				{
					var parsed = JSON.parse(msg);

					this.id = parsed["id"];
					this.username = parsed["username"];
					this.email = parsed["email"];
					this.phoneNumber = parsed["phone_number"];
					this.firstName = parsed["first_name"];
					this.lastName = parsed["last_name"];
					this.age = parsed["age"];
					this.gender = parsed["gender"];
					this.currentSeason = parsed["current_season"];
				}

				HttpResponseEvent("Get Profile", event, msg)
			}, "POST");
		});
	},	
	
	getToken:function()
	{	
		var queries = GetUrlQueries(window.location.search);

		if (IS_TOKEN_DEBUG)
		{
			if (this.token == "")
			{
				//this.token = "xeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiR2c3ZGd3ZzgzNDM0NjJqNjk5OCIsIm5hbWUiOiJKb25pIn0.s4tTuKjRBY9prnf_BUWUpMvrdwXbEpLee5niEyaYPY8";
				this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiR2c3ZGd3ZzgzNDM0NjJqNjk5OCIsIm5hbWUiOiJKb25pIn0.s4tTuKjRBY9prnf_BUWUpMvrdwXbEpLee5niEyaYPY8";
			}
		}
		else
		{
			this.token = queries["token"];
		}
	},
	
	requestToken:function(event)
	{
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, "", (event, msg) => 
			{
				HttpResponseEvent("Request Token", event, msg)
			}, "GET");
		});
	},	
	
	requestCoupon:function(event)
	{
		this.checkDelay(() =>
		{		
			HttpGetAsync(API_URL, "", (event, msg) => 
			{
				HttpResponseEvent("Request Coupon", event, msg)
			});
		});
	},
	
	getQuestion:function(event)
	{
		var parameters = "&mode=getquestion"
		+ "&access_token=" + this.accessToken
		+ "&token=" + this.token
		+ "&question_number=" + this.questionNumber
		+ "&season_id=" + 1;
		
		this.checkDelay(() =>
		{		
			HttpGetAsync(API_URL, parameters, (msg) => 
			{			
				//console.log(msg);

				if (msg != null || msg !=undefined)
				{
					var parsed = JSON.parse(msg);

					if (msg["auth_error_code"] == 0)
					{
						this.questionId = parsed["question_data"]["id"];
					}
				}			

				HttpResponseEvent("Get Question", event, msg);
			});
		});
	},
	
	getPlayerScore:function(event)
	{
		var parameters = "&mode=getscore"
		+ "&access_token=" + this.accessToken
		+ "&token=" + this.token
		+ "&season_id=" + 1;
		
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, parameters, (msg) => 
			{
				HttpResponseEvent("Get Question", event, msg);
			});
		});
	},	
	
	getSeasonQuestions:function(event)
	{
		var parameters = "&mode=getseasonquestion"
		+ "&access_token=" + this.accessToken
		+ "&token=" + this.token
		+ "&season_id=" + this.currentSeason;
		
		//console.log(parameters);
		
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, parameters, (msg) => 
			{			
				if (msg != null || msg != undefined)
				{

				}

				HttpResponseEvent("Get Season Questions", event, msg);
			});		
		});
	},
	
	getParsedQuestion:function(msg)
	{
		if (IS_DEBUG)
		{
			console.log(msg);
		}
		
		if (msg == null || msg == "")
		{
			return null;
		}
		
		var parsedQuestions = {};
		var question;
		var questions = [];
		
		parsedQuestions["questions"] = questions;
		
		var questionData = msg["question_data"];
		var tempQuestion;
		var answers;
		
		for (let i=0;i<questionData.length;i++)
		{
			question = {};
			answers = [];
			
			tempQuestion = questionData[i];
			
			answers.push(tempQuestion["option_a"]);
			answers.push(tempQuestion["option_b"]);
			answers.push(tempQuestion["option_c"]);
			answers.push(tempQuestion["option_d"]);
			
			question["id"] = tempQuestion["id"];
			question["question"] = tempQuestion["question"];
			question["answers"] = answers;
			question["type"] = tempQuestion["question_type"];
			question["answer_values"] = [0,0,0,0];
			
			questions.push(question);
		}
		
		return parsedQuestions;
	},
	
	checkRightAnswer:function(dict)
	{
		return (dict["get_coupon"] == 1 || dict["replay"] == 1);
	},
	
	checkReplayAnswer:function(dict)
	{
		return dict["replay"] == 1;
	},	
	
	submitAnswer:function(event, questionNumber, answer, questionId)
	{
		var parameters = "mode=submitanswer"
		+ "&access_token=" + this.accessToken
		+ "&token=" + this.token
		+ "&question_number=" + questionNumber
		+ "&season_id=" + this.currentSeason
		+ "&answer=" + answer
		+ "&question_id=" + questionId;
		
		if (IS_DEBUG)
		{
			console.log(parameters);
		}
		
		this.checkDelay(() =>
		{
			HttpGetAsync(API_URL, parameters, (msg) => 
			{
				HttpResponseEvent("Submit Answer", event, msg);
				this.questionNumber++;
			});
		});
	},
	
	activateDelay:function()
	{
		this.isDelay = true;
		setTimeout(() => {
			this.activateEndDelayEvent();
		}, DELAY_TIME);
	}, 
	
	activateEndDelayEvent:function()
	{
		this.isDelay = false;
		
		if (this.eventAfterDelay != null)
		{
			this.eventAfterDelay();
			this.eventAfterDelay = null;
		}		
	},
	
	checkDelay:function(event)
	{
		if (this.isDelay)
		{
			this.eventAfterDelay = event;		
		}
		else
		{
			event();
			this.activateDelay();
		}
	}
}

var QuizGameAPI = new GameApi();