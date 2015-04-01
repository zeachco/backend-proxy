module.exports = {
  _mock: function(req, res, next) {

    var id = Math.ceil(Math.random() * 10000);

    var newEntry = {
      'batchStatus': 'CREATED',
      'partner': req.body.partner,
      'name': req.body.name,
      'id': id,
      'userWS': {
        'uuid': '4fe3d9af-cd7f-4a94-812e-0d9a406d1821',
        'email': 'some.user@domain.com',
        'userName': null,
        'firstName': 'Some',
        'lastName': 'User',
        'picture': null,
        'activated': true,
        'ldapId': null,
        'boostUser': null,
        'roles': null,
        'metadata': null,
        'links': []
      }
    };

    req.session.batches.push(newEntry);

    return newEntry;
  }
};
