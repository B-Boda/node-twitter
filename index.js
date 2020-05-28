const Twitter = require("twitter");
const fs = require("fs");

const client = new Twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

client.get("friends/ids",{screen_name: "your_id"}, function(e, r) {
	var follows = r.ids;
	var new_follows = follows.map(function(num) { return String(num) });
	console.log(new_follows.join());
	
	client.stream('statuses/filter', { follow : new_follows.join() }, function(stream) {
		stream.on('data', function(event) {
			if (follows.includes(event.user.id)) { 
				if (event.retweeted_status) {
					;
				}
				else {
					console.log(event.user.screen_name + "\n" + event.text);
					console.log("------------");
				}
			}
		});
		
		stream.on('error', function(error) {
			throw error;
		});
	});
});

/**/