( function () {
	"use strict";
	
	var fs = require("fs");
	var path = require("path");
	var routes = {};
	 
	fs.readdirSync(__dirname).filter(function(file) {
		return ( (file.indexOf(".") !== 0) && (file !== "index.js") && (file.slice(-3) == '.js') );
	}).forEach(function(file) {
		routes[file.slice(0, -3)] = require("./"+file);
	});
	
	module.exports = routes;	

} )();
