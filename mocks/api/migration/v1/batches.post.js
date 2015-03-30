module.exports = {
  _mock: function(req, res, next) {

    var id = Math.ceil(Math.random() * 10000);
    var newEntry = {
      id: id,
      name: 'batchId_' + id
    };

    req.session.batches.push(newEntry);

    return newEntry;
  }
};
