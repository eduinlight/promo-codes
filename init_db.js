// CREATE THE DATABE
const db = require('./database')

//MODELS
const Code = require('./models/code.model')

//DB CREATION
async function start_inserts() {
  try {
    //DB SINCRONIZATION
    await db.sync({ force: true })

    //DATA INICIALIZATION
    await Code.create()
    await Code.create()
    await Code.create()
    await Code.create()

  } catch (e) {
    console.log("ERROR ", e)
  }

}

start_inserts()