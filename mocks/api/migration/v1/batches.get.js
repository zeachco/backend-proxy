var app = require(process.cwd() + '/app');

module.exports = {
  _mock: function(req, session, next) {
    if (app.data.batches) return app.data.batches;

    var fakeData = [];
    var count = Math.round(Math.random() * 4);

    for (var i = 0; i < count; i++) {
      var id = Math.ceil(Math.random() * 10000);
      fakeData.push({
        "id": id,
        "batchStatus": "VALIDATED_WITH_ERRORS",
        "name": "My set " + id,
        "partner": "appdirect"
      });
    }

    app.data.batches = fakeData;
    return fakeData;
  }
};