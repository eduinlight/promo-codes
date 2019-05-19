const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Config = require('../models/config.model');
const val = require('../utils/custom_validations')

module.exports = {
  putConfig: async (req, res) => {
    //validating input
    let v = val.validate('putConfig', req.body)
    if(!v.valid){
      return res.data_errors(v.errors)
    }

    await Config.update(req.body, {
      where: {
        promo_code_radius: {[Op.ne]: null}
      }
    })

    res.success(await Config.findOne())
  },

  getConfig: async (req, res) => {
    const config = await Config.findOne()
    res.success(config)
  }
}