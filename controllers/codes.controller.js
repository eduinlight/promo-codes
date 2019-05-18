const gmaps = require('../gmaps')
const geo = require('geolib');
const val = require('../utils/custom_validations')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Config = require('../models/config.model');
const Code = require('../models/code.model');
const Event = require('../models/event.model');
const UserCode = require('../models/user-code.model');
const User = require('../models/user.model');

module.exports = {
  //generate a new promo code for an event: body: event_id: Sequelize.UUID
  postGenerate: async (req, res) => {
    //validating input
    let v = val.validate('postGenerate', req.body)
    if(!v.valid){
      return res.data_errors(v.errors)
    }

    const {event_id} = req.body

    //get the event
    let event = await Event.findOne({where: {
      id: event_id
    }})
    
    //check if event exist
    if(!event){
      return res.not_found("the event do not exist")
    }

    //get config table for default data
    let config = await Config.findOne()

    //create the code
    let code = await Code.create({
      max_rides: config.promo_code_max_rides,
      radius: config.promo_code_radius,
      duration: config.promo_code_duration,
      expire_date: new Date(Date.now() + config.promo_code_duration),
      event_id: event.id
    })

    return res.success(code)
  },
  //the user pickup a code
  postPickup: async (req, res) => {
    //validating input
    let v = val.validate('postPickup', req.body)
    if(!v.valid){
      return res.data_errors(v.errors)
    }

    const {user_id, code_id} = req.body

    //validate user
    let user = await User.findById(user_id)
    if(!user){
      return res.not_found("the user do not exist")
    }
    //validate code
    let code = await Code.findOne({
      where: {
        id: code_id,
        active: true,
      }
    })
    if(!code){
      return res.not_found("the code do not exist")
    }
    if(code.expire_date < (new Date(Date.now()))){
      return res.not_found("the code has expire")
    }

    //if the user has previous rides with this code and rides_count < max_rides 
    //then do not asign a new code and show how many rides has left
    let user_code = await UserCode.findOne({where: {
      user_id: user.id,
      code_id: code.id,
      rides_count: {[Op.lt]: code.max_rides}
    }})
    if(user_code){
      res.data_errors({message: `the user has ${code.max_rides - user_code.rides_count} rides availables with the code.`})
    }

    //add the user to the code
    await UserCode.create({
      code_id: code.id,
      user_id: user.id,
    })

    return res.success()
  },
  //used for falidate if a x user with a y code can ride to or from an event venue
  //1- check if code is active or if code has not expire
      //expire => with expiration_date or with max_rides
  //2- check that the user has picked the code
  //3- calculate distance from origin to destination
  //4- check if promo code radius >= distance
  //5- at this point the user can travel so return the polyline 
  //and increment his rides with this code
  postRide: async (req, res) => {
    //validating input
    let v = val.validate('postRide', req.body)
    if(!v.valid){
      return res.data_errors(v.errors)
    }

    const {
      user_id, 
      code_id,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
    } = req.body

    //validate user
    let user = await User.findById(user_id)
    if(!user){
      return res.not_found("the user do not exist")
    }
    //validate code
    let code = await Code.findOne({
      where: {
        id: code_id,
        active: true,
      }
    })
    if(!code){
      return res.not_found("the code do not exist")
    }
    if(code.expire_date < (new Date(Date.now()))){
      return res.not_found("the code has expire")
    }

    //if the user has rides_count <= max_rides
    let user_code = await UserCode.findOne({where: {
      user_id: user.id,
      code_id: code.id,
      rides_count: {[Op.lt]: code.max_rides}
    }})
    if(!user_code){
      res.data_errors({message: `the user cant'n ride with this code.`})
    }

    //calculating distance
    let distance = geolib.getDistance(
      {latitude: origin_latitude, longitude: origin_longitude},
      {latitude: destination_latitude, longitude: destination_longitude},
    )

    //checking if the radius >= distance
    if(code.radius >= distance){
      return res.data_errors({
        message: `not allowed distances greater than ${code.radius} m`
      })
    }

    //everything it's ok so increment rides_count
    await UserCode.update({
      rides_count: user_code.rides_count + 1
    },{where: {
      user_id: user.id,
      code_id: code.id,
      rides_count: {[Op.lt]: code.max_rides},
    }})

    //return polyline
    //TODO
    // gmaps.direction({
    //     query
    // })
  },
  //get all codes
  getCodes: async (req, res) => {
    //validating input
    let v = val.validate('getCodes', req.query)
    if(!v.valid){
      return res.data_errors(v.errors)
    }

    const {active} = req.query

    //get codes with active property equal to active query param and 
    //if active=true then expires code are not included
    let where = {}
    if(active!=undefined){
      let expireCond = {}
      if(active){
        expireCond = {
          expire_date: {
            [Op.gt]: new Date(Date.now())
          }
        }
      }

      where = {
        active: active,
        ...expireCond,
      }
    }
    
    return res.success(
      await Code.findAll({
        where: where,
        include:{
          model: Event,
          attributes: ['id']
        }
      })
    )
  },
  //update code radius
  putRadius: async (req, res) => {
    //validating input
    let v = val.validate('putRadius', req.body)
    if(!v.valid){
      return res.data_errors(v.errors)
    }

    const {code_id} = req.params
    const {radius} = req.body

    //get the code
    let code = await Code.findById(code_id)
    
    //check if event exist
    if(!code){
      return res.not_found("the code do not exist")
    }

    //update the code
    await Code.update({
      radius
    }, {where: {
      id: code.id
    }})

    return res.success(await Code.findById(code.id))
  },
  //deactivate a code
  putDeactivate: async (req, res) => {
    const {code_id} = req.params

    //get the code
    let code = await Code.findById(code_id)
    
    //check if event exist
    if(!code){
      return res.not_found("the code do not exist")
    }

    //update the code
    await Code.update({
      active: false
    }, {where: {
      id: code.id
    }})

    return res.success(await Code.findById(code.id))
  },

}