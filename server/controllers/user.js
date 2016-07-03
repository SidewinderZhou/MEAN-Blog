var User = require('../models/user.js');
var Article = require('../models/article.js');
var config = require('../server.config.js');
var jsonwebtoken = require('jsonwebtoken');

var key = config.key;

//function for creating token
function createToken(user) {
	var token = jsonwebtoken.sign({
		_id: user._id,
		name: user.name

	}, config.key, {
		expiresIn: 1440
	});

	return token;
}

//module that handles admin related stuff
module.exports = function(express) {

	var api = express.Router();

	//list all articles
	api.get('/list', function(req, res) {

		Article
			.find({})
			.select('title tldr created tags lang')
			.exec(function(err, data) {
				//cant resolve err here, if no result matched, data is null, no err
				if (!data) {
					res.status(403).json({message:'No matched result'});
					console.log('erroed')
					return;
				} else {
					res.status(200).json(data);

				}
			});
	});

	api.post('/detail', function(req, res) {

		Article
			.findOne({title: req.body.title})
			.select('content')
			.exec(function(err, data) {
				//cant resolve err here, if no result matched, data is null, no err
				if (!data) {
					res.status(403).json({message:'No matched result'});
					console.log('erroed')
					return;
				} else {
					res.status(200).json(data);

				}
			});
	});

	//Authentication checking middleware
	api.use(function(req, res, next) {

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		if (token) {
			jsonwebtoken.verify(token, config.key, function(err, decoded) {
				if (err) {
					res.status(401).send({ success:false, message:"authentication failed" })
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(401).send({ success: false, message: 'no token provided' })
		}
	});

	return api;
}