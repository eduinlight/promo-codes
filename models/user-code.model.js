const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const Code = require('./code.model');
const User = require('./user.model');

const UserCode = db.define('user_code', {
  id: { 
    type: Sequelize.UUID, 
    primaryKey: true 
  },
  rides_count: { 
    type: Sequelize.INTEGER, 
    defaultValue: 0,
    allowNull: false,
  },
}, {
  underscoredAll: true,
  underscored: true,
})

UserCode.beforeCreate((obj, _ ) => {
  return obj.id = uuid();
})

UserCode.belongsTo(User)
UserCode.belongsTo(Code)

module.exports = UserCode