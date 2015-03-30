var colors = require('colors');
var url = require('url');
var config = require('./mockconf');
var session = {};
var app = require('./app');
console.log(app.get('batches'));
module.exports = function(req, res, next) {
  try {

    var path = url.parse(req.url).path.split('?')[0];
    var mock = './' + config.baseUrl + '/' + path + '.' + req.method.toLowerCase();
    var response = require(mock);

    if (response._mock) {
      response = response._mock(req, session, next);
    }

    var delay = Math.ceil(Math.random() * config.throttle / 2) + config.throttle / 2;
    setTimeout(function() {
      try {
        res[typeof response === 'object' ? 'json' : 'end'](response);
        if (config.showMocks) {
          console.log(
            'MOCKING'.green,
            req.method,
            path.green, ('mocking latency of ' + delay + 'ms').gray,
            config.showResponses ? response : ''
          );
        }
      } catch (e) {
        console.error(e);
        next();
      }
    }, delay);

  } catch (e) {
    next();
  }
};