var mimes = require('../utils/mimes')

module.exports = {
  default: {
    mimes: mimes.images,
    maxZise: 2 * (1024 * 1024), // 2MB
    path: 'uploads/',
    param: 'file',
    url: 'files/'
  },
}