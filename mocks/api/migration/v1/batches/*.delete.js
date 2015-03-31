module.exports = {
  _mock: function(req, res, next) {
    var destroyed = [];
    console.log(req.wildcard);
    req.session.batches.forEach(function(d, i) {
      console.log(d.id, req.wildcard);
      if ('' + d.id === '' + req.wildcard) {
        destroyed.push(req.session.batches.splice(i, 1));
      }
    });
    return {
      destroyed: destroyed
    };
  }
};
