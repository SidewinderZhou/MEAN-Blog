var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./server/server.config');
var mongoose = require('mongoose')

//Create server
var server = new express();

//connect to mongodb
mongoose.connect(config.db, function(err){
	if (err) {
		console.log(err);
	} else {
		console.log('connected to database succefully');
	}
});

//For parsing not only strings
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev'));

//static directory where resources can be linked to html page
server.use(express.static(__dirname + '/app'));

//handle admin channel
var adminApi = require('./server/controllers/admin.js')(express);
server.use('/api/admin', adminApi);

//handle admin channel
var userApi = require('./server/controllers/user.js')(express);
server.use('/api/user', userApi);

//routes to home page
server.get('*', function(req, res) {
	res.sendFile(__dirname + '/app/index.html');
});

 // Start server
server.listen(config.port,function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Listening on port ' + config.port);
	}
});