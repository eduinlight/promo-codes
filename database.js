const Sequelize = require('sequelize');
const Op = Sequelize.Op
const sequelize = new Sequelize({
  database: 'safeboda',
  username: 'root',
  password: '',
  dialect: 'mysql',
  host: "127.0.0.1",
})

module.exports = sequelize