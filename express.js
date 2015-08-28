var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser());
app.get('/getCookie', function(request,response){
	response.send(request.cookies);
}); 
app.get('/setCookie', function(request,response){
	response.cookie('string', 'cookie');

	response.redirect('/getCookie');
}); 

http.createServer(app).listen(52273,function(){
	console.log('server running.....');
}); 