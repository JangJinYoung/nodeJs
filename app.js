var fs=require('fs');
var ejs = require('ejs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var client = mysql.createConnection({
	user : 'root',
	password :'09110529',
	database : 'Company'
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

http.createServer(app).listen(52273, function(){
	console.log('server running...');
});

app.get('/', function(request, response){
	fs.readFile('list.html', 'utf8', function(error, data){
		client.query('select * from product', function(error, results){
			response.send(ejs.render(data,{data:results}));
		});
	});
});
app.get('/delete/:id', function(request, response){
	client.query('delete from product where id=?',[request.params.id], function(){
		response.redirect('/');
	})
});
app.get('/insert', function(request, response){
	fs.readFile('insert.html', 'utf8', function(error, data){
		response.send(data);
	});
});
app.post('/insert', function(request, response){
	var body = request.body;
	client.query('insert into product (name, modelnumber, series) values (?,?,?)',[body.name, body.modelnumber, body.series], function(){
		response.redirect('/');
	});
});
app.get('/edit/:id', function(request, response){
	fs.readFile('edit.html','utf8', function(error,data){
		client.query('select * from product where id=?',[request.params.id],function(error,result){
			response.send(ejs.render(data,{
				data:result[0]
			}));
		});
	});
});
app.post('/edit/:id', function(request, response){
	var body=request.body;

	client.query('update product set name=?, modelnumber=?, series=? where id=?',[body.name,body.modelnumber,body.series,request.params.id],function(){
		response.redirect('/');
	});
});