( function () {
	"use strict";

	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser'); 

	var parseUrlencoded = bodyParser.urlencoded({extended : true});

	var models = require("../models");

	//route for /options
	router.route('/')
		.get(function (req, res) {
			if (req.query.limit>=0) {
				models.options.findAll().then(function(options){
            		res.json(options.slice(0, req.query.limit));
        		});
			} else {
				models.options.findAll().then(function(options){
            		res.json(options);
        		});
			}
		})
		.post(parseUrlencoded, function (req, res) {
			if (/^([0-9])*$/.test(req.body.id) && req.body.id>0) {
	            models.options.find({ where: {id: req.body.id} })
	            .then(function(option) {
					if (option) { // if the record exists in the db
						option.id =  req.body.id,
		                option.option = req.body.option,
		                option.question_id = req.body.question_id,
					    option.save().then(function() {
							res.status(201).json(option);
						}).catch(function (error) {
							res.status(500).json({ error: 'La opcion no pudo guardarse' });
						});
					}
				});
	        } else {    	
				models.options.create({
	                id :  req.body.option,
	                option : req.body.option,
	                question_id : req.body.question_id,
	            }).then(function(option){
	            	models.options.findOne({ order : 'updatedAt DESC' }).then(function (option) {
	                	res.json(option);
	            	}) ;
	            }).catch(function(error){
	                res.status(500).json({ error: 'error' });
	            });
	        }
		});

	//Route for /options/:id
	router.route('/:id')
		.all(function (req, res, next) {
			if (/^([0-9])*$/.test(req.params.id) && req.params.id>0) {
				req.optionId = req.params.id;
				req.forDelete = true;
			} else {
				req.optionId = 0;
				req.forNew = true;
			}
			next();
		})
		.get(function (req, res) {
			models.options.find({ where: {id: req.optionId} })
            .then(function(option) {
            	if (option) {
            		res.json(option);
            	} else {
            		res.status(404).json('No option found for '+req.params.id);	
            	}
            })
		})
		.delete(function (req, res) {
			if (req.forDelete) {
	            models.options.destroy({ where: { id : req.optionId} })
	            .then(function () {
	            	res.status(200).json({ exito: 'Exito' });
	            })
	            .catch(function () {
	            	res.status(500).json({ error: 'Error - can not delete it' });
	            });
	        } else {
	        	res.status(500).json({ error: 'Error - option not found' });
	        }
		});
	
	module.exports = router;

})();