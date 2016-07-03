
angular

	.module('lang', ['HomeService'])

	.component('lang', {
		templateUrl: 'angular/components/lang/lang.template.html',
		controller : LangController
	})


LangController.$inject = ['HomeFactory'];
function LangController (HomeFactory) {

	var self = this;
	// self.language = 'cn';
	self.drop = '';

	self.setLang = function(lang) {
		HomeFactory.setLang(lang);
		console.log(lang);
	}

	self.toggle = function() {

		if (self.drop == '') {
			self.drop = 'w3-show';
		} else {
			self.drop = '';
		}
	}
	
}