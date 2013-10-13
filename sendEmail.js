var email = require('emailjs/email')
  , apiconfig = require('./apiconfig');


function send_email(message_content)
{
	var server  = email.server.connect({
	user:    apiconfig.email_username, 
	password:apiconfig.email_password, 
	host:    apiconfig.email_host, 
	ssl:     apiconfig.email_ssl
});

// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    message_content, 
   from:    apiconfig.email_from, 
   to:      apiconfig.email_to,
   subject: apiconfig.email_subject
}, function(err, message) { console.log(err || message); });
}

exports.send_email = send_email;