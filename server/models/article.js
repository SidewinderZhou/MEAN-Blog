var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

	title: {
		type    : String,
		required: true,
		index   : true,
		unique  : true
	},

	tldr: {
		type    : String,
		required: true
	},

	content: {
		type    : String,
		required: true
	},

	created: { 
		type: Date, 
		default: Date.now
	},

	tags: {
		type    : String,
		required: true
	},

	lang: {
		type    : String,
		required: true
	}


});

module.exports = mongoose.model('Article', ArticleSchema);