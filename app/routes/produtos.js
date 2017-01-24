module.exports = function(app){
	var listProducts = function(request, response, next){
		var connection = app.infrastructure.connectionFactory();
		var productsDAO = new app.infrastructure.DBProductsDAO(connection);

		productsDAO.lista(function(error, results){
			if(error){
				return next(error);
			}
			response.format({
				html: function(){
					response.render('produtos/lista', {lista: results});
				},
				json: function(){
					response.json(results);
				}
			});	
		});

		connection.end();
	}

	app.get('/produtos', listProducts);

	app.get('/produtos/form', function(request, response){
		response.render('produtos/form', {validationErrors:{}, product: {}});
		
	})

	app.post('/produtos', function(request, response){

		var products = request.body;

		request.assert('titulo', 'Title is mandatory').notEmpty();
		request.assert('preco', 'Invalid format').isFloat();

		var errors = request.validationErrors();

		if(errors){
			response.format({
				html: function(){
					response.status(400).render('produtos/form', {validationErrors: errors, product: products});
				},
				json: function(){
					response.status(400).json(errors);
				}
			});
			return;
		}
		
		var connection = app.infrastructure.connectionFactory();
		var productsDAO = new app.infrastructure.DBProductsDAO(connection);

		productsDAO.save(products, function(error, results){
			console.log(error);
			response.redirect('/produtos');
		})
	});
}	