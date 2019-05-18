const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')

const Event = db.define('event', {
  id: { 
    type: Sequelize.UUID, 
    primaryKey: true 
  },
}, {
  underscoredAll: true,
  underscored: true,
})

Event.beforeCreate((obj, _ ) => {
  return obj.id = uuid();
})

module.exports = Event