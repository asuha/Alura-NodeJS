var express    = require('express');
var load       = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

app.use(express.static('./app/public'));
app.set('view engine', 'ejs');	
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressValidator());

load('routes', {cwd: 'app'})
	.then('infrastructure')
	.into(app);

app.use(function(request, response, next){
	response.status(404).render('errors/404');
	next();
});

app.use(function(errors, request, response, next){
	if(process.env.NODE_ENV == "production"){
		response.status(500).render('errors/500');
		return;
	}
	next(errors);
});

module.exports = function() {	
	return app;
};