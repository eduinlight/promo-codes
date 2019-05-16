const gmaps = require('../gmaps')

module.exports = {
  get: async (req, res) => {
    gmaps.directions({
      origin: {
        latitude: 35.104998, 
        longitude: -80.807721,
      },
      destination:{
        latitude: 35.107985, 
        longitude: -80.803371,
      }
    }, function(err, response) {
      if (!err) {
        res.status(200).json(response)
      }else{
        res.status(400).json(err)
      }
    });
  },
}