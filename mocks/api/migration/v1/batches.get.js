module.exports = {
  _mock: function(req, res, next) {
    req.session.batches = req.session.batches || [];
    return req.session.batches;
  }
};
