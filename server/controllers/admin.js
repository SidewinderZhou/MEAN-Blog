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

	api.post('/login', function(req, res) {

		User

		.findOne({
			username: req.body.username
		})

		.select('password')

		.exec(function(err, user) {

			if (err) throw err;
			if (!user) {
				res.send({ message:'User dosent exist' });
			} else if (user) {
				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword) {
					res.send({ message: 'Invalid password' })
				} else {

					var token = createToken(user);
					res.json({
						success: true,
						message: 'login success',
						token: token
					});
				}
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

	//publish a new article
	api.post('/publish', function(req, res) {

		var article = new Article({

			title: req.body.title,
			tldr : req.body.tldr,
			content: req.body.content,
			created: req.body.created,
			tags: req.body.tags,
			lang: req.body.lang

		});

		article.save(function(err) {

			if (err) {
				res.status(403).send(err);
				return;
			} else {
				res.status(200).json({ message:'New article created' });
			}
		});
	});

	//edit/update current article
	api.post('/update', function(req, res) {

		Article
			.findOne({title: req.body.title}, function(err, data) {
				//cant resolve err here, if no result matched, data is null, no err
				if (!data) {
					res.status(403).json({message:'No matched result'});
					console.log('erroed')
					return;
				} else {
					data.title = req.body.title;
					data.tldr = req.body.tldr;
					data.content = req.body.content;
					data.tags = req.body.tags;
					data.lang = req.body.lang;

					data.save(function(err) {
						if (err) {
							res.status(403).send(err);
							return;
						} else {
							res.status(200).json({message:'Article updated'})
						}
					})

				}
			});
	});

	//delete exist article
	api.post('/delete', function(req, res) {

		Article
			.remove({title: req.body.title}, function(err, data) {
				//cant resolve err here, if no result matched, data is null, no err
				if (!data) {
					res.status(403).json({message:'No matched result'});
					console.log('erroed');
					return;
				} else {
					res.status(200).json({message: 'Article deleted'});

				}
			});
	});

	//list all articles
	api.get('/list', function(req, res) {

		Article
			.find({}, function(err, data) {
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

	
	return api;
}