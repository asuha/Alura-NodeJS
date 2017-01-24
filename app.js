var app  = require('./config/express')(),
	http = require('http').Server(app),
	io   = require('socket.io')(http),
	port = process.env.PORT || 3001;

app.set('io', io);

http.listen(port, function(){
	console.log('servidor rodando');
	return app;
});