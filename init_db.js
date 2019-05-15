// CREATE THE DATABE
const db = require('./database')

//MODELS


//DB CREATION
async function start_inserts() {
  try {
    //DB SINCRONIZATION
    await db.sync({ force: true })

    //DATA INICIALIZATION

  } catch (e) {
    console.log("ERROR ", e)
  }

}

start_inserts()