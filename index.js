var proxy = require('express-http-proxy');
var app = require('express')();
var colors = require('colors');
var url = require('url');

var config = require('./config');

if (config.entryPort && config.entryPort < 1024) {
  var uid = parseInt(process.env.SUDO_UID);
  if (!uid) {
    console.log(('Port is ' + config.entryPort + ',\nyou may need to run as a superuser to open ports below :1024\n\n').red)
  }
}

app.use(function(req, res, next) {
  try {

    var path = url.parse(req.url).path.split('?')[0];
    var mock = '.' + path + '.' + req.method.toLowerCase();
    var response = require(mock);
    if (typeof response === 'function') {
      response = response(req, res);
    }

    var delay = Math.ceil(Math.random() * config.throttle / 2) + config.throttle / 2;
    setTimeout(function() {
      try {
        res[typeof response === 'object' ? 'json' : 'end'](response);
        if (config.showMocks) {
          console.log('MOCKING'.green, req.method, path.green, ('mocking latency of ' + delay + 'ms').gray);
        }
      } catch (e) {
        console.error(e);
        next();
      }
    }, delay);

  } catch (e) {
    next();
  }
});

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

var server = app.listen(config.entryPort || 8083, function() {
  var port = server.address().port;
  console.log('Example app listening at http://127.0.0.1:%s', port);
});
