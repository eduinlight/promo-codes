const router = require('express').Router();
const swagger = require('swagger-express-router');
const controllers = require('../controllers')
const swaggerDocument = require('./swagger.js')
 
const useBasePath = true;
const middlewareObj = {
    'Codes': controllers.codes,
    'Config': controllers.config,
    'Events': controllers.events,
    'Users': controllers.users,
};

module.exports = (app) => {
  swagger.setUpRoutes(middlewareObj, app, swaggerDocument, useBasePath);
}