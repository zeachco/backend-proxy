GLOBAL.MODULE = function(MODULE) {
	return require(process.cwd() + '/modules/' + MODULE);
};

var proxy = require('express-http-proxy');
var colors = require('colors');
var url = require('url');
var config = require('./mockconf');
GLOBAL.MOCK = function(MODULE) {
	var path = process.cwd() + '/' + config.baseUrl + '/' + MODULE;
	return require(path);
};
var app = MODULE('app');
// GLOBAL._ = require('lodash');
GLOBAL.DB = {};

if (config.entryPort && config.entryPort < 1024) {
	var uid = parseInt(process.env.SUDO_UID);
	if (!uid) {
		console.log(('Port is ' + config.entryPort + ',\nyou may need to run as a superuser to open ports below :1024\n\n').red);
	}
}

var session = {};
var db = {};
app.use(function(req, res, next) {
	req.session = session;
	req.db = db;
	next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
app.use(MODULE('intercept'));
// app.use(require('./mock'));

var backendAddress = (config.host || '127.0.0.1') + ':' + (config.port || 8080);
app.use(proxy(backendAddress, {
	forwardPath: function(req, res) {
		return require('url').parse(req.url).path;
	},
	intercept: function(data, req, res, callback) {
		var path = url.parse(req.url).path;
		if (!data.length) {
			console.log('PROXY'.yellow, req.method, path.red, 'not loaded');
		} else if (config.showServes) {
			console.log('PROXY'.yellow, req.method, path.green);
		}
		callback(null, data);
	}
}));

// var server = app.listen(config.entryPort || 8081, function() {
// 	var port = server.address().port;
// 	console.log('Proxy listening at http://127.0.0.1:%s'.green, port);
// });

var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
	key: fs.readFileSync(process.cwd() + '/ssl/localhost.key'),
	cert: fs.readFileSync(process.cwd() + '/ssl/localhost.key.crt')
};

http.createServer(app).listen(9980);
https.createServer(options, app).listen(9443);

console.log('Proxy listening at http://localhost:%s'.green, 9980);
console.log('Proxy listening at https://localhost:%s'.green, 9443);
