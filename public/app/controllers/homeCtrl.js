( function () {
	"use strict";

	angular
		.module('Surveys')
		.controller('HomeCtrl', ['surveyResource', HomeCtrl]);

	function HomeCtrl (surveyResource) {
		var vm = this;

		surveyResource.Surveys.query(function (data) {
            vm.surveys = data;
        });
	}

} )();