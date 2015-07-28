( function () {
	"use strict";

	angular
		.module('Surveys')
		.controller('ResultsCtrl', ['survey', "$state", 'surveyResource', ResultsCtrl]);

		function ResultsCtrl (survey, $state, surveyResource) {
			var vm = this;

			vm.survey = survey;

			vm.titulo = "Este es el titulo";

			vm.options = {
			    chart: {
			        type: 'discreteBarChart',
			        height: 450,
			        margin : {
			            top: 20,
			            right: 20,
			            bottom: 60,
			            left: 55
			        },
			        x: function(d){ return d.label; },
			        y: function(d){ return d.value; },
			        showValues: true,
			        valueFormat: function(d){
			            return d3.format(',.4f')(d);
			        },
			        transitionDuration: 500,
			        xAxis: {
			            axisLabel: 'X Axis'
			        },
			        yAxis: {
			            axisLabel: 'Y Axis',
			            axisLabelDistance: 30
			        }
			    }
			};

			vm.data = [
				{
			    	key: "Cumulative Return",
			    	values: [
				        { "label" : "A" , "value" : -29.765957771107 },
				        { "label" : "B" , "value" : 0 },
				        { "label" : "C" , "value" : 32.807804682612 },
				        { "label" : "D" , "value" : 196.45946739256 },
				        { "label" : "E" , "value" : 1.19434030906893 },
				        { "label" : "F" , "value" : -98.079782601442 },
				        { "label" : "G" , "value" : -13.925743130903 },
				        { "label" : "H" , "value" : -5.1387322875705 }
			        ]
			    }
			];


		}

} )();