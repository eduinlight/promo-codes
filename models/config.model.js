const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('../config/config');

const Config = db.define('config', {
  id: { 
    type: Sequelize.UUID, 
    primaryKey: true 
  },
  promo_code_max_rides: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: config.default_config_table.promo_code_max_rides,
  },
  promo_code_radius: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: config.default_config_table.promo_code_radius,
  },
  promo_code_duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: config.default_config_table.promo_code_duration,
  }
}, {
  underscoredAll: true,
  underscored: true,
})

Config.beforeCreate(async (obj, _ ) => {
  obj.id = uuid();
  return obj
})

module.exports = Config