( function () {
	"use strict";

	var bodyParser = require('body-parser');
	var express = require('express');

	var app = express();

	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	/*app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));*/

	//var path = require('path');
	var port = process.env.PORT || 3000;

	//models
	var models = require("./models"); 

	//routes
	var routes = require("./routes"); 

	//static route for forntend application
	app.use("/", express.static(__dirname + '/../public/'));

	//routes
	app.use('/surveys', routes.surveys);
	app.use('/questions', routes.questions);
	app.use('/options', routes.options);

	models.sequelize.sync().then(function() {
		app.listen(port, function() {
			console.log('Express server listening on port ' + port);
		});
	});

} )();

