var express = require('../config/express')();
var request = require('supertest')(express);

describe("#Products Controller", function(){
	var url = "/produtos";

	beforeEach(function(done){
		var conn = express.config.connectionFactory();
		conn.query('delete from livros', function(error, results)){
			if(!error)
				done();
		}
	})

	it("#listagem json", function(done){	
		request.get(url)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);

	});

	it("#listagem html", function(done){
		request.get(url)
			.set('Accept', 'text/html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

	it("#cadastro de novo produto com dados invalidos", function(done){
		request.post(url)
			.send({
				titulo: '',
				descricao: 'novo livro'
			})
			.expect(400, done);
	});

	it("#cadastro de novo produto com dados validos", function(done){
		request.post(url)
			.send({
				titulo: 'Livro Teste',
				descricao: 'Livro de teste',
				preco: 20.50
			})
			.expect(302, done);
	});

});