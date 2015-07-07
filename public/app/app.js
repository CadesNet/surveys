( function () {
	"use strict";

	var app = angular.module('Surveys', ['ui.router', 'common.services']);

	app.config(routes);
    app.config(provides);

    function routes ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                url : "/",
                templateUrl : "app/views/Home/home.html", 
                controller : "HomeCtrl as vm"
            })
            .state("surveys", {
                url : "/surveys",
                templateUrl : "app/views/Surveys/surveys.html", 
                controller : "HomeCtrl as vm"
            })
            .state("surveySelect", {
                url : "/surveys/:id",
                templateUrl : "app/views/Surveys/survey.html",
                controller : "SurveysCtrl as vm",
                resolve : {
                    surveyResource : "surveyResource",
                    survey : function (surveyResource, $stateParams) {
                        return surveyResource.Surveys.get({
                            id : $stateParams.id
                        }).$promise;
                    }
                }
            })
            .state("surveyEdit", {
                abstract : true,
                url : "/surveys/edit/:id",
                templateUrl : "app/views/Surveys/editSurvey.html",
                controller : "SurveysCtrl as vm",
                resolve : {
                    surveyResource : "surveyResource",
                    survey : function (surveyResource, $stateParams) {
                        return surveyResource.Surveys.get({
                            id : $stateParams.id
                        }).$promise;
                    }
                }
            })
            .state("surveyEdit.info", {
                url : "/info",
                templateUrl : "app/views/Surveys/surveyEditInfoView.html"
            })
            .state("surveyEdit.questions", {
                url : "/questions",
                templateUrl : "app/views/Surveys/surveyEditQuestionsView.html"
            })
            /*.state("productDetails", {
                url : "/productos/:id",
                templateUrl : "views/productDetailView.html",
                controller : "ProductCtrl as vm",
                resolve : {
                    productResource : "productResource",
                    newsOne : function (productResource, $stateParams) {
                        return productResource.get({
                            id : $stateParams.id
                        }).$promise;
                    }
                }
            })
            .state("productEdit", {
                abstract : true,
                url : "/productos/edit/:id",
                templateUrl : "views/productEditView.html",
                controller : "ProductEditCtrl as vm",
                resolve : {
                    productResource : "productResource",
                    newsOne : function (productResource, $stateParams) {
                        return productResource.get({
                            id : $stateParams.id
                        }).$promise;
                    }
                }
            })
            .state("productEdit.info", {
                url : "/info",
                templateUrl : "views/productEditInfoView.html"
            })
            .state("productEdit.link", {
                url : "/link",
                templateUrl : "views/productEditLinkView.html"
            })
            .state("productEdit.state", {
                url : "/state",
                templateUrl : "views/productEditStateView.html"
            });*/
    }

    function provides ($provide) {
        $provide.decorator("$exceptionHandler", ["$delegate", functionDelegate]);
        function functionDelegate ($delegate) {
            return function (exception, cause) {
                exception.message = "Por favor contacta al administrador! \n Mensage: "+exception.message;
                $delegate(exception, cause);
                alert(exception.message);
            }
        }
    }
	
} )();
