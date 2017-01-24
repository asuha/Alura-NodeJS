var http = require('http');

var config = {
	hostname: 'localhost',
	port: 3001,
	path: '/produtos',
	headers: {
		'Accept': 'application/json'
	}
};

http.get(config, function(response){
	console.log(response.statusCode);
	response.on('data', function(body){
		console.log('Corpo:'+ body);
	});
})