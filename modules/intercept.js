var mocks = [];
var colors = require('colors');
var fs = require('fs');

fs.watch(process.cwd() + '/mocks/', readConfig);
readConfig();

function readConfig() {
	var file = process.cwd() + '/mocks/config.json';
	try {

		mocks = JSON.parse(fs.readFileSync(file));
		console.log(' === LIST OF MOCKS ===');
		mocks.forEach(function(mock) {
			var info = [
				mock.methods.join(', ').yellow,
				mock.regex.blue,
				mock.call.magenta,
				mock.args.join(', ').red
			];
			console.log(info.join(' '));
		});

	} catch (e) {
		console.log('couldn\'t load config from ' + file.blue + '\n' + e.toString().red);
	}
}

module.exports = function(req, res, next) {
	var found = false;

	mocks.forEach(function(mock) {
		var matchMethod = mock.method ? mock.method.indexOf(req.method) > -1 : true;
		var pathRegex = new RegExp(mock.regex, 'i');
		if (pathRegex.test(req.url) && matchMethod) {
			console.log(req.method.yellow + ' ' + req.url.blue + ' -> '.yellow + mock.call.magenta + '(' + mock.args.join(', ') + ')');
			found = true;
			MOCK(mock.call)(req, res, next, mock.args);
		}
	});
	if (!found) {
		next();
	}
};
