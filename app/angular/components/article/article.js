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
		
		/*
		 * mark this block of code for later diving in
		 */
		self.loading = false;
		self.data.content = response.data.content;
		console.log('article content received!');
		setTimeout(function() {
			//only call this asychronously will work
			Prism.highlightAll();
		},0);
	})
}