

angular

	.module('articles', ['HomeService', 'article', 'ngComponentRouter', 'ArticleService'])

	.component('articles', {
		templateUrl: 'angular/components/articles/articles.template.html',

		controller: ArticlesController
	});


ArticlesController.$inject = ['$http', 'HomeFactory', 'ArticleFactory','$rootScope'];
function ArticlesController ($http, HomeFactory, ArticleFactory, $rootScope) {

	var self = this;

	//an ng-if flag for toggling article detail page
	self.showDetail = false;
	self.loading = true;
	self.filterText = '';
	self.language = {};

	$rootScope.$on('filterChanged', function() {
		self.filterText = HomeFactory.getFilter();
	});

	$rootScope.$on('languageChanged', function() {
		var l = HomeFactory.getLang();
		self.language = { lang:l };
	});
	

	$http
		.get('/api/user/list')
		.then(function(response) {
			
			self.loading = false;
			//cache the list for other components
			HomeFactory.init(response.data);
			self.list = HomeFactory.list;
		});

	self.showAndLoad = function(article) {
		self.showDetail = true;
		ArticleFactory.init(article);
	}

	


	//offline test
	// self.list = [
	// 	{
	// 		title: 'ish lorem',
	// 		tldr : 'too long dont read',
	// 		created: '2009-09-11',
	// 		tags: ['asd','asdf','bnn'],
	// 		content: 'lorem ish tela'
	// 	},
	// 	{
	// 		title: 'ish lorem1',
	// 		tldr : 'too long dont read',
	// 		created: '2009-09-11',
	// 		tags: ['asd','asdf','bnn'],
	// 		content: 'lorem ish tela'
	// 	},
	// 	{
	// 		title: 'ish lorem2',
	// 		tldr : 'too long dont read',
	// 		created: '2009-09-11',
	// 		tags: ['asd','asdf','bnn'],
	// 		content: 'lorem ish tela'
	// 	},
	// 	{
	// 		title: 'ish lorem3',
	// 		tldr : 'too long dont read',
	// 		created: '2009-09-11',
	// 		tags: ['asd','asdf','bnn'],
	// 		content: 'lorem ish tela'
	// 	},
	// 	{
	// 		title: 'ish lorem4',
	// 		tldr : 'too long dont read',
	// 		created: '2009-09-11',
	// 		tags: ['asd','asdf','bnn'],
	// 		content: 'lorem ish tela'
	// 	},
	// 	{
	// 		title: 'ish lorem5',
	// 		tldr : 'too long dont read',
	// 		created: '2009-09-11',
	// 		tags: ['asd','asdf','bnn'],
	// 		content: 'lorem ish tela'
	// 	}
	// ]

	

}