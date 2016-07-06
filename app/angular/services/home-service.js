var moment = require('moment/min/moment.min');

//to share data between components under home component
angular

	.module('HomeService', [])

	.factory('HomeFactory', function($rootScope) {

		var factory = {};

		factory.list = [];
		factory.filterText = '';
		factory.language = 'cn';

		factory.init = function(list) {
			factory.list = list;
			for (var i = 0; i < factory.list.length; i++) {
				factory.list[i].created = moment(factory.list[i].created).format('YYYY-MM-DD, HH:mm:ss');
			}
		}

		factory.setFilter = function(text) {
			factory.filterText = text;
			// console.log(factory.filterText);
			$rootScope.$broadcast('filterChanged');
		};

		factory.getFilter = function() {
			return factory.filterText;
		};

		factory.setLang = function(lang) {
			factory.language = lang;
			$rootScope.$broadcast('languageChanged');
		}

		factory.getLang = function() {
			return factory.language;
		}

		return factory;
	})