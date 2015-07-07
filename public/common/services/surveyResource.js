( function () {
	"use strict";

	angular
		.module("common.services")
		.factory( 'surveyResource', ['$resource', surveyResource ] );

	function surveyResource ($resource) {
		return {
			Surveys : $resource("/surveys/:id"),
			Questions : $resource("/questions/:id"),
			Options : $resource("/options/:id")
		}
	}


} )();