let router = require('express').Router()
let mw = require('../utils/middlewares')
let controllers = require('../controllers')

//SAY HELLO
router.get('/', (req, res, next) => {
  res.status(200).send("WELCOME TO PROMO CODES SAFEBODA API")
})



module.exports = router