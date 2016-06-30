

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	console.log('routing log from routes.js');
	$routeProvider

		.when('/', {
			templateUrl: 'angular/templates/home.html'
		})
		.when('/home', {

			templateUrl: 'angular/templates/home.html'
		})
		.when('/login', {
			templateUrl: 'angular/templates/login.html'
		})


	//html5mode with a base href enables templateUrl not 
	//using '/' prefix, thus templates are relative to index.html
	$locationProvider.html5Mode(true);


})