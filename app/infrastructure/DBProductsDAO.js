function DBProductsDAO(connection){
	this._connection = connection;
}

DBProductsDAO.prototype.lista = function(callback){
	 this._connection.query('select * from Livros', callback);
}

DBProductsDAO.prototype.save = function(product, callback){
	 this._connection.query('insert into livros set ?', product, callback);  
};

module.exports = function(){	
	return DBProductsDAO;
}
