const Sequelize = require('sequelize');
const Op = Sequelize.Op
const config = require('./config/config')
const sequelize = new Sequelize(config.database)

module.exports = sequelize