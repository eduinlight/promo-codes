const Users = require('../models/users.model')
const Connections = require('../models/connections.model')
const val = require('../utils/custom_validations')
const responses = require('../utils/responses')

let rules = {
  user: [
    'required',
  ],
  pass: [
    'required',
  ],
}

module.exports = (io, socket) => {

  socket.on('login', async (req, res) => {
    try{   
      if(!req.valid){
        res(responses.token_invalid())
      }else{
        console.log("SE LOGUEO => ", socket.id )
        //almacenar este socket por el que esta conectado el usuario en el arreglo de conexiones del mismo
        let user = await Users.findById(req.payload.id)
        if(user){
          let connection = await Connections.findOrCreate({
            where:{
              socket: socket.id,
              fk_user: user.id
            }
          })

          // llamar al callback por si se usa
          res(responses.success())
        }else{
          res(responses.not_found())
        }
      }
    }catch(e){
      console.log(e)
    }
  })

  socket.on('logout', async (req, res) => {
    try{
      //buscar el usuario que esta conectado por este socket
      let user = await Users.findOne({
        include: [
          {
            model: Connections,
            as: 'Connections',
            where: {
              socket: socket.id
            }
          }
        ]
      })

      if(user){
        user.Connections.forEach(async (c) => {
          if(c.socket==socket.id){
            await Connections.destroy({where: {
              id: c.id
            }})
          }
        })

        //si el usuario se queda sin sockets informar que esta desconectado a otros usuarios interesados
        if(user.Connections.length===0){
          //aqui
        }
      }

      res(responses.success())
    }catch(e){
      console.log(e)
    }
  })

}