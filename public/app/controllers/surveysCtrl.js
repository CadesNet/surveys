( function () {
	"use strict";

	angular
		.module('Surveys')
		.controller('SurveysCtrl', ['survey', "$state", 'surveyResource', SurveysCtrl]);

	function SurveysCtrl (survey, $state, surveyResource) {
		var vm = this;

        //Survey select
		vm.survey = survey;
		vm.option = "";
		vm.showInputNewQuesionOptions = true;
		vm.questionTemp = {};
		vm.newQuestion = surveyResource.Questions.get({ id : 0 });
		vm.questionsTypes = [
	        {'id' : '1', 'type': 'Simple'},
	        {'id' : '2', 'type': 'Multiple'},
	        {'id' : '3', 'type': 'Complementacion'}
	    ];
		
		if (vm.survey && vm.survey.id) {
			vm.title = "Editar : "+vm.survey.title;
		} else {
			vm.title = "Ecuesta nueva";
			vm.survey.code = Date.now();
			vm.isNewSurvey = true;
		}
		
		if(vm.survey.questions) {
			vm.questions = [] ;
			loadQuestionsOnlist();
			loadAnswerslist();
		} else {
			vm.questions = [] ;
		}
		
	    function loadQuestionsOnlist () {
	    	vm.survey.questions.forEach(function(question) {
				vm.questions.push(surveyResource.Questions.get({
                    id : question.id
                }));
			});
	    }

	    function loadAnswerslist () {
	    	vm.answers = [];
	    	if(vm.questions.length > 0) {
	    		vm.questions.forEach(function (question) {
					vm.answers.push(question);
	    		});
	    	}
	    	vm.answerDetails = {
		    	teacher : "Docente de prueba",
		    	matter : "Materia de prueba",
		    	schedule : "Horario de prueba",
		    	survey_id : vm.survey.id,
		    	answers : vm.answers
		    }
		    //console.log(vm.answerDetails);
	    }

		vm.cancel = function () {
			$state.go("home");
		}

		vm.toInfo = function () {
			$state.go("surveyEdit.info");
		}

		vm.getNumberItem = function (array, item) {
			return array.indexOf(item)+1;	
		}

		vm.submit = function (toQuestions) {
			if (!toQuestions) {
				vm.survey.$save(
					function(data, getResponseHeaders) { 
						toastr.success("Encuesta guardada correctamente");
					}, function(data, getResponseHeaders) { 
						toastr.error("La encuesta no pudo guardarse");
					}
				);
			} else {
				vm.survey.$save( 
					function(data, getResponseHeaders) { 
						toastr.success("Encuesta guardada correctamente");
						$state.go("surveyEdit.questions");	
					}, function(data, getResponseHeaders) { 
						toastr.error("La encuesta no pudo guardarse");
					}
				);
			}
		}

		vm.saveQuestion = function (question) {
			question.survey_id = vm.survey.id;
			question.$save(
				function(data, getResponseHeaders) { 
					if(vm.questions.indexOf(data) == -1) {
						vm.questionTemp = surveyResource.Questions.get({
                            id : data.id
                        });
						vm.questions.push(vm.questionTemp);
						vm.newQuestion = surveyResource.Questions.get({ id : 0 });
						vm.scrollTo('#div-content-new-question');
					}
					toastr.success("Pregunta guardada correctamente!");
				}, function(data, getResponseHeaders) { 
					toastr.error("La pregunta no pudo guardarse");
				}
			);
		}

		vm.saveOption = function (option) {
			surveyResource.Options.save(option, function (data, getResponseHeaders) {
				toastr.success("Opción guardada correctamente!");
			}, function (data, getResponseHeaders) {
				toastr.error("La opción no pudo guardarse!");
			});
		}

		vm.deleteQuestion = function (question) {
			if(confirm("¿Esta seguro de eliminar la pregunta: \""+question.question+" \" ?" )) {
				surveyResource.Questions.delete({ id : question.id }, function (data, getResponseHeaders) {
					vm.questions.splice(vm.questions.indexOf(question), 1);
					toastr.info("Pregunta eliminada correctamente!");
				},function(data, getResponseHeaders) { 
					toastr.error("La pregunta no pudo eliminarse");
				});
			} 
		}

		vm.deleteOption = function (option, question) {
			if(confirm("¿Esta seguro de eliminar la opción: \""+option.option+" \" ?" )) {
				surveyResource.Options.delete({ id : option.id }, function (data, getResponseHeaders) {
					question.$save();
					toastr.info("Opción eliminada correctamente!");
				},function(data, getResponseHeaders) { 
					toastr.error("La opción no pudo eliminarse");
				});
			} 
		}

		vm.addOptionToNewQuestion = function (option) {
			if (vm.newQuestion.options.indexOf(option) == -1 && option.length > 0) {
				vm.newQuestion.options.push(option);
				vm.option = "";
			}
		}

		vm.changeNewQuestionType = function (type) {
			if (type=='3') {
				vm.showInputNewQuesionOptions = false;
				vm.newQuestion.options = [];
			} else {
				vm.showInputNewQuesionOptions = true;
			}
			//console.log(vm.showInputNewQuesionOptions);
		}

		vm.deleteItemOfArray =  function (array, option) {
			array.splice(array.indexOf(option), 1);
		}

		vm.scrollTo = function(element) {
		    $( 'html, body').animate({
			    scrollTop : $(element).offset().top
			  }, 800);
		    $(element +" #inputNewQuestion").focus();
		}

		vm.addOptionOnQuestion = function (option, question) {
			if (question && option && option.length > 0) {
				var newOption = {
					id : '-----',
					option : option,
					question_id : question.id
				}
				surveyResource.Options.save(newOption, function (data, getResponseHeaders) {
					question.$save();
					toastr.success("Opción guardada correctamente!");
				},function(data, getResponseHeaders) { 
					toastr.error("La opción no pudo guardarse");
				});
				option = '';
				newOption = {};
			}
		}

		vm.selectedOption = function (selected, question) {
			//console.log(vm.questions);
		}

		vm.sendAnswers = function () {
			surveyResource.Answers.save(vm.answerDetails , function (data, getResponseHeaders) {
					toastr.info("Tus respuestas se registraron correctamente - gracias por colaborar con nosotros");
				},function(data, getResponseHeaders) { 
					toastr.error("Ocurrio un error al registrar tus respuestas, por favor intenta nuevamente");
				});
			console.log(vm.questions);
		}

		/*vm.removeQuestion = function (item) {
			vm.questions.splice(vm.questions.indexOf(item), 1);
		}*/

		/*vm.submitQuestions = function () {
			surveyResource.Questions.save(vm.questions, function (res) {
				console.log(res);
			}, function () {
				console.log('error');
			});
		}*/
		/*vm.moveUpQuestion = function (item) {
			if (vm.questions.indexOf(item) > 0) {
				vm.itemTemp = item;
				vm.position = vm.questions.indexOf(item);
				vm.questions.splice(vm.questions.indexOf(item), 1);
				vm.questions.splice(vm.position-1, 0, vm.itemTemp);		
			}
		}

		vm.moveDownQuestion = function (item) {
			vm.itemTemp = item;
			vm.position = vm.questions.indexOf(item);
			vm.questions.splice(vm.questions.indexOf(item), 1);
			vm.questions.splice(vm.position+1, 0, vm.itemTemp);		
		}


		vm.isFirst = function (item) {
			if (vm.questions.indexOf(item) > 0  ) {
				return false;
			} else {
				return true;
			}
		}

		vm.isLast = function (item) {
			if(vm.questions.indexOf(item) < (vm.questions.length-1) ) {
				return false;
			} else {
				return true;
			}
		}*/

	}

} )();