angular

	.module('tags', ['HomeService'])

	.component('tags', {
		templateUrl: 'angular/components/tags/tags.template.html',
		controller: TagsController
	})

TagsController.$inject = ['HomeFactory']
function TagsController(HomeFactory) {

	var self = this;

	self.delete =  function() {
		HomeFactory.list.pop();
		HomeFactory.list.shift();
	}
}
