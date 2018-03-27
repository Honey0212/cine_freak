var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var querystring = require('querystring');
var request = require('request');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = require('path');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res, next) => {
	res.sendFile('index.html');
});


app.post('/getMovies', urlencodedParser, function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var movieTitle = req.body.movieTitle;
	console.log("movieTitle received to search : "+movieTitle);
	var url = 'https://tv-v2.api-fetch.website/movies/1?sort=last%20added&order=1&keywords='+movieTitle;
	console.log(url);
	request.get({
    url: url,
    headers: { 
	  'Content-Type' : 'application/json'
    },
	method: 'GET'
  },
	  function (e, r, body) {
		console.log("in get movies call back");
		response= JSON.parse(body);
		console.log("***"+JSON.stringify(response));
		res.end(JSON.stringify(response));
	  });
});

var server = app.listen(8083, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port)});

