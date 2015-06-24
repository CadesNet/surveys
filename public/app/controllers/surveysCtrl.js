( function () {
	"use strict";

	angular
		.module('Surveys')
		.controller('SurveysCtrl', ['survey', "$state", SurveysCtrl]);

	function SurveysCtrl (survey, $state) {
		var vm = this;

        //Survey select
		vm.survey = survey;
		console.log(vm.survey);
		vm.questions = vm.survey.questions;
		
		vm.newQuestion = {
			'id' : 0, 
			'question' : '', 
			'alias' : '', 
			'type' : '1', 
			'number_of_options' : 1, 
			'value' : '1', 
			'survey_id' : vm.survey.survey_id
		};
		
		vm.questionsTypes = [
	        {'id' : '1', 'type': 'Multiple'},
	        {'id' : '2', 'type': 'Simple'},
	        {'id' : '3', 'type': 'Complementacion'}
	    ];

		if (vm.survey && vm.survey.id) {
			vm.title = "Editar : "+vm.survey.title;
		} else {
			vm.title = "Ecuesta nueva";
			vm.survey.code = Date.now();
		}

		vm.cancel = function () {
			$state.go("home");
		}

		vm.toInfo = function () {
			$state.go("surveyEdit.info");
		}

		vm.addQuestion = function (question) {
			vm.questions.push({
				'id' : 'Question'+Date.now(), 
				'question' : question.question,	
				'alias' : '', 
				'type' : question.type, 
				'number_of_options' : question.number_of_options, 
				'value' : '1', 
				'survey_id' : vm.survey.survey_id
			});
			
			vm.newQuestion.question = '';
			vm.newQuestion.type = '1';
			vm.newQuestion.number_of_options = 1;
		}

		vm.removeQuestion = function () {
			
		}

		vm.submit = function (toQuestions) {
			if (!toQuestions) {
				vm.survey.$save(toastr.success("Encuesta guardada correctamente"));
			} else {
				vm.survey.$save( function () {
					toastr.success("Encuesta guardada correctamente");
					$state.go("surveyEdit.questions");					
				});
			}
		}

	}

} )();