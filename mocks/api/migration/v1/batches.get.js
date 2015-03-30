module.exports = {
  _mock: function(req, res, next) {
    function randomId(){
      return Math.ceil(Math.random()*10000);
    }

    // return empty half the time
    if(Math.random()>0.5){
      console.log('mocked empty'.red);
      return [];
    }

    return [{
      "id": randomId(),
      "batchStatus": "VALIDATED_WITH_ERRORS",
      "name": "My set 1",
      "partner": "appdirect"
    }, {
      "id": randomId(),
      "batchStatus": "MIGRATED",
      "name": "Myset 2",
      "partner": "appdirect"
    }, {
      "id": randomId(),
      "batchStatus": "MIGRATED_WITH_ERRORS",
      "name": "Myset 3",
      "partner": "appdirect"
    }];
  }
};
