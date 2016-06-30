var User = require('../models/user.js');
var Story = require('../models/story.js');
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

//module that handles user related stuff
module.exports = function(express) {

	var api = express.Router();

	api.post('/signup', function(req,res) {

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		user.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}

			res.json({ message: 'User has been created' })
		});
	})

	api.get('/users', function(req, res){

		User.find({}, function(err, users){
			if (err) {
				res.send(err);
				return
			} else {
				res.json(users);
			}
		});

	});

	api.post('/login', function(req, res) {

		User.findOne({
			username: req.body.username
		}).select('password').exec(function(err, user) {

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

	api.use(function(req, res, next) {

		console.log('login attempt detected')

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		if (token) {
			jsonwebtoken.verify(token, config.key, function(err, decoded) {
				if (err) {
					res.status(403).send({ success:false, message:"authentication failed" })
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).send({ success: false, message: 'no token provided' })
		}
	});

	api.route('/')

		.post(function(req, res) {

			var story = new Story({
				creator: req.decoded.id,
				content: req.body.content

			});

			story.save(function(err) {
				if (err) {
					res.send(err);
					return;
				}
				res.json({ message: 'New Story Created' });
			});
		})

		.get(function(req, res) {

			Story.find({ creator: req.decoded.id }, function(err, stories) {
				if (err) {
					res.send(err);
					return;
				}
				res.json(stories);
			});
		});

	return api;
}