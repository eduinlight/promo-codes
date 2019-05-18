// CREATE THE DATABE
const db = require('./database')

//MODELS
const Config = require('./models/config.model')
const Code = require('./models/code.model')
const User = require('./models/user.model')
const UserCode = require('./models/user-code.model')
const Event = require('./models/event.model')

//DB CREATION
async function start_inserts() {
  try {
    //DB SINCRONIZATION
    await db.sync({ force: true })

    //CREATE THE CONFIGURATIONS RECORD
    let config = await Config.create()

    //CREATE SOME DUMMY USERS
    let users =  [
      await User.create(),
      await User.create(),
      await User.create(),
      await User.create(),
    ]

    //CREATE SOME DUMMY EVENTS
    let events = [
      await Event.create(),
      await Event.create(),
      await Event.create(),
      await Event.create(),
    ]

    //CODES
    let codes = [
      // await Code.create(),
    ]

  } catch (e) {
    console.log("ERROR ", e)
  }

}

start_inserts()