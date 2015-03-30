var app = require(process.cwd() + '/app');

module.exports = {
  _mock: function(req, session, next) {

    var id = Math.ceil(Math.random() * 10000);
    var newEntry = {
      "id": id
    };

    app.set('batches', app.get('batches').push(newEntry));

    return newEntry;
  }
};
