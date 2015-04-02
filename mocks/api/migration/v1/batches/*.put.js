module.exports = {
  _mock: function(req, res, next) {

    var i = 0;
    var d = null;
    while (d = req.session.batches[i++]) {

      if ('' + d.id === '' + req.wildcard) {

        for (var n in req.body) {
          d[n] = req.body[n];
        }
        
        return d;
      }

    }

  }
};
