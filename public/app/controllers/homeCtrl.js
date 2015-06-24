( function () {
	"use strict";

	angular
		.module('Surveys')
		.controller('HomeCtrl', ['surveyResource', HomeCtrl]);

	function HomeCtrl (surveyResource) {
		var vm = this;

		surveyResource.query(function (data) {
            vm.surveys = data;
        });
	}

} )();