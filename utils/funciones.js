const crypter = require('crypto')
const base64 = require('base64-url')
// const Media = require('../models/media.model')
const fs = require('fs')

module.exports = {
  hash: function(password) {
    return crypter.createHash('sha256').update(password).digest('hex')
      //     const crypto = require('crypto');
      // const key = crypto.pbkdf2Sync('secret', 'salt', 100000, 512, 'sha512');
      // console.log(key.toString('hex'));  // '3745e48...aa39b34'
  },

  to_url: function(obj) {
    var encript = {
      date: Date.now(),
      data: obj
    }
    return this.hash(base64.encode(JSON.stringify(encript)))
  },

  createError: function(field, mess) {
    return { field: field, message: mess }
  },

  createValidationError: function(errors) {
    return {
      status: "400",
      message: "data errors",
      errors: errors
    }
  },

  remove_uploaded: async (media) => {
    try{

      //eliminar imagen
      if(fs.existsSync(media.path)){
        fs.unlink(media.path)
      }

      //eliminar media
      await Media.destroy({
        where: {
          id: media.id
        }
      })
    }catch(e){
      console.log(e)
    }
    
  },

  transformListOfTranslations(tl){
    let res = {}
    tl.forEach(t => {
      res[t.language] = t.text
    });
    return res
  }
}