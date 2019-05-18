const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('../config/config')
const Event = require('./event.model');

const Code = db.define('code', {
  id: { 
    type: Sequelize.UUID, 
    primaryKey: true 
  },
  max_rides: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  radius: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  }
}, {
  underscoredAll: true,
  underscored: true,
})

Code.beforeCreate(async (obj, _ ) => {
  obj.id = uuid();
  return obj
})

Code.belongsTo(Event)

module.exports = Code