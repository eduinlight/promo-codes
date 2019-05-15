let config = require('../config/config')
let mw = require('../utils/middlewares')
let Users = require('../models/users.model')
let Connections = require('../models/connections.model.js')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports = (io) => {

  async function deleteConnections() {
    //eliminar conexiones no existentes
    io.clients(async (err, c) => {
      if(err) return
      console.log(c)
      await Connections.destroy({where:{
        socket: {[Op.notIn]: c}
      }})
    })
  }

  io.on('connection', async(socket) => {
    deleteConnections()
    
    //cuando el usuario se conecte
    console.log('conectado un nuevo usuario con id de socket => ', socket.id)

    //middlewares
    //right formart of data {X-Access-Token: token, data: {}}
    socket.use(mw.valid_format)
    socket.use(mw.valid_ws_token)

    //incluir sockets
    require('./auth.socket')(io, socket)

    socket.on('disconnect', async() => {
      try{
        deleteConnections()
  
        console.log("desconectado usuario con id => ", socket.id)
      }catch(err){
        console.log(err)
      }
    })
  })
}