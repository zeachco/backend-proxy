var colors = require('colors');
module.exports = {
  _mock: function(req, res, next) {
    console.log('dynamic mock'.magenta);
    return {
      test: 'yay'
    };
  }
};
