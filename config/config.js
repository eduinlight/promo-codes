var funciones = require('../utils/funciones')


module.exports = {
  url: "http://127.0.0.1:9000/",
  websocket_port: 4000,
  secret: 'klsjd123jklsa@@><M?:}{[]232123sdqwecwjlKJKSLDJQLwk2!SDKJ#($kjsdkj2kl1123',
  frontend_url: 'http://localhost:4200',

  database: "mongodb://127.0.0.1:27017/test",

  admin_user: {
    name: "Prueba",
    last_name: "Apellido",
    user: "admin",
    email: "admin@admin.com",
    pass: "admin"
  },

  email: {
    from: 'admin@admin.com',
    host: '127.0.0.1', // hostname
    // secureConnection: false, // use SSL
    // port: 587, // port for secure SMTP
    // transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'admin@light.com',
      pass: '123'
    }
  }
}