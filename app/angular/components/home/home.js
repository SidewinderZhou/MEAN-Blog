

angular

	.module('home', ['articles', 'tags', 'search', 'lang'])

	.component('home', {
		templateUrl: 'angular/components/home/home.template.html',
		controller : HomeController

	})

	



function HomeController (HomeFactory) {
	// console.log(HomeFactory);
	
}