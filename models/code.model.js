const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')

const Code = db.define('code', {
  id: { type: Sequelize.UUID, primaryKey: true },
})

Code.beforeCreate((user, _ ) => {
  return user.id = uuid();
})

module.exports = Code