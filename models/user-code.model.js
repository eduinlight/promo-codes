const db = require('../database')
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const Code = require('./code.model');
const User = require('./user.model');

const UserCode = db.define('user_code', {
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

Code.belongsToMany(User, {through: UserCode})
User.belongsToMany(Code, {through: UserCode})

module.exports = UserCode