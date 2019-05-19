const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models/user.model');

module.exports = {
  getUsers: async (req, res) => {
    const data = await User.findAll()
    res.success(data)
  }
}