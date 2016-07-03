angular

	.module('article', ['ArticleService', 'ngSanitize'])

	.component('articleDetail', {
		templateUrl: 'angular/components/article/article.template.html',
		controller: ArticleController
	})

ArticleController.$inject = ['$http', 'ArticleFactory'];
function ArticleController ($http, ArticleFactory) {

	var self = this;
	self.data = ArticleFactory.article;
	self.loading = true;

	$http({
		url: '/api/user/detail', 
		method: "POST",
		data: {
			title: self.data.title
		}
	})
	.then(function(response){
		self.loading = false;
		self.data.content = response.data.content;
	})
	// setTimeout(function(){}, 5000)
	
	

}