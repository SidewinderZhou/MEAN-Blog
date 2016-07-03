angular

	.module('search', ['HomeService'])

	.component('search', {
		templateUrl: 'angular/components/search/search.template.html',
		controller : SearchController
	})


SearchController.$inject = ['HomeFactory'];
function SearchController (HomeFactory) {

	var self = this;
	self.filterText = '';

	self.Changed = function() {
		HomeFactory.setFilter(self.filterText);
	}
	
}