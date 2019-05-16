//IMPORTS
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const bluebird = require('bluebird')
const helmet = require('helmet')
const cors = require('cors')

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/swagger.json');

//MIOS
const config = require('./config/config')
const middlewares = require('./utils/middlewares')
const validationOptions = require('./utils/custom_validations')

// // //CREACION DE LA APLICACION
let app = express()
app.enable('strict routing')

//SECURITY
app.use(helmet())

//CONFIGURACION DEL LOGGER
app.use(logger('dev'))

//COMO SE ESPERAN LOS DATOS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//COOKIES
app.use(cookieParser())

//HABILITAR CORS
app.use(cors({
  origin: [
    config.frontend_url
  ],
  credentials: true
}))

//OBJETOS ESTATICOS
app.use('/public', express.static(path.join(__dirname, 'public')))

//TIPOS DE RESPUESTAS
app.use(middlewares.responses)

//CONFIGURACION DE LAS RUTAS Y DOCUMENTACIÓN
require('./routes')(app)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//CONFIGURACION PARA ERRORES
// catch 404 and forward to error handler
app.use(middlewares.show_404)

module.exports = app