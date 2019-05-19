const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Event = require('../models/event.model');

module.exports = {
  getEvents: async (req, res) => {
    const data = await Event.findAll({attributes: ['id']})
    res.success(data)
  }
}