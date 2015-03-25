var proxy = require('express-http-proxy');
var app = require('express')();
var colors = require('colors');
var url = require('url');

var config = require('./config');

app.use(function(req, res, next) {
  var path = url.parse(req.url).path.split('?')[0];
  try {
    res.json(require('.' + path + '.' + req.method));
    if (config.showMocks)
      console.log('mocking', req.method, path.green);
  } catch (e) {
    next();
  }
});

var backend = (config.host || '127.0.0.1') + ':' + (config.port || 8080);

app.use(proxy(backend, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  },
  intercept: function(data, req, res, callback) {
    var path = url.parse(req.url).path.split('?')[0];
    
    if (!data.length) {
      console.log('ERROR'.red, req.method, path.red, 'does not exist');
    } else if (config.showServes) {
      console.log('serving', req.method, path.yellow);
    }

    callback(null, data);
  }
}));

var server = app.listen(config.entryPort || 8083, function() {
  var port = server.address().port;
  console.log('Example app listening at http://127.0.0.1:%s', port);
});
