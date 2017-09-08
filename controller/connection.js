var mongoose = require('mongoose');
//ES6 Promises
mongoose.Promise = global.Promise;

module.exports = function(){
	mongoose.connect("mongodb://localhost/shorturl", { useMongoClient: true });
	mongoose.connection.once('open', function(){
		console.log("Connection has beem made, now make fireworks!");
	}).on('error', function(error){
		console.log("Connection error: ", error);
	});;

	
}