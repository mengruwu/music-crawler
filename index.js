var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

//var Api = require('./api/api.js');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/kkbox', function(req, res) {
	var songs = [];
	request('http://www.kkbox.com/tw/tc/charts/western-daily-song-latest.html', function(error, response, body) {
		if (error) throw new Error(error);
		var $ = cheerio.load(body);
		$('div.item h4 a').each(function(index, element) {
			var song = {};
			song.title = $(this).attr('title');
			songs.push(song);
		});
		res.send(JSON.stringify(songs));
	});
});
