var proxy = require('express-http-proxy');
var colors = require('colors');
var url = require('url');
var config = require('./mockconf');
var app = require('./app');

if (config.entryPort && config.entryPort < 1024) {
  var uid = parseInt(process.env.SUDO_UID);
  if (!uid) {
    console.log(('Port is ' + config.entryPort + ',\nyou may need to run as a superuser to open ports below :1024\n\n').red)
  }
}

var session = {};
app.use(function(req, res, next) {
  req.session = session;
  next();
});

app.use(require('./mock'));


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

var server = app.listen(config.entryPort || 8081, function() {
  var port = server.address().port;
  console.log('Example app listening at http://127.0.0.1:%s', port);
});
