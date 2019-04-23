var express = require('express');
var app = express();

app.get('/map', function(req, res){
	res.sendfile('map.html');
}