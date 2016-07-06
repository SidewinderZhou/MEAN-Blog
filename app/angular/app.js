require('angular/angular.min');
require('angular-route/angular-route.min');
require('angular-animate/angular-animate.min');
require('@angular/router/angular1/angular_1_router');
require('angular-sanitize');

require('../lib/angularIEpolyfill');
require('../lib/es6shim');
require('../lib/syspolyfill');
require('../lib/prism');

require('./services/home-service');
require('./services/article-service');

require('./components/home/home');
require('./components/about/about');
require('./components/articles/articles');
require('./components/article/article');
require('./components/tags/tags');
require('./components/search/search');
require('./components/lang/lang');

angular

	.module('myApp', ['ngAnimate', 'ngComponentRouter', 'home', 'about'])

	.directive('ngPrism', [function() {
	    return {
	        restrict: 'A',
	        link: function($scope, element, attrs) {
	            element.ready(function() {
	                Prism.highlightElement(element[0]);
	            });
	        }
	    }
	}])
	
	.config(function($locationProvider) {
		$locationProvider.html5Mode(true);
	})

	.value('$routerRootComponent', 'myApp')

	.component('myApp', {
		$routeConfig: [
			{path: '/home/', name: 'Home', component: 'home', 
			        useAsDefault: true },
			{path: '/about/', name: 'About', component: 'about' }
		]
	})

	.component('myHeader', {
		templateUrl: 'angular/components/header/header.template.html'
	})

	.component('myNav', {
		templateUrl: 'angular/components/nav/nav.template.html'
	})

	.component('myNavDrop', {
		templateUrl: 'angular/components/nav-drop/nav-drop.template.html',
		controller: MyNavDropController
	})

	.component('mainSub', {
		template: '<ng-outlet></ng-outlet>'
	})

	.component('myFooter', {
		templateUrl: 'angular/components/footer/footer.template.html'
	})

	.component('toTop', {
		templateUrl: 'angular/components/to-top/to-top.template.html',
		controller: ToTopController
	})
	
function MyNavDropController() {

	var self = this;
	self.drop = '';

	self.toggle = function() {

		if (self.drop == '') {
			self.drop = 'w3-show';
		} else {
			self.drop = '';
		}
	}
}

ToTopController.$inject = ['$location','$anchorScroll'];
function ToTopController($location, $anchorScroll) {

	self = this;
	self.toTop = function () {
		$location.hash('nav');
		$anchorScroll();
	}
}