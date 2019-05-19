//THIS SCRIPT IT WAS CREATED BY EDUIN GARCIA CORDERO
//IS A DATA VALIDATOR LIBRARY USING THE FUNCTIONS PROVIDED BY string-validator
//YOU CAN USE THIS CODE AND DO WHEREVER YOU WANTED WITH IT

//string validator rules
const sv = require("string-validator")
const validations = require('../config/validations')

let defaults = {
  rules: {
    equals: {
      cant_params: 1,
      message: 'the text is not equal to %p1',
      fn: sv.equals
    },
    contains: {
      cant_params: 1,
      message: 'the text must contain %p1',
      fn: sv.contains
    },
    matches: {
      cant_params: 1,
      message: 'the text do not match with $p1',
      fn: sv.matches
    },
    email: {
      cant_params: 0,
      message: 'the email is incorrect',
      fn: sv.isEmail
    },
    url: {
      cant_params: 0,
      message: 'the url is incorrect',
      fn: sv.isURL
    },
    ip: {
      cant_params: 0,
      message: 'the ip address is incorrect',
      fn: sv.isIP
    },
    alpha: {
      cant_params: 0,
      message: 'only english alphabet letters',
      fn: sv.isAlpha
    },
    numeric: {
      cant_params: 0,
      message: 'the number is incorrect',
      fn: sv.isNumeric
    },
    alpha_numeric: {
      cant_params: 0,
      message: 'only english alphabet letters and/or numbers',
      fn: sv.isAlphanumeric
    },
    base64: {
      cant_params: 0,
      message: 'incorrect base64 code',
      fn: sv.isBase64
    },
    hexadecimal: {
      cant_params: 0,
      message: 'only hexadecimal',
      fn: sv.isHexadecimal
    },
    hexcolor: {
      cant_params: 0,
      message: 'only a hexadecimal color format',
      fn: sv.isHexColor
    },
    lowercase: {
      cant_params: 0,
      message: 'only lowercase characters',
      fn: sv.isLowercase
    },
    uppercase: {
      cant_params: 0,
      message: 'only uppercase characters',
      fn: sv.isUppercase
    },
    int: {
      cant_params: 0,
      message: 'only an integer number',
      fn: sv.isInt
    },
    float: {
      cant_params: 0,
      message: 'only a float number',
      fn: () => (v) => sv.isFloat(v, {locale: 'en-US'})
    },
    divisible_by: {
      cant_params: 1,
      message: 'number is not divisible by %p1',
      fn: sv.isDivisibleBy
    },
    required: {
      cant_params: 0,
      message: 'required',
      fn: () => (v) => v !== undefined && v !== null && v !== ''
    },
    boolean: {
      cant_params: 0,
      message: 'only a boolean value',
      fn: () => (v) => v == 'true' || v=='false' || v=='1' || v=='0'
    },
    min_length: {
      cant_params: 1,
      message: 'the text length is not equal to %p1',
      fn: sv.isLength
    },
    max_length: {
      cant_params: 1,
      message: 'the text length is not greater than %p1',
      fn: v => sv.isLength(0, v)
    },
    date: {
      cant_params: 0,
      message: 'wrong date',
      fn: sv.isDate
    },
    after_date: {
      cant_params: 1,
      message: '',
      fn: sv.isAfter
    },
    before_date: {
      cant_params: 1,
      message: 'only dates before %p1',
      fn: sv.isBefore
    },
    in: {
      cant_params: 1,
      message: 'the value must be one of %p1',
      fn: sv.isIn
    },
    credit_card: {
      cant_params: 0,
      message: 'wrong credit card',
      fn: sv.isCreditCard
    },
    json: {
      cant_params: 0,
      message: 'only json format supported',
      fn: sv.isJSON
    },
    ascii: {
      cant_params: 0,
      message: 'only ascii code characters',
      fn: sv.isAscii
    },
    gender: {
      cant_params: 0,
      message: 'the sex is not one of [M, F, O]',
      fn: () => (v) => {
        return v=='F' || v=='M' || v=='G'
      }
    },
    max: {
      cant_params: 1,
      message: 'max value %p1',
      fn: (p1) => (v) => {
        return v<=p1
      }
    },
    min: {
      cant_params: 1,
      message: 'min value %p1',
      fn: (p1) => (v) => {
        return v>=p1
      }
    },
  }
}

//schema format
//{field: [rule1, {rule: rule2}, {rule: rule3, params: [p1, p2], message: "custom_message"} ] }


module.exports = {
  defaults: defaults,
  validate: (form, data) => {
    let schema = validations[form]
    //iniciar objeto de respuesta
    let res = { valid: true, errors: {}, values: {} }
      //por cada campo en el schema
    Object.keys(schema).forEach(field => {
      //obtener las reglas del campo
      let rules = schema[field]

      //pasar el valor del campo para la respuesta
      res.values[field] = data[field]

      //para cada regla del campo
      rules.forEach(v => {
        //definición de la regla
        let rule = {}
        if (typeof(v) == "string") {
          rule = defaults.rules[v]
        } else if (typeof(v) == "object") {
          rule = defaults.rules[v.rule]

          if (rule.cant_params > 0 && v.params) {
            rule.params = v.params
          }

          if (v.message) {
            rule.message = v.message
          }
        }

        //hacer comprobación para esta regla
        //creación de parámetros
        let params_fn = []
        if (rule.cant_params > 0) {
          params_fn = rule.params
        }

        if (
          (
            (
              v!='required' 
              && data[field] !== undefined 
            )
            || v=='required'
          )
          && !rule.fn(...params_fn)(data[field])
          ) {
          res.valid = false
          //reemplazar parámetros en el mensaje
          params_fn.forEach((v, i) => rule.message = rule.message.replace(new RegExp('\%p' + (i + 1), 'g'), v))
          res.errors[field] = rule.message

        }
      });
    })
    return res
  }
}