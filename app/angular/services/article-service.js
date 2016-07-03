angular

	.module('ArticleService', [])

	.factory('ArticleFactory', function() {

		var factory = {};

		factory.article = {};

		factory.article.title = '';
		factory.article.tldr = '';
		factory.article.created = '';
		factory.article.tags = '';

		factory.article.content = '';

		factory.init = function(obj) {

			if(obj.title && obj.tldr && obj.created && obj.tags) {

				factory.article.title = obj.title;
				factory.article.tldr = obj.tldr;
				factory.article.created = obj.created;
				factory.article.content = obj.content;
				factory.article.tags = obj.tags;
				

			} else {
				console.log('Lack of property from source object, by ArticleFactory.init');
				return;
			}
		}

		return factory;
	});