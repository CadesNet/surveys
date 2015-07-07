( function () {
	"use strict";

	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser'); 

	var parseUrlencoded = bodyParser.urlencoded({extended : true});

	var models = require("../models");

	//route for /questions
	router.route('/')
		.get(function (req, res) {
			if (req.query.limit>=0) {
				models.questions.findAll().then(function(questions){
            		res.json(questions.slice(0, req.query.limit));
        		});
			} else {
				models.questions.findAll().then(function(questions){
            		res.json(questions);
        		});
			}
		})
		.post(parseUrlencoded, function (req, res) {
			if (/^([0-9])*$/.test(req.body.id) && req.body.id>0) {
	            models.questions.find({ where: {id: req.body.id}, include: [models.options] })
	            .then(function(question) {
					if (question) { // if the record exists in the db
						question.id =  req.body.id,
		                question.question = req.body.question,
		                question.alias = req.body.alias,
		                question.type = req.body.type,
		                question.number_of_options = req.body.number_of_options,
		                question.order = req.body.order,
		                question.value = req.body.value,
		                question.survey_id = req.body.survey_id,
					    question.save().then(function() {
							res.status(201).json(question);
						})
					}
				});
	        } else {    	
				models.questions.create({
	                id :  req.body.question,
	                question : req.body.question,
	                alias : req.body.alias,
	                type : req.body.type,
	                number_of_options : req.body.number_of_options,
	                order : req.body.order,
	                value : req.body.value,
	                survey_id : req.body.survey_id,
	            }).then(function(){
	            	models.questions.findOne( { order : 'updatedAt DESC'}).then(function (question) {
	                	if(question.type!='3' && req.body.options.length>0) {
	                		var countOptions = 0;
	                		for (var i = 0; i < req.body.options.length; i++) {
	                			models.options.create({
					                id :  req.body.options[i],
					                option : req.body.options[i],
					                question_id : question.id,
					            }).then(function (option) {
					            	console.log('Saved Option' + option.option);
					            	countOptions++;
					            	if(countOptions >= req.body.options.length){
					            		console.log('Enviando Repuesta de nueva question');
		                				res.json(question);
					            	}
					            });
	                		}
	                	} else {
	                		console.log('Enviando Repuesta de nueva question');
		                	res.json(question);
	                	}
	            	});
	            }).catch(function(error){
	                console.log("ops: " + error);
	                res.status(500).json({ error: 'error' });
	            });
	        }
		});

	//Route for /questions/:id
	router.route('/:id')
		.all(function (req, res, next) {
			if (/^([0-9])*$/.test(req.params.id) && req.params.id>0) {
				req.questionId = req.params.id;
				req.forDelete = true;
			} else {
				req.questionId = 0;
				req.forNew = true;
			}
			next();
		})
		.get(function (req, res) {
			models.questions.find({ where: {id: req.questionId}, include: [models.options] })
            .then(function(question) {
            	if (question) {
            		res.json(question);
            	} else {
            		if (req.forNew) {
	            		var question = {
	            			"id" : req.questionId, 
	            			'type' : '1',
	            			'number_of_options' : 1,
	            			'alias': '--', 
	            			'order' : 1, 
	            			'value' : 1, 
	            			'survey_id' : '0',
	            			'options' : []
	            		};
	            		res.json(question);
            		} else {
            			res.status(404).json('No question found for '+req.params.id);	
            		}
            	}
            })
		})
		.delete(function (req, res) {
			if (req.forDelete) {
	            models.questions.destroy({ where: { id : req.questionId} })
	            .then(function () {
	            	res.status(200).json({ exito: 'Exito' });
	            })
	            .catch(function () {
	            	res.status(500).json({ error: 'Error - can not delete it' });
	            });
	        } else {
	        	res.status(500).json({ error: 'Error - question not found' });
	        }
		});
	
	module.exports = router;

})();