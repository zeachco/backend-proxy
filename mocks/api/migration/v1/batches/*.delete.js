module.exports = {
  _mock: function(req, res, next) {
    // console.log(req);
    return {
      deleted: req.body
    };
  }
};
