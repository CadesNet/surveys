( function () {
	"use strict";

	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser'); 

	var parseUrlencoded = bodyParser.urlencoded({extended : true});

	var models = require("../models");

	//route for /answers
	router.route('/')
		.get(function (req, res) {
			if (req.query.limit>=0) {
				models.answers.findAll().then(function(answers){
            		res.json(answers.slice(0, req.query.limit));
        		});
			} else {
				models.answers.findAll().then(function(answers){
            		res.json(answers);
        		});
			}
		})
		.post(parseUrlencoded, function (req, res){
			if(req.body.answers) {
				models.answers_details.create({
					id : req.body.teacher,
					teacher : req.body.teacher,
					matter : req.body.matter,
					schedule : req.body.schedule,
					survey_id : req.body.survey_id
				}).then(function () {
					models.answers_details.findOne({ order : 'updatedAt DESC'}).then(function (answers_detail) {
						req.body.answers.forEach(function (answer) {
							switch (answer.type) {
								case '1':
									models.answers.create({
										id : 'none',
										answers_details_id : answers_detail.id,
										answer : answer.answer,
										question_id : answer.id,
										type : answer.type
									}).then(function () {
										console.log("Respuesta de seleccion simple registrada");
									});
									break;
								case '2':
									//console.log(Object.keys(answer.answer));
									Object.keys(answer.answer).forEach(function (id) {
										if(!answer.answer[id]) {
											delete answer.answer[id];
										}
									});
									models.answers.create({
										id : 'none',
										answers_details_id : answers_detail.id,
										answer : Object.keys(answer.answer).toString(),
										question_id : answer.id,
										type : answer.type
									}).then(function () {
										console.log("Respuesta de seleccion multiple registrada");
									});
									break;
								case '3':
									models.answers.create({
										id : 'none',
										answers_details_id : answers_detail.id,
										answer : answer.answer,
										question_id : answer.id,
										type : answer.type
									}).then(function () {
										console.log("Respuesta de tipo complementacion registrada");
									});
									break;
								default:
									break;
							}
						});
					});
					res.status(201).json({'response' : req.body});
				}).catch(function(error){
	                console.log("ops: " + error);
	                res.status(500).json({ error: 'error' });
	            });
			}
		});

	//Route for /answers/:id
	router.route('/:id')
		.all(function (req, res, next) {
			if (/^([0-9])*$/.test(req.params.id) && req.params.id>0) {
				req.answerId = req.params.id;
				req.forDelete = true;
			} else {
				req.answerId = 0;
				req.forNew = true;
			}
			next();
		})
		.get(function (req, res) {
			models.answers.find({ where: {id: req.answerId} })
            .then(function(answer) {
            	if (answer) {
            		res.json(answer);
            	} else {
            		if (req.forNew) {
	            		var answer = {
	            			"id" : req.answerId, 
	            			'type' : '1',
	            			'number_of_options' : 1,
	            			'alias': '--', 
	            			'order' : 1, 
	            			'value' : 1, 
	            			'survey_id' : '0',
	            			'options' : []
	            		};
	            		res.json(answer);
            		} else {
            			res.status(404).json('No answer found for '+req.params.id);	
            		}
            	}
            })
		})
		.delete(function (req, res) {
			if (req.forDelete) {
	            models.answers.destroy({ where: { id : req.answerId} })
	            .then(function () {
	            	res.status(200).json({ exito: 'Exito' });
	            })
	            .catch(function () {
	            	res.status(500).json({ error: 'Error - can not delete it' });
	            });
	        } else {
	        	res.status(500).json({ error: 'Error - answer not found' });
	        }
		});
	
	module.exports = router;

})();