const config = require('../config/config')
const jwt = require('jsonwebtoken')
// const Connections = require('../models/connections.model')
// const Languages = require('../models/language.model')

module.exports = {
  //middleware para hablilitar CORS
  enable_cors: function(req, res, next) {
    // res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token, withCredentials ")
    return next()
  },

  //cuando se llama a una url que no esta definida
  show_404: function(req, res, next) {
    var err = new Error('Not Found')
    res.send({
      status: "404",
      message: "not found"
    })
  },

  //validaciond e datos de la entrada
  validate: function(rules) {
    if (!rules) throw new Error('Please provide a validation schema')

    return function(req, res, next) {
      req.checkBody(rules)

      req.getValidationResult().then(function(result) {
        var errors = result.array()
        if (errors.length > 0) {
          res.send({
            status: "error",
            message: "validation errors",
            errors: errors
          })
        } else {
          next()
        }
      })
    }
  },

  io: (io) => {
    return function(req, res, next) {
      res.io = io;
      res.io.emitToUser = async (id, ...params) => {
        let connections = await Connections.findAll({
          where: {fk_user: id},
          attributes: ['socket']
        })

        let map = []
        connections = connections.filter(c => {
          if(map[c.socket]==undefined){
            map[c.socket] = true
            return true
          }
          return false
        })

        connections.forEach(c => {
          res.io.sockets.sockets[c.socket].emit(...params)
        })
      }
      next()
    }
  },
  language: () => {
    return async function(req, res, next) {
      try{
        if(req.params.lang){
          req.language = await Languages.findOne({
            where: {
              code: req.params.lang
            }
          })

          if(req.language){
            return next()
          }else{
            return res.not_found()
          }
        }
        return next()
      }catch(e){
        console.log(e)
        next()
      }
    }
  },
  valid_token: () => {
    return function(req, res, next) {
      let token = req.headers['x-access-token']

      if (!token) {
        return res.not_allowed()
      }

      try {
        let payload = jwt.verify(token, config.secret)
        req.payload = payload;
        console.log(req.payload)
        next();
      } catch (err) {
        return res.token_invalid();
      }
    }
  },
  rols: (user_rol = []) => {
    return function(req, res, next) {
      let ok = false
      user_rol.forEach(r => {
        if(req.payload.rol==r){
          ok = true
        }
      })
      if(ok){
        next()
      }else{
        res.not_allowed()
      }
    }
  },
  valid_format: (req, next) => {
    //el segundo parámetro un opjeto con la estructura {[x-access-token: token], data: data}
    if (req.length > 1) {
      if (typeof(req[1]) !== "object") {
        return next(new Error('wrong data format'));
      }

      //others than data and x-access-token
      Object.keys(req[1]).forEach(v => {
        if (v !== 'x-access-token' && v !== 'data') {
          return next(new Error('wrong data format'));
        }
      })

      //if no data argument exist
      if (req[1]['data'] === undefined) {
        return next(new Error('wrong data format'));
      }
    }
    //el tercer parámetro siempre una función
    if (req.length > 2) {
      if (typeof(req[2]) !== "function") {
        return next(new Error('wrong data format'));
      }
    }

    //no mas de dos parámetros
    if (req.length > 3) {
      return next(new Error('wrong data format'));
    }

    return next()
  },
  valid_ws_token: (req, next) => {
    if (req.length > 1) {
      let token = req[1]['x-access-token']
      delete req[1]['x-access-token']
      if (token) {
        req[1].token = true
        try {
          let payload = jwt.verify(token, config.secret)
          req[1].valid = true
          req[1].payload = payload;
          next();
        } catch (err) {
          req[1].valid = false
        }
      } else {
        req[1].token = false
      }
    }

    return next()
  },
  responses: (req, res, next) => { 
    let responses = require('./responses')
    Object.keys(responses).forEach(k => {
      res[k] = (p) => {res.status(responses[k](p).status).json(responses[k](p))}
    })
    next(); 
  }
}