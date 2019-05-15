const Code = require('../models/code.model')

module.exports = {
  get: async (req, res) => {
    const codes = await Code.findAll()
    res.status(200).json(codes)
  }
}