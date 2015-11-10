var http = require('http');

module.exports = function(req, res, next, args) {
	var split = args[0].split(/https?:\/\//)[1];
	var domain = split[1];
	var port = args[0].indexOf('https://') === 0 ? 443 : 80;
	var req = http.request({
		host: domain,
		port: port,
		method: 'GET',
		path: args[0] + req.url // full URL as path
	}, function(res) {
		res.on('data', function(data) {
			console.log(data.toString());
		});
	});

	req.end();
};
