var funciones = require('../utils/funciones')


module.exports = {
  server: {
    protocol: "http",
    port: 9000,
    domain: "localhost",
  },

  database: {
    database: 'safeboda',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: "127.0.0.1",
  },
  google_maps_api_key: "AIzaSyA28Q9mx0IXxegzVcdn4O2XWU8MmZcr4vk",

  default_config_table: {
    promo_code_max_rides: 10,
    promo_code_radius: 10 * 1000, //10KM
    promo_code_duration: 24 * 60 * 60 * 1000, //one day
  }
}