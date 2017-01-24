module.exports = function(app){
	app.get('/', function(request, response){
		var connection = app.infrastructure.connectionFactory();
		var produtosDAO = new app.infrastructure.DBProductsDAO(connection);

		produtosDAO.lista(function(errors, results){
			response.render('home/index', {livros: results});
		});

		connection.end();
	});
}