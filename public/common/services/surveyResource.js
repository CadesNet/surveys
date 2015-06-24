( function () {
	"use strict";

	angular
		.module("common.services")
		.factory( 'surveyResource', ['$resource', surveyResource ] );

	function surveyResource ($resource) {
		return $resource("/surveys/:id");
	}


} )();