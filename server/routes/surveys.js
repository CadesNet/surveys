( function () {
	"use strict";

	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser'); 

	var parseUrlencoded = bodyParser.urlencoded({extended : true});

	var models = require("../models");

	//route for /surveys
	router.route('/')
		.get(function (req, res) {
			if (req.query.limit>=0) {
				models.surveys.findAll().then(function(surveys){
            		res.json(surveys.slice(0, req.query.limit));
        		});
			} else {
				models.surveys.findAll().then(function(surveys){
            		res.json(surveys);
        		});
			}
		})
		.post(parseUrlencoded, function (req, res) {
			console.log(req.body);
			if (/^([0-9])*$/.test(req.body.id) && req.body.id>0) {
	            models.surveys.find({ where: {id: req.body.id} })
	            .then(function(survey) {
					if (survey) { // if the record exists in the db
						survey.id = req.body.id,
		                survey.name = req.body.name,
		                survey.title = req.body.title,
		                survey.description = req.body.description,
		                survey.state = req.body.state,
		                survey.code = survey.code
					    survey.save().then(function() {
							res.status(201).json(survey);
						})
					}
				});
	        } else {    	
				models.surveys.create({
	                id : req.body.name,
	                name : req.body.name,
	                title : req.body.title,
	                description : req.body.description,
	                state : req.body.state,
	                code : req.body.code
	            }).then(function(survey){
	                res.json(survey.dataValues);
	            }).catch(function(error){
	                console.log("ops: " + error);
	                res.status(500).json({ error: 'error' });
	            });
	        }
		});

	//Route for /surveys/:id
	router.route('/:id')
		.all(function (req, res, next) {
			if (/^([0-9])*$/.test(req.params.id) && req.params.id>0) {
				req.surveyId = req.params.id;
			} else {
				req.surveyId = 0;
				req.forNew = true;
			}
			next();
		})
		.get(function (req, res) {
			models.surveys.find({ where: {id: req.surveyId}, include: [models.questions] })
            .then(function(survey) {
            	if (survey) {
            		res.json(survey);
            	} else {
            		if (req.forNew) {
	            		var survey = {"id" : req.surveyId, "state" : '1'};
	            		res.json(survey);
            		} else {
            			res.status(404).json('No survey found for '+req.params.id);	
            		}
            	}
            })
		})
		.delete(function (req, res) {
			delete surveys[req.surveyId];
			res.sendStatus(200);
		});
	
	module.exports = router;

})();