var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./connection');
var shortUrl = require('../models/shortUrl');
var mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

var urlencodedParser = bodyParser.urlencoded({extended: false});

//Connecting with database
var connect = connection();


module.exports = function(app){

	app.get('/', function(req, res){
		res.render('index');
	});

	app.post('/', urlencodedParser, function(req, res){

		var regEx = /(http:\/\/)?\www\.\w+\.(com|org|net).?(br)?(\/\w+)?/;
		if(req.body["url"].match(regEx) != null){
			
			varRandomNumber = Math.floor((Math.random() * 100000));
			shortUrl.find({shortUrl: varRandomNumber}).then(function(result){ 
				if(result.length == 0){
						shortUrl.find({url: req.body["url"]}).then(function(result2){
						if(result2.length == 0){
							console.log("Passando pelo caso de NAO EXISTE " + req.body["url"]);
							var newUrl = new shortUrl({
								url: req.body["url"],
								shortUrl: varRandomNumber
							});	

						newUrl.save();
						}

						else{
							console.log("Wasn't possible to create a shortened URL!");
						}	

					});
				}

				else{
					console.log("Wasn't possible to create a shortened URL!");
					
				}
			});
		}
		else{
			console.log(req.body["url"] + " Não é um site!");
		}
	});

	app.get('/:short', function(req, res){
		var short = req.params.short;
		shortUrl.find({shortUrl: short}).then(function(result, err){
			if (err){
				alert("There is no website with this short URL");
			}
			else{
				var urlSearch = result[0]["url"]; //www.google.com
				res.redirect("http://" + urlSearch);
			}
		});
	});

}