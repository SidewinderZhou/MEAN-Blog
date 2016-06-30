require('angular');
require('angular-route');
require('./routes');
require('./controllers/mainCtrl');
require('./services/authService');

angular
	.module('MyApp', ['mainCtrl', 'authService', 'appRoutes'])
	.run(function($rootScope, $location, Auth){

		//client site authentication checking
		$rootScope.$on('$routeChangeStart', function() {
			if(!Auth.isLoggedIn()){
				console.log('Authentication failed');
				$location.path('/login');
			}
		});
		
	});
	// .component('test', test);

