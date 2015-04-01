module.exports = {
  _mock: function(req, res, next) {

    var i = 0;
    var d = null;
    while (d = req.session.batches[i++]) {

      console.log(d, i);
      if ('' + d.id === '' + req.wildcard) {
        return {
          obj: d,
          payload: req.body
        };
      }

    }

  }
};
