( function () {
	"use strict"; 

	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser');
	var parseUrlencoded = bodyParser.urlencoded({extended : false});

	var locations = {
		'Fixed' : 'First floor - locations',
		'Movable' : 'Second floor - locations',
		'Rotating' : 'Penthouse - locations'
	};
		
	//route for /locations
	router.route('/')
		.get(function (req, res) {
			if (req.query.limit>=0) {
				res.json(Object.keys(locations).slice(0, req.query.limit));
			} else {
				res.json(Object.keys(locations));
			}
		})
		.post(parseUrlencoded, function (req, res) {
			var newBlock = req.body;
			locations[newBlock.name] = newBlock.description;
			res.status(201).json(newBlock.name);
		});

	//Route for "locations/:name"
	router.route('/:name')
		.all(function (req, res, next) {
			var name = req.params.name;
			var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
			req.blockName = block;
			next();
		})
		.get(function (req, res) {
			var description = locations[req.blockName];
			if (!description) {
				res.status(404).json('No descripton found for '+req.params.name);
			} else {
				res.json(description);
			}
		});

	module.exports = router;

} )();