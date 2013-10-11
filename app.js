
/*initialize count_total: the total number of ticket events*/
var count_total = 0;
var last_modified_date = "";
/* Module dependencies */
var request =  require('request')
  , twilio = require('twilio')
  , apiconfig = require('./apiconfig');

var time_interval = 2*60*1000;
// var time_interval = 5*1000; //for testing purpose only.

//api address for eventbrite api
api_address = "https://www.eventbrite.com/json/event_get?app_key="+apiconfig.eventbrite_api+"&id="+apiconfig.eventbrite_event_id

console.log("Programming Starting...");
console.log("Getting the data from Eventbrite every 2 mins")
setInterval(function(){check_using_modified_date()}, time_interval);

function check_using_modified_date()
{
	console.log("--------Check Using Change Date-------------")
	
	request(api_address, function (error, response, body) {
	var r=JSON.parse(body)["event"];
	modifiedDate=r["modified"];
	eventUrl=r["url"];

	if (last_modified_date != modifiedDate)
	{
		console.log("Event is Modified, Inform Immediately");
		console.log(modifiedDate);
		last_modified_date = modifiedDate;
		send_sms('Eventbrite info for id '+apiconfig.eventbrite_event_id+ ' is modified on '+modifiedDate+ ' url: '+eventUrl);
	}
	else
	{
		console.log("No Change");
	}
		
	});

}

function send_sms(message_content)
{
	// Create a new REST API client to make authenticated requests against the
	// twilio back end
	var client = new twilio.RestClient(apiconfig.TWILIO_ACCOUNT_SID, apiconfig.TWILIO_AUTH_TOKEN);
	 
	// Pass in parameters to the REST API using an object literal notation. The
	// REST client will handle authentication and response serialzation for you.
	client.sms.messages.create({
	to: apiconfig.SEND_TXT_TO_NUMBER,
	from: apiconfig.TWILIO_SEND_TXT_FROM_NUMBER,
	body: message_content
	}, function(error, message) {
	// The HTTP request to Twilio will run asynchronously. This callback
	// function will be called when a response is received from Twilio
	// The "error" variable will contain error information, if any.
	// If the request was successful, this value will be "falsy"
	if (!error) {
	// The second argument to the callback will contain the information
	// sent back by Twilio for the request. In this case, it is the
	// information about the text messsage you just sent:
	console.log('Success! The SID for this SMS message is:');
	console.log(message.sid);
	 
	console.log('Message sent on:');
	console.log(message.dateCreated);
	}
	else {
	console.log('Oops! There was an error.');
	}
});

}