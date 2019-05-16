const config = require('./config/config')

module.exports =  require('@google/maps').createClient({
  key: config.google_maps_api_key
});