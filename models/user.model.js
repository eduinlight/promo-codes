const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')

const User = db.define('user', {
  id: { 
    type: Sequelize.UUID, 
    primaryKey: true 
  },
}, {
  underscoredAll: true,
  underscored: true,
})

User.beforeCreate((obj, _ ) => {
  return obj.id = uuid();
})

module.exports = User