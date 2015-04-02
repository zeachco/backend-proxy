var colors = require('colors');
var url = require('url');
var config = require('./mockconf');

module.exports = function(req, res, next) {
  try {
    var path = './' + config.baseUrl + url.parse(req.url).path.split('?')[0];
    var mock = path + '.' + req.method.toLowerCase();
    var wildcardMock = /\/([^/]+)$/.exec(path)[1];
    var wildcard = path.replace(/\/[^/]+$/, '/*') + '.' + req.method.toLowerCase();
    var response;

    try {
      response = require(mock);
    } catch (e) {
      req.wildcard = wildcardMock;
      response = require(wildcard);
    }

    if (response._mock) {
      response = response._mock(req, res, next);
    }

    var delay = Math.ceil(Math.random() * config.throttle / 2) + config.throttle / 2;
    setTimeout(function() {
      try {
        res[typeof response === 'object' ? 'json' : 'end'](response);
        if (config.showMocks) {

          console.log(
            'MOCKING'.green,
            req.method,
            path.green + delay > 0 ? ('mocking latency of ' + delay + 'ms').gray : ''
          );

          if (config.showResponses) {
            console.log(
              'Receive'.green,
              req.body,
              'Send'.yellow,
              response
            );
          }

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
