const router = require('express').Router()
const mw = require('../utils/middlewares')
const controllers = require('../controllers')
const gmaps = require('../gmaps')

//TESTSS
router.get('/test', (req, res) => {
  
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
})

//SAY HELLO
router.get('/', (req, res, next) => {
  res.status(200).send("WELCOME TO PROMO CODES SAFEBODA API")
})

//
router.get('/codes', controllers.codes.get)

module.exports = router