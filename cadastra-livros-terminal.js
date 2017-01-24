var http = require('http');

var config = {
	hostname: 'localhost',
	port: 3001,
	path: '/produtos',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

var client = http.request(config, function(response){
	console.log(response.statusCode);
	response.on('data', function(body){
		console.log('Corpo:'+ body);
	});
});

var produto = {
	titulo : 'mais sobre node',
	descricao: 'node, javascript e um pouco mais sobre http',
	preco: 100
};

client.end(JSON.stringify(produto));