module.exports = {
  _mock: function(req, res, next) {

    var destroyed = [];

    req.session.batches.forEach(function(d, i) {

      if ('' + d.id === '' + req.wildcard) {
        destroyed.push(req.session.batches.splice(i, 1));
      }

    });

    return {
      destroyed: destroyed
    };

  }
};
