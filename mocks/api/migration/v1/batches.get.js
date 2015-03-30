var app = require(process.cwd() + '/app');

module.exports = {
  _mock: function(req, session, next) {
    try {
      return app.get('batches');
    } catch (e) {

    }

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

    return fakeData;
  }
};
