var http = require('http');

http.createServer(function(request, response){
	
	response.writeHead(404);
	response.end();
}).listen(52273, function(){
	console.log('server running........');
})